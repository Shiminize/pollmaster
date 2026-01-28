import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100">
            <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-heading font-bold text-primary-600 tracking-tight">
                        PollMaster
                    </Link>
                    <nav>
                        <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
                            Admin Access
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-8">
                {children}
            </main>

            <footer className="py-6 text-center text-sm text-gray-400 border-t border-gray-100">
                &copy; {new Date().getFullYear()} PollMaster. Secure & Anonymous.
            </footer>
        </div>
    );
};

export default Layout;
