package fk.adportal.security;

import java.time.LocalDateTime;
import java.util.UUID;

public class Token {

    private String uuid;
    private int userId;
    private LocalDateTime created;
    private LocalDateTime expires;

    public Token(int userId) {
        this.userId = userId;
        uuid = UUID.randomUUID().toString();
        created = LocalDateTime.now();
        expires = created.plusDays(1);
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getExpires() {
        return expires;
    }

    public void setExpires(LocalDateTime expires) {
        this.expires = expires;
    }
}
