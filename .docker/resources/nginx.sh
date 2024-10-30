#!/bin/sh

dns_ips=$(grep -E "^nameserver" /etc/resolv.conf | awk '{print $2}' | tr '\n' ' ')

# Remove any trailing space
export DNS_IPS=$(echo $dns_ips | sed 's/ *$//')

envsubst '${DB_UPSTREAM},${DNS_IPS}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
docker-helper save /usr/share/nginx/html/config.js

nginx "$@"