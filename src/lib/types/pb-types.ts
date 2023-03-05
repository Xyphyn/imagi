/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
    Comments = 'comments',
    Communities = 'communities',
    Likes = 'likes',
    Posts = 'posts',
    Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
    id: RecordIdString
    created: IsoDateString
    updated: IsoDateString
    collectionId: string
    collectionName: Collections
    expand?: T
}

export type AuthSystemFields<T = never> = {
    email: string
    emailVisibility: boolean
    username: string
    verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CommentsRecord = {
    content: string
    user: RecordIdString
    post: RecordIdString
}

export type CommunitiesRecord = {
    name: string
    owner: RecordIdString
    description: string
    image?: string
}

export type LikesRecord = {
    user: RecordIdString
    post: RecordIdString
}

export type PostsRecord = {
    description: string
    user: RecordIdString
    image: string
    community?: RecordIdString
}

export type UsersRecord = {
    name?: string
    avatar?: string
    communities?: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type CommentsResponse<Texpand = unknown> = CommentsRecord &
    BaseSystemFields<Texpand>
export type CommunitiesResponse<Texpand = unknown> = CommunitiesRecord &
    BaseSystemFields<Texpand>
export type LikesResponse<Texpand = unknown> = LikesRecord &
    BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = PostsRecord &
    BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = UsersRecord &
    AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
    comments: CommentsRecord
    communities: CommunitiesRecord
    likes: LikesRecord
    posts: PostsRecord
    users: UsersRecord
}

export type CollectionResponses = {
    comments: CommentsResponse
    communities: CommunitiesResponse
    likes: LikesResponse
    posts: PostsResponse
    users: UsersResponse
}