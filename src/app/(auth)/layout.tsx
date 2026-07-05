export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="screen on" id="s-signup">{children}</div>;
}
