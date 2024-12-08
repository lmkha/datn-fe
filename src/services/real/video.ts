import videoAPI from "@/api/video";
import { getPublicUserByUsername, getPublicUserId } from "./user";
import { get } from "@/hooks/use-local-storage";

export const postVideo = async (data: {
    title: string;
    isPrivate: boolean;
    videoFile: File;
    thumbnailFile?: File;
    commentOff?: boolean;
    description?: string;
    tags?: string[];
}) => {
    // Upload video meta data
    const uploadVideoMetaDataResult = await videoAPI.uploadVideoMetaData({
        title: data.title,
        isPrivate: data.isPrivate,
        commentOff: data.commentOff || false,
        description: data.description,
        tags: data.tags,
    });

    if (!uploadVideoMetaDataResult.success) {
        return uploadVideoMetaDataResult;
    }

    // Upload thumbnail file
    if (data.thumbnailFile) {
        videoAPI.uploadThumbnail({
            videoId: uploadVideoMetaDataResult.data.id,
            file: data.thumbnailFile,
        });
    }

    // Upload video file
    const uploadVideoFileResult = await videoAPI.uploadVideoFile({
        videoId: uploadVideoMetaDataResult.data.id,
        file: data.videoFile,
    });

    return uploadVideoFileResult;
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

export const getVideosForHomePage = async (data: { count: number } = { count: 20 }): Promise<{
    success: boolean;
    message?: string;
    videos?: any[];
}> => {
    const response = await videoAPI.getVideosForHomePage(data);
    if (!response.success || !response.data) {
        return response;
    }

    const videos = response.data;
    const users = await Promise.all(
        videos.map(async (video: any) => {
            const { user } = await getPublicUserId({ userId: video.userId });
            return user;
        })
    );

    return {
        success: true,
        message: response.message,
        videos: videos.map((video: any, index: number) => {
            return {
                ...video,
                user: users[index],
            };
        }) as any[],
    };
};

export const searchVideos = async (data: {
    type: 'tag' | 'video',
    pattern: string,
    count: number
} = { type: 'tag', pattern: '', count: 20 }): Promise<{
    success: boolean;
    message?: string;
    videos?: any[];
}> => {
    const response = await videoAPI.searchVideos(data);
    if (!response.success || !response.data) {
        return response;
    }

    const videos = response.data;
    const users = await Promise.all(
        videos.map(async (video: any) => {
            const { user } = await getPublicUserId({ userId: video.userId });
            return user;
        })
    );

    return {
        success: true,
        message: response.message,
        videos: videos.map((video: any, index: number) => {
            return {
                ...video,
                user: users[index],
            };
        }) as any[],
    };
};

export const isLikedVideo = async (videoId: string) => {
    const result = await videoAPI.isLikedAVideo({ videoId });
    return {
        success: result.success,
        message: result.message,
        liked: result.message === 'Liked' ? true : false
    };
};

export const likeVideo = async (videoId: string) => {
    const accessToken = get('accessToken');
    if (!accessToken) {
        return {
            success: false,
            message: 'Please login to like a video'
        };
    }
    return await videoAPI.likeAVideo({ videoId });
};

export const unlikeVideo = async (videoId: string) => {
    const accessToken = get('accessToken');
    if (!accessToken) {
        return {
            success: false,
            message: 'Please login to unlike a video'
        };
    }
    return await videoAPI.unLikeAVideo({ videoId });
};
