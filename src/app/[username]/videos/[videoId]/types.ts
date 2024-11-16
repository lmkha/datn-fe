import { CommentModel } from "@/services/models/comment";
import { VideoModel } from "@/services/models/video";
import { RecommendedVideoModel } from "@/services/models/video-recommend";

export interface Video extends VideoModel { }

export interface Comment extends CommentModel { }

export interface RecommendedVideo extends RecommendedVideoModel { }
