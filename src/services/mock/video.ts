import { VideoModel } from "../models/video";
import { RecommendedVideoModel } from "../models/video-recommend";

export const getVideoById = async (
    id: string
): Promise<{
    success: boolean;
    message?: string;
    video?: VideoModel;
}> => {
    return {
        success: true,
        video: {
            title: "Learn TypeScript for Beginners",
            authorUsername: "typescript_master",
            likes: "12K",
            dislikes: "500",
            shares: "3.5K",
            forwards: "1K",
            views: "1.2M",
            date: "2024-11-15",
            description:
                "This is a beginner-friendly TypeScript tutorial where we explore the fundamentals of TypeScript. By the end, you'll understand why it's a game-changer for JavaScript developers.",
            videoUrl: "https://example.com/video/12345",
        },
    };
};

export const getRecommendedVideos = async (
    id: string
): Promise<{
    success: boolean;
    message?: string;
    recommendedVideos?: RecommendedVideoModel[];
}> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        success: true,
        recommendedVideos: [
            {
                id: "1",
                title: "Learn React in 10 Minutes",
                authorUsername: "coding_guru",
                views: "1.2M",
                time: "10:23",
            },
            {
                id: "2",
                title: "Understanding TypeScript",
                authorUsername: "typescript_master",
                views: "800K",
                time: "15:47",
            },
            {
                id: "3",
                title: "JavaScript Tips and Tricks",
                authorUsername: "dev_tips",
                views: "650K",
                time: "12:30",
            },
            {
                id: "4",
                title: "Top 10 VS Code Extensions",
                authorUsername: "dev_tools",
                views: "500K",
                time: "8:45",
            },
            {
                id: "5",
                title: "Mastering CSS Flexbox",
                authorUsername: "css_ninja",
                views: "300K",
                time: "7:10",
            },
        ],
    };
};