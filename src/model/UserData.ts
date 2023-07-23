
export type UserData = {
    email: string,
    role: string,
    firstName?: string,
    lastName?: string,
    adress?: {
        city?: string,
        street?: string,
        house?: string,  
        flat?: string,  
    }
} | null