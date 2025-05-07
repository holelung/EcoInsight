package com.semi.ecoinsight.configuration.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CoopFilter implements Filter {
  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
      throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) res;
    response.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    response.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
    chain.doFilter(req, res);
  }
}
