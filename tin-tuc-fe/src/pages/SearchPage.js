import React, { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SearchQueryContext from "../context/SearchQueryContext";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
    const query = useQuery();
    const searchTerm = query.get("query") ?? '';
    const currentPage = Number.parseInt(query.get("page")) ?? 0;
    const [loading, setLoading] = useState(true);
    const { changeSearchQuery } = useContext(SearchQueryContext);
    const [totalPages, setTotalPages] = useState(0);
    const [listNews, setListNews] = useState([]);
    const [timeExecute, setTimeExecute] = useState(0);

    useEffect(() => {
        changeSearchQuery(searchTerm);
        performSearch();
    }, []);

    useEffect(() => {
        performSearch();
    }, [searchTerm, currentPage]);

    const performSearch = async () => {
        // try {
        //     if (searchTerm) {
        //         const response = await axios.get(`http://localhost:3000/api/v1/news/search?query=${searchTerm}&page=${currentPage}`);
        //         setListNews(response.data.content.listNews);
        //         setTotalPages(response.data.totalPages);
        //     }
        // } catch (err) {

        // }
        try {
            const response = await axios.get('https://6705e1b0031fd46a83113fbc.mockapi.io/api/v1/news');
            setLoading(false);
            setListNews(response.data);
        } catch (err) {
            console.log(err);
            alert(`Error when fetch data from server. Status code: ${err.status}. Message: ${err.message}`);
        }
    };

    const movePageAhead = () => {

    };

    const movePageBack = () => {

    };

    return (
        <>
            {
                !searchTerm ?
                    <div>
                        Bạn chưa nhập tìm kiếm
                    </div> :
                    <div className="h-full px-10 grid grid-rows-[120px_minmax(0,1fr)]">
                        <div className="h-full grid grid-rows-[60px_minmax(0,1fr)]">
                            <div className="grid grid-cols-[85vw_minmax(0,1fr)] max-w-[100vw]">
                                <div className="flex items-center max-h-[60px]">
                                    <p className="font-bold text-[42px] truncate">Tìm kiếm: {searchTerm}</p>
                                </div>
                                <div className="flex items-center justify-end">
                                    <button className="mx-1" onClick={movePageAhead}>
                                        <FaArrowLeft size={20} color="black" />
                                    </button>
                                    <p className="mx-1">{currentPage} of {totalPages}</p>
                                    <button className="mx-1" onClick={movePageBack}>
                                        <FaArrowRight size={20} color="black" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-red-400 flex items-center">
                                <p className="text-[38px]">Thời gian thực thi: {timeExecute}s</p>
                            </div>
                        </div>
                        <div className="overflow-y-scroll">
                            {
                                loading ?
                                    <div className="text-center">
                                        <p className="text-[40px]">Loading...</p>
                                    </div> :
                                    listNews.map((news) => (
                                        (
                                            <div key={news.id} className="w-full px-10">
                                                <div className="w-full grid grid-cols-[250px_minmax(0,1fr)] gap-4">
                                                    {/* Hình ảnh */}
                                                    <div className="w-[250px] h-[250px]">
                                                        <a href="/">
                                                            <img
                                                                src={news.imageTitleUrl}
                                                                alt={news.title}
                                                                className="block mx-auto w-full h-full object-cover"
                                                            />
                                                        </a>
                                                    </div>

                                                    {/* Phần tiêu đề và nội dung */}
                                                    <div className="w-full flex flex-col justify-between">
                                                        {/* Tiêu đề chỉ hiển thị 1 dòng, dấu "..." nếu quá dài */}
                                                        <div className="w-full">
                                                            <a href="/" className="h-[65px] flex items-center">
                                                                <p className="text-[35px] font-bold w-full truncate">
                                                                    {news.title}
                                                                </p>
                                                            </a>
                                                        </div>

                                                        {/* Nội dung wrap lại, và hiển thị dấu "..." khi vượt quá chiều cao */}
                                                        <div className="w-full h-[120px] overflow-hidden">
                                                            <a href="/">
                                                                <p className="text-[20px] leading-tight break-words overflow-hidden text-ellipsis line-clamp-4">
                                                                    {news.content}
                                                                </p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br className="w-full" />
                                            </div>
                                        )
                                    ))
                            }
                        </div>
                    </div>
            }

        </>
    );
};

export default SearchPage;