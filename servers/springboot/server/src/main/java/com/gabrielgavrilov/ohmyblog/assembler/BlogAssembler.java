package com.gabrielgavrilov.ohmyblog.assembler;

import com.gabrielgavrilov.ohmyblog.api.BlogDto;
import com.gabrielgavrilov.ohmyblog.core.blog.entity.Blog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class BlogAssembler {

    private final UserAssembler userAssembler;

    public BlogDto assemble(Blog entity) {
        return new BlogDto()
                .setBlogId(entity.getBlogId())
                .setTitle(entity.getTitle())
                .setBody(entity.getBody())
                .setCreatedAt(entity.getCreatedAt())
                .setUserDto(userAssembler.assemble(entity.getUser()));
    }

    public Blog disassemble(BlogDto blogDto, UUID userId) {
        return Blog.newInstance(
                userId,
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
