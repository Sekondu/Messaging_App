import styles from './user.module.css'
import profile from '../src/assets/profile.svg'
import search from '../src/assets/search.svg'
import notification from '../src/assets/notifications.svg'
import chat from '../src/assets/chat.svg'
import settings from '../src/assets/settings.svg'
import message from '../src/assets/chat_bubble.svg'
import logout from '../src/assets/LogOut.svg'
import { useState,useRef,useEffect } from 'react'
import send from '../src/assets/send.svg'
import { useSearchParams,useNavigate } from 'react-router-dom'
export function User(){
    let [expandBar,setExpand]=useState(false);
    let [chatSelected,setSelectedChat]=useState("");

    function SelectChat(obj){
        setSelectedChat(obj);
    }

    function Expand(value){
        setExpand(value);
    }
    

    return <div className={styles.application} style={{display:"flex"}}>
        <SideBar expand={Expand} expanded={expandBar}/>
        <Friends SelectChat={SelectChat} selectedChat={chatSelected}/>
        <Chat chatSelected={chatSelected}/>
    </div>
}

function SideBar({expand,expanded}){

        const navigate=useNavigate();

        function handleLogOut(){
        localStorage.removeItem("token");
        navigate("/");
    }

    return <div className={styles.sideBar}
    onMouseEnter={() => expand(true)}
    onMouseLeave={() => expand(false)}
    style={{alignItems:expanded?'flex-start':"center",transition:"transform 0.5s ease,width 0.5s ease",transform:expanded ? "translateX(0)" : "translateX(10px)",width:expanded?"20%":"10%"}}>
        <div className={styles.icon_div}>
        <img src={profile} alt="" />
        {expanded && <p>Profile</p>}
        </div>
        <div className={styles.multi_icon}>
            <div>
            <img src={chat} alt="" />
            {expanded && <p>Chats</p>}
            </div>
            <div>
            <img src={search} alt="" />
            {expanded && <p>Search</p>}
            </div>
            <div>
            <img src={notification} alt="" />
            {expanded && <p>Notifications</p>}
            </div>
        </div>
        <div>
        <img src={settings} alt="" />
        {expanded && <p>Settings</p>}
        </div>
        <div onClick={() => handleLogOut()} style={{cursor:"pointer"}}>
             <img src={logout} alt="" />
        {expanded && <p>Log Out</p>}
        </div>
    </div>
}
function Friends({SelectChat,selectedChat}){

    let [friends,setFriends]=useState();
    useEffect(() => {
        const token=localStorage.getItem("token");
        const data=async () => {
            let response = await fetch(`http://localhost:3000/friends`,{
                method:"GET",
                headers :{"authorization" : `Bearer ${token}`}
            })
            let data=await response.json();
            setFriends(data);
        }
        data();
    },[])
    let All;
    if(friends){
    All=Object.values(friends);
    }

    return <div className={styles.friends}>
        {friends && All[0].map(friend => {
            return <div onClick={() => {
                SelectChat(friend)}} className={selectedChat.username==friend.username ? styles.selected_chat : ""} key={friend.username}>
                <div>
                <img className={styles.profile} src={profile} alt="" />
                <h2>{friend.username}</h2>
                </div>
                <div>
                    <p className={styles.time}><strong>{friend.timeStamp}</strong></p>

                </div>
            </div>
        })}
        <h2>Add More friends from the SideBar!</h2>
    </div>
}
function Chat({chatSelected}){
    let [messages,setMessages]=useState([]);
    let [Allmessages,setAllMessages]=useState([]);
    let [message,setMessage]=useState("");
    const [searchParams]=useSearchParams();

    function getMsgs(){

        const username=searchParams.get("user");
        const token=localStorage.getItem("token");
        const data=async() => {
            const res=await fetch(`http://localhost:3000/msgs?user=${username}`,{
                method:"POST",
            headers : {"authorization" : `Bearer ${token}`}}
            );
            if(res.ok){
                const msgs=await res.json();
                setAllMessages(msgs.messages.messageSent);
                setMessage("");
            }
        }
        data();
    }

    useEffect(() => {
        getMsgs();
    },[])
    let messageScroll=useRef();
    useEffect(() => {
        if(messageScroll.current){
            messageScroll.current.scrollTop=messageScroll.current.scrollHeight;
        }
    },[messages])

            useEffect(() => {
            setMessages(Allmessages.filter(m => m.to==chatSelected.id));
        },[chatSelected,Allmessages])

    return <>{chatSelected && <div className={styles.chat}>
        <header>
            <img className={styles.profile} src={profile} alt="" />
            <h3>{chatSelected.username}</h3>
        </header>
        <main ref={messageScroll}>
            <h3 className={styles.chat_start}>This is where the chat starts!</h3>
            <div className={styles.AllMessages}>
                {messages && messages.map(m => {
                    let date=new Date(m.Time);
                    return <div>
                        <p className={styles.message_time}>{date.toLocaleTimeString("en-US",{hour12:true})}</p>
               <p className={styles.message}>{m.content}</p>
                    </div>
                })}
            </div>
            
        </main>
        
        
        <footer>
        <form className={styles.send_form} onSubmit={async (e) => {
            e.preventDefault();
            const token=localStorage.getItem("token");
            const res=await fetch(`http://localhost:3000/AddMsg`,{
                method:"POST",
                headers:{"authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"},
            body : JSON.stringify({content : message , to : chatSelected.id})}
            )
            
            getMsgs();
        }}>
        <input type="text" placeholder='Type Message Here' value={message} onChange={e => setMessage(e.target.value )} required/>
        <button className={styles.send_btn} type="submit"><img className={styles.send} src={send} alt="" /></button>
        </form>
        </footer>
    </div>
}
</>
}
