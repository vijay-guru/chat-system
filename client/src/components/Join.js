import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import '../index.css'
function Join() {
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    return (
        <div className="joinOuterContainer">
            <div className="container">
            <h2 className="text-center">Join chat room</h2>
            <input type="text" className="form-control" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/>
            <input type="text" className="form-control" placeholder="Enter room name" value={room} onChange={(e)=>{setRoom(e.target.value)}}/><br/>
            <Link onClick={(event)=>(!name || !room ?event.preventDefault():null )} to={`/chat?name=${name}&room=${room}`}>
                <button className=" btn btn-block btn-success" type="button">Join Room</button>
            </Link>
            </div>
        </div>
    )
}
export default Join