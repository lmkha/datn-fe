import Base from "./base";

class Video extends Base {
    async uploadVideoMetaData(data: {
        title: string,
        isPrivate: boolean,
        isCommentOff: boolean,
        description?: string,
        tags?: string[],
    }) {
        const response = await this.post<any>({
            url: "/videos/new/",
            data: data,
        });
        return response.data;
    }

    async getVideoMetaData(params: { videoId: string }) {
        const response = await this.get({
            url: `/videos/metaData/${params.videoId}`,
            authRequired: false,
        });
        return response.data;
    }

    async uploadThumbnail(data: {
        file: File,
        videoId: string,
    }) {
        const formData = new FormData();
        formData.append("file", data.file);
        const response = await this.post<any>({
            url: `/videos/${data.videoId}/thumbnail`,
            data: formData,
        })
        return response.data
    }

    async uploadVideoFile(
        data: {
            file: File,
            videoId: string,
        },
        progressCallback?: (progress: number) => void
    ) {
        const formData = new FormData();
        formData.append("file", data.file);
        const response = await this.post<any>({
            url: `/file/video/${data.videoId}`,
            data: formData,
            config: {
                timeout: 300000,
                onUploadProgress(progressEvent) {
                    if (progressEvent.lengthComputable && progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (progressCallback) {
                            progressCallback(progress);
                        }
                    }
                },
            }
        })
        return response.data
    }

    async getVideosByUserId(params: { userId: string }) {
        const response = await this.get<any>({
            url: `/videos/user/${params.userId}`,
            authRequired: false,
        })
        return response.data
    }

    async getVideoByVideoId(params: { videoId: string }) {
        const response = await this.get<any>({
            url: `/videos/${params.videoId}`,
            authRequired: false,
        });
        return response.data
    }

    async updateVideoMetaData(data: {
        id: string,
        title: string,
        description: string,
        tags: string[],
        isPrivate: boolean,
        isCommentOff: boolean,
    }) {
        const response = await this.put<any>({
            url: "/videos",
            data: data
        })
        return response.data
    }

    async deleteVideo(params: { videoId: string }) {
        const response = await this.delete({ url: `/videos/${params.videoId}` })
        return response.data
    };

    // Like video
    async likeAVideo(params: { videoId: string }) {
        const response = await this.post({ url: `/videos/likes/${params.videoId}` })
        return response.data
    }

    async unLikeAVideo(params: { videoId: string }) {
        const response = await this.delete({ url: `/videos/likes/${params.videoId}` });
        return response.data
    }

    async isLikedAVideo(params: { videoId: string }) {
        const response = await this.get({ url: `/videos/likes/${params.videoId}` });
        return response.data
    }

    // Get video for home page
    async getVideosForHomePage(params: { count: number }) {
        const response = await this.get<any>({
            url: "videos/random",
            params: params,
            authRequired: false,
        })
        return response.data
    }

    // Search video
    async searchVideos(params: {
        type: 'tag' | 'video',
        pattern: string,
        count: number,
    }) {
        const response = await this.get<any>({
            url: "videos/search",
            params: params,
            authRequired: false,
        })
        return response.data
    }
}

const videoAPI = new Video();
export default videoAPI;
