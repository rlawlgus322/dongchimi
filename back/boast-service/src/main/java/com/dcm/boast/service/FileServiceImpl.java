package com.dcm.boast.service;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    private static final String PATH = "/home/ubuntu/file/";
//    private static final String PATH = "C:/Users/multicampus/IdeaProjects/s03p31a409/back/user-service/file/";



    @Override
    public String image(MultipartFile image) throws IOException {


        String originFilename = image.getOriginalFilename();
        System.out.println("이름 "+ originFilename);
        if (!(originFilename.toLowerCase().endsWith(".png") || originFilename.toLowerCase().endsWith(".jpg")
                || originFilename.toLowerCase().endsWith(".jpeg"))) {

        }

        String fileName = UUID.randomUUID().toString() + originFilename.substring(originFilename.indexOf('.'));

//        try {
            FileOutputStream fos = new FileOutputStream(PATH + fileName);
            System.out.println(PATH + fileName);
            fos.write(image.getBytes());
            fos.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.out.println("업로드 에러");
//        }

        return PATH + fileName;

    }
}
