/* ==========================
   WORK DETAIL DATA ONLY
   - work.html 전용 데이터
   - 상세 페이지 수정은 여기서만
   - PC / MO 상세 이미지 분리 관리
   - mp4 영상 지원
   - hideColor: true 이면 Color 영역 숨김
   - hideDetailTitle: true 이면 Detailed Image 제목 숨김
   - heroMedia: 상단 고정 키비주얼
   - tabSections: 탭 클릭 시 변경되는 상세 콘텐츠
   - tabStyle:
     - "hyunday" : 현데이형 오렌지 탭
     - "beauty"  : 뷰티프리위크형 블랙 탭
========================== */

/* ==========================
   WORK DETAIL DATA ONLY
   - work.html 전용 데이터
   - 상세 페이지 수정은 여기서만
   - PC / MO 상세 이미지 분리 관리
   - mp4 영상 지원
   - hideColor: true 이면 Color 영역 숨김
   - hideDetailTitle: true 이면 Detailed Image 제목 숨김
   - heroMedia: 상단 고정 키비주얼
   - tabSections: 탭 클릭 시 변경되는 상세 콘텐츠
   - tabStyle:
     - "hyunday" : 현데이형 오렌지 탭
     - "beauty"  : 뷰티프리위크형 블랙 탭
========================== */

