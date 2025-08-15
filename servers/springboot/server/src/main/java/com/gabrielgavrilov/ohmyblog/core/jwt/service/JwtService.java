package com.gabrielgavrilov.ohmyblog.core.jwt.service;

import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.assembler.UserAssembler;
import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.Jwts;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
public class JwtService {
    private String SECRET_KEY = "a8ff9a8fe9392816988ff3af37dd1321a8e61ad9ee091f150262add7a101f4ab";
    public static final String COOKIE_NAME = "AUTHZ";

    public UserDto extractUserDto(String token) {
        return new UserDto()
                .setUserId(UUID.fromString(extractClaim(token, claims -> claims.get("userId", String.class))))
                .setEmail(extractClaim(token, claims -> claims.get("email", String.class)))
                .setDisplayName(extractClaim(token, claims -> claims.get("displayName", String.class)))
                .setDescription(extractClaim(token, claims -> claims.get("description", String.class)));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("userId", user.getUserId());
        claims.put("email", user.getEmail());
        claims.put("displayName", user.getDisplayName());
        claims.put("description", user.getDescription());

        return generateToken(claims, user);
    }

    public String generateToken(Map<String, Object> extractClaims, User user) {
        return Jwts
                .builder()
                .setClaims(extractClaims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Cookie createJwtCookie(String jwt) {
        Cookie c = new Cookie(JwtService.COOKIE_NAME, jwt);

        c.setMaxAge(60 * 60 * 10);
        c.setHttpOnly(false);
        c.setPath("/");

        return c;
    }

    public boolean isTokenValid(String token, User user) {
        String username = extractUsername(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyByte = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyByte);
    }

}
