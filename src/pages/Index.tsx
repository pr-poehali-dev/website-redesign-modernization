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

const COUNCIL_MEMBERS = [
  { name: "Александров Дмитрий Борисович", role: "Председатель совета", degree: "д.м.н., профессор" },
  { name: "Белова Наталья Сергеевна", role: "Заместитель председателя", degree: "к.ю.н." },
  { name: "Виноградов Андрей Михайлович", role: "Ответственный секретарь", degree: "к.м.н." },
  { name: "Герасимова Ольга Петровна", role: "Член совета", degree: "д.п.н., профессор" },
  { name: "Дмитриев Сергей Николаевич", role: "Член совета", degree: "Правозащитник" },
  { name: "Ефимова Лариса Викторовна", role: "Член совета", degree: "к.с.н." },
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
/* ── О СОВЕТЕ ── */
/* ─────────────────────────────── */
function AboutSection() {
  return (
    <div className="animate-slide-up">
      <SectionHeader title="О совете" subtitle="Независимый экспертный орган с 2018 года" />

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2 space-y-4 text-[15px] leading-relaxed text-gray-700">
          <p>
            Совет НКО при Российском обществе психиатров (РОП) является независимым экспертным органом,
            объединяющим некоммерческие организации в сфере охраны психического здоровья.
            Деятельность Совета направлена на обеспечение соблюдения прав и законных интересов
            лиц с психическими расстройствами в Российской Федерации.
          </p>
          <p>
            В сферу деятельности Совета входит мониторинг правоприменительной практики,
            экспертная оценка законодательства, взаимодействие с органами государственной власти
            и разработка рекомендаций по совершенствованию системы психиатрической помощи.
          </p>
          <p>
            Совет объединяет ведущих специалистов в области психиатрии, права, педагогики
            и гражданского общества, обеспечивая комплексный и независимый подход к защите
            прав уязвимых групп населения.
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Лет работы", value: "8" },
            { label: "Членов совета", value: "24" },
            { label: "Рабочих групп", value: "4" },
            { label: "Документов", value: "69+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded border border-gray-200 p-4 text-center">
              <div className="text-3xl font-bold" style={{ color: BRAND.navy }}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Состав */}
      <div className="section-divider pt-8">
        <h3 className="text-lg font-bold mb-5" style={{ color: BRAND.navy }}>Состав совета</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COUNCIL_MEMBERS.map((member) => (
            <div key={member.name}
              className="bg-white border border-gray-200 rounded p-5 hover:border-gray-400 hover:shadow-sm transition-all duration-200">
              <div className="w-8 h-1 mb-3 rounded-full" style={{ backgroundColor: BRAND.red }} />
              <p className="font-semibold text-sm leading-snug" style={{ color: BRAND.navy }}>{member.name}</p>
              <p className="text-xs text-gray-500 mt-1">{member.role}</p>
              <p className="text-xs mt-0.5 italic" style={{ color: BRAND.red }}>{member.degree}</p>
            </div>
          ))}
        </div>
      </div>
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
