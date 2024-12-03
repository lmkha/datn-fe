import { ChildCommentModel, ParentCommentModel } from "@/services/models/comment";
import { VideoModel } from "@/services/models/video";
import { RecommendedVideoModel } from "@/services/models/video-recommend";

export interface Video extends VideoModel { }

export interface RecommendedVideo extends RecommendedVideoModel { }

export interface ParentComment extends ParentCommentModel {
}

export interface ChildComment extends ChildCommentModel { }
