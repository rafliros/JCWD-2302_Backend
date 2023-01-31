import './Login.css';
import {RiChatSmile2Fill, RiSendPlaneLine, RiRadioButtonLine, RiUserSmileLine} from 'react-icons/ri';
import { useState, useEffect } from 'react';

export default function Room(props){
    console.log(props.room)

    const [message, setMessage] = useState([])
    const [usersOnline, setUsersOnline] = useState([])

    props.io.socket.on('total-online', (totalUsers) => {
        console.log(totalUsers)
    })

    props.io.socket.on('message-from-server', (messageServer) => {
        let currentMessage = [...message]
        currentMessage.push(messageServer)
        setMessage(currentMessage)
    })

    useEffect(() => {
        props.io.socket.emit('users-in-room', (props.room.roomname))
        props.io.socket.on('users-in-room-feedback', (usersInRoom) => {
            let currentUsersOnline = [...usersOnline, ...usersInRoom]
            setUsersOnline(currentUsersOnline)
        })
    }, [])

    return(
        <div className='container my-5'>
            <div className='row justify-content-center'>
                <div className='col-10'>
                    <div className='border rounded-0 shadow row' style={{height : "600px", overflow: "auto", position: "relative"}} >
                        <div className="col-4 px-0">
                            <div className="bg-warning px-3 font-weight-bold d-flex align-items-center" style={{ paddingTop: '19px', paddingBottom: '19px' }}>
                                <RiRadioButtonLine /> Users Online
                            </div>
                            {
                                usersOnline.map((value, index) => {
                                    return(
                                        <div className='p-3 font-weight-bold border border-bottom'>
                                            <RiUserSmileLine className='text-success' /> {value.username}
                                        </div>
                                    )
                                })
                            }
                        </div>                        
                        <div className="col-8 px-0">
                            <div className='bg-purple text-light p-3 font-weight-bold d-flex align-items-center' style={{position: "sticky", top: "0px", right: "0px", left: "0px"}}>
                                <RiChatSmile2Fill style={{fontSize: '30px'}} /> Grup Ghibah
                            </div>
                            {
                                message.map((value, index) => {
                                    return(
                                        <div key={index} className="border border-warning rounded text-center mx-3 mt-3 mb-3 py-2" >
                                            {value.message}
                                        </div>
                                    )
                                })
                            }
                            <div className="row justify-content-end mx-1">
                                <div className="px-2 py-2 mx-3 mb-3 rounded bg-purple text-light" style={{display: "inline-block"}}>
                                    Welcome @kevinalamsyah
                                </div>
                            </div>
                            <div className="row justify-content-end mx-1">
                                <div className="px-2 py-2 mx-3 mb-3 rounded bg-purple text-light" style={{display: "inline-block"}}>
                                    Welcome @kevinalamsyah
                                </div>
                            </div>
                            <div className="row justify-content-start mx-1">
                                <div className="px-2 py-2 mx-3 mb-3 rounded border-purple" style={{display: "inline-block"}}>
                                    <i> ryandefryan typing a message </i>
    
                                    <div className='spinner-grow txt-purple mx-1' style={{ width: '4px', height: '4px', marginBottom: '2px' }} />
                                    <div className='spinner-grow txt-purple mx-1' style={{ width: '4px', height: '4px', marginBottom: '2px' }} />
                                    <div className='spinner-grow txt-purple mx-1' style={{ width: '4px', height: '4px', marginBottom: '2px' }} />
                                </div>
                            </div>
                            <div className='p-4 bg-purple d-flex justfy-content-between' style={{width: '633px', zIndex: 1, position: 'fixed', bottom: '66px'}}>
                                <input type='text' placeholder='Enter your message' className='form-control rounded w-100'  />
                                <button className='btn btn-warning rounded mx-1 font-weight-bold d-flex align-items-center'>
                                    <RiSendPlaneLine /> Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}