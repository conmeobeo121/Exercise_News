package com.ltk.NewsApi.controller;

import com.ltk.NewsApi.entity.News;
import com.ltk.NewsApi.service.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(path = "/api/v1/news")
public class NewsController {
    @Autowired
    private INewsService newsService;

    @GetMapping
    public ResponseEntity<Object> getAllNews(
            @RequestParam(value = "query", required = false) String query
    ) {
        try {
            List<News> data = new ArrayList<>();
            long start = System.currentTimeMillis();
            if (query == null) {
                data = newsService.getAllNews();
            } else {
                data = newsService.getNewsByTitleKeyword(query);
            }
            long end = System.currentTimeMillis();
            Map<String, Object> result = Map.of(
                    "time", Double.parseDouble(String.format("%.2f", (end - start) / 1000.0)),
                    "data", data
            );
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "message", "An unknown error occurred."
                    ));
        }
    }

    @GetMapping("/ver2")
    public ResponseEntity<Object> getAllNewsV2(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "pages", required = false) Integer pages
    ) {
        try {
            if (pages == null) { pages = 0; }
            Page<News> data = null;
            long start = System.currentTimeMillis();
            if (query == null) {
                data = newsService.getAllNews_V2(pages);
            } else {
                data = newsService.getNewsByTitleKeyword_V2(pages, query);
            }
            long end = System.currentTimeMillis();
            Map<String, Object> result = Map.of(
                    "time", Double.parseDouble(String.format("%.2f", (end - start) / 1000.0)),
                    "data", data
            );
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "message", "An unknown error occurred."
                    ));
        }
    }
}
