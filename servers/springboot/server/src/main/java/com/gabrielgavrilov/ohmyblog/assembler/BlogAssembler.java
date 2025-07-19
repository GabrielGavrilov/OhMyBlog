package com.gabrielgavrilov.ohmyblog.assembler;

import com.gabrielgavrilov.ohmyblog.api.BlogDto;
import com.gabrielgavrilov.ohmyblog.core.blog.entity.Blog;
import org.springframework.stereotype.Component;

@Component
public class BlogAssembler {

    public BlogDto assemble(Blog entity) {
        return new BlogDto()
                .setId(entity.getBlogId())
                .setTitle(entity.getTitle())
                .setBody(entity.getBody())
                .setCreatedAt(entity.getCreatedAt());
    }

    public Blog disassemble(BlogDto blogDto) {
        return Blog.newInstance(
                blogDto.getTitle(),
                blogDto.getBody()
        );
    }

    public Blog disassembleInto(BlogDto blogDto, Blog entity) {
        return entity
                .setTitle(blogDto.getTitle())
                .setBody(blogDto.getBody());
    }

}
