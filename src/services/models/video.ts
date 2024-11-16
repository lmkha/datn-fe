import { RecommendedVideoModel } from "./video-recommend";

export interface VideoModel {
    id?: string;
    title?: string;
    authorUsername?: string;
    likes?: string;
    dislikes?: string;
    shares?: string;
    forwards?: string;
    views?: string;
    date?: string;
    description?: string;
    comments?: Comment[];
    recommendedVideos?: RecommendedVideoModel[];
    videoUrl?: string;
}