import LeftSide from "./_components/left-side";

export default function CredentialsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LeftSide />
      {children}
    </>
  );
}
