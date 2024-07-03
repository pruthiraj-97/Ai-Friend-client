'use client'
import React from 'react'
import '../componentCss/messageHistory.css'
const MessageHistory = ({msg,handlePastConversation}) => {
  return (
    <div className='messagehistory'
       onClick={(e)=>handlePastConversation(msg._id)}
    >
        {msg.message[0].usermessage.slice(0,40)}
        </div>
  )
}

export default MessageHistory
