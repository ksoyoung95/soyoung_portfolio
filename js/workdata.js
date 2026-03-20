/* ==========================
   WORK DETAIL DATA ONLY
   - work.html 전용 데이터
   - 상세 페이지 수정은 여기서만
   - PC / MO 상세 이미지 분리 관리
   - YouTube 영상 삽입 지원
   - hideColor: true 이면 Color 영역 숨김
========================== */

/*
=====================================================
추가 템플릿 - 이미지형
=====================================================

{
  id: "project-id",
  category: "E-commerce / Promotion",
  client: "[클라이언트명]",
  title: "프로젝트 제목",
  role: "Detailed Page, Graphic",
  contribution: "100%",
  tools: "PS / FIGMA",

  hideColor: false,
  colors: ["#000000", "#FFFFFF"],

  detailMedia: [
    {
      type: "responsive-image",
      pc: "./images/portfilo/detail_page/pc_detail_xxx.jpg",
      mo: "./images/portfilo/detail_page/mo_detail_xxx.jpg",
      alt: "프로젝트 상세 이미지 설명"
    }
  ]
}

=====================================================
추가 템플릿 - 유튜브 영상형
=====================================================

{
  id: "project-video",
  category: "Branding / Video",
  client: "[클라이언트명]",
  title: "프로젝트 제목",
  role: "Video Editing",
  contribution: "100%",
  tools: "Premiere Pro / After Effects",

  hideColor: true,

  detailMedia: [
    {
      type: "youtube",
      src: "https://www.youtube.com/embed/유튜브ID",
      title: "유튜브 영상 제목"
    }
  ]
}
*/

const workDetailData = [
  {
    id: "hyundai-jejuair",
    category: "E-commerce / Promotion",
    client: "[현대디에프]",
    title: "현대디에프 제주항공 프로모션 이벤트",
    role: "Detailed Page, Graphic",
    contribution: "100%",
    tools: "PS / FIGMA",
    hideColor: false,
    colors: ["#2B83D0", "#EF7F0E", "#E8A170", "#F93C1C"],
    detailMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/pc_jeju_air.jpg",
        mo: "./images/portfilo/detail_page/mo_jeju_air.jpg",
        alt: "현대디에프 제주항공 프로모션 이벤트 상세 이미지"
      }
    ]
  },

  {
    id: "hyundai-newsub",
    category: "E-commerce / Promotion",
    client: "[현대디에프]",
    title: "현대디에프 신규가입 프로모션 페이지",
    role: "Detailed Page, Graphic",
    contribution: "100%",
    tools: "PS / FIGMA",
    hideColor: false,
    colors: ["#2B83D0", "#F4A729", "#DCE8FA"],
    detailMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/pc_new_sub.jpg",
        mo: "./images/portfilo/detail_page/mo_new_sub.jpg",
        alt: "현대디에프 신규가입 프로모션 페이지 상세 이미지"
      }
    ]
  },

  {
    id: "hyundai-icair",
    category: "E-commerce / Promotion",
    client: "[현대디에프]",
    title: "[현대디에프] 인천공항면세점앱 가입방법 안내 페이지",
    role: "Detailed Page, Graphic",
    contribution: "100%",
    tools: "FIGMA",
    hideColor: false,
    colors: ["#F59BC1", "#FFFFFF", "#F04C93"],
    detailMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/pc_ic_air.jpg",
        mo: "./images/portfilo/detail_page/mo_ic_air.jpg",
        alt: "인천공항면세점앱 가입방법 안내 페이지 상세 이미지"
      }
    ]
  },

  {
    id: "hyundai-aibeauty",
    category: "E-commerce / Promotion",
    client: "[현대디에프]",
    title: "현대디에프 AI 뷰티트립 프로모션 이벤트",
    role: "Detailed Page, Graphic",
    contribution: "100%",
    tools: "FIGMA",
    hideColor: false,
    colors: ["#000000", "#1D67C2", "#FFFFFF"],
    detailMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/pc_aibeauty.jpg",
        mo: "./images/portfilo/detail_page/mo_aibeauty.jpg",
        alt: "현대면세점 무역점에서 진행하는 팝업 행사 안내 페이지"
      }
    ]
  },

  /* =====================================================
     영상 영역
  ====================================================== */
{
  id: "soundbone-film",
  category: "Branding / Video",
  client: "[사운드본]",
  title: "SE01 제품 브랜딩 영상",
  role: "Video Editing",
  contribution: "100%",
  tools: "Premiere Pro / After Effects",

  hideColor: true,
  hideDetailTitle: true,

  detailMedia: [
    {
      type: "video",
      src: "./images/portfilo/video/soundbone.mp4"
    }
  ]
},
{
  id: "deor-film",
  category: "product / Video",
  client: "[데오아]",
  title: "데오아 드라이기 제품 브랜딩 영상",
  role: "Video Editing",
  contribution: "100%",
  tools: "Premiere Pro",

  hideColor: true,
  hideDetailTitle: true,

  detailMedia: [
    {
      type: "video",
      src: "./images/portfilo/video/deor.mp4"
    }
  ]
},
{
  id: "filter-film",
  category: "Branding / Video",
  client: "[필터포유]",
  title: "필터포유 브랜드 소개 영상",
  role: "Video Editing",
  contribution: "100%",
  tools: "Premiere Pro",

  hideColor: true,
  hideDetailTitle: true,

  detailMedia: [
    {
      type: "video",
      src: "./images/portfilo/video/filterforyou.mp4"
    }
  ]
},
{
  id: "allinone-film",
  category: "Branding / Video",
  client: "[올인원뱅크]",
  title: "올인원뱅크 쇼핑몰 가입방법",
  role: "Video Editing",
  contribution: "100%",
  tools: "Premiere Pro / After Effects",

  hideColor: true,
  hideDetailTitle: true,

  detailMedia: [
    {
      type: "video",
      src: "./images/portfilo/video/allinone.mp4"
    }
  ]
}
];

/* ---------- Expose Global ---------- */
window.workDetailData = workDetailData;