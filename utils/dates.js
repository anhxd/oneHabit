export function todayISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function isoOf(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function addDaysISO(iso,n){const [y,m,dd]=iso.split('-').map(Number);const dt=new Date(y,m-1,dd);dt.setDate(dt.getDate()+n);return isoOf(dt)}
export function weekStartMonday(date=new Date()){const d=new Date(date);const dow=(d.getDay()+6)%7;d.setDate(d.getDate()-dow);return d}
