export interface ParentCommentModel {
    id: string;
    content: string;
    likes: number;
    childrenIds: string[];
    replyCount: number;
    videoId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    isEdited: boolean;
}

export interface ChildCommentModel {
    parentId: string;
    id: string;
    content: string;
    likes: number;
    replyCount: number;
    videoId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    isEdited: boolean;
}
