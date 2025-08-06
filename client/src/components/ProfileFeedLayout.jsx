 
import React from 'react';
import ProfileCard from './ProfileCard';
import UserPost from './UserPost';
import NetworkNews from './NetworkNews';

const ProfileFeedLayout = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column (Profile Card) */}
                <ProfileCard />

                {/* Middle Column (Feed) */}
                <UserPost/>

                {/* Right Column (Network & News) */}
                <NetworkNews/>
            </div>
        </main>
    );
};

export default ProfileFeedLayout;
