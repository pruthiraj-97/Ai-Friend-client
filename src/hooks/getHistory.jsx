import React ,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
function getHistory(){
   const router=useRouter()
   const [conversation,setConversation]=useState([])
   useEffect(()=>{
    const getConversationHistory=async ()=>{
       const response=await fetch(`https://geminifusion.vercel.app/api/conversation/history`,{
           method:'GET',
           headers:{
               'x-access-token':localStorage.getItem('token'),
               'Content-Type':'application/json'
           }
       })
       const data=await response.json()
       if(data.status==200){
        setConversation(data.conversationHistory)
       }
       if(data.status==401){
        router.push('/login')
       }
       console.log(data)
    }
    getConversationHistory()
  },[])
  return conversation
}

export default getHistory