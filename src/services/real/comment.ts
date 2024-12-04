import commentAPI from "@/api/comment";

export const addComment = async (data: { videoId: string, content: string }) => {
    return commentAPI.addComment(data);
};