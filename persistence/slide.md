!SLIDE

# (Male) Performance Enhancing Features in HTTP/1.1

!SLIDE

# Persistent Connections

!SLIDE center

![HTTP Sequence Diagram without Keepalive](no-keepalive.png)

!SLIDE 

# DNS Query

    % dig www.google.com @8.8.8.8
    ...
    ;; Query time: 63 msec

!SLIDE

# Packet Roundtrip

    % ping www.google.com
    PING www.l.google.com (74.125.53.147) 56(84) bytes of data.
    64 bytes from pw-in-f147.1e100.net (74.125.53.147): icmp_seq=1 ttl=53 time=56.4 ms
    64 bytes from pw-in-f147.1e100.net (74.125.53.147): icmp_seq=2 ttl=53 time=54.8 ms
    64 bytes from pw-in-f147.1e100.net (74.125.53.147): icmp_seq=3 ttl=53 time=56.4 ms
    64 bytes from pw-in-f147.1e100.net (74.125.53.147): icmp_seq=4 ttl=53 time=55.4 ms
    --- www.l.google.com ping statistics ---
    4 packets transmitted, 4 received, 0% packet loss, time 3004ms
    rtt min/avg/max/mdev = 54.842/55.807/56.472/0.739 ms

!SLIDE

    DNS Query           63ms
    SYN/SYN_ACK/ACK     55ms
    HTTP GET/200 OK     55ms
    FIN/ACK x2         100ms
                    --------
                       273ms

## Almost 300ms of overhead in TCP connections!

!SLIDE center

![HTTP Sequence Diagram with Keepalive](keepalive.png)


