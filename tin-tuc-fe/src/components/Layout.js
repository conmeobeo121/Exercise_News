// Layout.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='bg-white grid grid-rows-[60px_minmax(0,1fr)] w-full h-full max-w-[100vw]'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;