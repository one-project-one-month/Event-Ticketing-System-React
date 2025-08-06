import {type ApiResponse } from "@/types/ApiResponse";

export interface LoginRequestData{
    userName:string;
    password:string;
}

export interface LoginResponseData{
    token:string;
    tokenExpiresAt:string;
    refreshToken:string;
    refreshTokenExpiresAt:string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface RefreshTokenRequestData {
    refreshToken: string;
}

export interface RefreshTokenResponseData {
    token:string;
    tokenExpiresAt:string;
    refreshToken:string;
    refreshTokenExpiresAt:string;
}