package com.example.betrayalsearchtool;

import android.annotation.SuppressLint;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

import com.airbnb.lottie.LottieAnimationView;
import com.airbnb.lottie.LottieDrawable;
import com.github.matteobattilana.weather.PrecipType;
import com.github.matteobattilana.weather.WeatherView;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
public class TitleActivity extends AppCompatActivity {

    private  static int SPLASH_SCREEN = 5000;
    //VAR
    Animation topAnim, bottomAnim;
    TextView title1,title2;
    LottieAnimationView lottieAnimationView;
    @RequiresApi(api = Build.VERSION_CODES.R)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splashscreen);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION, WindowManager.LayoutParams.TYPE_STATUS_BAR);
        //Animations
        topAnim = AnimationUtils.loadAnimation(this,R.anim.top_animation);
        bottomAnim = AnimationUtils.loadAnimation(this,R.anim.bottom_animation);

        //HOOKS
        title1 = findViewById(R.id.title1); title2 = findViewById(R.id.title2);
//        lottieAnimationView = findViewById(R.id.anim);
//        lottieAnimationView.setRepeatCount(LottieDrawable.INFINITE);
        title1.setAnimation(topAnim);
        title2.setAnimation(bottomAnim);
        WeatherView weatherView = findViewById(R.id.weather_view);
        weatherView.setWeatherData(PrecipType.RAIN);
        weatherView.setSpeed(400);
        weatherView.setAngle(30);
        weatherView.setEmissionRate(60f);
        weatherView.setFadeOutPercent(1);
//        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
//            @Override
//            public void run() {
//                Intent intent = new Intent(TitleActivity.this,RuleActivity.class);
//                startActivity(intent);
//                finish();
//            }
//        },SPLASH_SCREEN);
    }

}