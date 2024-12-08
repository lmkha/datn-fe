import axiosInstance from "@/core/axios/instance";
import Base from "./base";

class Playlist extends Base {
    async createAPlaylist(data: {
        name: string,
        description: string,
        videoIdsList: string[],
    }) {
        try {
            const response = await this.post({
                url: "/playlists/",
                data: data
            });
            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Create a playlist failed",
            }
        }
    }

    async getAllPlaylistsByUserId(userId: string) {
        try {
            const response = await this.get({
                url: `/playlists/user/${userId}`,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get all playlists by user id failed",
            }
        }
    }

    async getPlaylistById(playlistId: string) {
        try {
            const response = await this.get({
                url: `/playlists/${playlistId}`,
                authRequired: false
            });
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get playlist failed",
            }
        }
    }

    async addVideoToPlaylist(data: {
        playlistId: string,
        videoId: string,
    }) {
        try {
            const response = await this.patch({ url: `/playlists/${data.playlistId}/?videoId=${data.videoId}` });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Add video to playlist failed",
            }
        }
    }

    async removeVideoFromPlaylist(data: {
        playlistId: string,
        videoId: string,
    }) {
        try {
            const response = await this.patch({ url: `/playlists/${data.playlistId}/remove?videoId=${data.videoId}` });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Remove video from playlist failed",
            }
        }
    }

    async uploadThumbnailForPlaylist(data: {
        playlistId: string,
        thumbnailFile: File,
    }) {
        try {
            const formData = new FormData();
            formData.append("img", data.thumbnailFile);

            const response = await this.post({
                url: `/playlists/${data.playlistId}/thumbnail`,
                data: formData
            });
            return {
                success: response.success,
                message: response.message,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Upload thumbnail for playlist failed",
            }
        }
    }
}

const playlistAPI = new Playlist();
export default playlistAPI;
