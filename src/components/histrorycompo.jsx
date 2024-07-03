'use client'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import '../componentCss/historycompo.css'
import MessageHistory from './messageHistory'
export default function HistoryCompo(){
  const router=useRouter()
  const [Messages,setMessages]=useState([])
  const [ActivateNewChat,setActivateNewChat]=useState(true)
  useEffect(()=>{
    const getConversationHistory=async ()=>{
       const response=await fetch(`http://localhost:4000/api/conversation/history`,{
           method:'GET',
           headers:{
               'x-access-token':localStorage.getItem('token'),
               'Content-Type':'application/json'
           }
       })
       const data=await response.json()
       if(data.status==200){
        setMessages(data.conversationHistory)
       }
       if(data.status==401){
        router.push('/login')
       }
       console.log(data)
    }
    getConversationHistory()
  },[])
  async function handleNewChat(e){
    e.preventDefault()
    setActivateNewChat(false)
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
   console.log(data)
   setActivateNewChat(true)
  }
  function handlePastConversation(id){
    console.log(id)
    router.push(`/newchat/${id}`)
  }
  return (
    <div className="history-container">
    <div className="new-chat" onClick={handleNewChat}>
      New Chat
    </div>
    <div className="history-header">Conversation History</div>
    <div className="messages-container">
      {Messages.length>0 && Messages.map((msg, index) => (
            msg.message.length>0&&(
              <MessageHistory key={msg._id} msg={msg} handlePastConversation ={handlePastConversation}/>
            )
      ))}
    </div>
  </div>
  )
}
