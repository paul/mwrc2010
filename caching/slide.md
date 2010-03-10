!SLIDE

# Caching

!SLIDE

> “There are only two hard problems in Computer Science: cache invalidation and naming things.”
>
> — Phil Karlton

!SLIDE center

# Terminology

![servers](servers.png)

!SLIDE bullets

# Caching Goals

 * Reduce number of network round-trips. **Expiration**
 * Reduce network bandwidth requirements. **Validation**

!SLIDE bullets

# Expiration

 * `Expires` header
 * `Cache-Control max-age` directive

!SLIDE bullets

# Expires

 * Time after which the response is considered stale.
 * To mark as "already expired": Set equal to `Date` header
 * To mark as "never expires": Set to 1 year from now

!SLIDE

# Expires

    @@@ http
    > GET /ajax/libs/jquery/1.4.1/jquery.min.js HTTP/1.1
    > Host: ajax.googleapis.com

    < HTTP/1.1 200 OK
    < Content-Type: text/javascript; charset=UTF-8
    < Last-Modified: Tue, 09 Feb 2010 23:05:02 GMT
    < Date: Mon, 08 Mar 2010 00:09:09 GMT
    * Expires: Tue, 08 Mar 2011 00:09:09 GMT
    < Cache-Control: public, max-age=31536000


!SLIDE 

# Setting the Expires header in Rails

    @@@ ruby
    class MyController < ApplicationController
      def index
        response.headers['Expires'] =
          1.year.from_now.httpdate

        # render ...
      end
    end

!SLIDE bullets

# Cache-Control max-age

 * Cache-Control header modifies basic caching mechanisms
 * Can by used by a User Agent to manipulate caching proxies
 * `max-age` directive on a response sets number of seconds until response is considered stale

!SLIDE

# Cache-Control max-age

    @@@ http
    > GET /ajax/libs/jquery/1.4.1/jquery.min.js HTTP/1.1
    > Host: ajax.googleapis.com
 
    < HTTP/1.1 200 OK
    < Content-Type: text/javascript; charset=UTF-8
    < Last-Modified: Tue, 09 Feb 2010 23:05:02 GMT
    < Date: Mon, 08 Mar 2010 00:09:09 GMT
    < Expires: Tue, 08 Mar 2011 00:09:09 GMT
    * Cache-Control: public, max-age=31536000

!SLIDE 

# Setting the Cache-Control Max Age in Rails

    @@@ ruby
    class MyController < ApplicationController
      def index
        expires_in 3.hours

        # render ...
      end
    end


!SLIDE bullets

# Validation

 * Last-Modified / If-Modified-Since
 * ETag / If-None-Match

!SLIDE bullets

## Last-Modified  / If-Modified-Since

 * Origin Server sets `Last-Modified` to indicate when the resource was last modified
 * User Agent can use `If-Modified-Since` to make a request *conditional*

!SLIDE 

# Last-Modified 

    @@@ http
    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*

    < HTTP/1.1 200 OK
    < Date: Sat, 13 Feb 2010 00:58:50 GMT
    * Last-Modified: Wed, 07 Oct 2009 23:24:24 GMT
    < Content-Length: 32542
    < Status: 200 OK
    < Content-Type: image/png

!SLIDE 

# If-Modified-Since

    @@@ http
    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    * If-Modified-Since: Wed, 07 Oct 2009 23:24:24 GMT

    * HTTP/1.1 304 Not Modified
    < Date: Sat, 13 Feb 2010 00:59:49 GMT
    < Server: Apache/2.2.14 (Unix) mod_ssl/2.2.14 OpenSSL/0.9.8l Phusion_Passenger/2.2.8

!SLIDE bullets

# ETag / If-None-Match

 * An Entity-Tag must change whenever the associated entity changes.
 * The User Agent can then make a conditional request using the ETag value in a If-None-Match request header

!SLIDE 

# ETag

    @@@ http
    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*

    < HTTP/1.1 200 OK
    < Date: Sat, 13 Feb 2010 00:58:50 GMT
    < Content-Length: 32542
    < Status: 200 OK
    < Content-Type: image/png
    * ETag: "d6561a22acb7aeaa7ca45da59c5de92c"

