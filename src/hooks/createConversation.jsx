import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
function createConversation(){
    const router=useRouter()
    async function handleNewChat(e){
        e.preventDefault()
        const response=await fetch(`https://geminifusion.vercel.app/api/conversation/createconversation`,{
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
      }
      return handleNewChat
}

export default createConversation