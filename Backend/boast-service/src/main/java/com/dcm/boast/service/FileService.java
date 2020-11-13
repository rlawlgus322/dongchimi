package com.dcm.boast.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface FileService {
    String image(MultipartFile file) throws IOException;
}