!SLIDE 

# If-None-Match

    @@@ http
    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > Accept: */*
    * If-None-Match: "d6561a22acb7aeaa7ca45da59c5de92c"

    * HTTP/1.1 304 Not Modified
    < Date: Sat, 13 Feb 2010 00:59:49 GMT
    < Server: Apache/2.2.14 (Unix) mod_ssl/2.2.14 OpenSSL/0.9.8l Phusion_Passenger/2.2.8

!SLIDE

# Handling Validation in Rails

    @@@ ruby
    def show
      @sombrero = Sombrero.find(params[:id])

      fresh_when(
        :etag => @sombrero, 
        :last_modified => @sombrero.updated_at, 
        :public => true
      )

      # render ...
    end

!SLIDE

# Handling Validation in Rails (Advanced)

    @@@ ruby
    def index
      last_modified = Sombrero.max(:updated_at)

      if stale?(:last_modified => last_modified)
        @sombreros = Sombrero.find_millions

        # render ...
      else
        head(304)
      end
    end

!SLIDE bullets

# More Caching Options

 * `Vary` Header
 * Cache-Control `public`, `private`

!SLIDE bullets

# Vary

 * The server specifies what request header fields it used to determine the response.
 * If they are the same, a cache can assume a previously cached response can be used to fullfil the request.

!SLIDE smbullets

# Cache-Control directives

 * **private** - May not be stored in a shared cache 
 * **public** - May be cached by any cache
 * **no-cache** - Must revalidate with origin before providing as a response
 * **no-store** - May be cached, but not written to disk or long-term storage

!SLIDE 

# Vary

    @@@ http
    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com

    < HTTP/1.1 200 OK
    < Authentication-Info: nc=00000001, qop=auth, cnonce="MDgxMjgy", nextnonce=00000002
    * Vary: Accept,Accept-Encoding,Authorization,Cookie

!SLIDE 

## Firefox 3.5 caching headers

    @@@ http
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

!SLIDE

## Firefox 3.5 caching headers

    @@@ http
    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > User-Agent: Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2) Gecko/20100207 Namoroka/3.6
    > Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    > Accept-Language: en-us,en;q=0.5
    > Accept-Encoding: gzip,deflate
    > Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
    > Cookie: session=Gk5Fi7jZdFYFMh30a6k%2FD3mB9uJAC9hCOMR3y8YebbutmRwG1pJ5ZG%2FXwsp3%0A&i8p%2FFqf1yRGT5D1L1B%2B1yKYXbZwxmieAURIeHTsW0hh5amoAH6wVVL0wVg47%0A&iK1lcQ48WX8%2B6JIxZcEN6xd2DUUprVGJ36BF7YJI6V7BtOIMFUQ%3D%0A
    * If-Modified-Since: Wed, 07 Oct 2009 23:24:24 GMT
    * If-None-Match: "a1da5d67748678a8da21ff4fe8243e70"
    > Cache-Control: max-age=0

!SLIDE

## Firefox 3.5 caching headers

    @@@ http
    > GET /sombrero.png HTTP/1.1
    > Host: mwrc-2010.com
    > User-Agent: Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2) Gecko/20100207 Namoroka/3.6
    * Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    * Accept-Language: en-us,en;q=0.5
    * Accept-Encoding: gzip,deflate
    * Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
    * Cookie: session=Gk5Fi7jZdFYFMh30a6k%2FD3mB9uJAC9hCOMR3y8YebbutmRwG1pJ5ZG%2FXwsp3%0A&i8p%2FFqf1yRGT5D1L1B%2B1yKYXbZwxmieAURIeHTsW0hh5amoAH6wVVL0wVg47%0A&iK1lcQ48WX8%2B6JIxZcEN6xd2DUUprVGJ36BF7YJI6V7BtOIMFUQ%3D%0A
    > If-Modified-Since: Wed, 07 Oct 2009 23:24:24 GMT
    > If-None-Match: "a1da5d67748678a8da21ff4fe8243e70"
    > Cache-Control: max-age=0

!SLIDE 

## Firefox 3.5 caching headers

    @@@ http
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
    * Cache-Control: max-age=0

