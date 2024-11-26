import videoAPI from "@/api/video";

export const postVideo = async (data: {
    title: string;
    isPrivate: boolean;
    file: File;
    description?: string;
    tags?: string[];
}) => {
    const response = await videoAPI.uploadVideoMetaData({
        title: data.title,
        isPrivate: data.isPrivate,
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
