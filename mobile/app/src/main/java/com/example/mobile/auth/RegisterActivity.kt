package com.example.mobile.auth

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.mobile.R
import com.example.mobile.network.AuthService
import com.example.mobile.network.ApiClient
import com.example.mobile.network.RegisterRequest
import com.example.mobile.network.ApiResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {
    private lateinit var authService: AuthService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        authService = ApiClient.retrofit.create(AuthService::class.java)

        val registerButton = findViewById<Button>(R.id.registerButton)
        registerButton.setOnClickListener {
            val username = findViewById<EditText>(R.id.usernameField).text.toString()
            val email = findViewById<EditText>(R.id.emailField).text.toString()
            val password = findViewById<EditText>(R.id.passwordField).text.toString()

            authService.register(RegisterRequest(username, email, password))
                .enqueue(object : Callback<ApiResponse<String>> {
                    override fun onResponse(
                        call: Call<ApiResponse<String>>,
                        response: Response<ApiResponse<String>>
                    ) {
                        if (response.isSuccessful && response.body()?.success == true) {
                            Toast.makeText(
                                this@RegisterActivity,
                                "Registered successfully",
                                Toast.LENGTH_SHORT
                            ).show()
                            finish() // go back to login
                        } else {
                            Toast.makeText(
                                this@RegisterActivity,
                                "Registration failed",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                        Toast.makeText(
                            this@RegisterActivity,
                            "Error: ${t.message}",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                })
        }
    }
}
