import React, { useState } from 'react';
import AuthModal from '../AuthModal';

function DummyProfile() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleClick = () => {
        setIsAuthModalOpen(true);
    };

    return (
        <>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            <div
                className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-10 md:sticky md:top-20 h-fit cursor-pointer"
                onClick={handleClick}
            >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                    {/* Header */}
                    <div className="h-24 bg-gradient-to-r from-gray-400 to-gray-600"></div>

                    {/* Dummy Profile Image */}
                    <div className="flex justify-center -mt-12">
                        <img
                            src="https://th.bing.com/th/id/OIP.PMhANanxddOBObcYxcYOcwHaGy"
                            alt="Dummy Profile"
                            className="h-24 w-24 rounded-full border-4 border-white object-cover"
                        />
                    </div>

                    {/* Dummy Info */}
                    <div className="text-center px-6 pb-6">



                        <div className="mt-4 text-red-600 text-sm font-medium">
                            Please login to view your full profile.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DummyProfile;
