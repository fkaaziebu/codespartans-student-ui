import AuthGuard from "@/components/global/auth-guard";

export default function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="screen on" id="s-personalize">
        <div className="pers-shell">{children}</div>
      </div>
    </AuthGuard>
  );
}
