import playlistAPI from "@/api/playlist";

export const createPlaylist = async (data: {
    name: string;
    description: string;
    thumbnailFile?: File | null;
}) => {
    const result = await playlistAPI.createAPlaylist({
        name: data.name,
        description: data.description,
        videoIdsList: [],
    }).then((response) => {
        if (response.success && data?.thumbnailFile) {
            playlistAPI.uploadThumbnailForPlaylist({
                playlistId: response.data.id,
                thumbnailFile: data.thumbnailFile,
            });
        }
        return response;
    });

    return {
        success: result.success,
        message: result.message,
        data: result.data,
    }
}

export const getAllPlaylistByUserId = async (userId: string) => {
    return playlistAPI.getAllPlaylistsByUserId(userId);
};

export const getPlaylistById = async (playlistId: string) => {
    return playlistAPI.getPlaylistById(playlistId);
};
