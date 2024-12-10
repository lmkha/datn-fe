export interface ParentCommentModel {
    id?: string | null;
    content?: string | null;
    likes?: number | null;
    childrenIds?: string[] | null;
    replyCount?: number | null;
    videoId?: string | null;
    userId?: string | null;
    username?: string | null;
    userAvatar?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    isEdited?: boolean | null;
}

export interface ChildCommentModel {
    parentId?: string | null;
    id?: string | null;
    content?: string | null;
    likes?: number | null;
    replyCount?: number | null;
    videoId?: string | null;
    userId?: string | null;
    username?: string | null;
    userAvatar?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    isEdited?: boolean | null;
}
