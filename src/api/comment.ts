import Base from "./base";

class Comment extends Base {
    async addComment(data: { videoId: string, replyTo?: string, content: string }) {
        try {
            const response = await this.post({
                url: '/comments/',
                data: data
            });
            return {
                success: response.success,
                message: response.message,
                newComment: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Add comment failed",
            }
        }
    }

    async deleteComment(params: { commentId: string }) {
        try {
            const response = await this.delete({ url: `/comments/${params.commentId}` });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Delete comment failed",
            }
        }
    }

    async updateComment(data: { id: string, content: string }) {
        try {
            const response = await this.put({
                url: '/comments',
                data: data
            });
            return {
                success: response.success,
                message: response.message,
                updatedComment: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Update comment failed",
            }
        }
    }

    // Get a comment by id
    async getCommentById(params: { commentId: string }) {
        try {
            const response = await this.get({
                url: `/comments/${params.commentId}`,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                comment: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get comment by id failed",
                comment: null
            }
        }
    }

    // Get parent comments of a video
    async getParentCommentsOfVideo(params: { videoId: string, order?: 'oldest' | 'newest' }) {
        try {
            const response = await this.get({
                url: `/comments/video/parent/${params.videoId}`,
                params: {
                    order: params?.order ? params.order : "newest"
                },
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                comments: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get parent comments failed",
                comments: []
            }
        }
    }

    // Get children comments of a parent comment
    async getChildrenComments(params: { commentId: string }) {
        try {
            const response = await this.get({
                url: `/comments/${params.commentId}/children`,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                comments: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get replies failed",
                replies: []
            }
        }
    }

    async likeComment(params: { commentId: string }) {
        try {
            const response = await this.post({
                url: `/comments/like/${params.commentId}`,
            });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Like comment failed",
            }
        }
    }

    async unlikeComment(params: { commentId: string }) {
        try {
            const response = await this.delete({
                url: `/comments/like/${params.commentId}`,
            });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Unlike comment failed",
            }
        }
    }

    async isCommentLiked(params: { commentId: string }) {
        try {
            const response = await this.get({
                url: `/comments/like/${params.commentId}`,
            });
            return {
                success: response.success,
                message: response.message,
                isLiked: response.isLiked
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Check like failed",
                isLiked: false
            }
        }
    }

    // Include both parent and children comments
    async getAllCommentByVideoId(params: { videoId: string, order?: 'oldest' | 'newest' }) {
        try {
            const response = await this.get({
                url: `/comments/video/${params.videoId}`,
                params: {
                    order: params?.order ? params.order : "newest"
                },
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                comments: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get comments by video id failed",
                comments: []
            }
        }
    }

    async getAllMyComments() {
        try {
            const response = await this.get({
                url: '/comments/my'
            });
            return {
                success: response.success,
                message: response.message,
                comments: response.comments
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get my comments failed",
                comments: []
            }
        }
    }

    async getAllMyVideoComments(params: { pageSize?: number, pageNumber?: number }) {
        try {
            const response = await this.get({
                url: '/comments/myVideosComments',
                params: {
                    page: params.pageNumber,
                    size: params.pageSize,
                }
            });
            return {
                success: response.success,
                message: response.message,
                comments: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get my video comments failed",
                comments: []
            }
        }
    }

}

const commentAPI = new Comment();
export default commentAPI;
