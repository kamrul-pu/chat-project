import React from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import withAuthentication from '../utils/withAuthentication'


function ChatArea() {
    return (
        <div className='chat-area'>
            <div className="chat-header">
            </div>
            <div className="chat-messages">
                <Message text="Hey, How's it going" sent />
                <Message text="I'm Good" received />
            </div>
            <MessageInput />
        </div>
    )
}

// export default withAuthentication(ChatArea);
export default ChatArea;
