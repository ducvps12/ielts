import type { Metadata } from "next";

import { VerifyEmailCard } from "../../../components/auth/verify-email-card";

export const metadata: Metadata = {
  title: "Xác minh email",
};

export default function VerifyEmailPage() {
  return <VerifyEmailCard />;
}
