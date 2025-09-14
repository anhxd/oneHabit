import { motion } from 'framer-motion'
export default function ConfirmModal({ open, onConfirm, onCancel }){ if(!open) return null
  return(<div onClick={onCancel} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:90}}>
    <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.2}} onClick={e=>e.stopPropagation()} className="card" style={{width:380,textAlign:'center'}}>
      <img src="/assets/cat.png" alt="are you sure?" style={{width:140,height:'auto',borderRadius:12,margin:'0 auto 12px'}}/>
      <div style={{fontSize:18,marginBottom:8}}>Are you sure???</div>
      <div className="muted" style={{fontSize:13,marginBottom:14}}>This will clear your streak and calendar history.</div>
      <div className="row" style={{justifyContent:'center'}}>
        <button className="btn" onClick={onConfirm}>Yes, reset</button>
        <button className="btn" onClick={onCancel} style={{background:'transparent',color:'var(--text)',border:'1px solid rgba(148,163,184,.4)'}}>Cancel</button>
      </div>
    </motion.div>
  </div>)}
