import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { FloatingContact } from '@/components/public/FloatingContact';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      <FloatingContact />
    </>
  );
}
