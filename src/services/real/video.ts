import videoAPI from "@/api/video";
import { getPublicUserId } from "./user";
import { get } from "@/hooks/use-local-storage";
import { addVideoToPlayList } from "./playlist";

export const postVideo = async (
    data: {
        title: string;
        isPrivate: boolean;
        videoFile: File;
        thumbnailFile?: File;
        commentOff?: boolean;
        description?: string;
        tags?: string[];
        playlistId?: string;
    },
    progressCallback?: (progress: number) => void
) => {
    // Upload video meta data
    const uploadVideoMetaDataResult = await videoAPI.uploadVideoMetaData({
        title: data.title,
        isPrivate: data.isPrivate,
        isCommentOff: data.commentOff || false,
        description: data.description,
        tags: data.tags,
    });

    if (!uploadVideoMetaDataResult.success) {
        return uploadVideoMetaDataResult;
    }

    // Add video to playlist
    if (data?.playlistId) {
        addVideoToPlayList({
            playlistId: data.playlistId,
            videoId: uploadVideoMetaDataResult.data.id,
        });
    }

    // Upload thumbnail file
    if (data?.thumbnailFile) {
        videoAPI.uploadThumbnail({
            videoId: uploadVideoMetaDataResult.data.id,
            file: data.thumbnailFile,
        });
    }

    // Upload video file
    const uploadVideoFileResult = await videoAPI.uploadVideoFile({
        videoId: uploadVideoMetaDataResult.data.id,
        file: data.videoFile,
    }, progressCallback);

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

export const getVideosOfOtherByUserId = async (userId: string) => {
    const response = await videoAPI.getVideosByUserId({ userId });
    if (!response.success || !response.data) {
        return response;
    }
    const publicVideos = response.data.filter((video: any) => !video.isPrivate);
    return {
        success: response.success,
        message: response.message,
        data: publicVideos
    };
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

export const getMyRecentVideos = async (videoCount: number = 5): Promise<{
    success: boolean;
    message: string;
    videos?: any[];
}> => {
    const myUserId = get<any>("user")?.id;
    if (!myUserId) {
        return {
            success: false,
            message: "Please login to get your recent videos"
        };
    }
    const response = await videoAPI.getVideosByUserId({ userId: myUserId });
    if (!response.success || !response.data) {
        return response;
    }

    // Return only videoCount videos
    return {
        success: true,
        message: response.message,
        videos: response.data.slice(0, videoCount)
    };
};

export const updateVideo = async (data: {
    id: string,
    title: string,
    description: string,
    tags: string[],
    isPrivate: boolean,
    isCommentOff: boolean,
}) => {
    return await videoAPI.updateVideoMetaData(data);
};

export const deleteVideo = async (videoId: string) => {
    return await videoAPI.deleteVideo({ videoId });
};
