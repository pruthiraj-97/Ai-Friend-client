'use client'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import '../componentCss/historycompo.css'
import MessageHistory from './messageHistory'
import getHistory from '../hooks/getHistory'
import createConversation from '../hooks/createConversation'
export default function HistoryCompo(){
  const router=useRouter()
  const Messages=getHistory()
  function handlePastConversation(id){
    console.log(id)
    router.push(`/newchat/${id}`)
  }
  return (
    <div className="history-container">
    <div className="new-chat" onClick={createConversation()}>
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
