package cender.shop.BL.Utilities;


import cender.shop.BL.Enums.ServiceResultType;

public class ServiceResultP<T> extends ServiceResult
        {
public ServiceResultP()
        {
        }

public ServiceResultP(ServiceResultType result)
        {
        Result = result;
        }

public ServiceResultP(ServiceResultType result, String message)
        {
        Result = result;
        ErrorMessage = message;
        }

public ServiceResultP(ServiceResultType result, T data)
        {
        Result = result;
        Data = data;
        }

public ServiceResultP(ServiceResultType result, String message, T data)
        {
        Result = result;
        ErrorMessage = message;
        Data = data;
        }

public T Data;

        }