import { UploadVideoPageState } from "@/app/studio/upload/page";

export interface UploadVideoPageErrorField {
    field: 'title' | 'video';
    message: string;
}

async function isValidTitle(title?: string): Promise<string | null> {
    if (!title) {
        return 'Title is required';
    }
    if (title.length < 3) {
        return 'Title must be at least 3 characters long';
    }
    return null;
}

async function isValidVideo(video?: File): Promise<string | null> {
    if (!video) {
        return 'Video file is required';
    }
    if (video.size > 100000000) {
        return 'Video file is too large';
    }
    const videoDuration = await getVideoDuration(video);
    if (videoDuration < 5) {
        return 'Video must be longer than 5 seconds';
    }
    return null;
    async function getVideoDuration(file: File): Promise<number> {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                resolve(video.duration);
            };

            video.onerror = function () {
                reject(new Error('Failed to load video metadata'));
            };

            video.src = URL.createObjectURL(file);
        });
    }
}

export async function validateUploadVideoForm(state: UploadVideoPageState): Promise<UploadVideoPageErrorField[]> {
    const errors: UploadVideoPageErrorField[] = [];

    await isValidTitle(state.title).then((error) => {
        if (error) {
            errors.push({ field: 'title', message: error });
        }
    });

    await isValidVideo(state.videoFile).then((error) => {
        if (error) {
            errors.push({ field: 'video', message: error });
        }
    });

    return errors;
}
