'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/componentCss/login.css'; // Import the CSS file
export default function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [Backend_url,setBackend_url]=useState(process.env.BACKEND_URL)
  const [error,setError]=useState(null)
  const router=useRouter()
 async function handleSubmit(e){
    e.preventDefault()
    console.log("Backend url is ",Backend_url)
    const response=await fetch(`http://localhost:4000/api/auth/login`,{
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
    <div className="login-container">
      {
        error && <p className="error-message">{error}</p>
      }
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
