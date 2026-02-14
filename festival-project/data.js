(function () {
    // 1. Seed Data (Top 20)
    const seedData = [
        {
            id: 1, title: "진해군항제", location: "경상남도 창원시", category: "nature",
            description: "대한민국 최대 규모의 벚꽃 축제. 36만 그루의 왕벚나무가 만드는 꽃터널을 경험하세요.",
            image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=800",
            lat: 35.1547, lng: 128.6608, popularity: 98500, date: "2026.03.25 - 2026.04.03"
        },
        {
            id: 2, title: "보령머드축제", location: "충청남도 보령시", category: "cultural",
            description: "전 세계인이 함께 즐기는 대한민국 대표 여름 축제. 머드 체험과 함께 뜨거운 여름을 느껴보세요.",
            image: "https://images.unsplash.com/photo-1596707328688-297da0175dcc?auto=format&fit=crop&q=80&w=800",
            lat: 36.3262, lng: 126.5111, popularity: 89000, date: "2026.07.19 - 2026.07.28"
        },
        {
            id: 3, title: "부산불꽃축제", location: "부산광역시 수영구", category: "music",
            description: "광안리 해수욕장에서 펼쳐지는 화려한 불꽃의 향연. 국내 최대 규모의 불꽃쇼입니다.",
            image: "https://images.unsplash.com/photo-1533230332214-3d9646b5394d?auto=format&fit=crop&q=80&w=800",
            lat: 35.1532, lng: 129.1186, popularity: 85000, date: "2026.11.07 - 2026.11.07"
        },
        {
            id: 4, title: "서울세계불꽃축제", location: "서울특별시 영등포구", category: "music",
            description: "여의도 한강공원에서 펼쳐지는 가을밤의 환상적인 불꽃 축제.",
            image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&q=80&w=800",
            lat: 37.5284, lng: 126.9328, popularity: 82000, date: "2026.10.05 - 2026.10.05"
        },
        {
            id: 5, title: "함평나비대축제", location: "전라남도 함평군", category: "nature",
            description: "꽃과 나비가 어우러진 생태 체험 축제. 아이들과 함께하기 좋은 봄나들이 장소입니다.",
            image: "https://images.unsplash.com/photo-1535007817478-93664c39735d?auto=format&fit=crop&q=80&w=800",
            lat: 35.0655, lng: 126.5197, popularity: 78000, date: "2026.04.26 - 2026.05.06"
        },
        {
            id: 6, title: "화천산천어축제", location: "강원도 화천군", category: "nature",
            description: "얼음낚시와 맨손잡기 등 다양한 겨울 체험을 즐길 수 있는 세계적인 겨울 축제.",
            image: "https://images.unsplash.com/photo-1518659695679-b88302f37eb9?auto=format&fit=crop&q=80&w=800",
            lat: 38.1062, lng: 127.7082, popularity: 75000, date: "2026.01.06 - 2026.01.28"
        },
        {
            id: 7, title: "부산국제영화제", location: "부산광역시 해운대구", category: "cultural",
            description: "아시아 최고의 영화 축제. 전 세계 거장들의 영화와 화려한 레드카펫 행사를 경험해보세요.",
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
            lat: 35.1711, lng: 129.1271, popularity: 72000, date: "2026.10.02 - 2026.10.11"
        },
        {
            id: 8, title: "강릉단오제", location: "강원도 강릉시", category: "cultural",
            description: "유네스코 인류무형문화유산으로 지정된 천년의 역사를 가진 전통 축제.",
            image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800",
            lat: 37.7519, lng: 128.8761, popularity: 69000, date: "2026.06.18 - 2026.06.25"
        },
        {
            id: 9, title: "안동국제탈춤축제", location: "경상북도 안동시", category: "cultural",
            description: "한국의 미가 살아있는 전통 탈춤 공연과 전 세계의 탈춤을 한자리에서 즐길 수 있습니다.",
            image: "https://images.unsplash.com/photo-1627293504849-06b24d9c79d1?auto=format&fit=crop&q=80&w=800",
            lat: 36.5684, lng: 128.7294, popularity: 68000, date: "2026.09.27 - 2026.10.06"
        },
        {
            id: 10, title: "진주남강유등축제", location: "경상남도 진주시", category: "cultural",
            description: "남강 위에 띄워진 수만 개의 유등이 만드는 환상적인 야경을 감상하세요.",
            image: "https://images.unsplash.com/photo-1549887552-93f8efb871a2?auto=format&fit=crop&q=80&w=800",
            lat: 35.1806, lng: 128.0772, popularity: 67000, date: "2026.10.05 - 2026.10.20"
        },
        {
            id: 11, title: "남원춘향제", location: "전라북도 남원시", category: "cultural",
            description: "춘향과 이몽룡의 사랑 이야기를 주제로 한 대한민국 대표 전통 문화 축제.",
            image: "https://images.unsplash.com/photo-1606296766465-b1547844053e?auto=format&fit=crop&q=80&w=800",
            lat: 35.4055, lng: 127.3824, popularity: 65000, date: "2026.05.08 - 2026.05.12"
        },
        {
            id: 12, title: "금산인삼축제", location: "충청남도 금산군", category: "food",
            description: "건강의 고장 금산에서 펼쳐지는 대한민국 최고의 산업형 문화관광 체험 축제.",
            image: "https://images.unsplash.com/photo-1599579112440-9750568165aa?auto=format&fit=crop&q=80&w=800",
            lat: 36.1086, lng: 127.4878, popularity: 63000, date: "2026.10.03 - 2026.10.13"
        },
        {
            id: 13, title: "이천쌀문화축제", location: "경기도 이천시", category: "food",
            description: "임금님표 이천쌀을 주제로 한 풍성한 먹거리와 볼거리가 있는 대동놀이 한마당.",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
            lat: 37.2804, lng: 127.4425, popularity: 61000, date: "2026.10.16 - 2026.10.20"
        },
        {
            id: 14, title: "자라섬재즈페스티벌", location: "경기도 가평군", category: "music",
            description: "자연 속에서 즐기는 세계적인 재즈 뮤지션들의 공연. 낭만적인 가을 소풍을 떠나보세요.",
            image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800",
            lat: 37.8188, lng: 127.5144, popularity: 59000, date: "2026.10.18 - 2026.10.20"
        },
        {
            id: 15, title: "순천만갈대축제", location: "전라남도 순천시", category: "nature",
            description: "황금빛 갈대 물결이 춤추는 순천만에서 가을의 정취를 만끽하세요.",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
            lat: 34.9276, lng: 127.5074, popularity: 58000, date: "2026.11.02 - 2026.11.03"
        },
        {
            id: 16, title: "제주유채꽃축제", location: "제주특별자치도 서귀포시", category: "nature",
            description: "제주의 봄을 알리는 노란 유채꽃의 향연. 가시리 녹산로의 환상적인 드라이브 코스.",
            image: "https://images.unsplash.com/photo-1520641151608-f463200938b8?auto=format&fit=crop&q=80&w=800",
            lat: 33.3941, lng: 126.7161, popularity: 57000, date: "2026.03.30 - 2026.04.02"
        },
        {
            id: 17, title: "광양매화축제", location: "전라남도 광양시", category: "nature",
            description: "섬진강변을 하얗게 뒤덮는 매화의 물결. 봄소식을 가장 먼저 전하는 꽃 축제입니다.",
            image: "https://images.unsplash.com/photo-1523428859666-6b215886d933?auto=format&fit=crop&q=80&w=800",
            lat: 35.0718, lng: 127.7289, popularity: 56000, date: "2026.03.08 - 2026.03.17"
        },
        {
            id: 18, title: "대구치맥페스티벌", location: "대구광역시 달서구", category: "food",
            description: "맛있는 치킨과 시원한 맥주가 함께하는 열광의 도가니. 대구의 뜨거운 여름을 즐겨보세요.",
            image: "https://images.unsplash.com/photo-1626248677610-d852a32c2539?auto=format&fit=crop&q=80&w=800",
            lat: 35.8459, lng: 128.5564, popularity: 55000, date: "2026.07.03 - 2026.07.07"
        },
        {
            id: 19, title: "전주비빔밥축제", location: "전라북도 전주시", category: "food",
            description: "유네스코 음식창의도시 전주에서 즐기는 맛과 멋의 축제. 대형 비빔밥 퍼포먼스를 놓치지 마세요.",
            image: "https://images.unsplash.com/photo-1628173428059-4d69106ad042?auto=format&fit=crop&q=80&w=800",
            lat: 35.8147, lng: 127.1526, popularity: 54000, date: "2026.10.03 - 2026.10.06"
        },
        {
            id: 20, title: "수원화성문화제", location: "경기도 수원시", category: "cultural",
            description: "정조대왕의 효심과 부국강병의 꿈이 서린 세계문화유산 수원화성에서 펼쳐지는 역사 문화 축제.",
            image: "https://images.unsplash.com/photo-1634991195650-749e79430c5e?auto=format&fit=crop&q=80&w=800",
            lat: 37.2851, lng: 127.0142, popularity: 53000, date: "2026.10.04 - 2026.10.06"
        }
    ];

    // 2. Helpers
    const categories = ['nature', 'cultural', 'music', 'food'];
    const regions = ['강원도', '서울특별시', '경기도', '부산광역시', '전라남도', '전라북도', '충청남도', '충청북도', '경상남도', '경상북도', '제주특별자치도', '인천광역시', '대구광역시', '대전광역시', '광주광역시', '울산광역시'];

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateDate() {
        const startMonth = Math.floor(Math.random() * 12) + 1;
        const endMonth = startMonth;
        const startDay = Math.floor(Math.random() * 20) + 1;
        const endDay = startDay + Math.floor(Math.random() * 10);
        const m = (n) => n.toString().padStart(2, '0');
        return `2026.${m(startMonth)}.${m(startDay)} - 2026.${m(endMonth)}.${m(endDay)}`;
    }

    // 3. Generate 80 more (Total 100)
    let allData = [...seedData];

    for (let i = 21; i <= 100; i++) {
        const seed = getRandomItem(seedData);
        const region = getRandomItem(regions);
        const category = getRandomItem(categories);
        // Random popularity between 5000 and 50000
        const randomPop = Math.floor(Math.random() * 45000) + 5000;

        // Randomize location slightly around the seed's lat/lng to avoid stacking perfect duplicates on map
        // (Just visual variance, functionally they are distinct items)
        const lat = seed.lat + (Math.random() - 0.5) * 2;
        const lng = seed.lng + (Math.random() - 0.5) * 2;

        allData.push({
            id: i,
            title: `${region} ${seed.title.split(' ')[0]} (No.${i})`, // Mock title
            location: `${region} 일대`,
            date: generateDate(),
            category: category,
            description: `${region}에서 펼쳐지는 즐거운 축제! ${seed.description}`,
            image: seed.image, // Reuse reliable images
            popularity: randomPop,
            lat: parseFloat(lat.toFixed(4)),
            lng: parseFloat(lng.toFixed(4))
        });
    }

    // 4. Sort by Popularity DESC
    allData.sort((a, b) => b.popularity - a.popularity);

    // 5. Expose to Window
    window.festivalData = allData;
})();
