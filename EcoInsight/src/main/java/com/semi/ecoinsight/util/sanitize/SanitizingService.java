package com.semi.ecoinsight.util.sanitize;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

@Service
public class SanitizingService {
    public String sanitize(String html) {
        return Jsoup.clean(html, Safelist.relaxed()
            .addAttributes("img","src", "alt", "title", "width", "height")
            .addProtocols("img", "src", "http", "data")
        );
    }
}
