package com.example.everytime.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private String content;
    private String author;
}
