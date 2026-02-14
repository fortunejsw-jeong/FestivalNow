document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// State Managment
let state = {
    data: [], // All data
    filtered: [], // Currently filtered data
    visibleCount: 8, // Pagination limit
    currentCategory: 'all',
    currentRegion: 'all',
    sortMode: 'popularity',
    searchTerm: '' // New search state
};

function initApp() {
    // 1. Initialize data from global object
    state.data = [...festivalData];
    state.filtered = [...state.data];

    // 2. Initial Render
    renderFeaturedFestivals();
    renderCalendar(); // New Calendar Render
    applyFiltersAndSort(); // This triggers renderFestivalList

    // 3. Setup Events
    setupEventListeners();

    // 4. Map Init
    initMap();
}

// ... renderFeaturedFestivals ...

// ... handleImageError ...

// 필터 및 정렬 적용 (핵심 로직)
function applyFiltersAndSort() {
    let result = state.data;

    // 0. Filter by Search Term
    if (state.searchTerm) {
        // "강릉단오제" -> "단오제" search should work
        result = result.filter(item => item.title.includes(state.searchTerm));
    }

    // 1. Filter by Region
    if (state.currentRegion !== 'all') {
        const regionKeywords = {
            'seoul-gyeonggi': ['서울', '경기', '인천'],
            'gangwon': ['강원'],
            'chungcheong': ['충청', '대전', '세종'],
            'jeolla': ['전라', '광주'],
            'gyeongsang': ['경상', '부산', '대구', '울산'],
            'jeju': ['제주']
        };
        const keywords = regionKeywords[state.currentRegion];
        result = result.filter(item => keywords.some(k => item.location.includes(k)));
    }

    // 2. Filter by Category
    if (state.currentCategory !== 'all') {
        result = result.filter(item => item.category === state.currentCategory);
    }

    // 3. Sort
    if (state.sortMode === 'popularity') {
        result.sort((a, b) => b.popularity - a.popularity);
    } else if (state.sortMode === 'date') {
        // Simple string comparison for "YYYY.MM.DD" format works for sorting by start date
        result.sort((a, b) => a.date.localeCompare(b.date));
    }

    state.filtered = result;
    updateTotalCount(result.length);
    renderFestivalList();
}


// ... renderFestivalList ...
// ... updateTotalCount ...

// 이벤트 리스너 설정
function setupEventListeners() {
    // 0. Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchTerm = e.target.value.trim();
            state.visibleCount = 8; // Reset paging
            applyFiltersAndSort();
        });
    }

    // 1. Region & Theme Filters
    // ... (existing code) ...
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Handle active class
            if (chip.hasAttribute('data-region')) {
                // Region Click
                document.querySelectorAll('.filter-chip[data-region]').forEach(c => c.classList.remove('active'));
            } else if (chip.hasAttribute('data-category')) {
                // Category Click
                if (chip.getAttribute('data-category') === 'all') {
                    // Reset All
                    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                    document.querySelector('.filter-chip[data-category="all"]').classList.add('active');
                    state.currentCategory = 'all';
                    state.currentRegion = 'all';
                    state.visibleCount = 8; // Reset paging
                    applyFiltersAndSort();
                    return;
                }

                document.querySelectorAll('.filter-chip:not([data-region])').forEach(c => c.classList.remove('active'));
                document.querySelector('.filter-chip[data-category="all"]').classList.remove('active');
            }

            chip.classList.add('active');

            // Update State
            if (chip.hasAttribute('data-region')) {
                state.currentRegion = chip.getAttribute('data-region');
            } else {
                state.currentCategory = chip.getAttribute('data-category');
            }

            state.visibleCount = 8; // Reset paging on filter change
            applyFiltersAndSort();
        });
    });

    // 2. Sort
    document.getElementById('sort-select').addEventListener('change', (e) => {
        state.sortMode = e.target.value;
        state.visibleCount = 8;
        applyFiltersAndSort();
    });

    // 3. Load More
    document.getElementById('load-more-btn').addEventListener('click', () => {
        state.visibleCount += 6;
        renderFestivalList();
    });

    // 4. Modal Close
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('festival-modal').addEventListener('click', (e) => {
        if (e.target.id === 'festival-modal') closeModal();
    });
}

// ... Detail Logic ...

// --- Calendar Logic (New) ---
function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;

    // Get festivals starting this month (Mock logic using random dates from data)
    // Actually, let's just show top 4 upcoming festivals sorted by date
    // Sort all data by date
    const sortedByDate = [...state.data].sort((a, b) => a.date.localeCompare(b.date));
    const upcoming = sortedByDate.slice(0, 4);

    calendarGrid.innerHTML = upcoming.map(festival => `
        <div class="calendar-item" onclick="openModalById(${festival.id})">
            <div class="cal-date-box">
                <span class="cal-month">${festival.date.substring(5, 7)}월</span>
                <span class="cal-day">${festival.date.substring(8, 10)}</span>
                <span class="cal-year">${festival.date.substring(0, 4)}</span>
            </div>
            <div class="cal-info">
                <h4>${festival.title}</h4>
                <p>${festival.location}</p>
            </div>
        </div>
    `).join('');
}


