'use client'
import React from "react"
import ReactMarkdown from 'react-markdown';
function BotMessage({BotMessage}){
    return (
        <ReactMarkdown>{BotMessage}</ReactMarkdown>
    )
}

export default BotMessage