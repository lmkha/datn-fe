import videoAPI from "@/api/video";

export const postVideo = async (data: {
    title: string;
    isPrivate: boolean;
    file: File;
    commentOff?: boolean;
    description?: string;
    tags?: string[];
}) => {
    const response = await videoAPI.uploadVideoMetaData({
        title: data.title,
        isPrivate: data.isPrivate,
        commentOff: data.commentOff || false,
        description: data.description,
        tags: data.tags,
    });

    if (!response.success) {
        return response;
    }

    const finalResult = await videoAPI.uploadVideoFile({
        videoId: response.data.id,
        file: data.file,
    });

    return finalResult;
};

export const getVideoStreamLink = (videoId: string) => {
    const result = `http://localhost:8080/${videoId}/output.mpd`
    return result;
};

export const getVideosByUserId = async (userId: string) => {
    const response = await videoAPI.getVideosByUserId({ userId });
    return response;
};

export const getVideoByVideoId = async (videoId: string) => {
    const response = await videoAPI.getVideoByVideoId({ videoId });
    return response;
};
