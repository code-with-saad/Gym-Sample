import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButton from "@/components/common/FloatingContactButton";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import Preloader from "@/components/common/Preloader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <FloatingContactButton />
      <MobileBottomBar />
    </>
  );
}
