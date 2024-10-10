package com.ltk.NewsApi.service;

import com.ltk.NewsApi.entity.News;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;


public interface INewsService {
    List<News> getAllNews();
    Page<News> getAllNews_V2(int pages);
    Optional<News> getNewsById(Long id);
    List<News> getNewsByTitleKeyword(String keyWord);
    Page<News> getNewsByTitleKeyword_V2(int pages, String keyWord);
}
