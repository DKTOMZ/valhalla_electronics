export interface UserClient {
    id: string,
    name: string,
    email: string,
    image: string,
    error?: string
}

export interface UserServer {
    _id: string,
    name: string,
    email: string,
    password?: string,
    image: string,
    emailVerified: boolean
}