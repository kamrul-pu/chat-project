import React, { useState } from 'react'

export default function MessageInput() {
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleSendMessage = () => {
        console.log("send message button clicked!");
    }
    return (
        <div className='message-input'>
            <textarea placeholder='Type your message'
                value={inputValue}
                onChange={handleInputChange}
            ></textarea>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}
