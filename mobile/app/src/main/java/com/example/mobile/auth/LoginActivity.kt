package com.example.mobile.auth

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import android.content.Intent
import com.example.mobile.R
import com.example.mobile.dashboard.DashboardActivity
import com.example.mobile.network.AuthService
import com.example.mobile.network.ApiClient
import com.example.mobile.network.LoginRequest
import com.example.mobile.network.ApiResponse
import com.example.mobile.utils.TokenManager
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    private lateinit var authService: AuthService
    private lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        tokenManager = TokenManager(this)
        authService = ApiClient.retrofit.create(AuthService::class.java)

        val loginButton = findViewById<Button>(R.id.loginButton)
        loginButton.setOnClickListener {
            val email = findViewById<EditText>(R.id.emailField).text.toString()
            val password = findViewById<EditText>(R.id.passwordField).text.toString()

            authService.login(LoginRequest(email, password))
                .enqueue(object : Callback<ApiResponse<String>> {
                    override fun onResponse(
                        call: Call<ApiResponse<String>>,
                        response: Response<ApiResponse<String>>
                    ) {
                        if (response.isSuccessful && response.body()?.success == true) {
                            tokenManager.saveToken(response.body()?.data ?: "")
                            startActivity(Intent(this@LoginActivity, DashboardActivity::class.java))
                            finish()
                        } else {
                            Toast.makeText(this@LoginActivity, "Login failed", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                        Toast.makeText(this@LoginActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                    }
                })
        }
    }
}
