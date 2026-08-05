import type { Metadata } from "next";

import { LegalDocument } from "../../../components/legal/legal-document";
import { cookieSections } from "../../../data/legal";

export const metadata: Metadata = {
  title: "Chính sách cookie — Bản dự thảo",
  description: "Bản dự thảo chính sách cookie LevelUp IELTS.",
};

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Chính sách cookie"
      description="Cấu trúc dự thảo về cookie thiết yếu, phân tích và cách quản lý lựa chọn."
      version="Draft 0.1"
      effectiveDate="Chưa xác định"
      sections={cookieSections}
    />
  );
}
