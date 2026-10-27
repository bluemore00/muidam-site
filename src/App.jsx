import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Truck,
  RotateCcw,
  Layers,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Clock
} from 'lucide-react';

/* =========================================================
 * 사이트 기본 정보 — 여기만 고치면 페이지 전체에 반영됩니다.
 * ========================================================= */
const CONTACT = {
  phone: '',                        // TODO: 고객센터 번호를 넣으면 푸터에 표시됩니다
  email: 'bluemore001@gmail.com',
  hours: '평일 10:00 - 17:00 (주말/공휴일 휴무)',
};

// 쿠팡 스토어 (제품 '자세히 보기' 기본 연결 주소)
const STORE_URL = 'https://shop.coupang.com/haruyeobaek?platform=p';

// 전자상거래법상 사업자 정보. 값을 채운 항목만 푸터에 표시됩니다.
const BUSINESS_REG_NO = '167-88-03690';
const BUSINESS_INFO = [
  { label: '상호', value: '주식회사 블루모어' },
  { label: '대표자', value: '정대희' },
  { label: '사업자등록번호', value: BUSINESS_REG_NO },
  { label: '통신판매업 신고번호', value: '제2025-경기안산-3157호' },
  { label: '주소', value: '경기도 안산시 단원구 중앙대로 915, 제408-133호 (고잔동, 월드코아빌딩)' },
  { label: '이메일', value: CONTACT.email },
];

const NAV_ITEMS = [
  { id: 'story', label: '브랜드 스토리' },
  { id: 'products', label: '제품 라인업' },
  { id: 'promise', label: '고객 약속' },
  { id: 'finder', label: '스타일 찾기' },
];

// url: 지금은 쿠팡 스토어 메인으로 연결됩니다. 상품별 쿠팡 상품 주소로 바꾸면 해당 상품으로 바로 연결됩니다.
// 비워 두면 구매 문의 메일 작성 창이 열립니다.
const PRODUCTS = [
  {
    id: 1,
    name: "무이담 아크릴 데스크 정리함 3단",
    category: "Living",
    tag: "Best Seller",
    description: "극도의 투명함과 정교한 마감으로 일상의 정돈을 돕는 오브제",
    color: "Clear / Burgundy Base",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    url: STORE_URL,
  },
  {
    id: 2,
    name: "무이담 텍스처 타일 카페트 10pcs",
    category: "Fabric",
    tag: "Premium",
    description: "공간에 이채로운 깊이감을 불어넣는 고밀도 흡음 모듈 매트",
    color: "Warm Beige / Ash Charcoal",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
    url: STORE_URL,
  },
  {
    id: 3,
    name: "무이담 에어플로우 기능성웨어",
    category: "Wear",
    tag: "New",
    description: "더할 것 없는 간결한 실루엣에 극상의 쾌적함을 담은 에어핏 웨어",
    color: "Midnight Black / Burgundy",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    url: STORE_URL,
  },
];

const PREFERENCES = [
  { id: 'minimal', label: '단순하고 깔끔한 정돈을 선호합니다.', recommend: 1 },
  { id: 'cozy', label: '차분하고 아늑한 분위기의 인테리어를 원합니다.', recommend: 2 },
  { id: 'active', label: '활동적이고 쾌적한 라이프스타일을 추구합니다.', recommend: 3 },
];

