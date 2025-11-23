"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { Room, Message } from "@/types/chat";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatInput } from "@/components/chat/ChatInput";

export default function ChatPage() {
    const router = useRouter();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const newSocket = io("http://localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        newSocket.on("connect", () => console.log("Connected to WebSocket"));
        newSocket.on("receiveMessage", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        setSocket(newSocket);

        fetch("http://localhost:3000/chat/rooms")
            .then((res) => res.json())
            .then((data) => {
                setRooms(data);
                if (data.length > 0) joinRoom(data[0], newSocket);
            });

        return () => {
            newSocket.disconnect();
        };
    }, [router]);

    const joinRoom = (room: Room, socketInstance: Socket | null = socket) => {
        if (!socketInstance) return;
        socketInstance.emit("joinRoom", room.id);
        setCurrentRoom(room);
        setMessages([]);

        fetch(`http://localhost:3000/chat/rooms/${room.id}/messages`)
            .then((res) => res.json())
            .then((data) => setMessages(data));
    };

    const sendMessage = (content: string) => {
        if (!socket || !currentRoom) return;
        socket.emit("sendMessage", { roomId: currentRoom.id, content });
    };

    const createRoom = async () => {
        const name = prompt("Nombre de la sala:");
        if (!name) return;

        await fetch("http://localhost:3000/chat/rooms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });

        const res = await fetch("http://localhost:3000/chat/rooms");
        const data = await res.json();
        setRooms(data);
    };

    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <ChatSidebar
                rooms={rooms}
                currentRoom={currentRoom}
                onJoinRoom={joinRoom}
                onCreateRoom={createRoom}
            />
            <div className="flex-1 flex flex-col">
                {currentRoom ? (
                    <>
                        <div className="h-16 border-b border-slate-800 flex items-center px-6 bg-slate-950">
                            <h3 className="text-lg font-semibold"># {currentRoom.name}</h3>
                        </div>
                        <ChatMessageList messages={messages} />
                        <ChatInput
                            onSendMessage={sendMessage}
                            placeholder={`Enviar mensaje a #${currentRoom.name}...`}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500 bg-slate-950">
                        Selecciona una sala para comenzar
                    </div>
                )}
            </div>
        </div>
    );
}
