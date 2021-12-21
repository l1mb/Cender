package com.example.lab1.utils;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

public abstract class Hasher {
    public static byte[] getSalt() throws NoSuchAlgorithmException {
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    public static byte[] getSaltedHash(String password, byte[] salt) {
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            byte byteData[] = md.digest(password.getBytes());
            md.reset();
            return byteData;
        } catch(NoSuchAlgorithmException ex){
            return null;
        }
    }

    public static byte[] fromHex(String hex){
        byte[] binary = new byte[hex.length() / 2];
        for (int i = 0; i < binary.length; i++){
            binary[i] = (byte)Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
        }
        return binary;
    }

    public static String toHex(byte[] array){
        BigInteger bi = new BigInteger(1, array);
        String hex = bi.toString(16);
        int paddingLength = (array.length * 2) - hex.length();
        if (paddingLength > 0){
            return String.format("%0" + paddingLength + "d", 0) + hex;
        } else {
            return hex;
        }
    }

    public static boolean isValid(String loginPassword, byte[] storedHash, byte[] storedSalt){
        return Arrays.equals(getSaltedHash(loginPassword, storedSalt), storedHash);
    }
}
