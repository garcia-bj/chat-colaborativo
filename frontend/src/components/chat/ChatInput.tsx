"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

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
        <div className="p-6 border-t bg-background flex-shrink-0">
            <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={placeholder || "Enviar mensaje..."}
                        className="pr-12 py-6 rounded-full border-2 focus:border-primary bg-muted/50"
                    />
                </div>
                <Button
                    onClick={handleSend}
                    size="icon"
                    className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                >
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
