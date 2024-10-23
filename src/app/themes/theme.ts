import { createTheme } from '@mui/material/styles';

// Tạo theme tùy chỉnh
const theme = createTheme({
    palette: {
        primary: {
            main: '#1a73e8', // Màu chính (ví dụ: màu xanh dương)
        },
        secondary: {
            main: '#f50057', // Màu phụ (ví dụ: màu hồng)
        },
        background: {
            default: '#f4f6f8', // Màu nền mặc định
        },
        text: {
            primary: '#333333', // Màu text chính
            secondary: '#757575', // Màu text phụ
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 700, // Chỉnh weight cho tiêu đề h3
        },
        h4: {
            fontWeight: 600, // Chỉnh weight cho tiêu đề h4
        },
        body1: {
            fontSize: '1rem', // Định nghĩa font size cho body text
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Bỏ viết hoa tự động của Button
                    borderRadius: 8, // Thay đổi border-radius
                },
                containedPrimary: {
                    backgroundColor: '#1a73e8', // Màu nền cho button primary
                    '&:hover': {
                        backgroundColor: '#155ab2', // Màu khi hover
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px', // Khoảng cách dưới mỗi TextField
                },
            },
        },
    },
});

export default theme;
