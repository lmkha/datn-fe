import { ChildCommentModel, ParentCommentModel } from "../models/comment";

export const getAllParentCommentsOfVideo_Mock = async (videoId: string): Promise<ParentCommentModel[]> => {
    const response = {
        success: true,
        message: "Get all parent comments in a video successfully",
        httpStatus: "OK",
        data: [
            {
                createdAt: "2024-11-24T11:05:40.422Z",
                updatedAt: "2024-12-02T17:57:46.037Z",
                id: "6743088418ff381538a4c4fc",
                videoId: "6744950cf882237fb9bd833e",
                userId: "52",
                content: "This video is really great",
                replyTo: null,
                replies: ["674df51a49dc745c694a4f78", "674df51b49dc745c694a4f79", "674df61a49dc745c694a4f80"],
                likeCount: 1,
                replyCount: 3,
                isEdited: true
            },
            {
                createdAt: "2024-12-02T13:51:55.744Z",
                updatedAt: "2024-12-02T13:51:55.744Z",
                id: "674dbb7b7a0fca3e81e40c7d",
                videoId: "6744950cf882237fb9bd833e",
                userId: "32",
                content: "This video is good",
                replyTo: null,
                // replies: ["674df81b49dc745c694a4f81"],
                replies: [],
                likeCount: 0,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-11-20T10:20:30.422Z",
                updatedAt: "2024-11-21T12:00:46.037Z",
                id: "674aa8418ff123138a4c4fc",
                videoId: "6744950cf882237fb9bd833e",
                userId: "45",
                content: "Interesting content, well done!",
                replyTo: null,
                replies: ["674ff51a49dc745c694a4f80", "674cc51a29dc745c694a4f81", "674ff52a49dc745c694a4f82"],
                likeCount: 15,
                replyCount: 6,
                isEdited: false
            },
            {
                createdAt: "2024-12-01T14:15:50.744Z",
                updatedAt: "2024-12-01T15:51:55.744Z",
                id: "674bcb7b7a0fca3e81e40c7e",
                videoId: "6744950cf882237fb9bd833e",
                userId: "67",
                content: "Can you explain more about this part?",
                replyTo: null,
                replies: [],
                likeCount: 2,
                replyCount: 0,
                isEdited: true
            },
            {
                createdAt: "2024-11-28T09:10:30.422Z",
                updatedAt: "2024-11-29T10:20:46.037Z",
                id: "674cc8418ff128538a4c4fc",
                videoId: "6744950cf882237fb9bd833e",
                userId: "89",
                content: "I don't agree with this point.",
                replyTo: null,
                replies: ["674df98a49dc745c694a4f88"],
                likeCount: 8,
                replyCount: 1,
                isEdited: false
            }
        ]
    };

    return response.data.map(comment => ({
        id: comment.id,
        content: comment.content,
        likes: comment.likeCount,
        childrenIds: comment.replies || [],
        replyCount: comment.replyCount,
        videoId: comment.videoId,
        userId: comment.userId,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        isEdited: comment.isEdited
    }));
};

