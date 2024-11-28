import Base from "./base";

class Playlist extends Base {
    async createAPlaylist(data: {
        name: string,
        thumbnail?: string,
    }) {
        try {
            const response = await this.post("/playlists", data);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Create a playlist failed",
            }
        }
    }

    async getPlaylists() {
        try {
            const response = await this.get("/playlists");
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Get playlists failed",
            }
        }
    }

    async getPlaylistById(playlistId: string) {
        try {
            const response = await this.get(`/playlists/${playlistId}`);
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
            const response = await this.put(`/playlists/${data.playlistId}/videos`, {
                videoId: data.videoId,
            });
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
            const response = await this.delete(`/playlists/${data.playlistId}/videos/${data.videoId}`);
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
}

const playlistAPI = new Playlist();
export default playlistAPI;
