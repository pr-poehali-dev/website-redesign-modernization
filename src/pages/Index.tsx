import { useState } from "react";
import Icon from "@/components/ui/icon";

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
  {
    title: "Рабочая группа по инклюзивному образованию",
    chair: "Председатель: к.п.н. Иванова М.А.",
    members: 7,
    nextMeeting: "20 мая 2026",
  },
  {
    title: "Рабочая группа по волонтерству",
    chair: "Председатель: Петров С.В.",
    members: 5,
    nextMeeting: "27 мая 2026",
  },
  {
    title: "Рабочая группа по правовым вопросам",
    chair: "Председатель: д.ю.н. Сидорова Е.Н.",
    members: 9,
    nextMeeting: "3 июня 2026",
  },
  {
    title: "Рабочая группа по общественному контролю",
    chair: "Председатель: Козлов А.П.",
    members: 6,
    nextMeeting: "10 июня 2026",
  },
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

  const scrollToSection = (id: string) => {
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="bg-[hsl(220,45%,18%)] text-white/70 text-xs py-2 px-6 flex justify-between items-center font-body">
        <span>Независимый экспертный орган</span>
        <span>Основан в 2018 году</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-5">
          <div className="w-12 h-12 bg-[hsl(220,45%,18%)] flex items-center justify-center flex-shrink-0">
            <Icon name="Scale" size={22} className="text-[hsl(38,60%,60%)]" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-[hsl(220,45%,18%)] leading-tight">
              Совет по правам человека в психиатрии
            </h1>
            <p className="font-body text-xs text-muted-foreground mt-0.5 tracking-wide uppercase">
              Независимый экспертный орган
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[hsl(220,45%,18%)] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <ul className="hidden md:flex gap-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`font-body text-sm px-5 py-4 transition-colors duration-200 border-b-2 ${
                    activeSection === item.id
                      ? "text-[hsl(38,60%,60%)] border-[hsl(38,60%,60%)]"
                      : "text-white/80 border-transparent hover:text-white hover:border-white/30"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile */}
          <div className="md:hidden flex justify-between items-center py-3">
            <span className="text-white/80 text-sm font-body">
              {NAV_ITEMS.find((i) => i.id === activeSection)?.label}
            </span>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-1">
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>

          {mobileMenuOpen && (
            <ul className="md:hidden border-t border-white/10 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left font-body text-sm px-4 py-3 transition-colors ${
                      activeSection === item.id ? "text-[hsl(38,60%,60%)]" : "text-white/80"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 animate-fade-in">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-[hsl(220,45%,12%)] text-white/60 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="font-display text-white text-lg">Совет по правам человека в психиатрии</p>
            <p className="font-body text-sm mt-1">Независимый экспертный орган</p>
          </div>
          <div className="font-body text-sm">
            <p>© 2018–2026 Все права защищены</p>
            <p className="mt-1">Москва, Россия</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ───── ABOUT ───── */
function AboutSection() {
  return (
    <div className="animate-slide-up">
      <div className="border-l-4 border-[hsl(38,60%,48%)] pl-6 mb-10">
        <h2 className="font-display text-4xl font-semibold text-[hsl(220,45%,18%)] leading-tight">О совете</h2>
        <p className="font-body text-muted-foreground mt-2 text-sm tracking-wide uppercase">Независимый экспертный орган с 2018 года</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 space-y-4 font-body text-[15px] leading-relaxed text-foreground/85">
          <p>
            Совет по правам человека в психиатрии является независимым экспертным органом,
            деятельность которого направлена на обеспечение соблюдения прав и законных интересов
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
        <div className="space-y-4">
          {[
            { label: "Лет работы", value: "8" },
            { label: "Членов совета", value: "24" },
            { label: "Рабочих групп", value: "4" },
            { label: "Документов", value: "69+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-border p-4">
              <div className="font-display text-3xl font-semibold text-[hsl(220,45%,18%)]">{stat.value}</div>
              <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider pt-8">
        <h3 className="font-display text-2xl font-semibold text-[hsl(220,45%,18%)] mb-6">Состав совета</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COUNCIL_MEMBERS.map((member) => (
            <div key={member.name} className="bg-white border border-border p-5 hover:border-[hsl(220,45%,35%)] transition-colors duration-200">
              <div className="w-8 h-1 bg-[hsl(38,60%,48%)] mb-3" />
              <p className="font-body font-semibold text-[hsl(220,45%,18%)] text-sm leading-snug">{member.name}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">{member.role}</p>
              <p className="font-body text-xs text-[hsl(38,60%,45%)] mt-0.5 italic">{member.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───── WORKING GROUPS ───── */
function GroupsSection() {
  return (
    <div className="animate-slide-up">
      <div className="border-l-4 border-[hsl(38,60%,48%)] pl-6 mb-10">
        <h2 className="font-display text-4xl font-semibold text-[hsl(220,45%,18%)]">Рабочие группы</h2>
        <p className="font-body text-muted-foreground mt-2 text-sm">Специализированные экспертные группы по ключевым направлениям</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {WORKING_GROUPS.map((group, idx) => (
          <div key={idx} className="bg-white border border-border p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-[hsl(220,45%,18%)] flex items-center justify-center flex-shrink-0">
                <span className="font-display text-[hsl(38,60%,60%)] font-semibold text-lg">{idx + 1}</span>
              </div>
              <span className="font-body text-xs bg-[hsl(216,20%,93%)] text-muted-foreground px-2 py-1">
                {group.members} участников
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-[hsl(220,45%,18%)] leading-snug mb-2">{group.title}</h3>
            <p className="font-body text-sm text-muted-foreground mb-4">{group.chair}</p>
            <div className="border-t border-border pt-4 flex items-center gap-2">
              <Icon name="Calendar" size={14} className="text-[hsl(38,60%,48%)]" />
              <span className="font-body text-xs text-muted-foreground">
                Следующее заседание: <span className="font-medium text-foreground">{group.nextMeeting}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[hsl(220,45%,18%)] text-white p-6">
        <div className="flex items-start gap-4">
          <Icon name="Info" size={20} className="text-[hsl(38,60%,60%)] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-body font-medium text-sm mb-1">Участие в рабочих группах</p>
            <p className="font-body text-sm text-white/70">
              Для участия в заседаниях рабочих групп или вступления в их состав обратитесь к ответственному секретарю.
              Заседания открыты для аккредитованных наблюдателей.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── METHODICAL MATERIALS ───── */
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
      <div className="border-l-4 border-[hsl(38,60%,48%)] pl-6 mb-10">
        <h2 className="font-display text-4xl font-semibold text-[hsl(220,45%,18%)]">Методические материалы</h2>
        <p className="font-body text-muted-foreground mt-2 text-sm">Руководства, стандарты и рекомендации для специалистов</p>
      </div>

      <div className="space-y-3">
        {materials.map((mat, idx) => (
          <div key={idx} className="bg-white border border-border flex items-center gap-4 p-4 hover:border-[hsl(220,45%,35%)] hover:shadow-sm transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-12 bg-[hsl(216,20%,93%)] flex items-center justify-center flex-shrink-0">
              <Icon name="FileText" size={18} className="text-[hsl(220,45%,35%)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-medium text-sm text-[hsl(220,45%,18%)] group-hover:text-[hsl(220,45%,30%)] leading-snug">{mat.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-body text-xs text-muted-foreground">{mat.type}</span>
                <span className="text-border">·</span>
                <span className="font-body text-xs text-muted-foreground">{mat.pages} стр.</span>
                <span className="text-border">·</span>
                <span className="font-body text-xs text-muted-foreground">{mat.year}</span>
              </div>
            </div>
            <Icon name="Download" size={16} className="text-muted-foreground group-hover:text-[hsl(38,60%,48%)] flex-shrink-0 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── DOCUMENTS ───── */
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
          className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Все разделы
        </button>
        <div className="border-l-4 border-[hsl(38,60%,48%)] pl-6 mb-8">
          <h2 className="font-display text-3xl font-semibold text-[hsl(220,45%,18%)]">{cat.title}</h2>
          <p className="font-body text-muted-foreground mt-1 text-sm">{cat.description}</p>
        </div>
        <div className="space-y-3">
          {docs.map((doc, idx) => (
            <div key={idx} className="bg-white border border-border flex items-center gap-4 p-4 hover:border-[hsl(220,45%,35%)] hover:shadow-sm transition-all duration-200 cursor-pointer group">
              <div className="w-10 h-12 bg-[hsl(216,20%,93%)] flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size={18} className="text-[hsl(220,45%,35%)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-sm text-[hsl(220,45%,18%)] group-hover:text-[hsl(220,45%,30%)]">{doc.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-body text-xs text-muted-foreground">{doc.num}</span>
                  <span className="text-border">·</span>
                  <span className="font-body text-xs text-muted-foreground">{doc.date}</span>
                </div>
              </div>
              <Icon name="Download" size={16} className="text-muted-foreground group-hover:text-[hsl(38,60%,48%)] flex-shrink-0 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="border-l-4 border-[hsl(38,60%,48%)] pl-6 mb-10">
        <h2 className="font-display text-4xl font-semibold text-[hsl(220,45%,18%)]">Документы</h2>
        <p className="font-body text-muted-foreground mt-2 text-sm">Выберите раздел для просмотра документов</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DOC_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="bg-white border border-border p-6 text-left hover:border-[hsl(220,45%,35%)] hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-[hsl(220,45%,18%)] flex items-center justify-center">
                <Icon name={cat.icon} fallback="FileText" size={18} className="text-[hsl(38,60%,60%)]" />
              </div>
              <span className="font-body text-xs text-muted-foreground bg-[hsl(216,20%,93%)] px-2 py-1">
                {cat.count} докум.
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold text-[hsl(220,45%,18%)] leading-snug mb-2 group-hover:text-[hsl(220,45%,30%)]">
              {cat.title}
            </h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
            <div className="flex items-center gap-1 mt-4 text-[hsl(38,60%,48%)]">
              <span className="font-body text-xs font-medium">Открыть раздел</span>
              <Icon name="ArrowRight" size={12} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───── CALENDAR ───── */
function CalendarSection() {
  const typeLabels: Record<string, { label: string; color: string }> = {
    meeting: { label: "Заседание РГ", color: "bg-[hsl(220,45%,18%)] text-white" },
    event: { label: "Мероприятие", color: "bg-[hsl(38,60%,48%)] text-white" },
    plenary: { label: "Пленарное", color: "bg-[hsl(0,60%,45%)] text-white" },
  };

  return (
    <div className="animate-slide-up">
      <div className="border-l-4 border-[hsl(38,60%,48%)] pl-6 mb-10">
        <h2 className="font-display text-4xl font-semibold text-[hsl(220,45%,18%)]">Календарь событий</h2>
        <p className="font-body text-muted-foreground mt-2 text-sm">Заседания рабочих групп и мероприятия Совета</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(typeLabels).map(([key, val]) => (
          <span key={key} className={`font-body text-xs px-2 py-1 ${val.color}`}>{val.label}</span>
        ))}
      </div>

      <div className="space-y-3">
        {EVENTS.map((event, idx) => {
          const meta = typeLabels[event.type];
          return (
            <div key={idx} className="bg-white border border-border flex items-stretch hover:shadow-md hover:border-[hsl(220,45%,35%)] transition-all duration-200">
              <div className="w-20 bg-[hsl(216,28%,97%)] border-r border-border flex flex-col items-center justify-center py-4 flex-shrink-0">
                <span className="font-display text-2xl font-semibold text-[hsl(220,45%,18%)]">{event.date}</span>
                <span className="font-body text-xs text-muted-foreground uppercase">{event.month}</span>
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-body font-medium text-sm text-[hsl(220,45%,18%)] leading-snug">{event.title}</h3>
                  <span className={`font-body text-xs px-2 py-0.5 flex-shrink-0 ${meta.color}`}>{meta.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={13} className="text-muted-foreground" />
                    <span className="font-body text-xs text-muted-foreground">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="MapPin" size={13} className="text-muted-foreground" />
                    <span className="font-body text-xs text-muted-foreground">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border border-border bg-white p-5 flex items-start gap-4">
        <Icon name="Bell" size={18} className="text-[hsl(38,60%,48%)] flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-body font-medium text-sm text-foreground mb-1">Получить уведомления</p>
          <p className="font-body text-sm text-muted-foreground">
            Чтобы получать напоминания о предстоящих заседаниях, обратитесь к секретарю Совета.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───── CONTACTS ───── */
function ContactsSection() {
  return (
    <div className="animate-slide-up">
      <div className="border-l-4 border-[hsl(38,60%,48%)] pl-6 mb-10">
        <h2 className="font-display text-4xl font-semibold text-[hsl(220,45%,18%)]">Контакты</h2>
        <p className="font-body text-muted-foreground mt-2 text-sm">Свяжитесь с нами по любым вопросам деятельности Совета</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[
            { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, д. 1, оф. 101" },
            { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
            { icon: "Mail", label: "Электронная почта", value: "info@council-psychiatry.ru" },
            { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00 – 18:00" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[hsl(220,45%,18%)] flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} fallback="MapPin" size={16} className="text-[hsl(38,60%,60%)]" />
              </div>
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                <p className="font-body text-sm font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-border p-6">
          <h3 className="font-display text-xl font-semibold text-[hsl(220,45%,18%)] mb-5">Написать сообщение</h3>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Ваше имя</label>
              <input
                type="text"
                className="w-full border border-border bg-[hsl(216,28%,97%)] px-3 py-2.5 font-body text-sm focus:outline-none focus:border-[hsl(220,45%,35%)] transition-colors"
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Email</label>
              <input
                type="email"
                className="w-full border border-border bg-[hsl(216,28%,97%)] px-3 py-2.5 font-body text-sm focus:outline-none focus:border-[hsl(220,45%,35%)] transition-colors"
                placeholder="example@mail.ru"
              />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Сообщение</label>
              <textarea
                rows={4}
                className="w-full border border-border bg-[hsl(216,28%,97%)] px-3 py-2.5 font-body text-sm focus:outline-none focus:border-[hsl(220,45%,35%)] transition-colors resize-none"
                placeholder="Текст вашего обращения..."
              />
            </div>
            <button className="w-full bg-[hsl(220,45%,18%)] text-white font-body text-sm py-3 hover:bg-[hsl(220,45%,25%)] transition-colors duration-200">
              Отправить обращение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}