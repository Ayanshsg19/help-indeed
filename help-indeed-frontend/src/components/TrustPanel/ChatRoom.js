import React from "react"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useGlobalContext } from "../../Context/GlobalContext";

export default function ChatRoom ({ user_email, friend_email, room, isChatOpen, setIsChatOpen }) {

    const { socket } = useGlobalContext()
    const [messageRecieved, setMessageRecieved] = React.useState([])
    const [messageSent, setMessageSent] = React.useState("")

    const messagesColumnRef = React.useRef(null);

    React.useEffect(() => {
        socket.on('recieve_message', (message) => {
            setMessageRecieved(prev => [...prev, message])
        })
        return () => socket.off('recieve_message')
    }, [socket])

    React.useEffect(() => {
        if(messageRecieved.length === 0) {
            socket.on('message_history', (messages) => {
                console.log(messages)
                setMessageRecieved(messages)
            })
            return () => socket.off('message_history');
        }
    }, [messageRecieved])

    React.useEffect(() => {
        messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
      }, [messageRecieved]);

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(+timestamp);
        console.log(date)
        return date.toLocaleString();
      }

    const messageRecievedHtml = messageRecieved.map((data, i) => {
        return (
            <div key={i}>
                <div>{data.email}</div>
                <div>{formatDateFromTimestamp(data.time)}</div>
                <div>{data.message}</div>
            </div>
        )
    })
    
    const sendMessage = () => {
        if(messageSent !== "") {
            const __createdtime__ = Date.now()
            socket.emit('send_message', {user_email, messageSent, room, __createdtime__})
            setMessageSent("")
        }
    }

    const leaveChatRoom = () => {
        const __createdtime__ = Date.now()
        socket.emit('leave_room', {user_email, room, __createdtime__})
        setIsChatOpen(false)
    }

    return (
        <div>
            <div>
                <div>{friend_email}</div>
                <div>
                <Button
                    className="chat_close"
                    type="submit"
                    variant="contained"
                    onClick={leaveChatRoom}
                >
                    close
                </Button>
                </div>
            </div>
            <div ref={messagesColumnRef}>
                {messageRecievedHtml}
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Enter message ..."
                    value={messageSent}
                    onChange={(e) => setMessageSent(e.target.value)}
                    variant="outlined"
                />
                <Button
                    className="message-send"
                    type="submit"
                    variant="contained"
                    onClick={sendMessage}
                >
                    send
                </Button>
            </div>
        </div>
    )
}