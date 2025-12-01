import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | House of Clarence",
  description: "Sign in to your House of Clarence account to manage your selections and projects.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

