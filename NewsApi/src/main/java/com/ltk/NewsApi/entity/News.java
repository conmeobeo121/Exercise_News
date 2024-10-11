package com.ltk.NewsApi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "news", indexes = {
        @Index(name = "idx_title", columnList = "title")
})
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    private Long id;

    @Column(name = "title")
    @NotNull
    private String title;

    @Column(name="summary", length = 1000)
    @NotNull
    private String summary;

    @Column(name="content", columnDefinition = "TEXT")
    private String content;

    @Column(name="image_title_url")
    private String imageTitleUrl;
}
