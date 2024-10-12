'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/componentCss/login.css'; // Import the CSS file
export default function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const router=useRouter()
 async function handleSubmit(e){
    e.preventDefault()
    const response=await fetch(`https://ai-friend-server.vercel.app/api/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,password
      })
    })
    const data=await response.json()
    if(data.status==200){
      localStorage.setItem('token',data.token)
      router.push('/')
    }
    if(data.status==400){
      setError(data.message)
    }
    console.log(data)
  }
  return (
    <div className='login-container'>
      <div className="login-container-box">
      {
        error && <p className="error-message">{error}</p>
      }
      <div className='login-box'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
       <p>
       <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder='enter email'
          required
        />
       </p>

       <p>
       <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder='enter password'
          required
        />
       </p>
       <button className='login-submit'>submit</button>
      </form>
      </div>
    </div>
    </div>
  );
}
