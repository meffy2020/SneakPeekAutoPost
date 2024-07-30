import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { FollowerProvider } from '@/context/FollowerContext';
import qr_SneakPeak from '../../public/QR.png';


export const metadata = {
    title: 'Auto Post 체험판',
    description: '본 서비스를 미리 체험 해 볼 수 있습니다.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-yellow-100 flex justify-center items-center min-h-screen">
            <FollowerProvider>
                <div className="desktop-layout w-full max-w-7xl h-screen bg-yellow-100 shadow-lg overflow-hidden relative">
                    <div className="title-section w-full">
                        <h1 className="text-5xl font-bold pl-4">AutoPost</h1>
                        <p className="text-3xl pl-4">Your automated posting solution</p>
                        <div className="flex justify-between items-center p-4">
                            <div className="flex flex-col">
                                <p className="text-lg">모바일로 보고 싶다면?</p>
                                <p className="text-lg">카메라로 우측 QR 코드를 찍어보세요 📸</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img src={qr_SneakPeak.src} alt="qr_SneakPeak" className="w-30 h-30"/>
                            </div>
                        </div>

                    </div>

                    <div className="webapp-section">
                        <main className="overflow-auto h-full">{children}</main>
                    </div>
                </div>
                <div className="navbar-wrapper">
                    <Navbar/>
                </div>
            </FollowerProvider>
            </body>
        </html>
    );
};

export default RootLayout;