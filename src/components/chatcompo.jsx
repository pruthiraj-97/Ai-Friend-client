'use client'
import { useState,useEffect } from 'react';
import '@/componentCss/chatcompo.css'; // Import the CSS file
import { useRouter } from 'next/navigation';
import UserMessage from './usermessage';
import BotMessage from './botmessage';
import HistoryCompo from './histrorycompo';
export default function NewChatCompo({id}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [Backend_url,setBackend_url]=useState(process.env.BACKEND_URL)
  const [conversation,setConversation]=useState(null)
  const [ActivateButton,setActivateButton]=useState(true)
  const router=useRouter()
  useEffect(()=>{
   async function createNewConversation(){  
       setActivateButton(false)
       const response=await fetch(`http://localhost:4000/api/conversation/getconversation/${id}`,{
          method:'GET',
          headers:{
             'Content-Type':'application/json',
             'x-access-token':localStorage.getItem('token')
          }
       })
       const data=await response.json()
       console.log(data)
       if(data.status==401){
        router.push('/login')
       }
       if(data.status==200){
        setConversation(data.conversation)
        setMessages(data.conversation.message)
       }
       setActivateButton(true)
    }
    createNewConversation()
  },[])
  
  async function handleSendMessage(e){
    e.preventDefault()
    setActivateButton(false)
    setMessage('')
    const response=await fetch(`http://localhost:4000/api/conversation/addmessage/${conversation._id}`,{
      method:'POST',
      headers:{
        'x-access-token':localStorage.getItem('token'),
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        message
      })
    })
    const data=await response.json()
    if(data.status==401){
      router.push('/login')
    }
    if(data.status==200){
      setMessages([...messages,data.data])
    }
    console.log(data)
    setActivateButton(true)
  }
  return (
    <div className='chat-box'>
    <HistoryCompo/>
    <div className='main-chat-box'>
    <div className="chat-container">
      <div className="chat-messages">
        {
          messages.length>0&&messages.map((mess)=>(
            <div key={mess._id} className='chat-response'>
               <UserMessage UserMessage={mess.usermessage}/>
               <BotMessage BotMessage={mess.botmessage}/>
            </div>
          ))
        }
      </div>
    </div>
    <div className="chat-input-container">
        <input
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        </div>
        </div>
        </div>
  );
}
