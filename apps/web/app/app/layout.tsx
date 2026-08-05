import { ClientShell } from "../../components/client/client-shell";
import { requireServerSession } from "../../lib/server-session";

export default async function AuthenticatedAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await requireServerSession();

  return <ClientShell user={session.user}>{children}</ClientShell>;
}
