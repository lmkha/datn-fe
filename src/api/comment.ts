import Base from "./base";

class Comment extends Base {
    async addComment(data: { videoId: string, content: string }) {
        try {
            const response = await this.post({
                url: '/comments',
                data: data
            });
            return {
                success: response.success,
                message: response.message,
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
            const response = await this.delete({
                url: `/comments?commentId=${params.commentId}`
            });
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
            const response = await this.patch({
                url: '/comments',
                data: data
            });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Update comment failed",
            }
        }
    }
}

const commentAPI = new Comment();
export default commentAPI;
