import React from 'react'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from '@emotion/css'

  
function Messages({messages,name}) {
    const ROOT_CSS = css({
        height: 410,
        width: 500
      });
    return (
        <ScrollToBottom className={ROOT_CSS}>
            {messages.map((message,index)=>(
                <div key={index}>
                    <Message message={message} name={name}/>
                </div>
            ))}
        </ScrollToBottom>
    )
}

export default Messages
