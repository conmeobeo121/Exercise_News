import React, { useState, useEffect, useContext } from "react";
import SearchQueryContext from "../context/SearchQueryContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import api from "../services/api";


function NewsPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("query") ?? '';
    const currentPage = Number.parseInt(searchParams.get("page") ?? "1");
    const [timeExecute, setTimeExecute] = useState(0);
    const [listNews, setListNews] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPageReturn, setCurrentPageReturn] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { changeSearchQuery } = useContext(SearchQueryContext);

    useEffect(() => {
        changeSearchQuery(searchTerm);
        loadNews();
    }, []);

    useEffect(() => {
        loadNews();
    }, [searchTerm, currentPage]);

    const loadNews = async () => {
        try {
            let url = '';
            if (searchTerm === '') {
                url = `/api/v1/news/ver2?pages=${currentPage - 1}`;
            } else {
                url = `/api/v1/news/ver2?query=${searchTerm}&pages=${currentPage - 1}`
            }
            const response = await api.get(url);
            setLoading(false);
            setListNews(response.data.data.content);
            setCurrentPageReturn(response.data.data.number + 1);
            setTotalPages(response.data.data.totalPages);
            setTimeExecute(response.data.time);
        } catch (err) {
            // console.log(err);
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        }
    };

    const updateURLWithoutNavigation = (newPage) => {
        setSearchParams(prev => {
            prev.set("page", newPage.toString());
            return prev;
        });
    };

    const movePageAhead = () => {
        console.log('move page ahead');
        const newPage = currentPageReturn - 1;
        updateURLWithoutNavigation(newPage);
    };

    const movePageBack = () => {
        console.log('move page back');
        const newPage = currentPageReturn + 1;
        updateURLWithoutNavigation(newPage);
    };

    return (
        <>
            <div className="h-full px-10 grid grid-rows-[80px_minmax(0,1fr)_60px]">
                <div className="grid grid-cols-[85vw_minmax(0,1fr)] max-w-[100vw]">
                    {
                        searchTerm === '' ?
                            <div className="flex items-center max-h-[80px]">
                                <p className="font-bold text-[42px] truncate">Full Tin tức</p>
                            </div> :
                            <div className="flex flex-col justify-center-center max-h-[80px]">
                                <p className="font-bold text-[36px] truncate">Tìm kiếm: {searchTerm}</p>
                                <p className="text-[20px] truncate">Thời gian thực thi: {timeExecute}</p>
                            </div>
                    }
                    <div className="flex items-center justify-end">
                        <button className="mx-1" disabled={(currentPageReturn < 2 || currentPageReturn > totalPages)}
                            onClick={movePageAhead}>
                            <FaArrowLeft size={20} color="black" />
                        </button>
                        <p className="mx-1">{currentPageReturn} of {totalPages}</p>
                        <button className="mx-1" disabled={currentPageReturn < 1 || currentPageReturn >= totalPages}
                            onClick={() => movePageBack()}>
                            <FaArrowRight size={20} color="black" />
                        </button>
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
                                                            {news.summary}
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
                <div className="flex items-center justify-end">
                    <button className="border border-green-500 text-green-500 rounded-lg px-4 py-2 hover:bg-green-500 hover:text-white w-full">
                        Create
                    </button>
                </div>
            </div>
        </>
    );
}

export default NewsPage;