"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Room } from "@/types/chat";

interface ChatSidebarProps {
    rooms: Room[];
    currentRoom: Room | null;
    onJoinRoom: (room: Room) => void;
    onCreateRoom: () => void;
}

export function ChatSidebar({ rooms, currentRoom, onJoinRoom, onCreateRoom }: ChatSidebarProps) {
    return (
        <div className="w-80 border-r border-slate-800 p-4 flex flex-col bg-slate-950 text-white">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Salas</h2>
                <Button variant="outline" size="sm" onClick={onCreateRoom}>+</Button>
            </div>
            <ScrollArea className="flex-1">
                <div className="space-y-2">
                    {rooms.map((room) => (
                        <Button
                            key={room.id}
                            variant={currentRoom?.id === room.id ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => onJoinRoom(room)}
                        >
                            # {room.name}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
            <Separator className="my-4 bg-slate-800" />
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium">Usuario</p>
                    <p className="text-xs text-slate-400">En línea</p>
                </div>
            </div>
        </div>
    );
}
