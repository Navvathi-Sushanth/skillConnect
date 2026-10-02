import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export default function SocketProvider({children}){
    
    const [socket, setSocket] = useState(null);

    useEffect(()=>{

        const END_POINT = import.meta.env.END_POINT;
        const newSocket = io("http://localhost:5000",{
            autoConnect: false,
            auth: {
                // token: token
            }
        });

        newSocket.on("connect",()=>{
            console.log("socket connected successfully");
        });
        
        newSocket.on("connect_error",(err)=>{

            console.log("Socket connection error : "+err);
        });

        newSocket.connect();

        setSocket(newSocket);

        newSocket.emit("message","sushant");
    
        return () => {
            newSocket.disconnect();
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