import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import WeekDots from './WeekDots'
import CalendarModal from './Calendar'
import ConfirmModal from './ConfirmModal'
import { todayISO, addDaysISO, isoOf, weekStartMonday } from '../utils/dates'
import { supabase } from '../utils/supabaseClient'

const QUOTES=['Small steps every day lead to big change.','You don’t need perfect—just progress.','Discipline is choosing what you want most over what you want now.','Streaks are built one day at a time.','Motion creates emotion. Do one small thing.','Done is better than perfect.','Consistency compounds.','Win the day.','You’re one click from momentum.','Show up, even if it’s just 1%.','Tiny habits, massive results.','Future you is cheering for you.']
function dailyQuote(){const start=new Date(new Date().getFullYear(),0,1);const diff=Math.floor((new Date()-start)/86400000);return QUOTES[diff%QUOTES.length]}

export default function Tracker({ user }){
  const storageKey=(k)=>`onehabit.${user?.id||'anon'}.${k}`
  const [habitName,setHabitName]=useState(()=>localStorage.getItem(storageKey('habit'))||'')
  const [streak,setStreak]=useState(()=>Number(localStorage.getItem(storageKey('streak'))||0))
  const [notes,setNotes]=useState(()=>localStorage.getItem(storageKey('notes'))||'')
  const [history,setHistory]=useState(()=>JSON.parse(localStorage.getItem(storageKey('history'))||'{}'))
  const [showCal,setShowCal]=useState(false)
  const [confirmReset,setConfirmReset]=useState(false)

  useEffect(()=>{localStorage.setItem(storageKey('habit'),habitName)},[habitName])
  useEffect(()=>{localStorage.setItem(storageKey('streak'),String(streak))},[streak])
  useEffect(()=>{localStorage.setItem(storageKey('notes'),notes)},[notes])
  useEffect(()=>{localStorage.setItem(storageKey('history'),JSON.stringify(history))},[history])

  const quote=useMemo(dailyQuote,[])
  const today=todayISO()
  const doneToday=history[today]==='yes'

  function toggleToday(){
    setHistory(prev=>{const h={...prev};if(h[today]==='yes'){delete h[today];let s=0;let cursor=addDaysISO(today,-1);while(h[cursor]==='yes'){s++;cursor=addDaysISO(cursor,-1)}setStreak(s)}else{h[today]='yes';const yISO=addDaysISO(today,-1);const cont=h[yISO]==='yes';setStreak(cont?streak+1:1)}return h})
  }
  function clearAll(){setStreak(0);setHistory({})}
  async function logout(){await supabase.auth.signOut();window.location.reload()}

  const weekBaseMonday=isoOf(weekStartMonday(new Date()))
  const cardProps={initial:{scale:.985,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.3}}

  return(<div className="bg"><div className="container">
    <motion.div className="card" {...cardProps}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{fontSize:24,fontWeight:600}}>Hello, {user?.user_metadata?.username||(user?.email?.split('@')[0])||'friend'}</div>
          <motion.img src="/assets/pikachu.png" alt="pikachu" className="bounce" whileHover={{scale:1.1,rotate:5}} style={{height:44,width:'auto'}}/>
        </div>
        <div className="muted" style={{fontSize:12}}>{new Date().toLocaleDateString()}</div>
      </div>
      <div className="space"/>
      <div className="muted" style={{fontSize:13,fontStyle:'italic'}}>“{quote}”</div>
    </motion.div>

    <div className="space-lg"/>

    <motion.div className="card" {...cardProps}>
      <div style={{display:'flex',gap:12,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:260}}>
          <div className="muted" style={{fontSize:12}}>Your habit</div>
          <input className="input" placeholder="e.g., run, meditate, code" value={habitName} onChange={e=>setHabitName(e.target.value)}/>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{textAlign:'center'}}>
            <div className="muted" style={{fontSize:12}}>Streak</div>
            <div style={{fontSize:30,fontWeight:800}}>{streak}</div>
          </div>
          <button className="btn" onClick={toggleToday}>{doneToday?'Undo today':'Did you do it?'}</button>
          <button onClick={()=>setConfirmReset(true)} style={{border:0,background:'transparent'}} className="muted"><em style={{fontSize:12}}>reset streak & calendar</em></button>
        </div>
      </div>
    </motion.div>

    <div className="space-lg"/>

    <motion.div className="card" {...cardProps}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>This week (Mon → Sun)</div>
        <div className="row">
          <WeekDots history={history} baseMondayISO={weekBaseMonday}/>
          <button onClick={()=>setShowCal(true)} className="muted" style={{textDecoration:'underline',background:'transparent',border:0}}>Open calendar</button>
        </div>
      </div>
    </motion.div>

    <div className="space-lg"/>

    <motion.div className="card" {...cardProps}>
      <div style={{fontSize:14,marginBottom:8}}>Notes</div>
      <textarea className="textarea" placeholder="Write your thoughts, reflections, or plans here..." value={notes} onChange={e=>setNotes(e.target.value)}/>
    </motion.div>

    <div className="space-lg"/>

    <motion.div className="card" {...cardProps}>
      <button className="btn" onClick={logout}>Log out</button>
    </motion.div>
  </div>
  <CalendarModal open={showCal} onClose={()=>setShowCal(false)} history={history}/>
  <ConfirmModal open={confirmReset} onConfirm={()=>{setConfirmReset(false);clearAll()}} onCancel={()=>setConfirmReset(false)}/>
</div>)
}
