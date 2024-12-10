import commentAPI from "@/api/comment";

export const addComment = async (data: { videoId: string, content: string }) => {
    return commentAPI.addComment(data);
};

export const replyComment = async (data: { videoId: string, replyTo: string, content: string }) => {
    return commentAPI.addComment(data);
};

export const getAllParentComments = async (videoId: string) => {
    return commentAPI.getParentCommentsOfVideo({ videoId });
};

export const getChildrenComments = async (commentId: string) => {
    return commentAPI.getChildrenComment({ commentId });
};
