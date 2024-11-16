import { VideoProvider } from "@/contexts/video-context";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <VideoProvider>
            {children}
        </VideoProvider>
    );
}