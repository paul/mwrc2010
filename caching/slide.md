!SLIDE

# RFC2616
## Section 13 - Caching in HTTP

!SLIDE

Two hard problems in computer science

!SLIDE bullets

# Caching Goals

 * Reduce number of network round-trips. AKA: Expiration
 * Reduce network bandwidth requirements. AKA: Validation

!SLIDE bullets

# Expiration

 * Expires header
 * Cache-Control max-age directive

!SLIDE code

    expires

!SLIDE code

    cache-control max-age

!SLIDE bullets

# Validation

 * Last-Modified / If-Modified-Since
 * ETag / If-None-Match

!SLIDE code

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    ----
    < HTTP/1.1 200 OK
    < Date: Sat, 13 Feb 2010 00:58:50 GMT
    < Server: Apache/2.2.14 (Unix) mod_ssl/2.2.14 OpenSSL/0.9.8l Phusion_Passenger/2.2.8
    < Last-Modified: Wed, 07 Oct 2009 23:24:24 GMT
    < Content-Length: 32542
    < Status: 200 OK
    < Content-Type: image/png


!SLIDE code

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    > If-Modified-Since: Wed, 07 Oct 2009 23:24:24 GMT
    ---- 
    < HTTP/1.1 304 Not Modified
    < Date: Sat, 13 Feb 2010 00:59:49 GMT
    < Server: Apache/2.2.14 (Unix) mod_ssl/2.2.14 OpenSSL/0.9.8l Phusion_Passenger/2.2.8

!SLIDE code

    etag

!SLIDE code

    if-none-match




!SLIDE code

    vary


!SLIDE 


