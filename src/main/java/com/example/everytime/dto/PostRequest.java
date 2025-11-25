package com.example.everytime.dto;

import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String content;
    private String author;
}
