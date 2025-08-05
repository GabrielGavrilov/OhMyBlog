package com.gabrielgavrilov.ohmyblog.core.blog.validator;

import com.gabrielgavrilov.ohmyblog.api.BlogDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class BlogValidator {
    public Map<String, String> validate(BlogDto blogDto) {
        Map<String, String> errors = new HashMap<>();

        if (StringUtils.isBlank(blogDto.getTitle())) {
            errors.put("title", "Blog title cannot be empty.");
        }

        return errors;
    }
}
