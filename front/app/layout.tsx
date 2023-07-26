import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import {UseLaunchesContextProvider} from "@/context/useLaunches";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpaceX Stats'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <UseLaunchesContextProvider>{children}</UseLaunchesContextProvider>
      </body>
    </html>
  )
}
