import Base from "./base";

class Video extends Base {
    async uploadVideoMetaData(data: {
        title: string,
        isPrivate: boolean,
        commentOff: boolean,
        description?: string,
        tags?: string[],
    }) {
        try {
            const response = await this.post("/videos/new/", data);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Upload video meta data failed",
            }
        }
    }

    async getVideoMetaData(params: { videoId: string }) {
        try {
            const response = await this.get(`/videos/metaData/${params.videoId}`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get video meta data failed",
            }
        }
    }

    async uploadThumbnail(data: {
        file: File,
        videoId: string,
    }) {
        try {
            const formData = new FormData();
            formData.append("file", data.file);
            const response = await this.post(`/videos/${data.videoId}/thumbnail`, formData);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Upload video thumbnail failed",
            }
        }
    }

    async uploadVideoFile(data: {
        file: File,
        videoId: string,
    }) {
        try {
            const formData = new FormData();
            formData.append("file", data.file);
            const response = await this.post(`/file/video/${data.videoId}`, formData);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Upload video file failed",
            }
        }
    }

    async getVideosByUserId(params: { userId: string }) {
        try {
            const response = await this.get(`/videos/user/${params.userId}`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get videos by user id failed",
            }
        }
    }

    async getVideoByVideoId(params: { videoId: string }) {
        try {
            const response = await this.get(`/videos/${params.videoId}`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get video by video id failed",
            }
        }
    }

    // Like video
    async likeAVideo(params: { videoId: string }) {
        try {
            const response = await this.post(`/videos/likes/${params.videoId}`, {});
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Like video failed",
            }
        }
    }

    async unLikeAVideo(params: { videoId: string }) {
        try {
            const response = await this.delete(`/videos/likes/${params.videoId}`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Unlike video failed",
            }
        }
    }

    async isLikedAVideo(params: { videoId: string }) {
        try {
            const response = await this.get(`/videos/likes/${params.videoId}`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Check like video failed",
            }
        }
    }

    // Get video for home page
    async getVideosForHomePage(params: { count: number }) {
        try {
            const response = await this.get("videos/random", params);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get videos for home page failed",
            }
        }
    }
}

const videoAPI = new Video();
export default videoAPI;
