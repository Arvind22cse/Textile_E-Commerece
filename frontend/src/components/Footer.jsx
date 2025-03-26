import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => (
    <footer className="bg-gray-900 text-white p-6">
        <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-start">
                <div className="w-full md:w-1/4 mb-4">
                    <h5 className="font-bold mb-2">Follow Us</h5>
                    <div className="flex space-x-2">
                        <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-rss"></i></a>
                    </div>
                </div>
                <div className="w-full md:w-1/4 mb-4">
                    <h5 className="font-bold mb-2">Categories</h5>
                    <p>Autumn, Winter, Spring, Summer</p>
                </div>
                <div className="w-full md:w-1/4 mb-4">
                    <h5 className="font-bold mb-2">Styles</h5>
                    <p>Casual, Classic, Urban, Sport</p>
                </div>
                <div className="w-full md:w-1/4 mb-4">
                <h5 className="font-bold mb-2">Contact Us</h5>
                    <p>Email: kumartextile@gmail.com</p>
                    <p>Contact: +91 9566308639</p>
                </div>
            </div>
            <div className="flex flex-wrap justify-between items-start mt-4">
                <div className="w-full md:w-1/2 mb-4">
                    <h5 className="font-bold mb-2">Subscribe</h5>
                    <form className="flex">
                        <input type="email" placeholder="Enter your email" className="p-2 rounded-l" />
                        <button type="submit" className="bg-red-500 p-2 rounded-r">Subscribe</button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 mb-4">
                    <h5 className="font-bold mb-2">Payment Methods</h5>
                    <div className="flex space-x-2">
                        <i className="fab fa-cc-visa"></i>
                        <i className="fab fa-cc-mastercard"></i>
                        <i className="fab fa-cc-paypal"></i>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-center">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;