export function formatNumberToShortText(number: number): string {
    if (number < 1000) return number.toString();

    const units = ["", "K", "M", "B", "T"];
    const unitIndex = Math.floor(Math.log10(number) / 3);
    const scaledNumber = number / Math.pow(1000, unitIndex);

    const formattedNumber = scaledNumber % 1 === 0 ? scaledNumber.toFixed(0) : scaledNumber.toFixed(1);

    return `${formattedNumber}${units[unitIndex]}`;
}

export function formatTimeToShortText(createdAt: string): string {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    const units = [
        { label: "year", seconds: 365 * 24 * 60 * 60 },
        { label: "month", seconds: 30 * 24 * 60 * 60 },
        { label: "week", seconds: 7 * 24 * 60 * 60 },
        { label: "day", seconds: 24 * 60 * 60 },
        { label: "hour", seconds: 60 * 60 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
        const count = Math.floor(diffInSeconds / unit.seconds);
        if (count >= 1) {
            return count === 1
                ? `1 ${unit.label} ago`
                : `${count} ${unit.label}s ago`;
        }
    }

    return "just now";
}

export const formatDuration = (durationInSeconds: number): string => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatSize = (sizeInBytes: number): string => {
    if (sizeInBytes >= 1024 * 1024 * 1024) {
        return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const formatDate = (isoDate: string | null | undefined): string => {
    if (!isoDate) {
        return "Invalid date";
    }

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
};