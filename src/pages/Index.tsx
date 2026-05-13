import { useState } from "react";
import Icon from "@/components/ui/icon";

// Цвета бренда СОПЗ
const BRAND = {
  navy: "#2D3561",      // тёмно-синий из логотипа
  red: "#C0392B",       // красный акцент из логотипа
  navyLight: "#3D4771", // чуть светлее для hover
  bg: "#F5F5F5",
  white: "#FFFFFF",
};

const NAV_ITEMS = [
  { id: "about", label: "О совете" },
  { id: "groups", label: "Рабочие группы" },
  { id: "materials", label: "Методические материалы" },
  { id: "documents", label: "Документы" },
  { id: "calendar", label: "Календарь событий" },
  { id: "contacts", label: "Контакты" },
];

const DOC_CATEGORIES = [
  {
    id: "inclusive",
    title: "Инклюзивное образование",
    icon: "GraduationCap",
    count: 12,
    description: "Нормативные и методические документы по организации инклюзивного образования для лиц с психическими расстройствами",
  },
  {
    id: "volunteering",
    title: "Волонтерство в психиатрии",
    icon: "Heart",
    count: 8,
    description: "Руководства, регламенты и материалы для волонтёров, работающих в психиатрических учреждениях",
  },
  {
    id: "educational",
    title: "Образовательный проект",
    icon: "BookOpen",
    count: 15,
    description: "Учебные программы, методики преподавания и образовательные стандарты",
  },
  {
    id: "control",
    title: "Общественный контроль в психиатрии",
    icon: "Shield",
    count: 10,
    description: "Документы по мониторингу соблюдения прав пациентов психиатрических учреждений",
  },
  {
    id: "legal",
    title: "Нормативно-правовые акты",
    icon: "Scale",
    count: 24,
    description: "Федеральные законы, приказы, постановления и международные акты в области психиатрии",
  },
];

const WORKING_GROUPS = [
  { title: "Рабочая группа по инклюзивному образованию", chair: "Председатель: к.п.н. Иванова М.А.", members: 7, nextMeeting: "20 мая 2026" },
  { title: "Рабочая группа по волонтерству", chair: "Председатель: Петров С.В.", members: 5, nextMeeting: "27 мая 2026" },
  { title: "Рабочая группа по правовым вопросам", chair: "Председатель: д.ю.н. Сидорова Е.Н.", members: 9, nextMeeting: "3 июня 2026" },
  { title: "Рабочая группа по общественному контролю", chair: "Председатель: Козлов А.П.", members: 6, nextMeeting: "10 июня 2026" },
];

const EVENTS = [
  { date: "20", month: "мая", title: "Заседание РГ по инклюзивному образованию", type: "meeting", time: "14:00", location: "Конференц-зал, к. 301" },
  { date: "22", month: "мая", title: "Круглый стол «Права пациентов»", type: "event", time: "10:00", location: "Зал заседаний" },
  { date: "27", month: "мая", title: "Заседание РГ по волонтерству", type: "meeting", time: "15:30", location: "Онлайн (Zoom)" },
  { date: "03", month: "июн", title: "Заседание РГ по правовым вопросам", type: "meeting", time: "14:00", location: "Конференц-зал, к. 301" },
  { date: "07", month: "июн", title: "Открытая лекция: «Психиатрия и права»", type: "event", time: "18:00", location: "Актовый зал" },
  { date: "10", month: "июн", title: "Заседание РГ по общественному контролю", type: "meeting", time: "16:00", location: "Онлайн (Zoom)" },
  { date: "17", month: "июн", title: "Пленарное заседание Совета", type: "plenary", time: "13:00", location: "Зал заседаний" },
];

