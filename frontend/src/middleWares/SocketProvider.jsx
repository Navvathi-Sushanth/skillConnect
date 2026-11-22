import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export default function SocketProvider({children}){
    
    const [socket, setSocket] = useState(null);

    useEffect(()=>{

        const newSocket = io(import.meta.env.VITE_SOCKET_END_POINT, {
            autoConnect: false,
            auth: {
                token: localStorage.getItem("token"),
            }
        });

        setSocket(newSocket);

        newSocket.on("connect",()=>{
            console.log("socket connected successfully");
        });
        
        newSocket.on("connect_error",(err)=>{

            console.log("Socket connection error : "+err);
        });

        newSocket.connect();

        newSocket.emit("message","SUSHANTH_____18");

        const handleColse = ()=>{
            if(newSocket.connected){
                newSocket.emit("socketDisconnected", {
                    token: localStorage.getItem("token")
                })
            }

            newSocket.disconnect();
        }


        window.addEventListener("beforeunload", handleColse);
        window.addEventListener("pagehide", handleColse);

    
        return () => {
            window.removeEventListener("beforeunload", handleColse);
            window.removeEventListener("pagehide", handleColse);
            handleColse(newSocket);
        }

    },[]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    return useContext(SocketContext);
}