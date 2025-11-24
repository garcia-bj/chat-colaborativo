"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/chat";
import { Trash2 } from "lucide-react";

interface ChatMessageListProps {
    messages: Message[];
    onDeleteMessage?: (messageId: string) => void;
    currentUserEmail?: string;
}

export function ChatMessageList({ messages, onDeleteMessage, currentUserEmail }: ChatMessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-orange-500",
            "bg-purple-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-pink-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const isCurrentUser = (msg: Message) => {
        return msg.user?.email === currentUserEmail;
    };

    // Check if message is a system notification
    const isSystemMessage = (msg: Message) => {
        return msg.content?.includes("se unió a la sala") ||
            msg.content?.includes("salió de la sala") ||
            msg.user?.name === "Sistema";
    };

    const handleDelete = (messageId: string) => {
        if (confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
            onDeleteMessage?.(messageId);
        }
    };

    return (
        <ScrollArea className="flex-1 h-full">
            <div className="space-y-6 p-6">
                {messages.map((msg) => {
                    const isOwn = isCurrentUser(msg);
                    const isSystem = isSystemMessage(msg);

                    // System notifications (centered)
                    if (isSystem) {
                        return (
                            <div key={msg.id} className="flex justify-center my-4">
                                <div className="bg-muted/50 text-muted-foreground text-xs px-4 py-2 rounded-full">
                                    {msg.content}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={msg.id}
                            className={`flex gap-3 group ${isOwn ? "flex-row-reverse" : ""}`}
                        >
                            {/* Avatar */}
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${isOwn ? "bg-primary" : getAvatarColor(msg.user?.name || "U")
                                }`}>
                                <span className="text-white font-semibold text-sm">
                                    {msg.user?.name?.charAt(0).toUpperCase() || "U"}
                                </span>
                            </div>

                            {/* Message Content */}
                            <div className={`flex-1 max-w-md ${isOwn ? "flex flex-col items-end" : ""}`}>
                                <div className={`flex items-center gap-2 mb-1 ${isOwn ? "flex-row-reverse" : ""}`}>
                                    <span className="font-semibold text-sm text-foreground">
                                        {isOwn ? "Tú" : (msg.user?.name || "Usuario")}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(msg.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                                <div className="relative">
                                    <div
                                        className={`inline-block px-4 py-2.5 rounded-2xl break-words ${isOwn
                                            ? "bg-primary text-white rounded-tr-sm"
                                            : "bg-muted text-foreground rounded-tl-sm"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                    {/* Delete button - appears on hover */}
                                    {onDeleteMessage && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(msg.id)}
                                            className={`absolute -top-2 ${isOwn ? "-left-10" : "-right-10"} opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    );
}
