import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "schedule" | "payments" | "history" | "profile" | "board" | "settings";

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "board", label: "Табло", icon: "Monitor" },
  { id: "schedule", label: "Расписание", icon: "CalendarDays" },
  { id: "payments", label: "Оплата", icon: "CreditCard" },
  { id: "history", label: "История", icon: "ClockIcon" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "settings", label: "Настройки", icon: "Settings" },
] as const;

// ─── Главная ──────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { label: "Записей сегодня", value: "12", icon: "CalendarDays", color: "from-purple-500 to-indigo-600" },
    { label: "Оплачено", value: "₽8 400", icon: "TrendingUp", color: "from-cyan-500 to-blue-600" },
    { label: "Ожидают", value: "3", icon: "Clock", color: "from-orange-500 to-red-500" },
    { label: "Клиентов", value: "47", icon: "Users", color: "from-green-500 to-emerald-600" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/10 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/50 text-sm font-golos mb-1">
            {time.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h1 className="text-4xl font-oswald font-bold gradient-text mb-1">
            {time.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
            <span className="text-white/30 text-2xl ml-2">:{String(time.getSeconds()).padStart(2, "0")}</span>
          </h1>
          <p className="text-white/60 font-golos text-sm">Добро пожаловать!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4 cursor-pointer transition-transform hover:scale-105">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={18} className="text-white" />
            </div>
            <p className="text-2xl font-oswald font-bold text-white">{s.value}</p>
            <p className="text-white/50 text-xs mt-0.5 font-golos">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-white/40 text-xs uppercase tracking-widest font-golos px-1">Быстрые действия</p>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => onNavigate("payments")} className="btn-gradient rounded-2xl p-4 text-left glow-purple">
            <Icon name="QrCode" size={24} className="text-white mb-2" />
            <p className="text-white font-oswald font-semibold">Принять оплату</p>
            <p className="text-white/60 text-xs font-golos">СБП или карта</p>
          </button>
          <button onClick={() => onNavigate("schedule")} className="btn-cyan rounded-2xl p-4 text-left">
            <Icon name="Plus" size={24} className="text-slate-900 mb-2" />
            <p className="text-slate-900 font-oswald font-semibold">Добавить запись</p>
            <p className="text-slate-900/60 text-xs font-golos">В расписание</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Табло ────────────────────────────────────────────────────────────────────
function BoardPage() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const upcoming = [
    { time: "10:00", name: "Анна Смирнова", service: "Консультация", status: "active" },
    { time: "11:30", name: "Пётр Иванов", service: "Лечение", status: "waiting" },
    { time: "13:00", name: "Мария Козлова", service: "Диагностика", status: "waiting" },
    { time: "14:30", name: "Дмитрий Орлов", service: "Процедура", status: "waiting" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="rounded-3xl overflow-hidden relative" style={{ minHeight: 200 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-indigo-700 to-cyan-700" />
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="relative z-10 p-8 text-center">
          <p className="text-white/60 text-sm font-golos tracking-widest uppercase mb-3">
            {time.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h2 className="text-5xl font-oswald font-bold text-white mb-2"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.3)" }}>
            ДОБРО<br />ПОЖАЛОВАТЬ
          </h2>
          <p className="text-white/70 font-golos text-lg">
            {time.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="flex overflow-hidden py-3">
          <div className="animate-ticker whitespace-nowrap text-white/50 text-sm font-golos">
            ✦ Режим работы: Пн–Пт 9:00–20:00 &nbsp;&nbsp; ✦ Суббота: 10:00–17:00 &nbsp;&nbsp; ✦ Воскресенье: выходной &nbsp;&nbsp; ✦ Телефон: +7 (999) 000-00-00 &nbsp;&nbsp; ✦ Добро пожаловать! &nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-white/40 text-xs uppercase tracking-widest font-golos">Очередь сегодня</p>
        {upcoming.map((item, i) => (
          <div key={i} className={`glass rounded-2xl p-4 flex items-center gap-4 ${item.status === "active" ? "border border-purple-500/50 glow-purple" : ""}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-oswald font-bold text-sm ${
              item.status === "active"
                ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
                : "bg-white/10 text-white/60"
            }`}>
              {item.time}
            </div>
            <div className="flex-1">
              <p className="text-white font-golos font-semibold text-sm">{item.name}</p>
              <p className="text-white/40 text-xs">{item.service}</p>
            </div>
            {item.status === "active" && (
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30 font-golos">
                Сейчас
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Расписание ───────────────────────────────────────────────────────────────
function SchedulePage() {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const [activeDay, setActiveDay] = useState(1);

  const slots = [
    { time: "09:00", client: "Анна С.", service: "Консультация", duration: "60 мин", paid: true, amount: "₽2 500" },
    { time: "10:30", client: "Пётр И.", service: "Диагностика", duration: "45 мин", paid: false, amount: "₽1 800" },
    { time: "12:00", client: "—", service: "Свободно", duration: "60 мин", paid: false, amount: "" },
    { time: "13:30", client: "Мария К.", service: "Лечение", duration: "90 мин", paid: true, amount: "₽4 200" },
    { time: "15:30", client: "—", service: "Свободно", duration: "60 мин", paid: false, amount: "" },
    { time: "17:00", client: "Дмитрий О.", service: "Процедура", duration: "30 мин", paid: false, amount: "₽900" },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`flex-shrink-0 w-12 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all font-golos ${
              activeDay === i ? "btn-gradient text-white glow-purple" : "glass text-white/50 hover:text-white"
            }`}
          >
            <span className="text-xs">{d}</span>
            <span className="font-oswald font-bold text-lg">{i + 9}</span>
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl p-4 flex justify-between items-center">
        <div className="text-center">
          <p className="text-white/40 text-xs font-golos">Записей</p>
          <p className="text-white font-oswald font-bold text-xl">4</p>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <p className="text-white/40 text-xs font-golos">Итого</p>
          <p className="gradient-text font-oswald font-bold text-xl">₽9 400</p>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <p className="text-white/40 text-xs font-golos">Свободно</p>
          <p className="text-cyan-400 font-oswald font-bold text-xl">2</p>
        </div>
      </div>

      <div className="space-y-2">
        {slots.map((slot, i) => (
          <div key={i} className={`glass rounded-2xl p-4 flex items-center gap-3 ${slot.client === "—" ? "opacity-40" : ""}`}>
            <div className="text-center w-14 flex-shrink-0">
              <p className="text-white font-oswald font-bold text-base">{slot.time}</p>
              <p className="text-white/30 text-xs font-golos">{slot.duration}</p>
            </div>
            <div className="w-px h-10 bg-white/10 flex-shrink-0" />
            <div className="flex-1">
              <p className={`font-golos font-semibold text-sm ${slot.client === "—" ? "text-white/40" : "text-white"}`}>
                {slot.client === "—" ? "Свободный слот" : slot.client}
              </p>
              <p className="text-white/40 text-xs">{slot.service}</p>
            </div>
            {slot.amount && (
              <div className="text-right flex-shrink-0">
                <p className="text-white font-oswald font-bold text-sm">{slot.amount}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-golos ${
                  slot.paid
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                }`}>
                  {slot.paid ? "Оплачено" : "Не оплачено"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full btn-gradient rounded-2xl p-4 text-white font-oswald font-semibold text-base flex items-center justify-center gap-2">
        <Icon name="Plus" size={20} />
        Добавить запись
      </button>
    </div>
  );
}

// ─── Платежи ──────────────────────────────────────────────────────────────────
function PaymentsPage() {
  const [method, setMethod] = useState<"sbp" | "card">("sbp");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const quickAmounts = ["500", "1000", "1500", "2000", "3000", "5000"];

  return (
    <div className="animate-fade-in space-y-5">
      <h2 className="text-2xl font-oswald font-bold text-white">Приём оплаты</h2>

      <div className="glass rounded-2xl p-1.5 flex gap-1.5">
        <button
          onClick={() => setMethod("sbp")}
          className={`flex-1 rounded-xl py-3 flex items-center justify-center gap-2 font-golos font-semibold text-sm transition-all ${
            method === "sbp" ? "btn-gradient text-white" : "text-white/50 hover:text-white"
          }`}
        >
          <Icon name="Smartphone" size={18} />
          СБП / QR-код
        </button>
        <button
          onClick={() => setMethod("card")}
          className={`flex-1 rounded-xl py-3 flex items-center justify-center gap-2 font-golos font-semibold text-sm transition-all ${
            method === "card" ? "btn-gradient text-white" : "text-white/50 hover:text-white"
          }`}
        >
          <Icon name="CreditCard" size={18} />
          По карте
        </button>
      </div>

      <div className="glass rounded-2xl p-5 space-y-4">
        <label className="text-white/50 text-xs uppercase tracking-widest font-golos">Сумма оплаты</label>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-oswald font-bold gradient-text">₽</span>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0"
            className="flex-1 bg-transparent text-4xl font-oswald font-bold text-white outline-none placeholder-white/20"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {quickAmounts.map(a => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className="glass rounded-xl py-2 text-white/70 text-sm font-golos hover:text-white transition-all"
            >
              ₽{Number(a).toLocaleString("ru-RU")}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Комментарий (необязательно)"
          className="w-full bg-white/5 rounded-xl px-4 py-3 text-white/70 text-sm font-golos outline-none placeholder-white/20 border border-white/10 focus:border-purple-500/50"
        />
      </div>

      {method === "sbp" ? (
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-golos">
            <Icon name="QrCode" size={14} />
            QR-код для оплаты через СБП
          </div>
          <div className="mx-auto w-48 h-48 rounded-2xl bg-white p-4 flex items-center justify-center animate-float">
            <div className="w-full h-full relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="5" y="5" width="28" height="28" rx="3" fill="none" stroke="#7c3aed" strokeWidth="4"/>
                <rect x="11" y="11" width="16" height="16" rx="1" fill="#7c3aed"/>
                <rect x="67" y="5" width="28" height="28" rx="3" fill="none" stroke="#7c3aed" strokeWidth="4"/>
                <rect x="73" y="11" width="16" height="16" rx="1" fill="#7c3aed"/>
                <rect x="5" y="67" width="28" height="28" rx="3" fill="none" stroke="#7c3aed" strokeWidth="4"/>
                <rect x="11" y="73" width="16" height="16" rx="1" fill="#7c3aed"/>
                <rect x="42" y="5" width="5" height="5" fill="#7c3aed"/>
                <rect x="50" y="5" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="13" width="5" height="5" fill="#7c3aed"/>
                <rect x="50" y="21" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="29" width="5" height="5" fill="#7c3aed"/>
                <rect x="5" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="13" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="21" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="29" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="50" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="58" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="66" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="74" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="82" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="90" y="42" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="50" width="5" height="5" fill="#7c3aed"/>
                <rect x="58" y="50" width="5" height="5" fill="#7c3aed"/>
                <rect x="74" y="50" width="5" height="5" fill="#7c3aed"/>
                <rect x="90" y="50" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="58" width="5" height="5" fill="#7c3aed"/>
                <rect x="50" y="58" width="5" height="5" fill="#7c3aed"/>
                <rect x="66" y="58" width="5" height="5" fill="#7c3aed"/>
                <rect x="74" y="58" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="66" width="5" height="5" fill="#7c3aed"/>
                <rect x="58" y="66" width="5" height="5" fill="#7c3aed"/>
                <rect x="66" y="66" width="5" height="5" fill="#7c3aed"/>
                <rect x="82" y="66" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="74" width="5" height="5" fill="#7c3aed"/>
                <rect x="50" y="74" width="5" height="5" fill="#7c3aed"/>
                <rect x="58" y="74" width="5" height="5" fill="#7c3aed"/>
                <rect x="74" y="74" width="5" height="5" fill="#7c3aed"/>
                <rect x="82" y="74" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="82" width="5" height="5" fill="#7c3aed"/>
                <rect x="66" y="82" width="5" height="5" fill="#7c3aed"/>
                <rect x="90" y="82" width="5" height="5" fill="#7c3aed"/>
                <rect x="42" y="90" width="5" height="5" fill="#7c3aed"/>
                <rect x="58" y="90" width="5" height="5" fill="#7c3aed"/>
                <rect x="82" y="90" width="5" height="5" fill="#7c3aed"/>
                <rect x="90" y="90" width="5" height="5" fill="#7c3aed"/>
              </svg>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-white font-golos font-semibold">Перевод на карту через СБП</p>
            <p className="text-white/40 text-sm font-golos">+7 (999) 000-00-00 · Сбербанк</p>
            {amount && (
              <p className="text-2xl font-oswald font-bold gradient-text">₽{Number(amount).toLocaleString("ru-RU")}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-golos">
            <Icon name="CreditCard" size={14} />
            Реквизиты для перевода
          </div>
          <div className="rounded-2xl p-5 relative overflow-hidden" style={{
            background: "linear-gradient(135deg, #a855f7, #6366f1)",
            boxShadow: "0 20px 40px rgba(168,85,247,0.4)"
          }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
            <p className="text-white/70 text-xs font-golos mb-4">VISA / MasterCard</p>
            <p className="text-white font-oswald font-bold text-xl tracking-widest mb-4">
              4276 •••• •••• 1234
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/50 text-xs font-golos">Владелец</p>
                <p className="text-white font-golos font-semibold text-sm">ИВАН ИВАНОВ</p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-xs font-golos">Банк</p>
                <p className="text-white font-golos font-semibold text-sm">Сбербанк</p>
              </div>
            </div>
          </div>
          {amount && (
            <div className="text-center">
              <p className="text-white/50 text-sm font-golos">Сумма к оплате</p>
              <p className="text-3xl font-oswald font-bold gradient-text">₽{Number(amount).toLocaleString("ru-RU")}</p>
            </div>
          )}
        </div>
      )}

      <button className="w-full btn-gradient rounded-2xl p-4 text-white font-oswald font-semibold text-lg glow-purple">
        {method === "sbp" ? "Показать QR клиенту" : "Скопировать реквизиты"}
      </button>
    </div>
  );
}

// ─── История ──────────────────────────────────────────────────────────────────
function HistoryPage() {
  const [balance, setBalance] = useState("24 750");
  const [editBalance, setEditBalance] = useState(false);
  const [tempBalance, setTempBalance] = useState("");

  const transactions = [
    { date: "Сегодня", time: "17:00", client: "Дмитрий О.", method: "СБП", amount: "+₽900", color: "text-green-400" },
    { date: "Сегодня", time: "13:30", client: "Мария К.", method: "Карта", amount: "+₽4 200", color: "text-green-400" },
    { date: "Сегодня", time: "09:00", client: "Анна С.", method: "СБП", amount: "+₽2 500", color: "text-green-400" },
    { date: "Вчера", time: "16:00", client: "Возврат", method: "СБП", amount: "-₽1 500", color: "text-red-400" },
    { date: "Вчера", time: "14:00", client: "Сергей В.", method: "Карта", amount: "+₽3 200", color: "text-green-400" },
    { date: "Вчера", time: "11:00", client: "Ольга Н.", method: "СБП", amount: "+₽2 100", color: "text-green-400" },
  ];

  const grouped = transactions.reduce((acc, t) => {
    if (!acc[t.date]) acc[t.date] = [];
    acc[t.date].push(t);
    return acc;
  }, {} as Record<string, typeof transactions>);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/10 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/50 text-xs uppercase tracking-widest font-golos mb-2">Текущий баланс</p>
          {editBalance ? (
            <div className="flex items-center gap-2">
              <span className="text-3xl font-oswald font-bold text-white">₽</span>
              <input
                autoFocus
                type="text"
                value={tempBalance}
                onChange={e => setTempBalance(e.target.value)}
                onBlur={() => { if (tempBalance) setBalance(tempBalance); setEditBalance(false); }}
                onKeyDown={e => { if (e.key === "Enter") { if (tempBalance) setBalance(tempBalance); setEditBalance(false); } }}
                className="bg-transparent text-3xl font-oswald font-bold text-white outline-none border-b border-purple-500 w-48"
              />
            </div>
          ) : (
            <button
              onClick={() => { setTempBalance(balance.replace(/\s/g, "")); setEditBalance(true); }}
              className="flex items-center gap-3 group"
            >
              <p className="text-4xl font-oswald font-bold gradient-text">₽{balance}</p>
              <Icon name="Pencil" size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
            </button>
          )}
          <p className="text-white/30 text-sm font-golos mt-1">Нажми на сумму чтобы изменить</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Сегодня", value: "+₽7 600", color: "text-green-400" },
          { label: "Эта неделя", value: "+₽32 100", color: "text-cyan-400" },
          { label: "Месяц", value: "+₽124K", color: "text-purple-400" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-xl p-3 text-center">
            <p className={`font-oswald font-bold text-base ${s.color}`}>{s.value}</p>
            <p className="text-white/30 text-xs font-golos mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="text-white/30 text-xs uppercase tracking-widest font-golos mb-2 px-1">{date}</p>
            <div className="space-y-2">
              {items.map((t, i) => (
                <div key={i} className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    t.method === "СБП" ? "bg-green-500/20" : "bg-blue-500/20"
                  }`}>
                    <Icon name={t.method === "СБП" ? "Smartphone" : "CreditCard"} size={18}
                      className={t.method === "СБП" ? "text-green-400" : "text-blue-400"} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-golos font-semibold text-sm">{t.client}</p>
                    <p className="text-white/30 text-xs">{t.method} · {t.time}</p>
                  </div>
                  <p className={`font-oswald font-bold text-base ${t.color}`}>{t.amount}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Профиль ──────────────────────────────────────────────────────────────────
function ProfilePage() {
  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col items-center py-6 gap-4">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-oswald font-bold glow-purple animate-float">
          ИИ
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-oswald font-bold text-white">Иван Иванов</h2>
          <p className="text-white/40 font-golos text-sm">+7 (999) 000-00-00</p>
        </div>
        <button className="btn-gradient px-6 py-2 rounded-xl text-white font-golos text-sm">
          Редактировать
        </button>
      </div>

      <div className="space-y-2">
        {[
          { label: "Название", value: "ИП Иванов И.И.", icon: "Building2" },
          { label: "Телефон", value: "+7 (999) 000-00-00", icon: "Phone" },
          { label: "Email", value: "info@example.ru", icon: "Mail" },
          { label: "Карта для СБП", value: "4276 •••• •••• 1234", icon: "CreditCard" },
          { label: "Банк", value: "Сбербанк", icon: "Landmark" },
        ].map((item, i) => (
          <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Icon name={item.icon} size={18} className="text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-white/40 text-xs font-golos">{item.label}</p>
              <p className="text-white font-golos font-semibold text-sm">{item.value}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Настройки ────────────────────────────────────────────────────────────────
function SettingsPage() {
  const [toggles, setToggles] = useState({
    notifications: true,
    sound: false,
    autoQr: true,
    darkMode: true,
    confirmPayment: true,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles(p => ({ ...p, [key]: !p[key] }));

  const settings = [
    {
      group: "Оплата",
      items: [
        { key: "autoQr", label: "Авто-QR при записи", desc: "Генерировать QR автоматически", icon: "QrCode" },
        { key: "confirmPayment", label: "Подтверждение оплаты", desc: "Запрашивать подтверждение", icon: "ShieldCheck" },
      ],
    },
    {
      group: "Уведомления",
      items: [
        { key: "notifications", label: "Push-уведомления", desc: "Уведомления о новых записях", icon: "Bell" },
        { key: "sound", label: "Звук", desc: "Звуковые оповещения", icon: "Volume2" },
      ],
    },
    {
      group: "Интерфейс",
      items: [
        { key: "darkMode", label: "Тёмная тема", desc: "Тёмный фон интерфейса", icon: "Moon" },
      ],
    },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      <h2 className="text-2xl font-oswald font-bold text-white">Настройки</h2>
      {settings.map(section => (
        <div key={section.group} className="space-y-2">
          <p className="text-white/30 text-xs uppercase tracking-widest font-golos px-1">{section.group}</p>
          <div className="space-y-1">
            {section.items.map(item => (
              <div key={item.key} className="glass rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={18} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-golos font-semibold text-sm">{item.label}</p>
                  <p className="text-white/30 text-xs font-golos">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.key as keyof typeof toggles)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    toggles[item.key as keyof typeof toggles] ? "bg-purple-500" : "bg-white/10"
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                    toggles[item.key as keyof typeof toggles] ? "left-6" : "left-0.5"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center py-4">
        <p className="text-white/20 text-xs font-golos">Версия 1.0.0</p>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={setPage} />;
      case "board": return <BoardPage />;
      case "schedule": return <SchedulePage />;
      case "payments": return <PaymentsPage />;
      case "history": return <HistoryPage />;
      case "profile": return <ProfilePage />;
      case "settings": return <SettingsPage />;
      default: return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <div className="bg-mesh min-h-screen font-golos">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        <header className="glass-strong sticky top-0 z-50 px-5 py-3 flex items-center justify-between">
          <h1 className="font-oswald font-bold text-white text-lg gradient-text">
            {NAV_ITEMS.find(n => n.id === page)?.label ?? "Главная"}
          </h1>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 glass rounded-xl flex items-center justify-center">
              <Icon name="Bell" size={16} className="text-white/60" />
            </button>
            <button
              onClick={() => setPage("profile")}
              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs font-oswald font-bold"
            >
              И
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 overflow-y-auto pb-24">
          {renderPage()}
        </main>

        <nav className="glass-strong fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-3 py-2">
          <div className="flex gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id as Page)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition-all ${
                  page === item.id ? "nav-active" : "text-white/30 hover:text-white/60"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="text-[9px] font-golos leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}