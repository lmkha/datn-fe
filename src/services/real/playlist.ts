import imageAPI from "@/api/image";
import playlistAPI from "@/api/playlist";

export const createPlaylist = async (data: {
    name: string;
    thumbnailFile?: File;
}) => {
    let thumbnailUrl = undefined;
    if (data?.thumbnailFile) {
        const response = await imageAPI.uploadImage({
            file: data.thumbnailFile,
        });
        if (response.success) {
            thumbnailUrl = response.data.url;
        } else {
            return {
                success: false,
                message: response.message,
            }
        }
    }
    return playlistAPI.createAPlaylist({
        name: data.name,
        thumbnail: thumbnailUrl,
    });
};

export const getPlaylists = async () => {
    return playlistAPI.getPlaylists();
};

export const getPlaylistById = async (playlistId: string) => {
    return playlistAPI.getPlaylistById(playlistId);
};


