export type SessionPayload = {
    sub: string,
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

export type Cat = {
    id: string,
    userId: string,
    name: string,
    coat_length: string,
    coat_type: string,
    coat_color: string,
}