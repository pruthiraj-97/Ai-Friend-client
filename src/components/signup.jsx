'use client'
import { useState } from 'react';
import '@/componentCss/signup.css';
import { useRouter } from 'next/navigation'; 
export default function SignupCompo() {
  const router=useRouter()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errors,setErrors]=useState(null)
  const [ActivateButton,setActivateButton]=useState(true)
  const [Backend_url,setBackend_url]=useState(process.env.BACKEND_URL)
  async function handleSubmit(e){
    e.preventDefault()
    setActivateButton(false)
    const response=await fetch(`http://localhost:4000/api/auth/signup`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username,email,password
        })
    })
    const data=await response.json()
    console.log(data)
    if(data.status==200){
        router.push('/login')
    }
    setActivateButton(true)
  }

  return (
    <div className="signup-container">
        {
            errors&&<p className='errors'>{errors}</p>
        }
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
