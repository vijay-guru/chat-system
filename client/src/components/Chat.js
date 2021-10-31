import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import Messages from './Messages';
import TitleBar from './TitleBar';


let socket;
function Chat({location}) {
    
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([])
    const ENDPOINT='https://chat-system-vj.herokuapp.com/'
      useEffect(()=>{
        const{name,room}=queryString.parse(location.search);
        setName(name);
        setRoom(room)
       socket = io(ENDPOINT, {  
        cors: {
        origin: "https://chat-system-vj.herokuapp.com/",
        credentials: true
      },transports : ['websocket'] });
       socket.emit('join',{name,room},()=>{
       })
       return ()=>{

        socket.disconnect();
          socket.off()
       }
      },[location.search,ENDPOINT])

      useEffect(()=>{
        socket.on('message',(message)=>{
        
            setMessages([...messages,message]);
        })
     },[messages])
     const sendMessage=(event)=>{
         event.preventDefault();
         if(message){
             socket.emit('sendMessage',message,()=>{setMessage('')})
         }
         else{
           return alert("type something to send")
         }
     }
     const sendLocation=()=>{  
      if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser");
    }
     navigator.geolocation.getCurrentPosition((position)=>{
       setMessage(`https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`);
     })
     if(message){
      socket.emit('sendMessage',message,()=>{setMessage('')})
  }
    }
     console.log(message , messages);
    return (
        <div className="message-box">
            <TitleBar room={room}/>
            <div className="row flex-xl-nowrap">
                <div className="col message-area">
                <Messages messages={messages} name={name}/>
                </div>
                </div>
                <div className="row flex-xl-nowrap">
                   <form id="message-form">
                   <div style={{marginLeft:"2px"}}className="col">
                      <input className="form-control-sm" type='text'
                        placeholder="Type a message..."
                        value={message}
                        onChange = {(event) => setMessage(event.target.value)} 
                        onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null} />
                      <div style={{marginLeft:"5px"}}  className="col">
                      <button className="btn-primary" type="button" id="submit-btn" onClick={event=>(sendMessage(event))} >Send</button>
                      </div>
                      <div className="col">
                      <button className="btn-primary" type="button" id='send-location' onClick={sendLocation}>Send Location</button>
                      </div>
                   </div>
                </form>
            </div>
        </div>
    )
}

export default Chat
