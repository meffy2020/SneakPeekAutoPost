import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { FollowerProvider } from '@/context/FollowerContext';

export const metadata = {
    title: 'Instagram Clone',
    description: 'An Instagram clone built with Next.js, Tailwind CSS, and TypeScript',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
        <body className="bg-yellow-100 flex justify-center items-center min-h-screen">
        <FollowerProvider>
            <div className="w-full max-w-md h-screen bg-yellow-100 shadow-lg overflow-hidden relative">
            <main className="overflow-auto h-full">{children}</main>
                <Navbar />
            </div>
        
        </FollowerProvider>
        </body>
        </html>
    );
};

export default RootLayout;
