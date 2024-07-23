import Image from 'next/image';
import top1 from '../../public/top1.png';
import top2 from '../../public/top2.png';
import top3 from '../../public/top3.png';   

const ProfileHeader = ({ username, timer, followers }: { username: string, timer: number, followers: number }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    return (
        <div className="p-4 bg-yellow-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{username}</h1>
                <div className="text-lg font-mono">{formatTime(timer)}</div>
            </div>
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-10">
                    <img
                        src="/profile-pic.png"
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex space-x-4 mb-2">
                        <div className="text-center">
                            <span className="font-bold">1,234</span><br/>Posts
                        </div>
                        <div className="text-center">
                            <span className="font-bold">{followers.toLocaleString()}</span><br/>Followers
                        </div>
                        <div className="text-center">
                            <span className="font-bold">1</span><br/>Following
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-left">
                <p className="font-bold">100만 인플루언서</p>
                <p className="text-sm">Influencer</p>
                <p>Im the best<br/>DM for Collaboration</p>
            </div>
            <div className="flex justify-around border-t border-gray-300 pt-2">
                <Image src={top1} alt="Top 1" width={24} height={24} />
                <Image src={top2} alt="Top 2" width={24} height={24} />
                <Image src={top3} alt="Top 3" width={24} height={24} />
            </div>
        </div>
    );
};

export default ProfileHeader;
