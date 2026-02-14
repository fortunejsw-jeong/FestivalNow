const fs = require('fs');

// Initial seed data (20 items)
const seedData = [
    {
        title: "진해군항제", location: "경상남도 창원시", category: "nature",
        description: "대한민국 최대 규모의 벚꽃 축제. 36만 그루의 왕벚나무가 만드는 꽃터널을 경험하세요.",
        image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=800",
        lat: 35.1547, lng: 128.6608
    },
    {
        title: "보령머드축제", location: "충청남도 보령시", category: "cultural",
        description: "전 세계인이 함께 즐기는 대한민국 대표 여름 축제. 머드 체험과 함께 뜨거운 여름을 느껴보세요.",
        image: "https://images.unsplash.com/photo-1596707328688-297da0175dcc?auto=format&fit=crop&q=80&w=800",
        lat: 36.3262, lng: 126.5111
    },
    {
        title: "부산불꽃축제", location: "부산광역시 수영구", category: "music",
        description: "광안리 해수욕장에서 펼쳐지는 화려한 불꽃의 향연. 국내 최대 규모의 불꽃쇼입니다.",
        image: "https://images.unsplash.com/photo-1533230332214-3d9646b5394d?auto=format&fit=crop&q=80&w=800",
        lat: 35.1532, lng: 129.1186
    },
    {
        title: "서울세계불꽃축제", location: "서울특별시 영등포구", category: "music",
        description: "여의도 한강공원에서 펼쳐지는 가을밤의 환상적인 불꽃 축제.",
        image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&q=80&w=800",
        lat: 37.5284, lng: 126.9328
    },
    {
        title: "함평나비대축제", location: "전라남도 함평군", category: "nature",
        description: "꽃과 나비가 어우러진 생태 체험 축제. 아이들과 함께하기 좋은 봄나들이 장소입니다.",
        image: "https://images.unsplash.com/photo-1535007817478-93664c39735d?auto=format&fit=crop&q=80&w=800",
        lat: 35.0655, lng: 126.5197
    },
    {
        title: "화천산천어축제", location: "강원도 화천군", category: "nature",
        description: "얼음낚시와 맨손잡기 등 다양한 겨울 체험을 즐길 수 있는 세계적인 겨울 축제.",
        image: "https://images.unsplash.com/photo-1518659695679-b88302f37eb9?auto=format&fit=crop&q=80&w=800",
        lat: 38.1062, lng: 127.7082
    },
    {
        title: "부산국제영화제", location: "부산광역시 해운대구", category: "cultural",
        description: "아시아 최고의 영화 축제. 전 세계 거장들의 영화와 화려한 레드카펫 행사를 경험해보세요.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
        lat: 35.1711, lng: 129.1271
    },
    {
        title: "강릉단오제", location: "강원도 강릉시", category: "cultural",
        description: "유네스코 인류무형문화유산으로 지정된 천년의 역사를 가진 전통 축제.",
        image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800",
        lat: 37.7519, lng: 128.8761
    },
    {
        title: "안동국제탈춤축제", location: "경상북도 안동시", category: "cultural",
        description: "한국의 미가 살아있는 전통 탈춤 공연과 전 세계의 탈춤을 한자리에서 즐길 수 있습니다.",
        image: "https://images.unsplash.com/photo-1627293504849-06b24d9c79d1?auto=format&fit=crop&q=80&w=800",
        lat: 36.5684, lng: 128.7294
    },
    {
        title: "진주남강유등축제", location: "경상남도 진주시", category: "cultural",
        description: "남강 위에 띄워진 수만 개의 유등이 만드는 환상적인 야경을 감상하세요.",
        image: "https://images.unsplash.com/photo-1549887552-93f8efb871a2?auto=format&fit=crop&q=80&w=800",
        lat: 35.1806, lng: 128.0772
    },
    {
        title: "남원춘향제", location: "전라북도 남원시", category: "cultural",
        description: "춘향과 이몽룡의 사랑 이야기를 주제로 한 대한민국 대표 전통 문화 축제.",
        image: "https://images.unsplash.com/photo-1606296766465-b1547844053e?auto=format&fit=crop&q=80&w=800",
        lat: 35.4055, lng: 127.3824
    },
    {
        title: "금산인삼축제", location: "충청남도 금산군", category: "food",
        description: "건강의 고장 금산에서 펼쳐지는 대한민국 최고의 산업형 문화관광 체험 축제.",
        image: "https://images.unsplash.com/photo-1599579112440-9750568165aa?auto=format&fit=crop&q=80&w=800",
        lat: 36.1086, lng: 127.4878
    },
    {
        title: "이천쌀문화축제", location: "경기도 이천시", category: "food",
        description: "임금님표 이천쌀을 주제로 한 풍성한 먹거리와 볼거리가 있는 대동놀이 한마당.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
        lat: 37.2804, lng: 127.4425
    },
    {
        title: "자라섬재즈페스티벌", location: "경기도 가평군", category: "music",
        description: "자연 속에서 즐기는 세계적인 재즈 뮤지션들의 공연. 낭만적인 가을 소풍을 떠나보세요.",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800",
        lat: 37.8188, lng: 127.5144
    },
    {
        title: "순천만갈대축제", location: "전라남도 순천시", category: "nature",
        description: "황금빛 갈대 물결이 춤추는 순천만에서 가을의 정취를 만끽하세요.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
        lat: 34.9276, lng: 127.5074
    },
    {
        title: "제주유채꽃축제", location: "제주특별자치도 서귀포시", category: "nature",
        description: "제주의 봄을 알리는 노란 유채꽃의 향연. 가시리 녹산로의 환상적인 드라이브 코스.",
        image: "https://images.unsplash.com/photo-1520641151608-f463200938b8?auto=format&fit=crop&q=80&w=800",
        lat: 33.3941, lng: 126.7161
    },
    {
        title: "광양매화축제", location: "전라남도 광양시", category: "nature",
        description: "섬진강변을 하얗게 뒤덮는 매화의 물결. 봄소식을 가장 먼저 전하는 꽃 축제입니다.",
        image: "https://images.unsplash.com/photo-1523428859666-6b215886d933?auto=format&fit=crop&q=80&w=800",
        lat: 35.0718, lng: 127.7289
    },
    {
        title: "대구치맥페스티벌", location: "대구광역시 달서구", category: "food",
        description: "맛있는 치킨과 시원한 맥주가 함께하는 열광의 도가니. 대구의 뜨거운 여름을 즐겨보세요.",
        image: "https://images.unsplash.com/photo-1626248677610-d852a32c2539?auto=format&fit=crop&q=80&w=800",
        lat: 35.8459, lng: 128.5564
    },
    {
        title: "전주비빔밥축제", location: "전라북도 전주시", category: "food",
        description: "유네스코 음식창의도시 전주에서 즐기는 맛과 멋의 축제. 대형 비빔밥 퍼포먼스를 놓치지 마세요.",
        image: "https://images.unsplash.com/photo-1628173428059-4d69106ad042?auto=format&fit=crop&q=80&w=800",
        lat: 35.8147, lng: 127.1526
    },
    {
        title: "수원화성문화제", location: "경기도 수원시", category: "cultural",
        description: "정조대왕의 효심과 부국강병의 꿈이 서린 세계문화유산 수원화성에서 펼쳐지는 역사 문화 축제.",
        image: "https://images.unsplash.com/photo-1634991195650-749e79430c5e?auto=format&fit=crop&q=80&w=800",
        lat: 37.2851, lng: 127.0142
    }
];

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

