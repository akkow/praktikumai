import { Body } from "../components/pageParts/Body"
import { Footer } from "../components/pageParts/Footer"
import { Header } from "../components/pageParts/Header"
import "../styles/globals.css"

export const metadata = {
  title: "Beno aplikacija",
  description: "Pavyzdys paskaitoms",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Body>
        <Header />
        {children}
        <Footer />
      </Body>
    </html>
  )
}