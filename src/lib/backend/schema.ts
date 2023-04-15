/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Blog = "blog",
	Comments = "comments",
	Communities = "communities",
	CommunityCounts = "communityCounts",
	Counts = "counts",
	Likes = "likes",
	PostCounts = "postCounts",
	Posts = "posts",
	Reports = "reports",
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

export type BlogRecord = {
	title: string
	content: HTMLString
	author: RecordIdString
	description?: string
}

export type CommentsRecord = {
	content: string
	user: RecordIdString
	post: RecordIdString
}

export type CommunitiesRecord = {
	name: string
	owner?: RecordIdString
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
	alt_text?: string
}

export type ReportsRecord = {
	post?: RecordIdString
	user?: RecordIdString
	comment?: RecordIdString
	reason?: string
	author: RecordIdString
}

export enum UsersRoleOptions {
	"owner" = "owner",
	"admin" = "admin",
}
export type UsersRecord = {
	name?: string
	avatar?: string
	communities?: RecordIdString[]
	bio?: string
	role?: UsersRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type BlogResponse<Texpand = unknown> = BlogRecord & BaseSystemFields<Texpand>
export type CommentsResponse<Texpand = unknown> = CommentsRecord & BaseSystemFields<Texpand>
export type CommunitiesResponse<Texpand = unknown> = CommunitiesRecord & BaseSystemFields<Texpand>
export type CommunityCountsResponse<Texpand = unknown> = CommunityCountsRecord & BaseSystemFields<Texpand>
export type CountsResponse<Texpand = unknown> = CountsRecord & BaseSystemFields<Texpand>
export type LikesResponse<Texpand = unknown> = LikesRecord & BaseSystemFields<Texpand>
export type PostCountsResponse<Texpand = unknown> = PostCountsRecord & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = PostsRecord & BaseSystemFields<Texpand>
export type ReportsResponse<Texpand = unknown> = ReportsRecord & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	blog: BlogRecord
	comments: CommentsRecord
	communities: CommunitiesRecord
	communityCounts: CommunityCountsRecord
	counts: CountsRecord
	likes: LikesRecord
	postCounts: PostCountsRecord
	posts: PostsRecord
	reports: ReportsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	blog: BlogResponse
	comments: CommentsResponse
	communities: CommunitiesResponse
	communityCounts: CommunityCountsResponse
	counts: CountsResponse
	likes: LikesResponse
	postCounts: PostCountsResponse
	posts: PostsResponse
	reports: ReportsResponse
	users: UsersResponse
}