import { useMemo, useState } from "react";
import { useFinance } from "../context/FinanceContext";

const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function SpendingCalendar() {
  const { transactions } = useFinance();
  const [month, setMonth] = useState("2026-10");
  const [selected, setSelected] = useState(null);
  const [year, mon] = month.split("-").map(Number);
  const days = new Date(year, mon, 0).getDate();
  const offset = (new Date(year, mon - 1, 1).getDay() + 6) % 7;
  const daily = useMemo(() => {
    const result = {};
    transactions.filter(t => t.date?.startsWith(month)).forEach(t => {
      const day = Number(t.date.slice(8, 10));
      result[day] ||= { income: 0, spent: 0, items: [] };
      result[day][t.type === "Credit" ? "income" : "spent"] += Number(t.amount || 0);
      result[day].items.push(t);
    });
    return result;
  }, [transactions, month]);
  const dailyTarget = 1000;
  const colorFor = (spent) => spent === 0 ? "#f3f4f6" : spent <= dailyTarget * .5 ? "#bbf7d0" : spent <= dailyTarget * .8 ? "#fef08a" : spent <= dailyTarget ? "#fdba74" : "#fca5a5";
  const info = selected ? (daily[selected] || { income: 0, spent: 0, items: [] }) : null;
  return <main className="feature-page"><div className="feature-heading"><div><span className="eyebrow">SPENDING PATTERNS</span><h1>Spending calendar</h1><p>Explore daily income and expenses. Select any date for its transactions.</p></div><input aria-label="Calendar month" type="month" value={month} onChange={e => { setMonth(e.target.value); setSelected(null); }} /></div>
    <section className="feature-card"><div className="calendar-weekdays">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <strong key={d}>{d}</strong>)}</div><div className="spending-calendar-grid">{Array.from({length: offset}, (_,i) => <div key={`blank-${i}`} />)}{Array.from({length: days}, (_,i) => { const day=i+1; const d=daily[day] || {spent:0,income:0}; return <button key={day} className={`calendar-day ${selected===day?"selected":""}`} style={{background:colorFor(d.spent)}} onClick={() => setSelected(day)}><b>{day}</b><span>−{d.spent ? money(d.spent) : "₹0"}</span>{d.income>0 && <small>+{money(d.income)}</small>}</button>; })}</div><div className="calendar-legend">{[["#bbf7d0","Low"],["#fef08a","Moderate"],["#fdba74","High"],["#fca5a5","Over daily target"],["#f3f4f6","No spending"]].map(([c,l])=><span key={l}><i style={{background:c}} />{l}</span>)}</div><p className="muted-note">Demo daily target: ₹1,000. Change this target to your own plan when budget planning is connected.</p></section>
    {selected && <section className="feature-card calendar-day-detail"><div><span className="eyebrow">SELECTED DATE</span><h2>{new Date(year,mon-1,selected).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</h2></div><div className="mini-stat-row"><div><small>Income</small><strong className="positive">{money(info.income)}</strong></div><div><small>Expenses</small><strong className="negative">{money(info.spent)}</strong></div><div><small>Net cash flow</small><strong>{money(info.income-info.spent)}</strong></div></div>{info.items.length ? info.items.map(t=><div className="simple-list-row" key={t.id}><span>{t.title}<small>{t.category}</small></span><strong className={t.type==="Credit"?"positive":"negative"}>{t.type==="Credit"?"+":"−"}{money(Number(t.amount))}</strong></div>) : <p className="muted-note">No transactions recorded for this date.</p>}</section>}
  </main>;
}
