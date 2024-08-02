// src/layout.tsx
import '../styles/globals.css';
import { FollowerProvider } from '@/context/FollowerContext';
import qr_SneakPeak from '../../public/QR.png';

export const metadata = {
  title: 'Auto Post 체험판',
  description: '본 서비스를 미리 체험 해 볼 수 있습니다.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-yellow-100 flex justify-center items-center min-h-screen font-sans">
        <FollowerProvider>
          <div className="w-full max-w-7xl h-screen bg-yellow-100 shadow-lg overflow-hidden flex">
            {/* 왼쪽 섹션 */}
            <div className="hidden md:flex flex-col justify-center items-end p-8 md:w-1/2 lg:w-1/2 xl:w-1/2 pr-8">
              <h1 className="text-5xl font-bold">AutoPost</h1>
              <p className="text-3xl mt-4">Your automated posting solution</p>
              <div className="mt-8">
                <p className="text-lg">모바일로 보고 싶다면?</p>
                <p className="text-lg">카메라로 우측 QR 코드를 찍어보세요 📸</p>
                <div className="flex items-center justify-center mt-4">
                  <img src={qr_SneakPeak.src} alt="qr_SneakPeak" className="w-30 h-30" />
                </div>
              </div>
            </div>

            {/* 오른쪽 섹션 */}
            <div className="flex flex-col justify-center p-8 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 max-w-md mx-auto shadow-lg my-8 mr-12">
              <main className="w-full h-full">{children}</main>
            </div>
          </div>
        </FollowerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
