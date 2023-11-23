export interface AdminClient {
    id: string,
    name: string,
    email: string,
    image: string,
    error?: string
}

export interface AdminServer {
    _id: string,
    name: string,
    email: string,
    password?: string,
    image: string,
    emailVerified: boolean
}