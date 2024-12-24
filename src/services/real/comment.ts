import commentAPI from "@/api/comment";
import { ChildCommentModel, ParentCommentModel } from "../models/comment";
import { getPublicUserId } from "./user";
import { getVideoByVideoId } from "./video";

export const addComment = async (data: { videoId: string, content: string }) => {
    return commentAPI.addComment(data);
};

export const replyComment = async (data: { videoId: string, replyTo: string, content: string }) => {
    return commentAPI.addComment(data);
};

export const replyCommentInStudio = async (data: { videoId: string, replyTo: string, content: string }) => {
    const result = await commentAPI.addComment(data);
    if (!result.success) return {
        success: false,
        message: result.message,
        newComment: null
    }

    const { user } = await getPublicUserId({ userId: result.newComment.userId });
    const video = await getVideoByVideoId(result.newComment.videoId);
    const newComment = {
        id: result.newComment.id,
        content: result.newComment.content,
        likes: result.newComment.likeCount,
        childrenIds: result.newComment.replies || [],
        replyCount: result.newComment.replyCount,
        videoId: result.newComment.videoId,
        userId: result.newComment.userId,
        username: user?.username || "Anonymous",
        userAvatar: user?.profilePic || null,
        createdAt: result.newComment.createdAt,
        updatedAt: result.newComment.updatedAt,
        isEdited: result.newComment.isEdited,
        videoTitle: video?.data?.title || null,
        thumbnailUrl: video?.data?.thumbnailUrl || null,
        videoViews: video?.data?.viewsCount || 0,
        videoLikes: video?.data?.likesCount || 0,
        videoComments: video?.data?.commentsCount || 0,
    };

    return {
        success: true,
        message: result.message,
        newComment: newComment
    };
};

export const getCommentById = async (commentId: string): Promise<{
    success: boolean;
    message: string;
    comment: ParentCommentModel | ChildCommentModel | null;
}> => {
    const result = await commentAPI.getCommentById({ commentId });

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            comment: null,
        };
    }

    const comment = result.comment;
    const { user } = await getPublicUserId({ userId: comment.userId });

    return {
        success: true,
        message: result.message,
        comment: {
            parentId: comment.replyTo || null,
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
        }
    };
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

export const getChildrenComments = async (parentCommentId: string): Promise<{
    success: boolean;
    message: string;
    comments: ChildCommentModel[];
}> => {
    const result = await commentAPI.getChildrenComments({ commentId: parentCommentId });

    const comments = await Promise.all(
        (result?.comments || []).map(async (comment: any) => {
            const { user } = await getPublicUserId({ userId: comment.userId });
            return {
                parentId: comment.replyTo!,
                id: comment.id,
                content: comment.content,
                likes: comment.likeCount,
                replyCount: comment.replyCount,
                videoId: comment.videoId,
                userId: comment.userId,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                isEdited: comment.isEdited,
                username: user?.username || "Anonymous",
                userAvatar: user?.profilePic || null,
            };
        })
    );

    return {
        success: result.success,
        message: result.message,
        comments,
    };
};

export const likeComment = async (commentId: string) => {
    return commentAPI.likeComment({ commentId });
};

export const unlikeComment = async (commentId: string) => {
    return commentAPI.unlikeComment({ commentId });
};

export const isCommentLiked = async (commentId: string) => {
    const result = await commentAPI.isCommentLiked({ commentId });
    if (!result.success) return {
        success: false,
        message: result.message,
        isLiked: false
    }

    return {
        success: result.success,
        message: result.message,
        isLiked: result.message === 'Liked' ? true : false,
    }
};

export const updateComment = async (data: { commentId: string, content: string }) => {
    return commentAPI.updateComment({ id: data.commentId, content: data.content });
}

export const deleteComment = async (commentId: string) => {
    return commentAPI.deleteComment({ commentId });
}

export const getMyRecentVideoComments = async () => {
    const result = await commentAPI.getAllMyVideoComments({ pageNumber: 0, pageSize: 5 });
    if (!result.success) return {
        success: false,
        message: result.message,
        comments: []
    }

    const comments = await Promise.all(
        (result.comments || []).map(async (comment: any) => {
            const { user } = await getPublicUserId({ userId: comment.userId });
            const video = await getVideoByVideoId(comment.videoId);
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
                videoTitle: video?.data?.title || null,
                thumbnailUrl: video?.data?.thumbnailUrl || null,
            };
        })
    );

    return {
        success: result.success,
        message: result.message,
        comments,
    };
};

export const getAllMyVideoComments = async (repliedFilter: 'all' | 'replied' | 'not-replied' = 'all') => {
    const result = await commentAPI.getAllMyVideoComments({ pageNumber: 0, pageSize: 1000, repliedFilter: repliedFilter });
    if (!result.success) return {
        success: false,
        message: result.message,
        comments: []
    }

    const comments = await Promise.all(
        (result.comments || []).map(async (comment: any) => {
            const { user } = await getPublicUserId({ userId: comment.userId });
            const video = await getVideoByVideoId(comment.videoId);
            return {
                parentId: comment.replyTo || null,
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
                videoTitle: video?.data?.title || null,
                thumbnailUrl: video?.data?.thumbnailUrl || null,
                videoViews: video?.data?.viewsCount || 0,
                videoLikes: video?.data?.likesCount || 0,
                videoComments: video?.data?.commentsCount || 0,
            };
        })
    );

    return {
        success: result.success,
        message: result.message,
        comments,
    };
};

export const getCommentsByVideoId = async (videoId: string): Promise<{
    success: boolean;
    message: string;
    comments: any[];
}> => {
    const result = await commentAPI.getAllCommentByVideoId({ videoId: videoId, order: 'newest' });
    if (!result.success) return {
        success: false,
        message: result.message,
        comments: []
    }

    const comments = await Promise.all(
        (result.comments || []).map(async (comment: any) => {
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

export const filterFetchedComments = (comments: any[]) => { };
