package com.dcm.service;

import com.dcm.dao.UserDao;
import com.dcm.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Override
    public boolean join(User user) {
        boolean loop = true;
        StringBuilder uid = new StringBuilder();
        char[] keySet = new char[]{
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z'};
        int len_keySet = keySet.length;
        while (loop) {

            for (int i = 0; i < 10; i++) {
                Random ran = new Random();
                int ind = ran.nextInt(len_keySet);
                uid.append(keySet[ind]);
            }
//            loop = isUid(uid.toString()) ? true : false;
            loop = false;
        }
        user.setUid(uid.toString());
        userDao.save(user);
        return false;
    }
}
