import { useState } from "react";
import Icon from "@/components/ui/icon";

const BRAND = {
  navy: "#2D3561",
  navyDark: "#1E2442",
  navyLight: "#3D4771",
  red: "#C0392B",
  redLight: "#E74C3C",
  bg: "#F0F2F8",
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
  { id: "inclusive", title: "Инклюзивное образование", icon: "GraduationCap", count: 12, description: "Нормативные и методические документы по организации инклюзивного образования для лиц с психическими расстройствами" },
  { id: "volunteering", title: "Волонтерство в психиатрии", icon: "Heart", count: 8, description: "Руководства, регламенты и материалы для волонтёров, работающих в психиатрических учреждениях" },
  { id: "educational", title: "Образовательный проект", icon: "BookOpen", count: 15, description: "Учебные программы, методики преподавания и образовательные стандарты" },
  { id: "control", title: "Общественный контроль в психиатрии", icon: "Shield", count: 10, description: "Документы по мониторингу соблюдения прав пациентов психиатрических учреждений" },
  { id: "legal", title: "Нормативно-правовые акты", icon: "Scale", count: 24, description: "Федеральные законы, приказы, постановления и международные акты в области психиатрии" },
];

const WORKING_GROUPS = [
  { title: "Рабочая группа по волонтерству", chair: "Петров С.В.", members: 5, nextMeeting: "Дата уточняется", icon: "Heart" },
  { title: "Рабочая группа по сопровождаемому проживанию и трудовой занятости", chair: "Толпекина Н.В.", members: 6, nextMeeting: "Дата уточняется", icon: "Home" },
];

const EVENTS = [
  { date: "20", month: "мая", title: "Заседание РГ по инклюзивному образованию", type: "meeting", time: "14:00", location: "Конференц-зал, к. 301" },
  { date: "22", month: "мая", title: "Круглый стол «Права пациентов»", type: "event", time: "10:00", location: "Зал заседаний" },
  { date: "27", month: "мая", title: "Заседание РГ по волонтерству", type: "meeting", time: "15:30", location: "Онлайн (Zoom)" },
  { date: "03", month: "июн", title: "Заседание РГ по правовым вопросам", type: "meeting", time: "14:00", location: "Конференц-зал, к. 301" },
  { date: "07", month: "июн", title: "Открытая лекция: «Психиатрия и права»", type: "event", time: "18:00", location: "Актовый зал" },
  { date: "10", month: "июн", title: "Заседание РГ по сопровождаемому проживанию", type: "meeting", time: "16:00", location: "Онлайн (Zoom)" },
  { date: "17", month: "июн", title: "Пленарное заседание Совета", type: "plenary", time: "13:00", location: "Зал заседаний" },
];

const ORG_COMMITTEE = [
  { name: "Шпицберг Игорь Леонидович", role: "Руководитель Центра реабилитации инвалидов детства «Наш Солнечный Мир», член Правления Международной ассоциации Autism Europe, член Совета МГАРДИ, член Экспертного совета Министерства просвещения РФ по вопросам сопровождения детей с РАС", region: "Москва" },
  { name: "Толмачев Владимир Алексеевич", role: "Председатель Нижегородского регионального отделения ОООИ «Новые возможности»", region: "Н. Новгород" },
  { name: "Толпекина Наталья Викторовна", role: "Президент Благотворительного Фонда помощи детям, больным ДЦП и иными тяжелыми заболеваниями «Божья коровка»", region: "Орёл" },
  { name: "Треушникова Наталья Валериевна", role: "Президент Союза охраны психического здоровья, член Исполнительного комитета РОП, врач-психиатр, нарколог", region: "Москва" },
  { name: "Титкова Ольга Станиславовна", role: "Директор АНО «Центр развития социального интеллекта», эксперт в области защиты семьи и детства, инклюзии, победитель конкурса ПФО «Профессионал в сфере управления НКО»", region: "Москва" },
  { name: "Гебель Кира Манфредовна", role: "Председатель СПб РО ОООИ «Новые возможности», к.м.н., врач психиатр-психотерапевт высшей кат., зав. МРО СПБ ГБУЗ «ПБ №1 им. П.П. Кащенко»", region: "Санкт-Петербург" },
  { name: "Кац Юрий Михайлович", role: "Заместитель председателя Владимирской областной общественной организации «Ассоциация родителей детей-инвалидов «Свет»", region: "Владимир" },
];

