export type SessionPayload = {
    userId: string,
    expiresAt: Date,
}

export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
}

export type Task = {
    id: string,
    userId: string,
    title: string,
    description: string,
    status: string,
}