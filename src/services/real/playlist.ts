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

    if (data?.thumbnailFile) {
        await playlistAPI.uploadThumbnailForPlaylist({
            playlistId: createPlaylistResult.data.id,
            thumbnailFile: data.thumbnailFile,
        });
    }
    return createPlaylistResult;
};

export const getAllPlaylistByUserId = async (userId: string) => {
    return playlistAPI.getAllPlaylistsByUserId(userId);
};

export const getPlaylistById = async (playlistId: string) => {
    return playlistAPI.getPlaylistById(playlistId);
};

export const addVideoToPlayList = async (data: {
    playlistId: string;
    videoId: string;
}) => {
    return playlistAPI.addVideoToPlaylist(data);
};

export const removeVideoFromPlaylist = async (data: {
    playlistId: string;
    videoId: string;
}) => {
    return playlistAPI.removeVideoFromPlaylist(data);
};