const REPORTS = [
  { year: "2024", title: "Отчёт о деятельности Совета НКО при РОП за 2024 год", description: "Итоги работы рабочих групп, мероприятия, достижения и планы развития", pages: 48, date: "март 2025", fileUrl: "#" },
  { year: "2023", title: "Отчёт о деятельности Совета НКО при РОП за 2023 год", description: "Обзор реализованных проектов, встреч с органами власти и публичных акций", pages: 42, date: "март 2024", fileUrl: "#" },
  { year: "2022", title: "Отчёт о деятельности Совета НКО при РОП за 2022 год", description: "Формирование структуры совета, первые рабочие группы, ключевые события", pages: 36, date: "март 2023", fileUrl: "#" },
];

/* ═══════════════════════════════════════════ */
export default function Index() {
  const [activeSection, setActiveSection] = useState("about");
  const [activeDocCategory, setActiveDocCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goTo = (id: string) => { setActiveSection(id); setMobileMenuOpen(false); };

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
      <header className="bg-white border-b border-gray-100 shadow-sm">
        {/* Верхняя строка: логотип слева, навигация по центру, логотип справа */}
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between py-3 gap-6">

            {/* Логотип — слева */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <img
                src="https://cdn.poehali.dev/projects/64a22a44-84da-402b-b52f-cd0f436152dc/bucket/cd9d0e62-681a-4127-8664-3cce702a9a62.png"
                alt="НКО логотип"
                className="h-16 w-16 object-contain"
              />
              <span className="text-sm font-semibold text-[#1a3a5c] leading-tight hidden sm:block">
                Совет НКО<br />при РОП
              </span>
            </div>

            {/* Навигация — по центру */}
            <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => goTo(item.id)}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                      style={{
                        color: isActive ? BRAND.red : "#4B5563",
                        backgroundColor: isActive ? `${BRAND.red}08` : "transparent",
                        borderBottom: isActive ? `2px solid ${BRAND.red}` : "2px solid transparent",
                        borderRadius: 0,
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Логотип СОПЗ — справа, такой же высоты */}
            <a href="https://mental-health-russia.ru" target="_blank" rel="noopener noreferrer"
              className="hidden md:block group flex-shrink-0">
              <img
                src="https://cdn.poehali.dev/projects/64a22a44-84da-402b-b52f-cd0f436152dc/bucket/6356785c-6fbe-4fd3-9669-7d40891d9663.png"
                alt="Союз охраны психического здоровья"
                className="h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </a>

            {/* Mobile burger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2" style={{ color: BRAND.navy }}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>

          {/* Mobile меню */}
          {mobileMenuOpen && (
            <ul className="md:hidden border-t border-gray-100 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button onClick={() => goTo(item.id)}
                    className="w-full text-left px-4 py-3 text-sm font-medium"
                    style={{ color: activeSection === item.id ? BRAND.red : "#4B5563" }}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* ── Контент ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-10 py-12 animate-fade-in">
        {renderSection()}
      </main>

      {/* ── Подвал ── */}
      <footer style={{ backgroundColor: BRAND.navyDark }}>
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="flex items-center gap-4">
            <img src="https://cdn.poehali.dev/projects/64a22a44-84da-402b-b52f-cd0f436152dc/bucket/bcaa3365-e019-4fe8-831f-e211788eb9a7.png"
              alt="Совет НКО при РОП" className="h-10 w-auto opacity-70" />
            <div>
              <p className="text-white font-semibold text-sm">Совет НКО при РОП</p>
              <p className="text-white/40 text-xs mt-0.5">Союз охраны психического здоровья</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-sm text-white/40">
            <div className="space-y-1">
              {NAV_ITEMS.slice(0, 3).map((i) => (
                <button key={i.id} onClick={() => goTo(i.id)}
                  className="block hover:text-white/80 transition-colors text-left">{i.label}</button>
              ))}
            </div>
            <div className="space-y-1">
              {NAV_ITEMS.slice(3).map((i) => (
                <button key={i.id} onClick={() => goTo(i.id)}
                  className="block hover:text-white/80 transition-colors text-left">{i.label}</button>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-white/60">© 2018–2026</p>
              <a href="https://mental-health-russia.ru" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white/80 transition-colors">
                <Icon name="ExternalLink" size={12} />
                mental-health-russia.ru
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Заголовок раздела ─── */
function SectionHeader({ title, subtitle, accent }: { title: string; subtitle?: string; accent?: string }) {
  return (
    <div className="mb-10">
      {accent && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
          style={{ backgroundColor: `${BRAND.navy}15`, color: BRAND.navy }}>
          {accent}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight" style={{ color: BRAND.navyDark }}>{title}</h2>
      {subtitle && <p className="text-gray-400 mt-2.5 text-[15px] leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ─── Pill-бейдж ─── */
function Pill({ children, red }: { children: React.ReactNode; red?: boolean }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full"
      style={red
        ? { backgroundColor: `${BRAND.red}15`, color: BRAND.red }
        : { backgroundColor: `${BRAND.navy}12`, color: BRAND.navy }
      }>
      {children}
    </span>
  );
}

/* ─── Карточка ─── */
function Card({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${hover ? "hover:shadow-md hover:-translate-y-0.5" : ""} transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ── О СОВЕТЕ ── */
/* ═══════════════════════════════════════════ */
const ABOUT_TABS = [
  { id: "info", label: "О совете", icon: "Info" },
  { id: "chair", label: "Председатель", icon: "User" },
  { id: "orgcom", label: "Оргкомитет", icon: "Users" },
  { id: "members", label: "Состав совета", icon: "List" },
  { id: "reports", label: "Отчёты", icon: "FileText" },
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
      .then((data) => { setMembers(data.members || []); setRegions(data.regions || ["Все"]); setTotal(data.total || 0); })
      .finally(() => setLoading(false));
  };

  useState(() => { fetchMembers("", "Все"); });
  const handleSearch = (val: string) => { setSearch(val); fetchMembers(val, regionFilter); };
  const handleRegion = (val: string) => { setRegionFilter(val); fetchMembers(search, val); };

  return (
    <div className="animate-slide-up space-y-6">
      {/* Вкладки — таблетки */}
      <div className="flex flex-wrap gap-2">
        {ABOUT_TABS.map((t) => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={isActive
                ? { backgroundColor: BRAND.navy, color: "#fff", boxShadow: `0 4px 14px ${BRAND.navy}40` }
                : { backgroundColor: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }
              }
            >
              <Icon name={t.icon} size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── О совете ── */}
      {tab === "info" && (
        <div className="space-y-6">
          {/* Статы */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Регионов РФ", value: "85", icon: "MapPin" },
              { label: "Членов совета", value: "104", icon: "Users" },
              { label: "Рабочих групп", value: "4", icon: "Layers" },
              { label: "Лет работы", value: "8", icon: "Calendar" },
            ].map((stat) => (
              <Card key={stat.label} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND.navy}12` }}>
                    <Icon name={stat.icon} size={16} style={{ color: BRAND.navy }} />
                  </div>
                </div>
                <div className="text-3xl font-bold tracking-tight" style={{ color: BRAND.navyDark }}>{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Описание + цитаты */}
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-4">
              <Card className="p-7">
                <p className="text-[15px] leading-relaxed text-gray-700">
                  Совет некоммерческих организаций в сфере охраны психического здоровья при Российском обществе
                  психиатров – структура, призванная наладить тесное взаимодействие между НКО и профессиональным
                  психиатрическим сообществом. Инициатором создания Совета, в состав которого вошли руководители
                  некоммерческих организаций из 85 регионов РФ, выступил Союз охраны психического здоровья.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-3">
                  <div className="w-1 h-full min-h-10 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND.red }} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: BRAND.red }}>Наша цель</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Развитие общественно-ориентированной системы медико-социальной реабилитации детей и взрослых
                      людей с психическими особенностями, обеспечение скоординированных действий НКО,
                      психиатрического сообщества, органов власти, СМИ.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="md:col-span-2 space-y-4">
              {[
                { name: "Н.Г. Незнанов", role: "Президент РОП, д.м.н., профессор", text: "Отметил значимость создания Совета и необходимость формирования единой модели психосоциальной реабилитации во всех регионах РФ." },
                { name: "Н.В. Треушникова", role: "Президент Союза охраны психического здоровья", text: "Подчеркнула важность развития системы психосоциальной реабилитации несмотря на различия регионов России." },
              ].map((q) => (
                <Card key={q.name} className="p-5">
                  <Icon name="Quote" size={18} className="mb-3 opacity-30" style={{ color: BRAND.navy }} />
                  <p className="text-sm text-gray-600 leading-relaxed italic mb-3">{q.text}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: BRAND.navy }}>
                      {q.name.split(" ")[0][0]}{q.name.split(" ")[1][0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: BRAND.navy }}>{q.name}</p>
                      <p className="text-xs text-gray-400">{q.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Председатель ── */}
      {tab === "chair" && (
        <Card className="overflow-hidden max-w-2xl" hover={false}>
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${BRAND.navy}, ${BRAND.red})` }} />
          <div className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redLight})` }}>
                ОЮ
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: BRAND.navyDark }}>Осадший Юрий Юрьевич</h3>
                <Pill red className="mt-2">Председатель Совета НКО при РОП</Pill>
                <p className="text-sm text-gray-500 mt-1">Врач психиатр, психотерапевт</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ── Оргкомитет ── */}
      {tab === "orgcom" && (
        <div>
          <p className="text-sm text-gray-500 mb-5">Координирует деятельность Совета, организует заседания и взаимодействие с партнёрами.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {ORG_COMMITTEE.map((member, idx) => (
              <Card key={idx} className="p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: idx === 0 ? `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redLight})` : `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navyLight})` }}>
                  {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm" style={{ color: BRAND.navyDark }}>{member.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{member.role}</p>
                  <Pill className="mt-2">{member.region}</Pill>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Состав совета ── */}
      {tab === "members" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Поиск по имени или организации..."
                value={search} onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
                style={{ "--tw-ring-color": `${BRAND.navy}40` } as React.CSSProperties}
              />
            </div>
            <select value={regionFilter} onChange={(e) => handleRegion(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none shadow-sm text-gray-700 min-w-40">
              {regions.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {loading ? "Загрузка..." : `Найдено: ${members.length} из ${total}`}
            </p>
          </div>

          <Card hover={false} className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: BRAND.navy }}>
                  <th className="text-left px-4 py-3 text-white/70 font-medium text-xs w-12">№</th>
                  <th className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide">ФИО</th>
                  <th className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide hidden lg:table-cell">Организация</th>
                  <th className="text-left px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide hidden md:table-cell">Регион</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="Loader" size={16} className="animate-spin" />
                        Загрузка...
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && members.map((m, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-3 text-gray-300 text-xs font-mono">{m.num}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 text-sm">{m.name}</td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell text-xs leading-snug max-w-xs truncate">{m.organization}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Pill>{m.region}</Pill>
                    </td>
                  </tr>
                ))}
                {!loading && members.length === 0 && (
                  <tr><td colSpan={4} className="py-12 text-center text-gray-400 text-sm">Ничего не найдено</td></tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* ── Отчёты ── */}
      {tab === "reports" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Ежегодные отчёты о деятельности Совета НКО при Российском обществе психиатров.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {REPORTS.map((report) => (
              <Card key={report.year} className="overflow-hidden flex flex-col">
                <div className="px-6 py-5 flex items-center justify-between"
                  style={{ background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})` }}>
                  <span className="text-4xl font-bold text-white tracking-tight">{report.year}</span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon name="FileText" size={18} className="text-white/70" />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm leading-snug text-gray-800 mb-2">{report.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{report.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Pill>{report.pages} стр.</Pill>
                      <span className="text-xs text-gray-400">{report.date}</span>
                    </div>
                    <a href={report.fileUrl}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: BRAND.red }}>
                      <Icon name="Download" size={12} />
                      PDF
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ── РАБОЧИЕ ГРУППЫ ── */
/* ═══════════════════════════════════════════ */
function GroupsSection() {
  return (
    <div className="animate-slide-up space-y-6">
      <SectionHeader title="Рабочие группы" accent="Экспертная работа"
        subtitle="Специализированные группы по ключевым направлениям деятельности Совета" />

      <div className="grid md:grid-cols-2 gap-6">
        {WORKING_GROUPS.map((group, idx) => (
          <Card key={idx} className="p-7">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navyLight})` }}>
                <Icon name={group.icon} size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base leading-snug" style={{ color: BRAND.navyDark }}>{group.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{group.chair}</p>
              </div>
              <Pill>{group.members} уч.</Pill>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <Icon name="Calendar" size={13} style={{ color: BRAND.red }} />
              </div>
              <span className="text-xs text-gray-500">
                Следующее заседание: <span className="font-semibold text-gray-700">{group.nextMeeting}</span>
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 flex items-start gap-4" hover={false}
        style={{ background: `linear-gradient(135deg, ${BRAND.navy}08, ${BRAND.navy}04)`, border: `1px solid ${BRAND.navy}18` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${BRAND.navy}15` }}>
          <Icon name="Info" size={18} style={{ color: BRAND.navy }} />
        </div>
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: BRAND.navyDark }}>Участие в рабочих группах</p>
          <p className="text-sm text-gray-600">Для участия в заседаниях рабочих групп или вступления в состав обратитесь к ответственному секретарю. Заседания открыты для аккредитованных наблюдателей.</p>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ── МЕТОДИЧЕСКИЕ МАТЕРИАЛЫ ── */
/* ═══════════════════════════════════════════ */
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
    <div className="animate-slide-up space-y-5">
      <SectionHeader title="Методические материалы" accent="Документация"
        subtitle="Руководства, стандарты и рекомендации для специалистов в сфере охраны психического здоровья" />
      <div className="space-y-3">
        {materials.map((mat, idx) => (
          <Card key={idx} className="flex items-center gap-5 p-5 cursor-pointer group">
            <div className="w-11 h-13 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${BRAND.navy}12, ${BRAND.navy}06)` }}>
              <Icon name="FileText" size={18} style={{ color: BRAND.navy }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-800 group-hover:text-blue-900 transition-colors leading-snug">{mat.title}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <Pill>{mat.type}</Pill>
                <span className="text-xs text-gray-400">{mat.pages} стр. · {mat.year}</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 group-hover:bg-red-50 transition-colors">
              <Icon name="Download" size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ── ДОКУМЕНТЫ ── */
/* ═══════════════════════════════════════════ */
function DocumentsSection({ activeCategory, setActiveCategory }: { activeCategory: string | null; setActiveCategory: (id: string | null) => void }) {
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

  const catColors = ["#2D3561", "#C0392B", "#16A085", "#8E44AD", "#D35400"];

  if (activeCategory) {
    const cat = DOC_CATEGORIES.find((c) => c.id === activeCategory)!;
    const docs = sampleDocs[activeCategory] || [];
    const catIdx = DOC_CATEGORIES.findIndex((c) => c.id === activeCategory);
    const color = catColors[catIdx] || BRAND.navy;
    return (
      <div className="animate-slide-up space-y-5">
        <button onClick={() => setActiveCategory(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium group">
          <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Все разделы
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}>
            <Icon name={cat.icon} fallback="FileText" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: BRAND.navyDark }}>{cat.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{cat.description}</p>
          </div>
        </div>
        <div className="space-y-3">
          {docs.map((doc, idx) => (
            <Card key={idx} className="flex items-center gap-4 p-4 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}12` }}>
                <Icon name="FileText" size={16} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-800 group-hover:text-blue-900 transition-colors">{doc.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{doc.num}</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-xs text-gray-400">{doc.date}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 group-hover:bg-red-50 transition-colors">
                <Icon name="Download" size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up space-y-5">
      <SectionHeader title="Документы" accent="База знаний" subtitle="Выберите раздел для просмотра документов" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DOC_CATEGORIES.map((cat, idx) => {
          const color = catColors[idx] || BRAND.navy;
          return (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className="text-left group">
              <Card className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
                    <Icon name={cat.icon} fallback="FileText" size={20} />
                  </div>
                  <Pill>{cat.count} докум.</Pill>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-blue-900 transition-colors" style={{ color: BRAND.navyDark }}>
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color }}>
                  Открыть <Icon name="ArrowRight" size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ── КАЛЕНДАРЬ ── */
/* ═══════════════════════════════════════════ */
function CalendarSection() {
  const typeStyle: Record<string, { label: string; bg: string; text: string }> = {
    meeting: { label: "Заседание РГ", bg: `${BRAND.navy}15`, text: BRAND.navy },
    event: { label: "Мероприятие", bg: `${BRAND.red}15`, text: BRAND.red },
    plenary: { label: "Пленарное", bg: "#16A08515", text: "#16A085" },
  };

  return (
    <div className="animate-slide-up space-y-5">
      <SectionHeader title="Календарь событий" accent="Расписание"
        subtitle="Заседания рабочих групп и мероприятия Совета" />

      <div className="flex flex-wrap gap-2 mb-2">
        {Object.values(typeStyle).map((t) => (
          <span key={t.label} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ backgroundColor: t.bg, color: t.text }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.text }} />
            {t.label}
          </span>
        ))}
      </div>

      <div className="space-y-3.5">
        {EVENTS.map((event, idx) => {
          const meta = typeStyle[event.type];
          return (
            <Card key={idx} className="flex items-stretch overflow-hidden">
              <div className="w-20 flex flex-col items-center justify-center py-4 flex-shrink-0"
                style={{ background: `linear-gradient(180deg, ${BRAND.navy}08, ${BRAND.navy}04)`, borderRight: `1px solid ${BRAND.navy}10` }}>
                <span className="text-2xl font-bold leading-none" style={{ color: BRAND.navyDark }}>{event.date}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">{event.month}</span>
              </div>
              <div className="flex-1 p-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-sm text-gray-800 leading-snug mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Clock" size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="MapPin" size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{event.location}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap"
                  style={{ backgroundColor: meta.bg, color: meta.text }}>
                  {meta.label}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 flex items-start gap-4" hover={false}
        style={{ background: `linear-gradient(135deg, ${BRAND.red}06, ${BRAND.red}03)`, border: `1px solid ${BRAND.red}15` }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${BRAND.red}12` }}>
          <Icon name="Bell" size={16} style={{ color: BRAND.red }} />
        </div>
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: BRAND.navyDark }}>Получить уведомления</p>
          <p className="text-sm text-gray-500">Чтобы получать напоминания о предстоящих заседаниях, обратитесь к секретарю Совета.</p>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ── КОНТАКТЫ ── */
/* ═══════════════════════════════════════════ */
function ContactsSection() {
  return (
    <div className="animate-slide-up space-y-6">
      <SectionHeader title="Контакты" accent="Связь с нами" subtitle="Свяжитесь с нами по любым вопросам деятельности Совета" />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, д. 1, оф. 101" },
            { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
            { icon: "Mail", label: "Электронная почта", value: "info@council-psychiatry.ru" },
            { icon: "Globe", label: "Основной сайт", value: "mental-health-russia.ru" },
            { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00 – 18:00" },
          ].map((item) => (
            <Card key={item.label} className="p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navyLight})` }}>
                <Icon name={item.icon} fallback="MapPin" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6" hover={false}>
          <h3 className="font-bold text-base mb-5" style={{ color: BRAND.navyDark }}>Написать обращение</h3>
          <div className="space-y-4">
            {[
              { label: "Ваше имя", type: "text", placeholder: "Иванов Иван Иванович" },
              { label: "Email", type: "email", placeholder: "example@mail.ru" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">{field.label}</label>
                <input type={field.type} placeholder={field.placeholder}
                  className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ "--tw-ring-color": `${BRAND.navy}30` } as React.CSSProperties}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Сообщение</label>
              <textarea rows={4} placeholder="Текст вашего обращения..."
                className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                style={{ "--tw-ring-color": `${BRAND.navy}30` } as React.CSSProperties}
              />
            </div>
            <button className="w-full text-white text-sm font-semibold py-3 rounded-xl transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navyLight})`, boxShadow: `0 4px 14px ${BRAND.navy}40` }}>
              Отправить обращение
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}