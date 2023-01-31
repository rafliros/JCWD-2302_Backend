import { useState } from 'react';

import Login from './Pages/Login';
import Room from './Pages/Room';

// Import Socket
import io from 'socket.io-client';

const socket = io('http://localhost:2000');

function App() {
  const [user, setUser] = useState({
    username: null, 
    roomname: null
  })
  let onJoin = (username, roomname) => {
    try {
      if(username && roomname){
        socket.emit('user-join', {username, roomname})
        setUser({username, roomname})
      }
    } catch (error) {
      
    }
  }
  if(user.username && user.roomname){
    return <Room io={{socket}} room={{roomname: user.roomname}} />
  }

  return (
    <Login myFunct={{onJoin}} />
  );
}

export default App;
