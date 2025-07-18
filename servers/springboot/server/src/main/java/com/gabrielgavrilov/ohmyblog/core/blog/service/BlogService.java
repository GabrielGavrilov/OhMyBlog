package com.gabrielgavrilov.ohmyblog.core.blog.service;

import com.gabrielgavrilov.ohmyblog.api.BlogDto;
import com.gabrielgavrilov.ohmyblog.api.BlogSearchCriteriaDto;
import com.gabrielgavrilov.ohmyblog.assembler.BlogAssembler;
import com.gabrielgavrilov.ohmyblog.core.blog.entity.Blog;
import com.gabrielgavrilov.ohmyblog.core.blog.repository.BlogRepository;
import com.gabrielgavrilov.ohmyblog.core.blog.repository.BlogSearchSpecification;
import com.gabrielgavrilov.ohmyblog.exception.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class BlogService {
    private final BlogAssembler blogAssembler;
    private final BlogRepository blogRepository;

    public Page<BlogDto> findBlogs(BlogSearchCriteriaDto searchCriteria, Pageable pageable) {
        return blogRepository.findAll(new BlogSearchSpecification(searchCriteria), pageable)
                .map(blogAssembler::assemble);
    }

    public BlogDto getBlogById(UUID blogId) {
        return blogAssembler.assemble(findBlogById(blogId));
    }

    public BlogDto createBlog(BlogDto blogDto) {
        return saveBlog(blogAssembler.disassemble(blogDto));
    }

    public BlogDto updateBlog(UUID blogId, BlogDto blogDto) {
        return saveBlog(blogAssembler.disassembleInto(blogDto, findBlogById(blogId)));
    }

    public void deleteBlog(UUID blogId) {
        blogRepository.delete(findBlogById(blogId));
    }

    private Blog findBlogById(UUID blogId) {
        return blogRepository.findById(blogId).orElseThrow(() -> new NotFoundException(String.format("No blog exists with the UUID of '%s'", blogId)));
    }

    private BlogDto saveBlog(Blog blog) {
        return blogAssembler.assemble(blogRepository.save(blog));
    }
}
