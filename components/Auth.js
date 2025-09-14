import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
export default function Auth({ onAuthed }){
  const [mode,setMode]=useState('login')
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  function toEmail(u){return `${u}@onehabit.local`}
  async function handleLogin(){setError('');const {data,error}=await supabase.auth.signInWithPassword({email:toEmail(username),password});if(error)return setError(error.message);onAuthed(data.user)}
  async function handleSignup(){setError('');const {data,error}=await supabase.auth.signUp({email:toEmail(username),password});if(error)return setError(error.message);if(data.user)onAuthed(data.user)}
  return(<div className="bg"><div className="container"><div className="card" style={{maxWidth:480,margin:'8vh auto'}}><h1 style={{fontSize:24,marginBottom:8}}>OneHabit</h1><div className="space"/><input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/><div className="space"/><input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>{error&&(<><div className='space'/><div className='muted' style={{color:'#fca5a5'}}>{error}</div></>)}<div className="space"/>{mode==='login'?(<><button className="btn" onClick={handleLogin}>Log in</button><div className="space"/><button onClick={()=>setMode('signup')} className="muted" style={{textDecoration:'underline',background:'transparent',border:0}}>Need an account? Sign up</button></>):(<><button className="btn" onClick={handleSignup}>Create account</button><div className="space"/><button onClick={()=>setMode('login')} className="muted" style={{textDecoration:'underline',background:'transparent',border:0}}>Have an account? Log in</button></>)} </div></div></div>)}
