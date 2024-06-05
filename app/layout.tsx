import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

import { ClerkProvider } from '@clerk/nextjs'

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "video call app",
  description: "Zoom clone application",
  icons:{
    icon: "/icons/logo.svg",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={
        {
          layout : {
            logoImageUrl : '/icons/yoom-logo.svg',
            socialButtonsVariant : 'iconButton'
          },
          variables : {
            colorText : '#fff',
            colorPrimary : '#0E78F9',
            colorBackground : '#1C1F2E',
            colorInputBackground : '#252A41',
            colorInputText : '#fff'
          }
      }
    }>   
      <html lang="en" dir="rtl">
          <body className={`bg-dark-2 relative text-white`}>
              {children}
          </body>
      </html>
    </ClerkProvider>
  )
}

