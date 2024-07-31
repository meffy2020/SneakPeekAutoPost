// src/components/Navbar.tsx

import Image from 'next/image';
import under1 from '../../public/under1.png';
import under2 from '../../public/under2.png';
import under3 from '../../public/under3.png';
import under4 from '../../public/under4.png';
import under5 from '../../public/under5.png';

const Navbar = () => {
    return (
        <nav className="bg-yellow-100 p-4 w-full max-w-[450px] flex justify-around items-center mx-auto">

            <Image src={under1} alt="Under 1" width={24} height={24} />
            <Image src={under2} alt="Under 2" width={24} height={24} />
            <Image src={under3} alt="Under 3" width={24} height={24} />
            <Image src={under4} alt="Under 4" width={24} height={24} />
            <Image src={under5} alt="Under 5" width={24} height={24} />
        </nav>
    );
};

export default Navbar;
