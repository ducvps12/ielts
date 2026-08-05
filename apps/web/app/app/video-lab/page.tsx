import type { Metadata } from "next";

import { VideoLabWorkspace } from "../../../components/client/video-lab-workspace";

export const metadata: Metadata = {
  title: "Video Lab",
  description:
    "Tạo bài học ngôn ngữ có cấu trúc từ transcript được phép sử dụng.",
};

export default function VideoLabPage() {
  return <VideoLabWorkspace />;
}
