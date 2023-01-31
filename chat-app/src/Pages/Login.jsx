import './Login.css';
import {useRef} from 'react';

export default function Login(props){
    const username = useRef()
    const groupname = useRef()
    return(
        <div className='container'>
            <div className='row justify-content-center align-items-center m-5'>
                <div className="col-6">
                    <img src={'https://cdn.dribbble.com/users/20368/screenshots/3949907/live_chat_anim_2.gif'} className='w-100' />
                </div>
                <div className='col-6'>
                    <div className='border rounded shadow p-5 text-center'>
                        <h1 className='txt-purple'>Chat.</h1>
                        <input type='text' ref={username} placeholder='Your Username' className='form-control mt-3'/>
                        <input type='text' ref={groupname} placeholder='Your Room Name' className='form-control mt-3'/>
                        <button onClick={() => props.myFunct.onJoin(username.current.value, groupname.current.value)} className='w-100 btn bg-purple text-light mt-3'>
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}