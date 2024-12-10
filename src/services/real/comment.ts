import commentAPI from "@/api/comment";
import { ParentCommentModel } from "../models/comment";
import { getPublicUserId } from "./user";

export const addComment = async (data: { videoId: string, content: string }) => {
    return commentAPI.addComment(data);
};

export const replyComment = async (data: { videoId: string, replyTo: string, content: string }) => {
    return commentAPI.addComment(data);
};

export const getAllParentComments = async (videoId: string): Promise<{
    success: boolean;
    message: string;
    comments: ParentCommentModel[];
}> => {
    const result = await commentAPI.getParentCommentsOfVideo({ videoId });

    const comments = await Promise.all(
        (result?.comments || []).map(async (comment: any) => {
            const { user } = await getPublicUserId({ userId: comment.userId });
            return {
                id: comment.id,
                content: comment.content,
                likes: comment.likeCount,
                childrenIds: comment.replies || [],
                replyCount: comment.replyCount,
                videoId: comment.videoId,
                userId: comment.userId,
                username: user?.username || "Anonymous",
                userAvatar: user?.profilePic || null,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                isEdited: comment.isEdited,
            };
        })
    );

    return {
        success: result.success,
        message: result.message,
        comments,
    };
};

export const getChildrenComments = async (commentId: string) => {
    return commentAPI.getChildrenComment({ commentId });
};
