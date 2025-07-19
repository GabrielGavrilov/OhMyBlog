package com.gabrielgavrilov.ohmyblog.controller;

import com.gabrielgavrilov.ohmyblog.api.BlogDto;
import com.gabrielgavrilov.ohmyblog.core.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping("/{blogId}")
    public BlogDto getBlogById(@PathVariable UUID blogId) {
        return blogService.getBlogById(blogId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogDto createBlog(@RequestBody BlogDto blogDto) {
        return blogService.createBlog(blogDto);
    }

}
