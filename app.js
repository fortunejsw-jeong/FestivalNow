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

    // 지도 연동 (실제 구현)
    initMap();

    const listItems = document.getElementById('festival-list');
    listItems.addEventListener('click', (e) => {
        const item = e.target.closest('.festival-item');
        if (item) {
            const id = item.getAttribute('data-id');
            const festival = festivalData.find(f => f.id == id);

            // 지도 이동 및 마커 표시
            if (window.kakao && window.kakao.maps) {
                const moveLatLon = new kakao.maps.LatLng(festival.lat, festival.lng);
                map.setCenter(moveLatLon);
                map.setLevel(3); // 확대 레벨 조정

                // 기존 마커 제거 후 새 마커 추가 (또는 기존 마커 강조)
                // 간단하게는 센터 이동만 시켜도 충분함
            } else {
                alert('지도 API 키가 설정되지 않았습니다.');
            }
        }
    });
}

// 전역 맵 변수
let map;

function initMap() {
    const container = document.getElementById('kakao-map');

    // API 키가 입력되어 있고 SDK가 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps) {
        container.innerHTML = `
            <div class="placeholder-content">
                <i data-lucide="alert-circle" style="color: #ef4444; width: 48px; height: 48px; margin-bottom: 15px;"></i>
                <p>Kakao 맵 API 키 설정이 필요합니다.</p>
                <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">index.html 파일에서 'YOUR_KAKAO_API_KEY'를<br>본인의 JavaScript 키로 변경해주세요.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    const options = {
        center: new kakao.maps.LatLng(36.5, 127.5), // 대한민국 중심
        level: 13
    };

    map = new kakao.maps.Map(container, options);

    // 축제 마커 생성
    festivalData.forEach(festival => {
        const markerPosition = new kakao.maps.LatLng(festival.lat, festival.lng);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 마커 클릭 이벤트
        kakao.maps.event.addListener(marker, 'click', function () {
            // 해당 리스트 아이템으로 스크롤 등의 인터랙션 가능
            const moveLatLon = new kakao.maps.LatLng(festival.lat, festival.lng);
            map.setCenter(moveLatLon);
            map.setLevel(4);
        });
    });
}
