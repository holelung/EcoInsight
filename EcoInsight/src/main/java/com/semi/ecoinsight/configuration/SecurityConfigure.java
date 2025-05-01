package com.semi.ecoinsight.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.semi.ecoinsight.configuration.filter.JwtFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfigure {

	private final JwtFilter filter;
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
		
		return httpSecurity.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.csrf(AbstractHttpConfigurer::disable)
				.cors(Customizer.withDefaults())
				.authorizeHttpRequests(requests -> {
					requests.requestMatchers("/admin/**").hasRole("ADMIN");
					requests.requestMatchers(HttpMethod.POST, 
							"/auth/login", 
							"/auth/id", 
							"/auth/password",
							"/members",
							"/admin/login",
							"/auth/send-code",
							"/auth/verify-code",
							"/auth/find-id",
							"/auth/find-password",
							"/auth/verifycode-password",
							"/auth/admin-login").permitAll();
					requests.requestMatchers(HttpMethod.GET).permitAll();
					requests.requestMatchers(HttpMethod.POST,"/change-email","/mypages","/mypages/edifprofile").authenticated();
					requests.requestMatchers(HttpMethod.PUT, "/members/password").authenticated();
					requests.requestMatchers(HttpMethod.DELETE, "/mypages").authenticated();
					requests.anyRequest().authenticated();
				})
				.sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	@Bean
	public CorsConfigurationSource corsConfigurationSource(){
		CorsConfiguration configuration = new CorsConfiguration();
		// configuration.setAllowedOrigins(Arrays.asList("192.168.219.**:**"));
		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
