import React, { useState } from 'react';

const Home = () => {
    return (
        <div className="max-w-2xl mx-auto text-center py-12">
            <h1 className="text-5xl font-heading font-bold text-gray-900 mb-6">
                Voice Your Opinion
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Participate in secure, anonymous polls on the topics that matter.
                Only the administrator sees the details—your public vote remains a mystery.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-400 italic">No active public polls listed directly. Please use the link provided by your administrator.</p>
            </div>
        </div>
    );
};

export default Home;
