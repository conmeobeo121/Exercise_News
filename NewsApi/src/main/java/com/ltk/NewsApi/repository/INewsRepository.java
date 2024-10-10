package com.ltk.NewsApi.repository;

import com.ltk.NewsApi.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface INewsRepository extends JpaRepository<News, Long> {
    @Query(value = """
                SELECT * FROM news WHERE MATCH(title) AGAINST (:keyword)
            """, nativeQuery = true)
    List<News> findByTitleKeyword(@Param("keyword") String keyWord);

    @Query(value = """
                SELECT * FROM news WHERE MATCH(title) AGAINST (:keyword)
            """, nativeQuery = true)
    Page<News> findByTitleKeyword_V2(@Param("keyword") String keyWord, Pageable pageable);
}
