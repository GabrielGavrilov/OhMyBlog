package com.gabrielgavrilov.ohmyblog.api;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.UUID;

@Data
@Accessors(chain = true)
public class BlogDto {
    private UUID id;
    private String title;
    private String body;
    private Instant createdAt;
}
