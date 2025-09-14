import { todayISO } from '../utils/dates'
export default function WeekDots({ history, baseMondayISO }){
  const days = Array.from({length:7},(_,i)=>{
    const d=new Date(baseMondayISO); d.setDate(d.getDate()+i)
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  })
  return(<div className="weekdots">
    {days.map(iso=>{
      const v = history?.[iso]
      const cls = iso>todayISO() ? 'future' : (v==='yes' ? 'yes' : (v==='no' ? 'no' : ''))
      return <div key={iso} className={`weekdot ${cls}`}/>
    })}
  </div>)
}