let allData = [];

// Add Seed Data (20)
seedData.forEach((item, index) => {
    allData.push({
        id: index + 1,
        ...item,
        date: generateDate(), // Regenerate dates for variety if needed, but keeping seed data might be better? Let's use seed data values if strict, but simple generator here is fine. 
        // Actually, seed data didn't include dates in the object above, so generating is good.
        popularity: 100000 - (index * 2000) // Decreasing popularity
    });
});

// Generate 80 more
for (let i = 21; i <= 100; i++) {
    const seed = getRandomItem(seedData);
    const region = getRandomItem(regions);
    const category = getRandomItem(categories);
    const randomPop = Math.floor(Math.random() * 50000) + 5000;

    // Vary the location slightly around the region center (simplified by just taking random lat/lng nearby)
    const lat = seed.lat + (Math.random() - 0.5) * 2; // Spread out
    const lng = seed.lng + (Math.random() - 0.5) * 2;

    allData.push({
        id: i,
        title: `${region} ${seed.title.replace(' ', '')} (Ver. ${i})`, // Mock title
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

// Ensure first 20 are top 20 by popularity
allData.sort((a, b) => b.popularity - a.popularity);

// Re-assign IDs to match rank? No, keep stable IDs but sort.
// User wants Top 5 rolling. Sorting by popularity handles this.

const content = `window.festivalData = ${JSON.stringify(allData, null, 4)};`;

fs.writeFileSync('c:\\Users\\fortu\\OneDrive\\바탕 화면\\antigravity\\festival-project\\data.js', content, 'utf8');
console.log('Generated 100 items');
