import React from "react";
import ChatRoom from "./ChatRoom";
import { getTrustList } from "./TrustPanelClient"
import { useGlobalContext } from "../../Context/GlobalContext";

export default function TrustPanel ({ email }) {

    const { socket } = useGlobalContext()
    const [trustList, setTrustList] = React.useState([])
    const [isChatOpen, setIsChatOpen] = React.useState(false)
    const [friendMail, setFriendMail] = React.useState("")
    const [room, setRoom] = React.useState("")

    React.useEffect(() => {
        getTrustList( setTrustList );
    }, [trustList.length])

    React.useEffect(() => {
        if (friendMail.length !== 0) {
            setRoom((email.localeCompare(friendMail) === -1) ? email.concat("_", friendMail) : friendMail.concat("_", email))
        }
    }, [friendMail])

    React.useEffect(() => {
        console.log(room)
        if (room.length !== 0) {
            socket.emit('join_room', { email, room })
        }
    }, [room])

    React.useEffect(() => {
        if(!isChatOpen) {
            setRoom("")
            setFriendMail("")
        }
    }, [isChatOpen])

    const openChatRoom = ( event ) => {
        setFriendMail(event.target.parentElement.getAttribute("id"))
        setIsChatOpen(true)
    }

    const trustListHtml = trustList.map((friend, i) => {
        return (
            <div key={i} id={friend.email_id}>
                <div>{friend.first_name} {friend.last_name}</div>
                <div onClick={(e) => openChatRoom(e)}>chat</div>
            </div>
        )
    })

    return (
        <div>
            {trustListHtml}
            {
                isChatOpen && 
                <ChatRoom 
                    user_email={email}
                    friend_email={friendMail}
                    room={room}
                    isChatOpen={isChatOpen}
                    setIsChatOpen={setIsChatOpen}
                /> 
            }
        </div>
    )

}