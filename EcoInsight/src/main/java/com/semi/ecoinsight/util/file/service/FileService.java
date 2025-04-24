package com.semi.ecoinsight.util.file.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import javax.management.RuntimeErrorException;

import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileService {
    
    private final Path fileLocation;

    public FileService() {
        this.fileLocation = Paths.get("uploads").toAbsolutePath().normalize();
    }

    public String store(MultipartFile file) {
        
        if(file.getOriginalFilename() == null){ 
            throw new RuntimeException("fileName is Empty");
        }
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String extension = StringUtils.getFilenameExtension(originalFileName);
        if (extension == null) {
            throw new RuntimeException("확장자 추출 실패");
        }
        LocalDateTime now = LocalDateTime.now();
        String timestamp = now.format(
            DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS")
        );
        
        String newFileName = timestamp + "." + extension;

        Path targetLocation = this.fileLocation.resolve(newFileName);
        log.info("파일경로:{}", targetLocation);

        try{
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return "http://localhost/uploads/"+newFileName;
        } catch(IOException e){
            throw new RuntimeException("파일 저장중 오류 발생");
        }
    }
}
