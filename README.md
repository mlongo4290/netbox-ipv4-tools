## netbox-ipv4-tools

Work with ipv4 in NetBox.
This tools uses [ipaddr.js](https://github.com/whitequark/ipaddr.js/) behind the scenes

This plugin offers a place to retrieve
 - A table with the CIDR to netmask conversion, inluding the wildcard bits and the total hosts available per CIDR
 - A tool to convert a CIDR into an IP range including information such the usable host count, the netmask in decimal dotted format and the wildcard bits

## TODO
 - Add a tools to summarize CIDRs, given a list of many CIDR it should return the supernet CIDR
 - Add a table to report the types of ip ranges: public, private and special cases