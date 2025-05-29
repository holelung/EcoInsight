package com.semi.ecoinsight.util.file.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.semi.ecoinsight.exception.util.FileStreamException;
import com.semi.ecoinsight.exception.util.FileTypeNotAllowedException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileService {
    
    private final Path fileLocation;

    public FileService() {
        this.fileLocation = Paths.get("uploads").toAbsolutePath().normalize();
        
    }

    @SuppressWarnings("null")
    public String store(MultipartFile file) {

        // 빈파일명 체크
        if (file.getOriginalFilename() == null || file.getOriginalFilename().isBlank()) {
            throw new FileStreamException("파일명이 비어 있습니다.");
        }
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        // 이미지 형식 체크
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new FileTypeNotAllowedException("이미지 파일만 업로드 가능합니다.");
        }

        // 확장자 추출 
        String extension = StringUtils.getFilenameExtension(originalFileName);
        if (extension == null) {
            throw new FileStreamException("확장자 추출에 실패했습니다.");
        }

        LocalDateTime now = LocalDateTime.now();
        String timestamp = now.format(
                DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String newFileName = timestamp + "." + extension;

        Path targetLocation = this.fileLocation.resolve(newFileName);
        log.info("파일경로:{}", targetLocation);

        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return "http://localhost/uploads/" + newFileName;
        } catch (IOException e) {
            throw new FileStreamException("파일 저장중 오류 발생");
        }
    }
    
    public void deleteFile(String fileUrl) {
        Path filePath = fileLocation.resolve(fileUrl.substring(24)).normalize();
        
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new FileStreamException("파일 삭제중 오류 발생: " + e.getMessage());
        }

        
    }
}
