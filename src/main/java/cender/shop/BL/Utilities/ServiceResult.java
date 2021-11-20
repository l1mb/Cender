package cender.shop.BL.Utilities;

import cender.shop.BL.Enums.ServiceResultType;

public class ServiceResult
{
    protected ServiceResult()
    {
    }

    public ServiceResult(ServiceResultType result)
    {
        Result = result;
    }

    public ServiceResult(ServiceResultType result, String message)
    {
        Result = result;
        ErrorMessage = message;
    }

    public ServiceResultType Result;

    public String ErrorMessage;
}
