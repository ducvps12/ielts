import { ClientShell } from "../../components/client/client-shell";

export default function AuthenticatedAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ClientShell>{children}</ClientShell>;
}
