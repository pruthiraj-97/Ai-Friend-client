'use client'
import React from "react"
import '../componentCss/usermessage.css'
function UserMessage({UserMessage}){
    return (
        <div className="usermessage-div">
            {UserMessage}
        </div>
    )
}
export default UserMessage