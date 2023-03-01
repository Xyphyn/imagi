export interface Post {
    image: any
    id: string
    description: string
    user: string
    community: string
    expand: any
}

export interface Community {
    id: string,
    name: string,
    user: string,
    description: string,
    expand: any
}