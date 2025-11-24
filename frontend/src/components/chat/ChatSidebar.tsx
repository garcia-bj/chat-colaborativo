"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Room } from "@/types/chat";
import { LogOut, Plus, Hash, Trash2 } from "lucide-react";

interface ChatSidebarProps {
    rooms: Room[];
    currentRoom: Room | null;
    onJoinRoom: (room: Room) => void;
    onCreateRoom: () => void;
    onDeleteRoom?: (roomId: string) => void;
}

export function ChatSidebar({ rooms, currentRoom, onJoinRoom, onCreateRoom, onDeleteRoom }: ChatSidebarProps) {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleDeleteRoom = (e: React.MouseEvent, roomId: string) => {
        e.stopPropagation();
        if (confirm("¿Estás seguro de que quieres eliminar esta sala?")) {
            onDeleteRoom?.(roomId);
        }
    };

    return (
        <div className="w-80 border-r border-border flex flex-col bg-background flex-shrink-0">
            {/* Logo Header */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="Siscolmenlab" className="h-10 w-10 object-contain" />
                    <h1 className="text-xl font-bold text-primary">Siscolmenlab</h1>
                </div>
            </div>

            {/* Rooms Section */}
            <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">Salas</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCreateRoom}
                        className="h-6 w-6 text-primary hover:bg-primary/10"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <ScrollArea className="flex-1 -mx-2">
                    <div className="space-y-1 px-2">
                        {rooms.map((room) => (
                            <div
                                key={room.id}
                                className="group relative"
                            >
                                <button
                                    onClick={() => onJoinRoom(room)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all ${currentRoom?.id === room.id
                                        ? "bg-primary text-white shadow-md"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                >
                                    <Hash className="h-4 w-4 flex-shrink-0" />
                                    <span className="font-medium truncate flex-1">{room.name}</span>
                                </button>
                                {/* Delete button - appears on hover */}
                                {onDeleteRoom && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => handleDeleteRoom(e, room.id)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Usuario</p>
                            <p className="text-xs text-primary flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-primary"></span>
                                En línea
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="text-muted-foreground hover:text-destructive h-8 w-8"
                        title="Cerrar sesión"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
