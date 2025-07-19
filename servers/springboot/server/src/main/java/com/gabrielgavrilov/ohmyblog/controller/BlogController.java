package com.gabrielgavrilov.ohmyblog.controller;

import com.gabrielgavrilov.ohmyblog.api.BlogDto;
import com.gabrielgavrilov.ohmyblog.api.BlogSearchCriteriaDto;
import com.gabrielgavrilov.ohmyblog.core.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public Page<BlogDto> findBlogs(BlogSearchCriteriaDto searchCriteria, Pageable pageable) {
        return blogService.findBlogs(searchCriteria, pageable);
    }

    @GetMapping("/{blogId}")
    public BlogDto getBlogById(@PathVariable UUID blogId) {
        return blogService.getBlogById(blogId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogDto createBlog(@RequestBody BlogDto blogDto) {
        return blogService.createBlog(blogDto);
    }

    @PutMapping("/{blogId}")
    public BlogDto updateBlog(@PathVariable UUID blogId, @RequestBody BlogDto blogDto) {
        return blogService.updateBlog(blogId, blogDto);
    }

    @DeleteMapping("/{blogId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBlog(@PathVariable UUID blogId) {
        blogService.deleteBlog(blogId);
    }

}
