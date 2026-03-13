package com.example.mobile.dashboard

import android.os.Bundle
import android.widget.Button
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import com.example.mobile.R
import com.example.mobile.auth.LoginActivity
import com.example.mobile.network.AuthService
import com.example.mobile.network.ApiClient
import com.example.mobile.network.ApiResponse
import com.example.mobile.utils.TokenManager
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DashboardActivity : AppCompatActivity() {
    private lateinit var tokenManager: TokenManager
    private lateinit var authService: AuthService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        tokenManager = TokenManager(this)
        authService = ApiClient.retrofit.create(AuthService::class.java)

        val logoutButton = findViewById<Button>(R.id.logoutButton)
        logoutButton.setOnClickListener {
            authService.logout().enqueue(object : Callback<ApiResponse<String>> {
                override fun onResponse(
                    call: Call<ApiResponse<String>>,
                    response: Response<ApiResponse<String>>
                ) {
                    tokenManager.clearToken()
                    startActivity(Intent(this@DashboardActivity, LoginActivity::class.java))
                    finish()
                }

                override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                    tokenManager.clearToken()
                    startActivity(Intent(this@DashboardActivity, LoginActivity::class.java))
                    finish()
                }
            })
        }
    }
}
