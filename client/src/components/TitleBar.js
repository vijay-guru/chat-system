import React from 'react'
function TitleBar({room}) {
    return (
        <>
        <nav className="navbar">
           <span style={{marginTop:"-15px",marginLeft:"7px"}}> <i  className="fas fa-users"></i></span>
            <p className="room-name" ><strong>ROOM</strong> : {room}</p>
            <a style={{marginTop:"-15px",marginRight:"7px"}} href='/'><i style={{marginTop:"-15px",marginRight:"7px"}} className="fas fa-times-circle"></i></a>
        </nav>
        </>
    )
}

export default TitleBar