// 상품 링크가 있으면 상품 페이지로, 없으면 구매 문의 메일로 연결
function getProductLink(product) {
  if (product.url) {
    return { href: product.url, target: '_blank', rel: 'noopener noreferrer' };
  }
  const subject = encodeURIComponent(`[구매 문의] ${product.name}`);
  return { href: `mailto:${CONTACT.email}?subject=${subject}` };
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [finderResult, setFinderResult] = useState(null);

  // 헤더 배경 전환
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤 위치에 따라 현재 메뉴 표시
  useEffect(() => {
    const ids = ['home', ...NAV_ITEMS.map((item) => item.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleFinderSelect = (pref) => {
    setSelectedPreference(pref.id);
    setFinderResult(PRODUCTS.find((p) => p.id === pref.recommend));
  };

  const closeMenu = () => setMobileMenuOpen(false);
  const filledBusinessInfo = BUSINESS_INFO.filter((item) => item.value.trim());

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans antialiased">

      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-stone-50/90 backdrop-blur-md shadow-sm border-b border-red-900/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" onClick={closeMenu} className="flex items-center space-x-2" aria-label="무이담 홈으로">
            <span className="text-2xl font-bold tracking-[0.25em] text-red-900">MUIDAM</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 text-sm font-semibold tracking-wider text-stone-600" aria-label="주요 메뉴">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`hover:text-red-900 transition-colors relative py-2 ${activeSection === item.id ? 'text-red-900' : ''}`}
              >
                {item.label}
                {activeSection === item.id && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-900" />}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#finder"
              className="inline-block bg-red-900 hover:bg-red-950 text-stone-50 px-5 py-2.5 text-xs font-bold tracking-widest transition-all duration-300"
            >
              시작하기
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-stone-800 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" aria-label="모바일 메뉴" className="md:hidden absolute top-20 left-0 w-full bg-stone-50 border-b border-red-900/10 px-6 py-8 flex flex-col space-y-6 shadow-xl">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={closeMenu} className="text-left text-lg font-bold text-stone-600 hover:text-red-900">
                {item.label}
              </a>
            ))}
            <a href="#finder" onClick={closeMenu} className="w-full bg-red-900 text-stone-50 py-3 text-center text-sm font-bold tracking-widest">시작하기</a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative pt-20 min-h-screen flex items-center overflow-hidden bg-stone-50">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-stone-100 hidden lg:block" />

          <div className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 text-red-900 bg-red-900/5 px-3 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Premium Aesthetics</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-normal leading-tight tracking-tight text-stone-900">
                더할 것 없는,<br />
                <span className="font-extrabold text-red-900">이채로움</span>을 담다.
              </h1>

              <p className="text-stone-600 text-lg leading-relaxed max-w-xl font-light">
                무이담(MUIDAM)은 불필요한 장식과 수식을 과감히 덜어내어 가장 본질적인 미를 추구합니다. 그 비워진 공간 속에서 펼쳐지는 삶의 무수한 색채와 조화로운 가능성을 제안합니다.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#story"
                  className="group flex items-center justify-center space-x-3 bg-red-900 hover:bg-red-950 text-stone-50 px-8 py-4 text-sm font-semibold tracking-widest transition-all duration-300"
                >
                  <span>브랜드 탐험하기</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a
                  href="#products"
                  className="flex items-center justify-center space-x-2 border border-red-900/30 hover:border-red-900 text-red-900 px-8 py-4 text-sm font-semibold tracking-widest transition-all duration-300"
                >
                  <span>전체 상품 보기</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-md mx-auto bg-stone-700 p-1 shadow-2xl">
                <div className="w-full h-full bg-stone-50 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-mono tracking-widest text-red-900">EST. 2026</span>
                    <div className="w-12 h-12 border-t border-r border-red-900" />
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-stone-500 block font-bold">Brand Philosophy</span>
                    <p className="text-2xl font-semibold leading-relaxed text-stone-900">
                      "무이(無二) : 유일하며 독창적인 공간을 채우는 간결한 미학"
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="w-8 h-[1px] bg-red-900/40" />
                    <span className="text-xs tracking-[0.3em] font-extrabold text-red-900">MUIDAM PREMIUM</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-stone-700 text-stone-50 p-6 shadow-xl max-w-xs hidden sm:block">
                <p className="text-xs tracking-widest uppercase text-stone-300 mb-2 font-bold">Express Guarantee</p>
                <p className="text-sm font-extrabold mb-1">오늘 주문 시 내일 도착</p>
                <p className="text-[11px] text-stone-300">30일 내 불만족 시 무조건 무료 반품</p>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND STORY SECTION */}
        <section id="story" className="py-24 bg-stone-700 text-stone-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8">
                <span className="text-xs uppercase tracking-[0.4em] text-stone-300 block font-bold">Our Philosophy</span>
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight">
                  단 하나의 정점,<br />
                  <span className="font-extrabold text-stone-100">무이(無二)</span>의 존재
                </h2>
                <div className="w-16 h-[2px] bg-red-900" />
                <p className="text-stone-300 leading-relaxed font-light">
                  세상에 무수한 물건이 흘러넘치지만, 당신의 공간에 남아 빛을 발하는 것은 단 하나여야 합니다. 무이담은 '둘도 없는 뛰어난 가치'를 의미하는 무이(無二)의 정신으로 타협하지 않는 퀄리티와 정제된 디자인만을 엄선하여 고집합니다.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-stone-600/30 p-8 border border-stone-600 space-y-4 hover:border-red-900/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center text-red-400">
                    <Layers className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">더할 것 없는 간결함</h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    장식을 위한 장식은 배제합니다. 제품이 사용되는 순간의 편리성과 가독성, 그리고 공간과의 융화만을 생각하는 구조주의 미학을 표방합니다.
                  </p>
                </div>

                <div className="bg-stone-600/30 p-8 border border-stone-600 space-y-4 hover:border-red-900/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center text-red-400">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">이채로운 디테일</h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    멀리서 보면 심플하지만, 가까이서 다룰 때 느껴지는 소재의 촉감과 선의 디테일은 무이담만의 이채롭고 독특한 프리미엄 감각을 완성합니다.
                  </p>
                </div>

                <div className="bg-stone-600/30 p-8 border border-stone-600 space-y-4 hover:border-red-900/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center text-red-400">
                    <Truck className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">압도적인 배송 경험</h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    필요한 것을 가장 필요로 할 때 전달하는 것 역시 브랜드가 제공해야 할 완벽한 가치입니다. 정밀한 물류를 바탕으로 신속하고 정확하게 찾아갑니다.
                  </p>
                </div>

                <div className="bg-stone-600/30 p-8 border border-stone-600 space-y-4 hover:border-red-900/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center text-red-400">
                    <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">30일 안심 체험제</h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    좋은 제품은 직접 써보아야 본질을 알 수 있습니다. 무이담은 사용 후 불만족 시 100% 무료 반품을 보증하는 파격적 제도로 제품력을 자신합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT LIST SECTION */}
        <section id="products" className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.4em] text-red-900 block font-bold">Collection</span>
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight">무이담 라이프 아카이브</h2>
              </div>
              <p className="text-stone-500 max-w-sm text-sm mt-4 md:mt-0 leading-relaxed">
                정돈된 삶, 품격 있는 여유를 위해 무이담이 설계한 리미티드 시그니처 컬렉션 라인입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRODUCTS.map((product) => (
                <article key={product.id} className="group bg-white border border-stone-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      width="600"
                      height="450"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-red-900 text-stone-50 text-[11px] font-bold tracking-widest uppercase px-3 py-1">
                      {product.tag}
                    </div>
                  </div>

                  <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[11px] tracking-widest text-red-900 uppercase font-bold block">{product.category}</span>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-red-900 transition-colors">{product.name}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex justify-between items-center gap-4 text-xs">
                      <span className="text-stone-500">옵션 : {product.color}</span>
                      <a
                        {...getProductLink(product)}
                        className="shrink-0 font-extrabold text-red-900 hover:underline flex items-center space-x-1"
                        aria-label={`${product.name} 자세히 보기`}
                      >
                        <span>자세히 보기</span>
                        <ChevronRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROMISE SECTION */}
        <section id="promise" className="py-24 bg-stone-700 text-stone-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-stone-50 text-stone-900 p-8 sm:p-16 relative overflow-hidden shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-200 pb-8 mb-12">
                <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-red-900">MUIDAM</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-4 sm:mt-0 leading-tight">
                  더할 것 없는,<br className="sm:hidden" /> <span className="text-red-900">이채로움</span>을 담다.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 bg-stone-700 p-8 aspect-video sm:aspect-square flex flex-col justify-between relative overflow-hidden" aria-hidden="true">
                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-[11px] tracking-widest text-stone-300 font-bold uppercase">Logistics</span>
                    <div className="w-6 h-6 border-t border-r border-red-900" />
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center space-x-3 text-red-400">
                      <Truck className="w-8 h-8" />
                      <span className="text-xs tracking-widest uppercase font-bold text-stone-100">Express Delivery</span>
                    </div>
                    <div className="h-1 bg-stone-600 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-red-900 w-4/5" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end relative z-10">
                    <span className="text-[11px] text-stone-300">MUIDAM FULFILLMENT</span>
                    <span className="text-[11px] text-stone-400">Ver. 2026</span>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-2 bg-red-900/5 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-red-900" aria-hidden="true" />
                      <span className="text-[11px] font-bold text-red-900 tracking-widest uppercase">Guarantee 01</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">오늘 주문 시 내일 도착 보장</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      지연 걱정 없이 안전하고 정확하게 포장되어 발송됩니다. 빠르고 세심한 무이담의 익스프레스 스마트 전담 유통 배송을 경험하십시오.
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-stone-200">
                    <div className="inline-flex items-center space-x-2 bg-red-900/5 px-3 py-1 rounded-full">
                      <RotateCcw className="w-3.5 h-3.5 text-red-900" aria-hidden="true" />
                      <span className="text-[11px] font-bold text-red-900 tracking-widest uppercase">Guarantee 02</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900">좋은지는 써봐야 합니다</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      제품력에 어떠한 타협도 없습니다. 실제 일상 환경 속에서 무이담의 품격을 경험해보고 만족스럽지 않다면 <strong className="text-red-900 font-semibold">30일 동안 무료 반품</strong>을 전격 지원합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE STYLE FINDER SECTION */}
        <section id="finder" className="py-24 bg-stone-50 border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-red-900 block font-bold">Interactive Service</span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-stone-900">나의 공간 성향 진단</h2>
              <p className="text-stone-600 text-sm max-w-lg mx-auto leading-relaxed">
                당신에게 가장 가치 있는 일상의 조각은 무엇인가요? 지향하는 철학에 가장 부합하는 제품을 즉시 매칭해 드립니다.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-8 sm:p-12 shadow-md space-y-8">
              <h3 id="finder-question" className="text-lg font-bold text-center text-stone-900">Q. 가장 영감을 주는 가치관을 선택해 주세요.</h3>

              <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-labelledby="finder-question">
                {PREFERENCES.map((pref) => {
                  const selected = selectedPreference === pref.id;
                  return (
                    <button
                      key={pref.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => handleFinderSelect(pref)}
                      className={`w-full text-left p-6 border transition-all duration-300 flex items-center justify-between ${selected ? 'border-red-900 bg-red-900/5 text-red-900' : 'border-stone-200 hover:border-stone-400 text-stone-900'}`}
                    >
                      <span className="text-sm font-semibold">{pref.label}</span>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'border-red-900 bg-red-900' : 'border-stone-300'}`} aria-hidden="true">
                        {selected && <span className="w-2 h-2 bg-white rounded-full" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {finderResult && (
                <div className="pt-8 border-t border-stone-200 space-y-6 animate-fadeIn" aria-live="polite">
                  <div className="text-center">
                    <span className="text-[11px] tracking-widest text-red-900 font-bold uppercase">MATCHING COMPLETED</span>
                    <h4 className="text-xl font-bold mt-1 text-stone-900">당신만을 위한 추천 무이담 에디션</h4>
                  </div>

                  <div className="bg-stone-50 p-6 border border-red-900/10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-stone-200 flex-shrink-0 overflow-hidden">
                      <img src={finderResult.image} alt={finderResult.name} width="96" height="96" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-xs text-red-900 font-semibold">{finderResult.category}</span>
                      <h5 className="font-bold text-stone-900">{finderResult.name}</h5>
                      <p className="text-xs text-stone-600">{finderResult.description}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <a
                      {...getProductLink(finderResult)}
                      className="inline-block bg-red-900 hover:bg-red-950 text-stone-50 text-xs font-bold tracking-widest py-3 px-8 transition-colors"
                    >
                      이 제품의 혜택가 확인하기
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-800 text-stone-300 py-20 border-t border-stone-700">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <span className="text-3xl font-bold tracking-[0.25em] text-stone-100">MUIDAM</span>
            <p className="text-xs text-stone-400 leading-relaxed">
              무이담은 일상의 복잡함을 걷어내고 유일무이한 가치를 공간 속에 제안합니다.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-stone-100">Menu</h4>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-red-400 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-stone-100">Customer Center</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {CONTACT.phone && (
                <>전화 : <a href={`tel:${CONTACT.phone}`} className="hover:text-red-400">{CONTACT.phone}</a><br /></>
              )}
              시간 : {CONTACT.hours}<br />
              이메일 : <a href={`mailto:${CONTACT.email}`} className="hover:text-red-400">{CONTACT.email}</a>
            </p>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-bold text-stone-100 hover:text-red-400 transition-colors"
            >
              <span>쿠팡 공식 스토어</span>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-stone-100">Notice</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              무이담 브랜드의 모든 디자인, 텍스트 이미지 저작권은 당사에 귀속되어 보호를 받습니다.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-stone-400 block">© 2026 주식회사 블루모어 (MUIDAM). All rights reserved.</span>
            </div>
          </div>
        </div>

        {filledBusinessInfo.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 mt-12">
            <p className="text-[11px] text-stone-400 leading-relaxed">
              {filledBusinessInfo.map((item, i) => (
                <span key={item.label}>
                  {i > 0 && <span className="mx-2 text-stone-600">|</span>}
                  {item.label} : {item.value}
                </span>
              ))}
              <span className="mx-2 text-stone-600">|</span>
              <a
                href={`https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${BUSINESS_REG_NO.replace(/-/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-red-400"
              >
                사업자정보확인
              </a>
            </p>
          </div>
        )}

        <div className="mt-16 border-t border-stone-700 pt-8 text-center">
          <span className="text-[11px] tracking-[0.6em] text-stone-400 font-extrabold" aria-hidden="true">MUIDAM</span>
        </div>
      </footer>

    </div>
  );
}
