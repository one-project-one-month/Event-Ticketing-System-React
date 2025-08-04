import {type ApiResponse } from "@/types/ApiResponse";

export interface LoginRequestData{
    userName:string;
    password:string;
}

export interface LoginResponseData{
    token:string;
    tokenExpiredAt:string;
    refreshToken:string;
    refreshTokenExpireAt:string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;