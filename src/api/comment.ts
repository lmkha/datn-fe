import Base from "./base";

class Comment extends Base {
    async addComment(data: { videoId: string, replyTo?: string, content: string }) {
        const response = await this.post<any>({
            url: '/comments/',
            data: data,
        });
        const result = {
            success: response.data.success,
            message: response.data.message,
            newComment: response.data?.data,
        }

        return result;
    }

    async deleteComment(params: { commentId: string }) {
        const response = await this.delete({ url: `/comments/${params.commentId}` });
        return response.data;
    }

    async updateComment(data: { id: string, content: string }) {
        const response = await this.put<any>({
            url: '/comments',
            data: data,
        });
        const result = {
            success: response.data.success,
            message: response.data.message,
            updatedComment: response.data?.data,
        }

        return result;
    }

    // Get a comment by id
    async getCommentById(params: { commentId: string }) {
        const response = await this.get<any>({
            url: `/comments/${params.commentId}`,
            authRequired: false
        });
        const result = {
            success: response.data.success,
            message: response.data.message,
            comment: response.data?.data,
        }

        return result;
    }

    // Get parent comments of a video
    async getParentCommentsOfVideo(params: { videoId: string, order?: 'oldest' | 'newest' }) {
        const response = await this.get<any>({
            url: `/comments/video/parent/${params.videoId}`,
            params: {
                order: params?.order ? params.order : "newest"
            },
            authRequired: false
        });
        const result = {
            success: response.data.success,
            message: response.data.message,
            comments: response.data?.data || []
        };

        return result;
    }

    // Get children comments of a parent comment
    async getChildrenComments(params: { commentId: string }) {
        const response = await this.get<any>({
            url: `/comments/${params.commentId}/children`,
            authRequired: false
        });
        const result = {
            success: response.data.success,
            message: response.data.message,
            comments: response.data?.data || [],
        };
        return result;
    }

    async likeComment(params: { commentId: string }) {
        const response = await this.post({ url: `/comments/like/${params.commentId}` });
        return response.data;
    }

    async unlikeComment(params: { commentId: string }) {
        const response = await this.delete({ url: `/comments/like/${params.commentId}` });
        return response.data;
    }

    async isCommentLiked(params: { commentId: string }) {
        const response = await this.get({ url: `/comments/like/${params.commentId}` });
        return response.data;
    }

    // Include both parent and children comments
    async getAllCommentByVideoId(params: { videoId: string, order?: 'oldest' | 'newest' }) {
        const response = await this.get<any>({
            url: `/comments/video/${params.videoId}`,
            params: {
                order: params?.order ? params.order : "newest"
            },
            authRequired: false
        });
        const result = {
            success: response.data.success,
            message: response.data.message,
            comments: response.data?.data || [],
        };
        return result;
    }

    async getAllMyComments() {
        const response = await this.get<any>({ url: '/comments/my' });
        const result = {
            success: response.data.success,
            message: response.data.message,
            comments: response.data?.data || []
        }
        return result;
    }

    async getAllMyVideoComments(params: { pageSize?: number, pageNumber?: number, repliedFilter?: 'all' | 'replied' | 'not-replied', videoId?: string }) {
        const defaultRepliedFilter = 'all';
        const response = await this.get<any>({
            url: '/comments/myVideosComments',
            params: {
                page: params.pageNumber,
                size: params.pageSize,
                repliedFilter: params.repliedFilter || defaultRepliedFilter,
                videoId: params.videoId
            }
        });

        const result = {
            success: response.data.success,
            message: response.data.message,
            comments: response.data?.data || []
        }

        return result;
    }
}

const commentAPI = new Comment();
export default commentAPI;
