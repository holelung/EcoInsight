package com.semi.ecoinsight.util.sanitize;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

@Service
public class SanitizingService {
    public String sanitize(String html) {
        return Jsoup.clean(html, Safelist.relaxed()
                .addAttributes("p", "br", "strong", "b", "i", "u", "em", "span", "img" )

                .addAttributes("img", "src", "alt", "title", "width", "height", "style")
                .addAttributes("span", "style")
                .addAttributes("p", "style")
                .addAttributes("strong", "style")
                .addAttributes("b", "style")
                .addAttributes("i", "style")
                .addAttributes("u", "style")
                .addAttributes("em", "style")
            
                .addProtocols("img", "src", "http", "https", "data")
        );
    }
}
