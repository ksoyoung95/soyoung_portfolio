/* ==========================
   DATA ONLY
   - index.html 메인 페이지 데이터
   - 썸네일 / 카드 정보만 관리
========================== */

/** ---------- Career Data ---------- */
const careerData = [
  {
    id: "kistem",
    company: "키스템프-현대디에프",
    tag: "파견 계약직",
    period: "기간 : 2025.09 ~ 2026.03",
    tasks: [
      "자사 홈페이지 운영 전반의 디자인을 담당하며, 메인 및 서브 페이지의 비주얼 개선과 UI 유지·보수 진행",
      "프로모션, 이벤트, 캠페인 일정에 맞춰 배너 및 콘텐츠 디자인 기획·제작",
      "브랜드 가이드에 맞춘 디자인 일관성 관리 및 사용자 경험을 고려한 화면 구성 개선",
      "유관 부서와의 협업을 통해 콘텐츠 업데이트 및 운영 효율을 높이는 디자인 지원"
    ]
  },
  {
    id: "flows",
    company: "㈜플로우스",
    tag: "상주 프리랜서",
    period: "기간 : 2025.01 ~ 2025.03",
    tasks: [
      "카페24 플랫폼을 활용해 홈페이지 리뉴얼과 유지보수를 담당하며, 계절별 메인 비주얼과 콘텐츠를 기획 및 제작",
      "브랜드 아이덴티티 강화를 위한 크리에이티브 광고 디자인과 프로모션 콘텐츠 제작",
      "신제품 출시 프로젝트에 참여하여 상세페이지, 패키지 디자인 등 다양한 디자인 자산을 기획 및 제작"
    ]
  },
  {
    id: "allinonebank",
    company: "㈜올인원뱅크",
    tag: "정규직",
    period: "기간 : 2024.04 ~ 2024.12",
    tasks: [
      "카페24 플랫폼을 기반으로 자사 홈페이지 구축 및 유지보수 전반 담당",
      "상품 상세페이지 및 온라인 홍보 콘텐츠 기획·제작",
      "영업 지원을 위한 오프라인 홍보물과 영상 콘텐츠 제작",
      "브랜드의 일관성을 유지하기 위한 디자인 가이드라인 관리"
    ]
  },
  {
    id: "delightplant",
    company: "딜라잇플랜트",
    tag: "상주 프리랜서",
    period: "기간 : 2023.05 ~ 2024.01",
    tasks: [
      "카페24 플랫폼을 활용한 자사 홈페이지와 상품 상세페이지 기획 및 제작",
      "신규 브랜드 론칭 프로젝트에 참여하여 네이밍, BI/CI, 상세페이지 등 전반적인 디자인 총괄"
    ]
  },
  {
    id: "withnatural",
    company: "㈜위드내추럴",
    tag: "정규직",
    period: "기간 : 2021.10 ~ 2022.09",
    tasks: [
      "병원·여성용품·식품 등 다양한 산업군의 홈페이지 디자인과 운영 담당",
      "상세페이지, 이벤트 배너, 온·오프라인 광고 콘텐츠 기획 및 제작",
      "브랜드별 제작사와 지속적인 유지보수를 통해 브랜드 이미지 관리",
      "영업 부서와 커뮤니케이션을 통한 프로젝트 일정 조율 및 결과물 품질 관리"
    ]
  },
  {
    id: "mnb",
    company: "㈜엠앤비",
    tag: "정규직",
    period: "기간 : 2020.07 ~ 2021.06",
    tasks: [
      "자사 홈페이지 및 오픈마켓 사이트의 디자인과 상세페이지 제작 업무 담당",
      "다양한 상품 카테고리에 적합한 비주얼 디자인과 홍보 콘텐츠 제작"
    ]
  },
  {
    id: "hankook",
    company: "㈜한국앤컴퍼니",
    tag: "정규직",
    period: "기간 : 2017.10 ~ 2020.03",
    tasks: [
      "자사 온라인몰 및 오프매장 홈페이지 디자인 기획·제작",
      "상세페이지, 프로모션 배너, 외주 광고 등 다양한 디자인 콘텐츠 제작",
      "브랜드 아이덴티티를 고려한 디자인 일관성 유지"
    ]
  },
  {
    id: "sandle",
    company: "㈜산들리빙",
    tag: "정규직",
    period: "기간 : 2016.11 ~ 2017.06",
    tasks: [
      "스타트업 자사를 디자인 및 전반적인 온라인 채널 구축 업무 담당",
      "홈페이지 및 상세페이지 기획·제작, CS업무 및 관리 시스템 운영"
    ]
  }
];

