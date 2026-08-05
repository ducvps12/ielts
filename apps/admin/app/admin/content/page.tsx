import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminContentPage() {
  return (
    <AdminResourceFoundation
      eyebrow="CONTENT LIBRARY"
      title="Nội dung"
      description="Quản lý lesson, transcript, question bank và provenance cho nhiều ngôn ngữ."
      permission="content.read"
      capabilities={[
        "Lọc theo learning language, level, skill và publication state",
        "Bắt buộc source, license và owner trước khi publish",
        "Version hóa transcript, rubric và generated learning material",
        "Tách nội dung AI-generated khỏi product translation messages",
      ]}
    />
  );
}
