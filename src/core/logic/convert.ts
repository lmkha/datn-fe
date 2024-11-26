export function formatNumberToShortText(number: number): string {
    if (number < 1000) return number.toString();

    const units = ["", "K", "M", "B", "T"];
    const unitIndex = Math.floor(Math.log10(number) / 3);
    const scaledNumber = number / Math.pow(1000, unitIndex);

    const formattedNumber = scaledNumber % 1 === 0 ? scaledNumber.toFixed(0) : scaledNumber.toFixed(1);

    return `${formattedNumber}${units[unitIndex]}`;
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