// --- Detail Modal Logic ---
function openModalById(id) {
    const festival = state.data.find(f => f.id == id);
    if (!festival) return;

    // Populate Data
    document.getElementById('modal-title').textContent = festival.title;
    document.getElementById('modal-location').innerHTML = `<i data-lucide="map-pin"></i> ${festival.location}`;

    // Image fallback logic for modal
    const modalImg = document.getElementById('modal-image');
    modalImg.src = festival.image;
    modalImg.onerror = function () {
        handleImageError(this, 'modal');
    };
    // Ensure image is visible (in case it was hidden by previous error)
    modalImg.style.display = 'block';
    if (modalImg.parentElement.classList.contains('no-image')) {
        modalImg.parentElement.classList.remove('no-image');
    }

    document.getElementById('modal-date').textContent = festival.date;
    document.getElementById('modal-category').textContent = getCategoryName(festival.category);
    document.getElementById('modal-popularity').textContent = festival.popularity.toLocaleString();
    document.getElementById('modal-desc').textContent = festival.description || '상세 정보가 없습니다.';

    // Update Map to this festival's location
    if (festival.lat && festival.lng) {
        updateMapMarker(festival.lat, festival.lng, festival.title);
    }

    // Calculate D-Day
    const startDate = new Date(festival.date.split(' - ')[0]);
    const today = new Date();
    const diffTime = startDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let dDayText = "";
    if (diffDays > 0) dDayText = `D-${diffDays}`;
    else if (diffDays > -100) dDayText = "진행중"; // Simple logic
    else dDayText = "종료됨";

    document.getElementById('modal-d-day').textContent = dDayText;

    // Map Button
    const mapBtn = document.getElementById('modal-map-link');
    mapBtn.onclick = () => {
        closeModal();
        moveToMap(festival.lat, festival.lng);
        // On mobile, scroll to map?
        if (window.innerWidth > 1024) {
            // Already visible
        } else {
            // Maybe alert or simple scroll?
            // document.getElementById('map-view').scrollIntoView({behavior: 'smooth'});
        }
    };

    // Show Modal
    const modal = document.getElementById('festival-modal');
    modal.style.display = 'flex';
    lucide.createIcons();
}

function closeModal() {
    document.getElementById('festival-modal').style.display = 'none';
}

function getCategoryName(cat) {
    const names = {
        'cultural': '전통/문화',
        'music': '음악/예술',
        'nature': '자연/꽃',
        'food': '푸드/특산물'
    };
    return names[cat] || cat;
}

// --- Map Logic ---
let map = null;
let currentMarker = null;

function initMap() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        const container = document.getElementById('kakao-map');
        if (container) {
            container.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;color:#ccc;">Map Resource Failed</div>';
        }
        return;
    }

    // Default to Top 1 Festival (or Seoul)
    // state.data is already sorted by popularity from initApp -> applyFiltersAndSort (initially)
    // But initApp calls initMap AFTER sorting?
    // Actually state.data is sorted by default in data.js too.
    const topFestival = state.data[0];
    const defaultLat = topFestival ? topFestival.lat : 37.5665;
    const defaultLng = topFestival ? topFestival.lng : 126.9780;

    // Initialize Map
    map = L.map('kakao-map').setView([defaultLat, defaultLng], 12);

    // Add Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; FestivalNow'
    }).addTo(map);

    // Add Initial Marker
    if (topFestival) {
        updateMapMarker(defaultLat, defaultLng, topFestival.title);
    }
}

function updateMapMarker(lat, lng, title) {
    if (!map) return;

    // Clear existing
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Add new
    currentMarker = L.marker([lat, lng]).addTo(map)
        .bindPopup(title)
        .openPopup();

    // Move view
    map.flyTo([lat, lng], 13, {
        animate: true,
        duration: 1.5
    });
}

function moveToMap(lat, lng) {
    if (!map) return;
    map.flyTo([lat, lng], 13);
}

// Override render logic? NO, we integrate map updates into existing functions.
// We DO NOT override renderFestivalList anymore.
// Instead, if we want markers for ALL items in the list, we can add that logic.
// For now, the user requested: "Video map shows Top 1 default, and clicking festival shows its map".
// This is handled by openModalById calling updateMapMarker.
// If the user wants markers for ALL filtered items on the map simultaneously, we'd need a different approach.
// But the prompt said: "map defaults to top 1... when clicking festival, show THAT festival's map".
// So single marker logic is safer and cleaner for now.

