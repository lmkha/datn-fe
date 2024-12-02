import playlistAPI from "@/api/playlist";

export const createPlaylist = async (data: {
    name: string;
    description: string;
    thumbnailFile?: File | null;
}) => {
    const createPlaylistResult = await playlistAPI.createAPlaylist({
        name: data.name,
        description: data.description,
        videoIdsList: [],
    });

    if (data?.thumbnailFile && createPlaylistResult.success) {
        await playlistAPI.uploadThumbnailForPlaylist({
            playlistId: createPlaylistResult.data._id,
            thumbnailFile: data.thumbnailFile,
        });
    }

    return createPlaylistResult;
}

export const getAllPlaylistByUserId = async (userId: string) => {
    return playlistAPI.getAllPlaylistsByUserId(userId);
};

export const getPlaylistById = async (playlistId: string) => {
    return playlistAPI.getPlaylistById(playlistId);
};