export const getAllChildCommentsOfParentComment_Mock = async (parentId: string): Promise<ChildCommentModel[]> => {
    const response = {
        success: true,
        message: "Get all children comments in a video successfully",
        httpStatus: "OK",
        data: [
            {
                createdAt: "2024-12-02T17:56:12.057Z",
                updatedAt: "2024-12-02T17:56:12.057Z",
                id: "674df4bc49dc745c694a4f77",
                videoId: "6744950cf882237fb9bd833e",
                userId: "52",
                content: "Reply to great",
                replyTo: "6743088418ff381538a4c4fc",
                replies: null,
                likeCount: 0,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-12-02T17:57:46.035Z",
                updatedAt: "2024-12-02T17:57:46.035Z",
                id: "674df51a49dc745c694a4f78",
                videoId: "6744950cf882237fb9bd833e",
                userId: "52",
                content: "Another reply to great",
                replyTo: "6743088418ff381538a4c4fc",
                replies: null,
                likeCount: 0,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-12-02T18:00:10.123Z",
                updatedAt: "2024-12-02T18:05:22.456Z",
                id: "674df51b49dc745c694a4f79",
                videoId: "6744950cf882237fb9bd833e",
                userId: "67",
                content: "Helpful explanation!",
                replyTo: "6743088418ff381538a4c4fc",
                replies: null,
                likeCount: 5,
                replyCount: 0,
                isEdited: true
            },
            // {
            //     createdAt: "2024-12-02T19:00:10.123Z",
            //     updatedAt: "2024-12-02T19:05:22.456Z",
            //     id: "674df81b49dc745c694a4f81",
            //     videoId: "6744950cf882237fb9bd833e",
            //     userId: "32",
            //     content: "Interesting point of view.",
            //     replyTo: "674dbb7b7a0fca3e81e40c7d",
            //     replies: null,
            //     likeCount: 2,
            //     replyCount: 0,
            //     isEdited: false
            // },
            // {
            //     createdAt: "2024-12-02T19:15:22.567Z",
            //     updatedAt: "2024-12-02T19:25:22.567Z",
            //     id: "674df82a49dc745c694a4f82",
            //     videoId: "6744950cf882237fb9bd833e",
            //     userId: "72",
            //     content: "Nice explanation! It's really clear.",
            //     replyTo: "674dbb7b7a0fca3e81e40c7d",
            //     replies: null,
            //     likeCount: 8,
            //     replyCount: 0,
            //     isEdited: false
            // },
            {
                createdAt: "2024-12-02T19:20:22.567Z",
                updatedAt: "2024-12-02T19:30:22.567Z",
                id: "674df92a49dc745c694a4f83",
                videoId: "6744950cf882237fb9bd833e",
                userId: "85",
                content: "Could you provide more details on the topic?",
                replyTo: "674aa8418ff123138a4c4fc",
                replies: null,
                likeCount: 3,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-12-02T20:00:10.123Z",
                updatedAt: "2024-12-02T20:05:22.456Z",
                id: "674df94a49dc745c694a4f84",
                videoId: "6744950cf882237fb9bd833e",
                userId: "99",
                content: "I don't understand this part, could you clarify?",
                replyTo: "674aa8418ff123138a4c4fc",
                replies: null,
                likeCount: 1,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-12-02T20:10:10.123Z",
                updatedAt: "2024-12-02T20:15:22.456Z",
                id: "674df95a49dc745c694a4f85",
                videoId: "6744950cf882237fb9bd833e",
                userId: "54",
                content: "Good insights, thanks for sharing.",
                replyTo: "674aa8418ff123138a4c4fc",
                replies: null,
                likeCount: 4,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-12-02T20:15:10.123Z",
                updatedAt: "2024-12-02T20:20:22.456Z",
                id: "674df96a49dc745c694a4f86",
                videoId: "6744950cf882237fb9bd833e",
                userId: "47",
                content: "Great video! Would love to see more content like this.",
                replyTo: "674aa8418ff123138a4c4fc",
                replies: null,
                likeCount: 7,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-12-02T20:25:10.123Z",
                updatedAt: "2024-12-02T20:30:22.456Z",
                id: "674df97a49dc745c694a4f87",
                videoId: "6744950cf882237fb9bd833e",
                userId: "28",
                content: "I didn't agree with the conclusion here, please explain more.",
                replyTo: "674aa8418ff123138a4c4fc",
                replies: null,
                likeCount: 2,
                replyCount: 0,
                isEdited: false
            },
            {
                createdAt: "2024-12-02T20:30:10.123Z",
                updatedAt: "2024-12-02T20:35:22.456Z",
                id: "674df98a49dc745c694a4f88",
                videoId: "6744950cf882237fb9bd833e",
                userId: "64",
                content: "Interesting approach! Definitely made me think differently.",
                replyTo: "674cc8418ff128538a4c4fc",
                replies: null,
                likeCount: 10,
                replyCount: 0,
                isEdited: true
            },
        ]
    };

    return response.data
        .filter(comment => comment.replyTo === parentId)
        .map(comment => ({
            parentId: comment.replyTo!,
            id: comment.id,
            content: comment.content,
            likes: comment.likeCount,
            replyCount: comment.replyCount,
            videoId: comment.videoId,
            userId: comment.userId,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            isEdited: comment.isEdited
        }));
};
