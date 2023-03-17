/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Comments = "comments",
	Communities = "communities",
	CommunityCounts = "communityCounts",
	Counts = "counts",
	Likes = "likes",
	PostCounts = "postCounts",
	Posts = "posts",
	Users = "users",
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

export type CommunityCountsRecord = {
	community?: RecordIdString
	posts?: number
	members?: number
}

export type CountsRecord = {
	user?: RecordIdString
	comments?: number
	posts?: number
}

export type LikesRecord = {
	user: RecordIdString
	post: RecordIdString
}

export type PostCountsRecord = {
	post?: RecordIdString
	comments?: number
	likes?: number
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
	bio?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CommentsResponse<Texpand = unknown> = CommentsRecord & BaseSystemFields<Texpand>
export type CommunitiesResponse<Texpand = unknown> = CommunitiesRecord & BaseSystemFields<Texpand>
export type CommunityCountsResponse<Texpand = unknown> = CommunityCountsRecord & BaseSystemFields<Texpand>
export type CountsResponse<Texpand = unknown> = CountsRecord & BaseSystemFields<Texpand>
export type LikesResponse<Texpand = unknown> = LikesRecord & BaseSystemFields<Texpand>
export type PostCountsResponse<Texpand = unknown> = PostCountsRecord & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = PostsRecord & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	comments: CommentsRecord
	communities: CommunitiesRecord
	communityCounts: CommunityCountsRecord
	counts: CountsRecord
	likes: LikesRecord
	postCounts: PostCountsRecord
	posts: PostsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	comments: CommentsResponse
	communities: CommunitiesResponse
	communityCounts: CommunityCountsResponse
	counts: CountsResponse
	likes: LikesResponse
	postCounts: PostCountsResponse
	posts: PostsResponse
	users: UsersResponse
}