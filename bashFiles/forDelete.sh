#!/usr/bin/expect -f

set var [lindex $argv 0];
set var1 [lindex $argv 1];
set var2 [lindex $argv 2];

spawn ./bashFiles/delete.sh $var1 $var2
set prompt "Current password for groot:"

interact -o -nobuffer -re $prompt return
send "$var\r"

expect eof



