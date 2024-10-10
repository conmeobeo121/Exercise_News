package com.ltk.NewsApi.service.impl;

import com.ltk.NewsApi.entity.News;
import com.ltk.NewsApi.repository.INewsRepository;
import com.ltk.NewsApi.service.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsServiceImpl implements INewsService {
    @Autowired
    private INewsRepository newsRepository;

    private final int MAX_SIZE_PER_PAGE = 20;

    @Override
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public Page<News> getAllNews_V2(int pages) {
        Pageable pageable = PageRequest.of(pages, MAX_SIZE_PER_PAGE, Sort.Direction.DESC, "id");
        return newsRepository.findAll(pageable);
    }

    @Override
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    @Override
    public List<News> getNewsByTitleKeyword(String keyWord) {
        return newsRepository.findByTitleKeyword(keyWord);
    }

    @Override
    public Page<News> getNewsByTitleKeyword_V2(int pages, String keyWord) {
        Pageable pageable = PageRequest.of(pages, MAX_SIZE_PER_PAGE);
        return newsRepository.findByTitleKeyword_V2(keyWord, pageable);
    }
}
