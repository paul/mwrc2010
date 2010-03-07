!SLIDE 

# History

!SLIDE bullets

# 1990

 * Tim Berners-Lee proposes "World Wide Web" of hyperlinked documents
 * Documents delivered over HyperText Transfer Protocol, later named HTTP/0.9

!SLIDE 

# HTTP/0.9 Example

    @@@ http
    > GET http://mrwc2010.com/sombrero.xbm

![Darth Vader Wearing a Sombrero](darth_sombrero_8.jpg)

!SLIDE bullets

# 1990-1996

 * HTTP development continues ad-hoc
 * Servers and clients extend the protocal with additional features
 * Request headers and new methods: `HEAD`, `POST`
 * HTTP/1.0 formalized in Feb 1996 as RFC 1045

!SLIDE

# HTTP/1.0 Example

    @@@ http
    > GET http://mrwc2010.com/sombrero.gif HTTP/1.0
    > User-Agent: Mozilla/4.03 [fr]

    < HTTP/1.0 200 OK
    < Date: Thu, 20 Jul 2000 06:43:02 GMT
    < Server: Apache/1.3.12 (Unix) PHP/3.0.9
    < Content-Type: image/gif

![Darth Vader Wearing a Sombrero](darth_sombrero_16.jpg)

!SLIDE bullets

# January 1996

 * First draft of HTTP/1.1 in RFC 2068
 * Hierarchical proxies
 * Caching
 * Persistent Connections
 * Virtual Hosts

!SLIDE bullets

# June 1999

 * HTTP/1.1 spec finalized in RFC 2616
 * Transforms HTTP to a full-featured application protocol

!SLIDE

# HTTP/1.1 Example

    @@@ http
    > GET /sombrero.jpg HTTP/1.1
    > Host: mwrc2010.com
    > User-Agent: Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2) Gecko/20100207 Namoroka/3.6
    > Accept: image/png,image/*;q=0.8,*/*;q=0.5
    > Accept-Language: en-us,en;q=0.5
    > Accept-Encoding: gzip,deflate
    > Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
    > Keep-Alive: 115
    > Connection: keep-alive

    < HTTP/1.1 200 OK
    < Last-Modified: Sun, 07 Mar 2010 21:44:54 GMT
    < Content-Type: image/jpeg
    < Content-Length: 51488
    < Connection: keep-alive
    < Server: thin 1.2.5 codename This Is Not A Web Server

!SLIDE center

![Darth Vader Wearing a Sombrero](darth_sombrero.jpg)


