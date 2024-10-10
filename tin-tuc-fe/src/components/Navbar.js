import React, { useState, useEffect, useContext } from 'react';
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import SearchQueryContext from '../context/SearchQueryContext.jsx';

function Navbar() {
    const { searchQuery } = useContext(SearchQueryContext);
    const [searchQuery_input, setSearchQueryInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setSearchQueryInput(searchQuery);
    }, []);

    useEffect(() => {
        setSearchQueryInput(searchQuery);
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery_input.trim()) {
            const newUrl = `/?query=${encodeURIComponent(searchQuery_input)}`;
            navigate(newUrl);
        } else {
            navigate('/');
        }
    };


    return (
        <>
            <div className="flex items-center space-x-2 bg-gray-100 p-2">
                <a className='px-4 italic' href='/'>
                    <p>Dân Trí Fake</p>
                </a>
                <form className='flex items-center space-x-2 p-2 w-full' onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery_input}
                        placeholder="Search"
                        className="border border-gray-300 bg-white text-gray-800 rounded-lg p-2 focus:outline-none w-full"
                        onChange={(e) => setSearchQueryInput(e.target.value)}
                    />
                    <button className="border border-green-500 text-green-500 rounded-lg px-4 py-2 hover:bg-green-500 hover:text-white"
                        type='submit'>
                        Search
                    </button>
                </form>
            </div>

        </>
    );
}

export default Navbar;