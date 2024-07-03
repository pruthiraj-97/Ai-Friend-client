'use client'
import React from 'react'
import NewChatCompo from '@/components/chatcompo'
const NewChat = ({ params }) => {
  return (
    <NewChatCompo id={params.id}/>
  )
}

export default NewChat