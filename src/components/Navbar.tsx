// src/components/Navbar.tsx

const Navbar = () => {
    return (
        <nav className="bg-yellow-100 p-4 shadow-md fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[450px] flex justify-around items-center">
            <div className="text-2xl">🏠</div>
            <div className="text-2xl">🔍</div>
            <div className="text-2xl">🎥</div>
            <div className="text-2xl">❤️</div>
            <div className="text-2xl">👤</div>
        </nav>
    );
};

export default Navbar;
