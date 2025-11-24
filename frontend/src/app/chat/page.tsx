"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { Room, Message } from "@/types/chat";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { Hash, Users, Circle } from "lucide-react";

interface OnlineUser {
    id: string;
    name: string;
    email: string;
}

export default function ChatPage() {
    const router = useRouter();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        // Decode token to get user email
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUserEmail(payload.email);
        } catch (e) {
            console.error("Error decoding token:", e);
        }

        const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        newSocket.on("connect", () => console.log("Connected to WebSocket"));

        newSocket.on("receiveMessage", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        newSocket.on("roomCreated", (room: Room) => {
            setRooms((prev) => [...prev, room]);
        });

        newSocket.on("roomDeleted", (roomId: string) => {
            setRooms((prev) => prev.filter((r) => r.id !== roomId));
            if (currentRoom?.id === roomId) {
                setCurrentRoom(null);
                setMessages([]);
            }
        });

        newSocket.on("messageDeleted", (messageId: string) => {
            setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
        });

        // Listen for online users updates
        newSocket.on("onlineUsers", (users: OnlineUser[]) => {
            setOnlineUsers(users);
        });

        // Listen for user joined notifications
        newSocket.on("userJoined", (data: { user: OnlineUser }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `system-${Date.now()}`,
                    content: `${data.user.name} se unió a la sala`,
                    createdAt: new Date().toISOString(),
                    user: { name: "Sistema", email: "system", avatar: "" },
                } as Message,
            ]);
        });

        // Listen for user left notifications
        newSocket.on("userLeft", (data: { user: OnlineUser }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `system-${Date.now()}`,
                    content: `${data.user.name} salió de la sala`,
                    createdAt: new Date().toISOString(),
                    user: { name: "Sistema", email: "system", avatar: "" },
                } as Message,
            ]);
        });

        setSocket(newSocket);

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/chat/rooms`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to connect to backend");
                return res.json();
            })
            .then((data) => {
                setRooms(data);
                if (data.length > 0) joinRoom(data[0], newSocket);
            })
            .catch((err) => console.error("Error fetching rooms:", err));

        return () => {
            newSocket.disconnect();
        };
    }, [router]);

    const joinRoom = (room: Room, socketInstance: Socket | null = socket) => {
        if (!socketInstance) return;
        socketInstance.emit("joinRoom", room.id);
        setCurrentRoom(room);
        setMessages([]);

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/chat/rooms/${room.id}/messages`)
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch((err) => console.error("Error fetching messages:", err));
    };

    const sendMessage = (content: string) => {
        if (!socket || !currentRoom) return;
        socket.emit("sendMessage", { roomId: currentRoom.id, content });
    };

    const createRoom = async () => {
        const name = prompt("Nombre de la sala:");
        if (!name || !socket) return;

        try {
            socket.emit("createRoom", { name });
        } catch (err) {
            console.error("Error creating room:", err);
        }
    };

    const deleteRoom = async (roomId: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar esta sala?") || !socket) return;

        try {
            socket.emit("deleteRoom", roomId);
        } catch (err) {
            console.error("Error deleting room:", err);
        }
    };

    const deleteMessage = async (messageId: string) => {
        if (!currentRoom || !socket) return;

        try {
            socket.emit("deleteMessage", { messageId, roomId: currentRoom.id });
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <ChatSidebar
                rooms={rooms}
                currentRoom={currentRoom}
                onJoinRoom={joinRoom}
                onCreateRoom={createRoom}
                onDeleteRoom={deleteRoom}
            />
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {currentRoom ? (
                    <>
                        {/* Header with online users */}
                        <div className="sticky top-0 z-10 border-b bg-background flex-shrink-0">
                            <div className="h-16 flex items-center justify-between px-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Hash className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">{currentRoom.name}</h3>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            {onlineUsers.length} en línea
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Online users list */}
                            {onlineUsers.length > 0 && (
                                <div className="px-6 pb-3 flex items-center gap-2 overflow-x-auto">
                                    <span className="text-xs text-muted-foreground flex-shrink-0">En línea:</span>
                                    <div className="flex gap-2">
                                        {onlineUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                                            >
                                                <Circle className="h-2 w-2 fill-primary" />
                                                {user.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <ChatMessageList
                            messages={messages}
                            onDeleteMessage={deleteMessage}
                            currentUserEmail={currentUserEmail}
                        />
                        <ChatInput
                            onSendMessage={sendMessage}
                            placeholder={`Enviar mensaje a # ${currentRoom.name}...`}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <Hash className="h-16 w-16 mb-4 text-primary/20" />
                        <p className="text-lg">Selecciona una sala para comenzar</p>
                    </div>
                )}
            </div>
        </div>
    );
}
