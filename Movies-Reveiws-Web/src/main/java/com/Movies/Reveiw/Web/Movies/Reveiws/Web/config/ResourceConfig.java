package com.Movies.Reveiw.Web.Movies.Reveiws.Web.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import java.io.File;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    private static final String UPLOADS_DIR = "uploads";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + UPLOADS_DIR + "/");
    }

    // Initialization method to create uploads directory if it doesn't exist
    @PostConstruct
    public void init() {
        File uploadsDir = new File(UPLOADS_DIR);
        if (!uploadsDir.exists()) {
            boolean created = uploadsDir.mkdir();
            if (created) {
                System.out.println("Uploads directory created: " + uploadsDir.getAbsolutePath());
            } else {
                System.err.println("Failed to create uploads directory: " + uploadsDir.getAbsolutePath());
            }
        }
    }
}