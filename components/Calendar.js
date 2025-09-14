import { todayISO, isoOf } from '../utils/dates'
export default function CalendarModal({ open, onClose, history }){
  if(!open) return null
  const now=new Date()
  const y=now.getFullYear()
  const m=now.getMonth()
  const first=new Date(y,m,1)
  const startOffset=(first.getDay()+6)%7
  const daysInMonth=new Date(y,m+1,0).getDate()
  const cells=[]
  for(let i=0;i<startOffset;i++)cells.push(null)
  for(let d=1;d<=daysInMonth;d++)cells.push(new Date(y,m,d))
  const monthName=now.toLocaleString(undefined,{month:'long',year:'numeric'})
  return(<div className="loader" style={{background:'rgba(0,0,0,.5)'}} onClick={onClose}>
    <div className="card" style={{width:'min(680px,92vw)'}} onClick={e=>e.stopPropagation()}>
      <div className="row" style={{justifyContent:'space-between',marginBottom:8}}>
        <div style={{fontWeight:600}}>{monthName}</div>
        <button onClick={onClose} className="btn" style={{background:'transparent',color:'var(--text)',border:'1px solid rgba(148,163,184,.4)'}}>Close</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8,textAlign:'center',fontSize:12,color:'var(--muted)',marginBottom:8}}>{'MON,TUE,WED,THU,FRI,SAT,SUN'.split(',').map(d=><div key={d}>{d}</div>)}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8}}>
        {cells.map((d,i)=>{
          if(!d) return <div key={i}></div>
          const iso=isoOf(d)
          const v=history?.[iso]
          const isFuture=iso>todayISO()
          const bg=isFuture?'#6b72804d':v==='yes'?'#22c55e':v==='no'?'#ef4444':'#9ca3af'
          return <div key={iso} className="card" style={{padding:8,borderRadius:12,background:bg}}><div style={{fontSize:14,fontWeight:600}}>{d.getDate()}</div><div style={{fontSize:10,opacity:.8}}>{v||(isFuture?'—':'·')}</div></div>
        })}
      </div>
    </div>
  </div>)
}
