import Base from "./base";

class Image extends Base {
    async uploadImage(data: {
        file: File;
    }) {
        try {
            const formData = new FormData();
            formData.append("file", data.file);
            const response = await this.post("/file/image", formData);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            }
        } catch (err: any) {
            return {
                success: false,
                message: err?.response?.data?.message || "Upload image failed",
            }
        }
    }
}

const imageAPI = new Image();
export default imageAPI;
