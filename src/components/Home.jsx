'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import '../componentCss/Home.css';
import { useRouter } from 'next/navigation';
export default function HomeCompo() {
  const router=useRouter()
  const [ActivateButton,setActivateButton]=useState(true)
  async function createNewChart(e){
    e.preventDefault()
    console.log("creating")
    if(!ActivateButton) return
    setActivateButton(false)
    const response=await fetch(`http://localhost:4000/api/conversation/createconversation`,{
      method:'POST',
      headers:{
         'Content-Type':'application/json',
         'x-access-token':localStorage.getItem('token')
      }
   })
   const data=await response.json()
   if(data.status==401){
       router.push('/login')
   }
   if(data.status==200){
      router.push(`/newchat/${data.conversation._id}`)
   }
   setActivateButton(true)
   console.log(data)
  }
  return (
    <div className="container">
      <h1 className="title">Welcome to Your AI Friend</h1>
      <p className="description">
        Connect with your AI friend for meaningful conversations, personalized advice, and much more. Click the button below to start chatting!
      </p>
        <button className="chatButton"
          onClick={createNewChart}
        >Start Chatting</button>
    </div>
  );
}
