document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderFeaturedFestivals();
    renderFestivalList(festivalData);
    setupEventListeners();
    updateTotalCount(festivalData.length);
}

// 상단 인기 축제 (Hero Section) 렌더링
function renderFeaturedFestivals() {
    const heroCarousel = document.getElementById('hero-carousel');
    const featured = [...festivalData].sort((a, b) => b.popularity - a.popularity).slice(0, 5);

    heroCarousel.innerHTML = featured.map((festival, index) => `
        <div class="festival-card-featured">
            <img src="${festival.image}" alt="${festival.title}">
            <div class="rank-badge">HOT #${index + 1}</div>
            <div class="card-overlay">
                <h3>${festival.title}</h3>
                <p>${festival.location}</p>
            </div>
        </div>
    `).join('');
}

// 축제 리스트 렌더링
function renderFestivalList(data) {
    const listElement = document.getElementById('festival-list');

    if (data.length === 0) {
        listElement.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        return;
    }

    listElement.innerHTML = data.map(festival => `
        <div class="festival-item" data-id="${festival.id}">
            <img src="${festival.image}" alt="${festival.title}" class="item-img">
            <div class="item-info">
                <h3 class="item-title">${festival.title}</h3>
                <div class="item-meta">
                    <span><i data-lucide="map-pin"></i> ${festival.location}</span>
                    <span><i data-lucide="calendar"></i> ${festival.date}</span>
                    <span><i data-lucide="trending-up"></i> 화제성 점수: ${festival.popularity.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// 카운트 업데이트
function updateTotalCount(count) {
    document.getElementById('count-value').textContent = count;
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 카테고리 필터링
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const category = chip.getAttribute('data-category');
            const filteredData = category === 'all'
                ? festivalData
                : festivalData.filter(f => f.category === category);

            renderFestivalList(filteredData);
            updateTotalCount(filteredData.length);
        });
    });

    // 정렬
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        const currentData = [...festivalData]; // 현재 필터 상태를 고려하려면 전역 변수 유지 필요

        if (value === 'popularity') {
            currentData.sort((a, b) => b.popularity - a.popularity);
        } else if (value === 'date') {
            currentData.sort((a, b) => new Date(a.date.split(' - ')[0]) - new Date(b.date.split(' - ')[0]));
        }

        renderFestivalList(currentData);
    });

    // 검색 바 검색
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filteredData = festivalData.filter(f =>
            f.title.toLowerCase().includes(keyword) ||
            f.location.toLowerCase().includes(keyword)
        );
        renderFestivalList(filteredData);
        updateTotalCount(filteredData.length);
    });

    // 지도 연동 (가상)
    const listItems = document.getElementById('festival-list');
    listItems.addEventListener('click', (e) => {
        const item = e.target.closest('.festival-item');
        if (item) {
            const id = item.getAttribute('data-id');
            const festival = festivalData.find(f => f.id == id);
            alert(`${festival.title} 위치: ${festival.lat}, ${festival.lng}\n(카카오 지도 API 키 설정 시 실제 마커 이동이 가능합니다)`);
        }
    });
}
