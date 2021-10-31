import React from 'react'


function Message({message:{user,text},name}) {
    name=name.trim().toLowerCase()
    let flag=false;
    const string = text;
    const substring = "https://www.google.com/maps?q=";
    if(string.includes(substring)){
        flag=true;
    }
    return (
        <>
        {user===name ? (flag===true ? <p className="mess1 justify-end"><strong>{user} :</strong><a href={text} target="_blank" rel="noreferrer">My Current Location</a></p> :<p className="mess1 justify-end"><strong>{user} :</strong>{text}</p>) : 
        (flag===true ? <p className="mess2 "><strong>{user} :</strong><a href={text} target="_blank" rel="noreferrer">My Current Location</a></p> :<p className="mess2"><strong>{user} :</strong>{text}</p>)
        }
          
        </>
    )
}

export default Message
