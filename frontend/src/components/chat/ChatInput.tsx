"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
    onSendMessage: (content: string) => void;
    placeholder?: string;
}

export function ChatInput({ onSendMessage, placeholder }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage("");
    };

    return (
        <div className="p-4 border-t border-slate-800 bg-slate-950">
            <div className="flex gap-2">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={placeholder}
                    className="bg-slate-900 border-slate-700 text-white"
                />
                <Button onClick={handleSend}>Enviar</Button>
            </div>
        </div>
    );
}
