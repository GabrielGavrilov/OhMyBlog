package com.gabrielgavrilov.ohmyblog.exception;

import lombok.Getter;

import java.util.Map;

public class ValidationException extends RuntimeException {
    @Getter
    private final Map<String, String> errors;

    public ValidationException(String message) {
        super(message);
        this.errors = null;
    }

    public ValidationException(Map<String, String> errors) {
        super(errors.toString());
        this.errors = errors;
    }

}
