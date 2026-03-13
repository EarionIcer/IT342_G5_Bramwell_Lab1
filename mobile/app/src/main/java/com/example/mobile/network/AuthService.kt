package com.example.mobile.network

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

data class RegisterRequest(val username: String, val email: String, val password: String)
data class LoginRequest(val email: String, val password: String)
data class ApiResponse<T>(val success: Boolean, val data: T?, val error: String?)

interface AuthService {
    @POST("/api/auth/register")
    fun register(@Body request: RegisterRequest): Call<ApiResponse<String>>

    @POST("/api/auth/login")
    fun login(@Body request: LoginRequest): Call<ApiResponse<String>>

    @POST("/api/auth/logout")
    fun logout(): Call<ApiResponse<String>>
}
