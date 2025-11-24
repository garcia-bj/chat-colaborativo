export interface User {
    name: string;
    email: string;
    avatar: string;
}

export interface Message {
    id: string;
    content: string;
    user: User;
    createdAt: string;
}

export interface Room {
    id: string;
    name: string;
}