/** ---------- Portfolio Card Data ---------- */
/*
추가 템플릿
{
  id: "project-id",
  category: "detail", // detail | uiux | ads | video
  title: "프로젝트명",
  desc: "설명",
  thumb: "./images/portfilo/thumb/thumb_xxx.jpg",
  tool: "PS / FIGMA",
  contribution: "100%",
  type: "E-commerce"
}
*/

const portfolioData = [
  {
    id: "hyundai-jejuair",
    category: "detail",
    title: "[현대디에프] 제주항공 프로모션 이벤트",
    desc: "현대디에프 내 최대 행사 현데이 프로젝트에 오픈하는 제주항공 왕복 항공권 추첨 이벤트 제작",
    thumb: "./images/portfilo/thumb/thumb_jeju_air.jpg",
    tool: "PS / FIGMA",
    contribution: "100%",
    type: "E-commerce"
  },
  {
    id: "hyundai-newsub",
    category: "detail",
    title: "[현대디에프] 신규가입 프로모션 페이지",
    desc: "현대디에프 신규가입 유도를 위한 이벤트 페이지",
    thumb: "./images/portfilo/thumb/thumb_new_sub.jpg",
    tool: "PS / FIGMA",
    contribution: "100%",
    type: "E-commerce"
  },
  {
    id: "hyundai-icair",
    category: "detail",
    title: "[현대디에프] 인천공항면세점앱 가입방법 안내 페이지",
    desc: "인천공항면세점 앱 스면세 가입방법 안내 페이지",
    thumb: "./images/portfilo/thumb/thumb_ic_air.jpg",
    tool: "FIGMA",
    contribution: "100%",
    type: "E-commerce"
  },
  {
    id: "hyundai-aibeauty",
    category: "detail",
    title: "[현대디에프] AI 뷰티트립 프로모션 이벤트",
    desc: "현대면세점 무역점에서 진행하는 팝업 행사 안내 페이지",
    thumb: "./images/portfilo/thumb/thumb_aibeauty.jpg",
    tool: "FIGMA / PS",
    contribution: "100%",
    type: "E-commerce"
  },
  {
  id: "soundbone-film",
  category: "video", // detail | uiux | ads | video
  title: "[사운드본] 사운드 본질을 말하다.",
  desc: "SE01 제품 브랜딩 영상",
  thumb: "./images/portfilo/thumb/thumb_soundbone.jpg",
  tool: "Premier Pro / After Effect",
  contribution: "100%",
  type: "Branding"
 },
 {
  id: "deor-film",
  category: "video", // detail | uiux | ads | video
  title: "[de:or] 데오아 헤어드라이기",
  desc: "헤어드라이기 매직부스터 소개 영상",
  thumb: "./images/portfilo/thumb/thumb_deor.jpg",
  tool: "Premier Pro",
  contribution: "100%",
  type: "Branding"
},
{
  id: "filter-film",
  category: "video", // detail | uiux | ads | video
  title: "[필터 for you] 브랜딩 영상",
  desc: "필터포유 브랜드 소개 영상",
  thumb: "./images/portfilo/thumb/thumb_filter.jpg",
  tool: "Premier Pro",
  contribution: "100%",
  type: "Branding"
},
{
  id: "allinone-film",
  category: "video", // detail | uiux | ads | video
  title: "[올인원뱅크] 쇼핑몰 가입방법",
  desc: "올인원뱅크 쇼핑몰 가입방법",
  thumb: "./images/portfilo/thumb/thumb_allinone.jpg",
  tool: "Premier Pro",
  contribution: "100%",
  type: "Branding"
}
];

/** ---------- Expose Global ---------- */
window.careerData = careerData;
window.portfolioData = portfolioData;