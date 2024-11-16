import { CommentModel } from "../models/comment";

const mockComments: CommentModel[] = [
    {
        id: "1",
        videoId: "1",
        content: "This is an amazing video!",
        username: "user1",
        createdAt: "2024-11-16T08:00:00Z",
        likes: "120",
        dislikes: "5",
    },
    {
        id: "2",
        content: "I totally agree with the points made here.",
        username: "lmkha",
        createdAt: "2024-11-15T10:30:00Z",
        likes: "98",
        dislikes: "3",
    },
    {
        id: "3",
        content: "Could use some improvement, but overall nice.",
        username: "user3",
        createdAt: "2024-11-14T14:20:00Z",
        likes: "30",
        dislikes: "10",
    },
    {
        id: "4",
        videoId: "1",
        content: "Absolutely loved the editing!",
        username: "lmkha",
        createdAt: "2024-11-13T09:50:00Z",
        likes: "200",
        dislikes: "1",
    },
    {
        id: "5",
        content: "Meh, not my cup of tea.",
        username: "user5",
        createdAt: "2024-11-12T16:00:00Z",
        likes: "15",
        dislikes: "25",
    },
    {
        id: "6",
        content: "Great content as always, keep it up!",
        username: "user6",
        createdAt: "2024-11-11T12:00:00Z",
        likes: "300",
        dislikes: "0",
    },
    {
        id: "7",
        content: "The audio quality could be better.",
        username: "lmkha",
        createdAt: "2024-11-10T18:30:00Z",
        likes: "40",
        dislikes: "7",
    },
    {
        id: "8",
        videoId: "1",
        content: "Perfect explanation, I learned a lot!",
        username: "user8",
        createdAt: "2024-11-09T20:45:00Z",
        likes: "220",
        dislikes: "2",
    },
    {
        id: "9",
        content: "This is exactly what I was looking for, thanks!",
        username: "lmkha",
        createdAt: "2024-11-08T14:15:00Z",
        likes: "190",
        dislikes: "6",
    },
    {
        id: "10",
        content: "Can you make a video about advanced topics?",
        username: "user10",
        createdAt: "2024-11-07T11:00:00Z",
        likes: "50",
        dislikes: "4",
    },
    {
        id: "11",
        content: "The video was okay, but I needed more details.",
        username: "user11",
        createdAt: "2024-11-06T08:25:00Z",
        likes: "35",
        dislikes: "20",
    },
    {
        id: "12",
        content: "Loved the humor in this one!",
        username: "user12",
        createdAt: "2024-11-05T13:00:00Z",
        likes: "110",
        dislikes: "5",
    },
    {
        id: "13",
        content: "Amazing visuals, so inspiring!",
        username: "user13",
        createdAt: "2024-11-04T15:45:00Z",
        likes: "250",
        dislikes: "0",
    },
    {
        id: "14",
        content: "Not bad, but it lacked structure.",
        username: "lmkha",
        createdAt: "2024-11-03T17:10:00Z",
        likes: "45",
        dislikes: "12",
    },
    {
        id: "15",
        videoId: "1",
        content: "Thanks for covering this topic, super helpful!",
        username: "user15",
        createdAt: "2024-11-02T09:30:00Z",
        likes: "180",
        dislikes: "3",
    },
];

export const getCommentByVideoId = async (
    id: string
): Promise<{
    comments?: CommentModel[];
}> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        comments: mockComments.filter((comment) =>
            id === "all" ? true : comment.videoId === id
        ),
    };
};
