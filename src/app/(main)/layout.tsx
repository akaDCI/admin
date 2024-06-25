import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import MainLayout from "@/components/core/layouts/MainLayout";

import { constants } from "@/settings";

export default function RootMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getCookie(constants.ACCESS_TOKEN, { cookies });

  // if (!token) {
  //   redirect(`/sign-in`);
  // }

  return <MainLayout>{children}</MainLayout>;
}