/*
=====================================================
1) 기본 상세페이지형 (일반 이미지형)
- 가장 기본 구조
- 상세 이미지를 한 장 또는 여러 장 그대로 노출할 때 사용
- color 영역이 필요한 작업에 적합
=====================================================

{
  id: "project-id",                  // index.html에서 연결될 고유 ID
  category: "E-commerce / Promotion",// 상단 카테고리 텍스트
  client: "[클라이언트명]",           // 클라이언트 표기
  title: "프로젝트 제목",             // 메인 타이틀
  subText: "보조 설명 문구",          // 타이틀 아래 작은 안내문 (없으면 생략 가능)
  role: "Detailed Page, Graphic",    // 역할
  contribution: "100%",              // 기여도
  tools: "PS / FIGMA",               // 사용 툴

  hideColor: false,                  // true면 Color 영역 숨김
  hideDetailTitle: false,            // true면 Detailed Image 제목 숨김
  colors: ["#000000", "#FFFFFF"],    // Color 영역 컬러칩 배열

  detailMedia: [
    {
      type: "responsive-image",      // PC/MO 분리 이미지
      pc: "./images/portfilo/detail_page/pc_xxx.jpg",
      mo: "./images/portfilo/detail_page/mo_xxx.jpg",
      alt: "프로젝트 상세 이미지 설명",

      layout: "full"                 // full: 전체폭 / contained: 1080 고정폭
    }
  ]
}

=====================================================
2) 탭형 상세페이지 - 현데이 스타일
- 키비주얼 고정
- 하단은 탭 클릭 시 이미지 교체
- 오렌지 배경의 한 줄 탭
=====================================================

{
  id: "project-id",
  category: "E-commerce / Promotion",
  client: "[클라이언트명]",
  title: "프로젝트 제목",
  subText: "각 카테고리를 클릭하시면 탭별 이미지를 확인하실 수 있습니다.",
  role: "Detailed Page, Graphic",
  contribution: "100%",
  tools: "PS / FIGMA",

  hideColor: true,
  hideDetailTitle: true,
  tabStyle: "hyunday",               // 현데이형 탭 스타일

  heroMedia: [
    {
      type: "responsive-image",
      pc: "./images/portfilo/detail_page/hyunday/pc_kv.jpg",
      mo: "./images/portfilo/detail_page/hyunday/mo_kv.jpg",
      alt: "키비주얼 설명"
    }
  ],

  tabSections: [
    {
      id: "tab01",                   // 탭 고유값
      label: "반값할인",             // 탭 텍스트
      media: [
        {
          type: "responsive-image",
          pc: "./images/portfilo/detail_page/hyunday/pc_tab01.jpg",
          mo: "./images/portfilo/detail_page/hyunday/mo_tab01.jpg",
          alt: "탭 상세 이미지 설명"
        }
      ]
    }
  ]
}

=====================================================
3) 탭형 상세페이지 - 뷰티프리위크 스타일
- 키비주얼 고정
- 하단은 탭 클릭 시 이미지 교체
- 검정 배경 / 2줄 탭 텍스트
=====================================================

{
  id: "project-id",
  category: "E-commerce / Promotion",
  client: "[클라이언트명]",
  title: "프로젝트 제목",
  subText: "각 카테고리를 클릭하시면 탭별 이미지를 확인하실 수 있습니다.",
  role: "Detailed Page, Graphic",
  contribution: "100%",
  tools: "PS / FIGMA",

  hideColor: true,
  hideDetailTitle: true,
  tabStyle: "beauty",                // 뷰티형 탭 스타일

  heroMedia: [
    {
      type: "responsive-image",
      pc: "./images/portfilo/detail_page/beauty/pc_kv.jpg",
      mo: "./images/portfilo/detail_page/beauty/mo_kv.jpg",
      alt: "키비주얼 설명"
    }
  ],

  tabSections: [
    {
      id: "tab01",
      topLabel: "할인에 또 할인!",    // 탭 상단 문구
      label: "브랜드 적립금 + H.oney 할인팩", // 탭 하단 문구
      media: [
        {
          type: "responsive-image",
          pc: "./images/portfilo/detail_page/beauty/pc_tab01.jpg",
          mo: "./images/portfilo/detail_page/beauty/mo_tab01.jpg",
          alt: "탭 상세 이미지 설명"
        }
      ]
    }
  ]
}

=====================================================
4) 영상형
- mp4 영상 전용
- 클릭 시 재생
- Color / Detailed Image 제목은 보통 숨김 처리
=====================================================

{
  id: "project-id",
  category: "Branding / Video",
  client: "[클라이언트명]",
  title: "프로젝트 제목",
  role: "Video Editing",
  contribution: "100%",
  tools: "Premiere Pro / After Effects",

  hideColor: true,
  hideDetailTitle: true,

  detailMedia: [
    {
      type: "video",
      src: "./images/portfilo/video/sample.mp4"
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
    contribution: "100% (Solo Project)",
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
    contribution: "100% (Solo Project)",
    tools: "PS / FIGMA",
    hideColor: false,
    colors: ["#2B83D0", "#FAF729", "#DCE8FA"],
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
    contribution: "100% (Solo Project)",
    tools: "FIGMA",
    hideColor: false,
    colors: ["#F59BC1", "#FFFFFF", "#F04C93"],
    detailMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/pc_ic_air.jpg",
        mo: "./images/portfilo/detail_page/mo_ic_air.jpg",
        alt: "인천공항면세점앱 가입방법 안내 페이지 상세 이미지",
        layout: "contained"
      }
    ]
  },

  {
    id: "hyundai-aibeauty",
    category: "E-commerce / Promotion",
    client: "[현대디에프]",
    title: "현대디에프 AI 뷰티트립 프로모션 이벤트",
    role: "Detailed Page, Graphic",
    contribution: "100% (Solo Project)",
    tools: "FIGMA / AI / PS",
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
  {
    id: "ui-designvowel",
    category: "UI Design Vowel",
    client: "[UI Design 모음]",
    title: "UI 디자인을 주도적으로 진행했던 작업 모음입니다.",
    subText: "시간의 흐름에 따라 해당 사이트들이 리뉴얼되어, 당시 디자인 결과물은 이미지로 대체하여 포트폴리오에 수록하였습니다.",
    role: "UI Design",
    contribution: "Design 100%",
    tools: "FIGMA / AI / PS",
    hideColor: true,
    detailMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/ui/ui_design.jpg",
        mo: "./images/portfilo/detail_page/ui/ui_design.jpg",
        alt: "ui 디자인 작업 모음"
      }
    ]
  },


  /* =====================================================
     탭형 상세페이지 영역 - 현데이
  ====================================================== */
  {
    id: "hyundai-hyunday",
    category: "E-commerce / Promotion",
    client: "[현대디에프]",
    title: "현데이 블랙프라이데이 이벤트",
    subText: "※ 이미지 내 각 카테고리를 클릭하시면 탭별 이미지를 확인하실 수 있습니다.",
    role: "Detailed Page, Graphic",
    contribution: "60%",
    tools: "PS / FIGMA",
    hideColor: true,
    hideDetailTitle: true,
    tabStyle: "hyunday",

    heroMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/hyunday/pc_kv.jpg",
        mo: "./images/portfilo/detail_page/hyunday/mo_kv.jpg",
        alt: "현데이 블랙프라이데이 키비주얼"
      }
    ],

    tabSections: [
      {
        id: "tab01",
        label: "반값할인",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab01.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab01.jpg",
            alt: "반값할인 상세 이미지"
          }
        ]
      },
      {
        id: "tab02",
        label: "결제 추가 할인",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab02.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab02.jpg",
            alt: "결제 추가 할인 상세 이미지"
          }
        ]
      },
      {
        id: "tab03",
        label: "시그니처 브랜드",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab03.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab03.jpg",
            alt: "시그니처 브랜드 상세 이미지"
          }
        ]
      },
      {
        id: "tab04",
        label: "릴레이 세일",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab04.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab04.jpg",
            alt: "릴레이 세일 상세 이미지"
          }
        ]
      },
      {
        id: "tab05",
        label: "기프트 드롭",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab05.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab05.jpg",
            alt: "기프트 드롭 상세 이미지"
          }
        ]
      },
      {
        id: "tab06",
        label: "카테고리 특가",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab06.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab06.jpg",
            alt: "카테고리 특가 상세 이미지"
          }
        ]
      },
      {
        id: "tab07",
        label: "신규가입 혜택",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab07.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab07.jpg",
            alt: "신규가입 혜택 상세 이미지"
          }
        ]
      },
      {
        id: "tab08",
        label: "공항점 혜택존",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/hyunday/pc_tab08.jpg",
            mo: "./images/portfilo/detail_page/hyunday/mo_tab08.jpg",
            alt: "공항점 혜택존 상세 이미지"
          }
        ]
      }
    ]
  },

  /* =====================================================
     탭형 상세페이지 영역 - 뷰티 프리위크
  ====================================================== */
  {
    id: "beauty-freeweek",
    category: "E-commerce / Promotion",
    client: "[현대디에프]",
    title: "뷰티 프리위크 이벤트",
    subText: "각 카테고리를 클릭하시면 탭별 이미지를 확인하실 수 있습니다.",
    role: "Detailed Page, Graphic",
    contribution: "70%",
    tools: "PS / FIGMA",
    hideColor: true,
    hideDetailTitle: true,
    tabStyle: "beauty",

    heroMedia: [
      {
        type: "responsive-image",
        pc: "./images/portfilo/detail_page/beauty/pc_kv.jpg",
        mo: "./images/portfilo/detail_page/beauty/mo_kv.jpg",
        alt: "뷰티 프리위크 키비주얼"
      }
    ],

    tabSections: [
      {
        id: "tab01",
        topLabel: "할인에 또 할인!",
        label: "브랜드 적립금 + H.oney 할인팩",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/beauty/pc_tab01.jpg",
            mo: "./images/portfilo/detail_page/beauty/mo_tab01.jpg",
            alt: "브랜드 적립금 + H.oney 할인팩 상세 이미지"
          }
        ]
      },
      {
        id: "tab02",
        topLabel: "역대급 득템 찬스",
        label: "뷰티 - Hot Pick 브랜드",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/beauty/pc_tab02.jpg",
            mo: "./images/portfilo/detail_page/beauty/mo_tab02.jpg",
            alt: "뷰티 - Hot Pick 브랜드 상세 이미지"
          }
        ]
      },
      {
        id: "tab03",
        topLabel: "실속에 선물도 더한",
        label: "뷰티 - plus 브랜드",
        media: [
          {
            type: "responsive-image",
            pc: "./images/portfilo/detail_page/beauty/pc_tab03.jpg",
            mo: "./images/portfilo/detail_page/beauty/mo_tab03.jpg",
            alt: "뷰티 - plus 브랜드 상세 이미지"
          }
        ]
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
    category: "Product / Video",
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

window.workDetailData = workDetailData;