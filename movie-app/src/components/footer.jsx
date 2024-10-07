import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl font-bold text-indigo-400">Movie Mingle</h2>
                        <p className="mt-2 text-gray-400">Your go-to place for movie enthusiasts</p>
                    </div>
                    <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
                        <ul className="inline-flex space-x-6">
                            <li><Link to="/" className="hover:text-indigo-400 transition duration-300">Home</Link></li>
                            <li><Link to="/favorites-list" className="hover:text-indigo-400 transition duration-300">Favorites</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition duration-300">About</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition duration-300">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 text-center md:text-right">
                        <p className="text-gray-400">&copy; {new Date().getFullYear()} Movie Mingle. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;