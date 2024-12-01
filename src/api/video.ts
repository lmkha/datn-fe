import Base from "./base";

class Video extends Base {
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

    async getVideoStreamLink(params: { videoId: string }) {
        try {
            const response = await this.get(`/${params.videoId}/output.mpd`);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get video stream link failed",
            }
        }
    }
}

const videoAPI = new Video();
export default videoAPI;
