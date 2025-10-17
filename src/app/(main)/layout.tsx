import BackgroundParticles from "@/components/background-particles";
import ChatbotButton from "@/components/chat-bot-button";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import LoadingScreen from "@/components/loading-screen";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <div className="flex flex-col min-h-screen">
        <BackgroundParticles />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatbotButton />
      </div>
    </>
  );
}
