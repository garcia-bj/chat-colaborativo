"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/chat";

interface ChatMessageListProps {
    messages: Message[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <ScrollArea className="flex-1 p-6 bg-slate-950 text-white">
            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                        <Avatar>
                            <AvatarImage src={msg.user?.avatar} />
                            <AvatarFallback>{msg.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{msg.user?.name}</span>
                                <span className="text-xs text-slate-500">
                                    {new Date(msg.createdAt).toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="text-slate-300 mt-1">{msg.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    );
}
