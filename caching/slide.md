!SLIDE

# RFC2616
## Section 13 - Caching in HTTP

!SLIDE

# “There are only two hard problems in Computer Science: cache invalidation and naming things.”

## — Phil Karlton

!SLIDE bullets

# Caching Goals

 * Reduce number of network round-trips. AKA: Expiration
 * Reduce network bandwidth requirements. AKA: Validation

!SLIDE bullets

# Expiration

 * Expires header
 * Cache-Control max-age directive

!SLIDE 

# Expires

    HTTP/1.1 200 OK
    Content-Type: text/javascript; charset=UTF-8
    Last-Modified: Tue, 09 Feb 2010 23:05:02 GMT
    Date: Tue, 16 Feb 2010 18:48:03 GMT
    Expires: Wed, 16 Feb 2011 18:48:03 GMT

!SLIDE 

# Cache-Control max-age

    HTTP/1.1 200 OK
    Content-Type: text/javascript; charset=UTF-8
    Last-Modified: Tue, 09 Feb 2010 23:05:02 GMT
    Date: Tue, 16 Feb 2010 18:48:03 GMT
    Expires: Wed, 16 Feb 2011 18:48:03 GMT
    Cache-Control: public, max-age=31536000

!SLIDE bullets

# Validation

 * Last-Modified / If-Modified-Since
 * ETag / If-None-Match

!SLIDE 

# Last-Modified 

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    ----
    < HTTP/1.1 200 OK
    < Date: Sat, 13 Feb 2010 00:58:50 GMT
    < Last-Modified: Wed, 07 Oct 2009 23:24:24 GMT
    < Content-Length: 32542
    < Status: 200 OK
    < Content-Type: image/png

!SLIDE 

# If-Modified-Since

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    > If-Modified-Since: Wed, 07 Oct 2009 23:24:24 GMT
    ---- 
    < HTTP/1.1 304 Not Modified
    < Date: Sat, 13 Feb 2010 00:59:49 GMT
    < Server: Apache/2.2.14 (Unix) mod_ssl/2.2.14 OpenSSL/0.9.8l Phusion_Passenger/2.2.8

!SLIDE 

# ETag

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    ----
    < HTTP/1.1 200 OK
    < Date: Sat, 13 Feb 2010 00:58:50 GMT
    < Content-Length: 32542
    < Status: 200 OK
    < Content-Type: image/png
    < ETag: "d6561a22acb7aeaa7ca45da59c5de92c"

!SLIDE 

# If-None-Match

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    > If-None-Match: "d6561a22acb7aeaa7ca45da59c5de92c"
    ---- 
    < HTTP/1.1 304 Not Modified
    < Date: Sat, 13 Feb 2010 00:59:49 GMT
    < Server: Apache/2.2.14 (Unix) mod_ssl/2.2.14 OpenSSL/0.9.8l Phusion_Passenger/2.2.8

!SLIDE 

# Vary

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    > Authorization: Digest username="admin", realm="SystemShepherd", ...
    ---
    < HTTP/1.1 200 OK
    < Authentication-Info: nc=00000001, qop=auth, cnonce="MDgxMjgy", nextnonce=00000002
    < X-Runtime: 0.01254
    < Content-Type: application/vnd.absperf.sskj1+json; charset=utf-8
    < Vary: Accept,Accept-Encoding,Authorization,Cookie

!SLIDE 

## Firefox 3.5 caching headers

    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > User-Agent: Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2) Gecko/20100207 Namoroka/3.6
    > Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    > Accept-Language: en-us,en;q=0.5
    > Accept-Encoding: gzip,deflate
    > Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
    > Cookie: session=Gk5Fi7jZdFYFMh30a6k%2FD3mB9uJAC9hCOMR3y8YebbutmRwG1pJ5ZG%2FXwsp3%0A&i8p%2FFqf1yRGT5D1L1B%2B1yKYXbZwxmieAURIeHTsW0hh5amoAH6wVVL0wVg47%0A&iK1lcQ48WX8%2B6JIxZcEN6xd2DUUprVGJ36BF7YJI6V7BtOIMFUQ%3D%0A
    > If-Modified-Since: Wed, 07 Oct 2009 23:24:24 GMT
    > If-None-Match: "a1da5d67748678a8da21ff4fe8243e70"
    > Cache-Control: max-age=0

