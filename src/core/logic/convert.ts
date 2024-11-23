export function formatNumberToShortText(number: number): string {
    if (number < 1000) return number.toString(); // Số nhỏ hơn 1000 không cần đổi

    const units = ["", "K", "M", "B", "T"]; // Đơn vị: nghìn, triệu, tỷ, nghìn tỷ
    const unitIndex = Math.floor(Math.log10(number) / 3); // Xác định chỉ số đơn vị
    const scaledNumber = number / Math.pow(1000, unitIndex); // Chia số theo đơn vị

    // Làm tròn số với tối đa 1 chữ số thập phân nếu cần
    const formattedNumber = scaledNumber % 1 === 0 ? scaledNumber.toFixed(0) : scaledNumber.toFixed(1);

    return `${formattedNumber}${units[unitIndex]}`;
}

// Test cases
console.log(formatNumberToShortText(1000000)); // Output: "1M"
console.log(formatNumberToShortText(176432)); // Output: "176K"
console.log(formatNumberToShortText(5642000000)); // Output: "5.6B"
console.log(formatNumberToShortText(500)); // Output: "500"
