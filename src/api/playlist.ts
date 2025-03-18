import Base from "./base";

class Playlist extends Base {
    async createAPlaylist(data: {
        name: string,
        description: string,
        videoIdsList: string[],
    }) {
        const response = await this.post<any>({
            url: "/playlists/",
            data: data
        });
        return response.data;
    }

    async getAllPlaylistsByUserId(userId: string) {
        const response = await this.get<any>({
            url: `/playlists/user/${userId}`,
            authRequired: false
        });
        return response.data;
    }

    async getPlaylistById(playlistId: string) {
        const response = await this.get({
            url: `/playlists/${playlistId}`,
            authRequired: false
        });
        return response.data;
    }

    async addVideoToPlaylist(data: {
        playlistId: string,
        videoId: string,
    }) {
        const response = await this.patch({ url: `/playlists/${data.playlistId}/add?videoId=${data.videoId}` });
        return response.data;
    }

    async removeVideoFromPlaylist(data: {
        playlistId: string,
        videoId: string,
    }) {
        const response = await this.patch({ url: `/playlists/${data.playlistId}/remove?videoId=${data.videoId}` });
        return response.data;
    }

    async uploadThumbnailForPlaylist(data: {
        playlistId: string,
        thumbnailFile: File,
    }) {
        const formData = new FormData();
        formData.append("img", data.thumbnailFile);

        const response = await this.post({
            url: `/playlists/${data.playlistId}/thumbnail`,
            data: formData
        });

        return response.data;
    }
}

const playlistAPI = new Playlist();
export default playlistAPI;