// Оргкомитет — заполняется вручную
const ORG_COMMITTEE = [
  { name: "Треушникова Наталья Валерьевна", role: "Президент Союза охраны психического здоровья", region: "Москва" },
  { name: "Незнанов Николай Григорьевич", role: "Президент Российского общества психиатров, д.м.н., профессор", region: "Санкт-Петербург" },
  { name: "Иванова Мария Александровна", role: "Ответственный секретарь", region: "Москва" },
  { name: "Петров Сергей Владимирович", role: "Член организационного комитета", region: "Екатеринбург" },
  { name: "Сидорова Елена Николаевна", role: "Член организационного комитета", region: "Новосибирск" },
  { name: "Козлов Андрей Павлович", role: "Член организационного комитета", region: "Казань" },
];



// Отчёты совета — заполняются реальными ссылками
const REPORTS = [
  {
    year: "2024",
    title: "Отчёт о деятельности Совета НКО при РОП за 2024 год",
    description: "Итоги работы рабочих групп, мероприятия, достижения и планы развития",
    pages: 48,
    date: "март 2025",
    fileUrl: "#",
  },
  {
    year: "2023",
    title: "Отчёт о деятельности Совета НКО при РОП за 2023 год",
    description: "Обзор реализованных проектов, встреч с органами власти и публичных акций",
    pages: 42,
    date: "март 2024",
    fileUrl: "#",
  },
  {
    year: "2022",
    title: "Отчёт о деятельности Совета НКО при РОП за 2022 год",
    description: "Формирование структуры совета, первые рабочие группы, ключевые события",
    pages: 36,
    date: "март 2023",
    fileUrl: "#",
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("about");
  const [activeDocCategory, setActiveDocCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "about": return <AboutSection />;
      case "groups": return <GroupsSection />;
      case "materials": return <MaterialsSection />;
      case "documents": return <DocumentsSection activeCategory={activeDocCategory} setActiveCategory={setActiveDocCategory} />;
      case "calendar": return <CalendarSection />;
      case "contacts": return <ContactsSection />;
      default: return <AboutSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: BRAND.bg, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Шапка ── */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          {/* Логотип СОПЗ */}
          <img
            src="https://cdn.poehali.dev/projects/64a22a44-84da-402b-b52f-cd0f436152dc/bucket/6356785c-6fbe-4fd3-9669-7d40891d9663.png"
            alt="СОПЗ логотип"
            className="h-16 w-auto flex-shrink-0"
          />
          <div className="border-l border-gray-200 pl-6">
            <h1 className="text-base font-bold leading-snug" style={{ color: BRAND.navy }}>
              Совет НКО при Российском обществе психиатров
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Независимый экспертный орган в сфере охраны психического здоровья
            </p>
          </div>
        </div>
      </header>

      {/* ── Навигация — точно как на mental-health-russia.ru ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop */}
          <ul className="hidden md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => goTo(item.id)}
                    className="relative px-5 py-4 text-sm font-medium transition-colors duration-150"
                    style={{
                      color: isActive ? BRAND.red : "#374151",
                      borderBottom: isActive ? `2px solid ${BRAND.red}` : "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = BRAND.red;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = "#374151";
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile */}
          <div className="md:hidden flex justify-between items-center py-3">
            <span className="text-sm font-medium" style={{ color: BRAND.navy }}>
              {NAV_ITEMS.find((i) => i.id === activeSection)?.label}
            </span>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: BRAND.navy }}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
          {mobileMenuOpen && (
            <ul className="md:hidden border-t border-gray-100 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => goTo(item.id)}
                    className="w-full text-left px-4 py-3 text-sm font-medium"
                    style={{ color: activeSection === item.id ? BRAND.red : "#374151" }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* ── Контент ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 animate-fade-in">
        {renderSection()}
      </main>

      {/* ── Подвал ── */}
      <footer className="text-white py-8 mt-auto" style={{ backgroundColor: BRAND.navy }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 items-start">
          <div className="flex items-center gap-4">
            <img
              src="https://cdn.poehali.dev/projects/64a22a44-84da-402b-b52f-cd0f436152dc/bucket/6356785c-6fbe-4fd3-9669-7d40891d9663.png"
              alt="СОПЗ"
              className="h-12 w-auto brightness-0 invert opacity-80"
            />
            <div>
              <p className="font-semibold text-sm">Совет НКО при РОП</p>
              <p className="text-xs text-white/60 mt-0.5">Союз охраны психического здоровья</p>
            </div>
          </div>
          <div className="text-sm text-white/60 space-y-1">
            <p>© 2018–2026 Все права защищены</p>
            <a href="https://mental-health-russia.ru" target="_blank" rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors">
              mental-health-russia.ru
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Заголовок раздела ─── */
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 pb-4 border-b-2" style={{ borderColor: BRAND.navy }}>
      <h2 className="text-2xl font-bold" style={{ color: BRAND.navy }}>{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

/* ─── NavyBox: синяя кнопка/бейдж ─── */
function NavyTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-white text-xs font-semibold px-2 py-0.5 rounded-sm"
      style={{ backgroundColor: BRAND.navy }}>
      {children}
    </span>
  );
}

/* ─────────────────────────────── */
/* ── О СОВЕТЕ (с вкладками) ── */
/* ─────────────────────────────── */

const ABOUT_TABS = [
  { id: "info", label: "О совете" },
  { id: "chair", label: "Председатель" },
  { id: "orgcom", label: "Оргкомитет" },
  { id: "members", label: "Состав совета" },
  { id: "reports", label: "Отчёты" },
];

const COUNCIL_API = "https://functions.poehali.dev/82c58c82-b444-45d7-85ee-c95aa4d1b94c";

function AboutSection() {
  const [tab, setTab] = useState("info");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("Все");
  const [members, setMembers] = useState<{ num: number; name: string; organization: string; region: string }[]>([]);
  const [regions, setRegions] = useState<string[]>(["Все"]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMembers = (s: string, r: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (r && r !== "Все") params.set("region", r);
    fetch(`${COUNCIL_API}?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members || []);
        setRegions(data.regions || ["Все"]);
        setTotal(data.total || 0);
      })
      .finally(() => setLoading(false));
  };

  useState(() => { fetchMembers("", "Все"); });

  const handleSearch = (val: string) => { setSearch(val); fetchMembers(val, regionFilter); };
  const handleRegion = (val: string) => { setRegionFilter(val); fetchMembers(search, val); };

  return (
    <div className="animate-slide-up">
      <SectionHeader title="О совете" subtitle="Совет НКО при Российском обществе психиатров" />

      {/* Вкладки */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-8">
        {ABOUT_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-3 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px"
            style={{
              color: tab === t.id ? BRAND.red : "#6B7280",
              borderBottomColor: tab === t.id ? BRAND.red : "transparent",
              backgroundColor: "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Вкладка: О совете ── */}
      {tab === "info" && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5 text-[15px] leading-relaxed text-gray-700">
            <p>
              Совет некоммерческих организаций в сфере охраны психического здоровья при Российском обществе
              психиатров – структура, призванная наладить тесное взаимодействие между НКО и профессиональным
              психиатрическим сообществом. Инициатором создания Совета, в состав которого вошли руководители
              некоммерческих организаций из 85 регионов РФ, выступил Союз охраны психического здоровья.
            </p>
            <div className="border-l-4 pl-4 py-1" style={{ borderColor: BRAND.red }}>
              <p className="font-semibold text-sm mb-1" style={{ color: BRAND.navy }}>Наша цель</p>
              <p>
                Развитие общественно-ориентированной системы медико-социальной реабилитации детей и взрослых
                людей с психическими особенностями, обеспечение скоординированных действий НКО,
                психиатрического сообщества, органов власти, СМИ.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-5 space-y-2">
              <p className="text-sm italic text-gray-600">
                Во время первого заседания к членам Совета обратился{" "}
                <span className="font-semibold not-italic text-gray-800">Н.Г. Незнанов</span>,
                д.м.н., профессор, директор НМИЦ психиатрии и неврологии им. В.М. Бехтерева,
                президент Российского общества психиатров, заслуженный деятель науки РФ.
              </p>
              <p className="text-sm text-gray-600">
                Он отметил значимость создания Совета, необходимость формирования единой модели
                психосоциальной реабилитации во всех регионах РФ и укрепления роли НКО в системе
                охраны психического здоровья.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-5">
              <p className="text-sm italic text-gray-600">
                Президент Союза охраны психического здоровья{" "}
                <span className="font-semibold not-italic text-gray-800">Н.В. Треушникова</span>{" "}
                отметила необходимость продуктивного диалога между участниками Совета и профессиональным
                психиатрическим сообществом, важность развития системы психосоциальной реабилитации,
                несмотря на экономические, территориальные и иные различия регионов России.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 content-start">
            {[
              { label: "Регионов РФ", value: "85" },
              { label: "Членов совета", value: "100+" },
              { label: "Рабочих групп", value: "4" },
              { label: "Лет работы", value: "8" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold" style={{ color: BRAND.navy }}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Вкладка: Председатель ── */}
      {tab === "chair" && (
        <div className="max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-2 w-full" style={{ backgroundColor: BRAND.navy }} />
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                  style={{ backgroundColor: BRAND.navy }}>
                  НТ
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-snug" style={{ color: BRAND.navy }}>
                    Треушникова Наталья Валерьевна
                  </h3>
                  <p className="text-sm font-medium mt-1" style={{ color: BRAND.red }}>
                    Председатель Совета НКО при РОП
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Президент Союза охраны психического здоровья
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-[15px] leading-relaxed text-gray-700">
                <p>
                  Наталья Валерьевна Треушникова — общественный деятель, президент Союза охраны
                  психического здоровья, инициатор создания Совета НКО при Российском обществе психиатров.
                </p>
                <p>
                  Под её руководством Союз объединил более 85 региональных организаций, занимающихся
                  реабилитацией и поддержкой людей с психическими расстройствами. Активно взаимодействует
                  с органами государственной власти, профессиональным психиатрическим сообществом и СМИ.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Вкладка: Оргкомитет ── */}
      {tab === "orgcom" && (
        <div>
          <p className="text-sm text-gray-500 mb-6">
            Организационный комитет координирует деятельность Совета, организует заседания и взаимодействие с партнёрами.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {ORG_COMMITTEE.map((member, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded p-5 flex items-start gap-4
                hover:border-gray-400 hover:shadow-sm transition-all duration-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: idx === 0 ? BRAND.red : BRAND.navy }}>
                  {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm leading-snug" style={{ color: BRAND.navy }}>
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{member.role}</p>
                  <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    {member.region}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Вкладка: Состав совета ── */}
      {tab === "members" && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по имени или организации..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-900 bg-white"
              />
            </div>
            <select
              value={regionFilter}
              onChange={(e) => handleRegion(e.target.value)}
              className="border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none bg-white text-gray-700"
            >
              {regions.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <p className="text-xs text-gray-400 mb-3">
            {loading ? "Загрузка..." : `Показано: ${members.length} из ${total}`}
          </p>

          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: BRAND.navy }}>
                  <th className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide">№</th>
                  <th className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide">ФИО</th>
                  <th className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide hidden md:table-cell">Организация</th>
                  <th className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide">Регион</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="Loader" size={16} className="animate-spin" />
                        Загрузка данных...
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && members.map((m, idx) => (
                  <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{m.num}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{m.name}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs leading-snug">{m.organization}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded whitespace-nowrap">{m.region}</span>
                    </td>
                  </tr>
                ))}
                {!loading && members.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">Ничего не найдено</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Вкладка: Отчёты ── */}
      {tab === "reports" && (
        <div>
          <p className="text-sm text-gray-500 mb-6">
            Ежегодные отчёты о деятельности Совета НКО при Российском обществе психиатров.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {REPORTS.map((report) => (
              <div key={report.year}
                className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md hover:border-gray-400 transition-all duration-200 flex flex-col">
                {/* Год — шапка карточки */}
                <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: BRAND.navy }}>
                  <span className="text-3xl font-bold text-white">{report.year}</span>
                  <Icon name="FileText" size={22} className="text-white/50" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm leading-snug text-gray-800 mb-2">
                    {report.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{report.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{report.pages} стр.</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-xs text-gray-400">{report.date}</span>
                    </div>
                    <a
                      href={report.fileUrl}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded transition-colors text-white"
                      style={{ backgroundColor: BRAND.red }}
                    >
                      <Icon name="Download" size={13} />
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded flex items-start gap-3">
            <Icon name="Info" size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">
              Для добавления новых отчётов загрузите PDF-файл через панель управления Ядро
              и обновите ссылку на документ.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────── */
/* ── РАБОЧИЕ ГРУППЫ ── */
/* ─────────────────────────────── */
function GroupsSection() {
  return (
    <div className="animate-slide-up">
      <SectionHeader title="Рабочие группы" subtitle="Специализированные экспертные группы по ключевым направлениям" />

      <div className="grid md:grid-cols-2 gap-5">
        {WORKING_GROUPS.map((group, idx) => (
          <div key={idx}
            className="bg-white border border-gray-200 rounded p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 flex items-center justify-center text-white text-lg font-bold rounded"
                style={{ backgroundColor: BRAND.navy }}>
                {idx + 1}
              </div>
              <NavyTag>{group.members} участн.</NavyTag>
            </div>
            <h3 className="font-semibold text-base leading-snug mb-2" style={{ color: BRAND.navy }}>
              {group.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{group.chair}</p>
            <div className="border-t border-gray-100 pt-4 flex items-center gap-2">
              <Icon name="Calendar" size={14} style={{ color: BRAND.red }} />
              <span className="text-xs text-gray-500">
                Следующее заседание:{" "}
                <span className="font-semibold text-gray-700">{group.nextMeeting}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded p-5 flex items-start gap-4 text-white" style={{ backgroundColor: BRAND.navy }}>
        <Icon name="Info" size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#f8b4b4" }} />
        <div>
          <p className="font-semibold text-sm mb-1">Участие в рабочих группах</p>
          <p className="text-sm text-white/75">
            Для участия в заседаниях рабочих групп или вступления в их состав обратитесь к ответственному секретарю.
            Заседания открыты для аккредитованных наблюдателей.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* ── МЕТОДИЧЕСКИЕ МАТЕРИАЛЫ ── */
/* ─────────────────────────────── */
function MaterialsSection() {
  const materials = [
    { title: "Методическое руководство по организации психиатрической помощи", year: "2025", type: "Руководство", pages: 84 },
    { title: "Стандарты волонтёрской деятельности в психиатрических учреждениях", year: "2025", type: "Стандарт", pages: 32 },
    { title: "Практические рекомендации по инклюзивному образованию", year: "2024", type: "Рекомендации", pages: 56 },
    { title: "Мониторинг соблюдения прав пациентов: методика", year: "2024", type: "Методика", pages: 40 },
    { title: "Образовательные программы для специалистов психиатрии", year: "2024", type: "Программа", pages: 120 },
    { title: "Независимая экспертиза в психиатрии: пособие", year: "2023", type: "Пособие", pages: 68 },
  ];

  return (
    <div className="animate-slide-up">
      <SectionHeader title="Методические материалы" subtitle="Руководства, стандарты и рекомендации для специалистов" />
      <div className="space-y-2">
        {materials.map((mat, idx) => (
          <div key={idx}
            className="bg-white border border-gray-200 rounded flex items-center gap-4 p-4 hover:border-gray-400 hover:shadow-sm transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-12 flex items-center justify-center rounded flex-shrink-0"
              style={{ backgroundColor: "#EFF2FB" }}>
              <Icon name="FileText" size={18} style={{ color: BRAND.navy }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-snug group-hover:underline" style={{ color: BRAND.navy }}>
                {mat.title}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <NavyTag>{mat.type}</NavyTag>
                <span className="text-xs text-gray-400">{mat.pages} стр.</span>
                <span className="text-xs text-gray-400">{mat.year}</span>
              </div>
            </div>
            <Icon name="Download" size={16} className="flex-shrink-0 text-gray-400 group-hover:text-red-600 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* ── ДОКУМЕНТЫ ── */
/* ─────────────────────────────── */
function DocumentsSection({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
}) {
  const sampleDocs: Record<string, { title: string; date: string; num: string }[]> = {
    inclusive: [
      { title: "Приказ № 42 «Об организации инклюзивного образования»", date: "15.03.2025", num: "№ 42" },
      { title: "Положение об инклюзивном классе в общеобразовательной школе", date: "20.01.2025", num: "П-01/25" },
      { title: "Методические указания по адаптации учебных программ", date: "10.11.2024", num: "МУ-08/24" },
    ],
    volunteering: [
      { title: "Регламент волонтёрской деятельности в психиатрических стационарах", date: "05.04.2025", num: "Р-03/25" },
      { title: "Договор о добровольческой деятельности (типовая форма)", date: "01.02.2025", num: "Т-01/25" },
    ],
    educational: [
      { title: "Программа повышения квалификации специалистов", date: "22.03.2025", num: "ПП-05/25" },
      { title: "Учебный план образовательного модуля «Права в психиатрии»", date: "10.02.2025", num: "УП-02/25" },
      { title: "Критерии оценки образовательных программ", date: "05.12.2024", num: "КО-11/24" },
    ],
    control: [
      { title: "Регламент общественного контроля в психиатрических учреждениях", date: "18.04.2025", num: "Р-04/25" },
      { title: "Форма акта проверки соблюдения прав пациентов", date: "01.03.2025", num: "А-02/25" },
    ],
    legal: [
      { title: "Федеральный закон «О психиатрической помощи» (с изменениями)", date: "01.01.2025", num: "ФЗ-3948-I" },
      { title: "Приказ Минздрава № 1100н «Об утверждении стандартов»", date: "15.12.2024", num: "№ 1100н" },
      { title: "Конвенция ООН о правах инвалидов", date: "13.12.2006", num: "КПИ" },
      { title: "Резолюция ВОЗ «Психическое здоровье и права человека»", date: "26.05.2023", num: "WHA76.10" },
    ],
  };

  if (activeCategory) {
    const cat = DOC_CATEGORIES.find((c) => c.id === activeCategory)!;
    const docs = sampleDocs[activeCategory] || [];
    return (
      <div className="animate-slide-up">
        <button
          onClick={() => setActiveCategory(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Все разделы
        </button>
        <SectionHeader title={cat.title} subtitle={cat.description} />
        <div className="space-y-2">
          {docs.map((doc, idx) => (
            <div key={idx}
              className="bg-white border border-gray-200 rounded flex items-center gap-4 p-4 hover:border-gray-400 hover:shadow-sm transition-all duration-200 cursor-pointer group">
              <div className="w-10 h-12 flex items-center justify-center rounded flex-shrink-0"
                style={{ backgroundColor: "#EFF2FB" }}>
                <Icon name="FileText" size={18} style={{ color: BRAND.navy }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm group-hover:underline" style={{ color: BRAND.navy }}>{doc.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400">{doc.num}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{doc.date}</span>
                </div>
              </div>
              <Icon name="Download" size={16} className="flex-shrink-0 text-gray-400 group-hover:text-red-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <SectionHeader title="Документы" subtitle="Выберите раздел для просмотра документов" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOC_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="bg-white border border-gray-200 rounded p-5 text-left hover:border-gray-400 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded text-white"
                style={{ backgroundColor: BRAND.navy }}>
                <Icon name={cat.icon} fallback="FileText" size={18} />
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{cat.count} докум.</span>
            </div>
            <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:underline"
              style={{ color: BRAND.navy }}>
              {cat.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
            <div className="flex items-center gap-1 mt-4 text-sm font-medium" style={{ color: BRAND.red }}>
              <span>Открыть</span>
              <Icon name="ArrowRight" size={13} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* ── КАЛЕНДАРЬ ── */
/* ─────────────────────────────── */
function CalendarSection() {
  const typeStyle: Record<string, { label: string; bg: string; text: string }> = {
    meeting: { label: "Заседание РГ", bg: BRAND.navy, text: "#fff" },
    event: { label: "Мероприятие", bg: BRAND.red, text: "#fff" },
    plenary: { label: "Пленарное", bg: "#6B7280", text: "#fff" },
  };

  return (
    <div className="animate-slide-up">
      <SectionHeader title="Календарь событий" subtitle="Заседания рабочих групп и мероприятия Совета" />

      {/* Легенда */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.values(typeStyle).map((t) => (
          <span key={t.label} className="text-xs font-medium px-3 py-1 rounded"
            style={{ backgroundColor: t.bg, color: t.text }}>
            {t.label}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        {EVENTS.map((event, idx) => {
          const meta = typeStyle[event.type];
          return (
            <div key={idx}
              className="bg-white border border-gray-200 rounded flex items-stretch hover:shadow-md hover:border-gray-400 transition-all duration-200">
              {/* Дата */}
              <div className="w-20 flex flex-col items-center justify-center py-4 flex-shrink-0 border-r border-gray-100"
                style={{ backgroundColor: "#EFF2FB" }}>
                <span className="text-2xl font-bold leading-none" style={{ color: BRAND.navy }}>{event.date}</span>
                <span className="text-xs text-gray-500 uppercase mt-0.5">{event.month}</span>
              </div>
              {/* Контент */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-medium text-sm leading-snug" style={{ color: BRAND.navy }}>
                    {event.title}
                  </h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 whitespace-nowrap"
                    style={{ backgroundColor: meta.bg, color: meta.text }}>
                    {meta.label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={13} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="MapPin" size={13} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded p-5 flex items-start gap-4">
        <Icon name="Bell" size={18} className="flex-shrink-0 mt-0.5" style={{ color: BRAND.red }} />
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: BRAND.navy }}>Получить уведомления</p>
          <p className="text-sm text-gray-500">
            Чтобы получать напоминания о предстоящих заседаниях, обратитесь к секретарю Совета.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* ── КОНТАКТЫ ── */
/* ─────────────────────────────── */
function ContactsSection() {
  return (
    <div className="animate-slide-up">
      <SectionHeader title="Контакты" subtitle="Свяжитесь с нами по любым вопросам деятельности Совета" />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, д. 1, оф. 101" },
            { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
            { icon: "Mail", label: "Электронная почта", value: "info@council-psychiatry.ru" },
            { icon: "Globe", label: "Основной сайт", value: "mental-health-russia.ru" },
            { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00 – 18:00" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded flex-shrink-0 text-white"
                style={{ backgroundColor: BRAND.navy }}>
                <Icon name={item.icon} fallback="MapPin" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded p-6">
          <h3 className="font-bold text-base mb-5" style={{ color: BRAND.navy }}>Написать обращение</h3>
          <div className="space-y-4">
            {[
              { label: "Ваше имя", type: "text", placeholder: "Иванов Иван Иванович" },
              { label: "Email", type: "email", placeholder: "example@mail.ru" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wide">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wide">Сообщение</label>
              <textarea
                rows={4}
                placeholder="Текст вашего обращения..."
                className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-900 transition-colors resize-none"
              />
            </div>
            <button
              className="w-full text-white text-sm font-semibold py-3 rounded transition-colors duration-200"
              style={{ backgroundColor: BRAND.navy }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.navyLight)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.navy)}
            >
              Отправить обращение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}