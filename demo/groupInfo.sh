#!/usr/bin/expect -f

set var [lindex $argv 0];
set var1 [lindex $argv 1];
set var2 [lindex $argv 2];

spawn ./info.sh $var $var2
set prompt "Current password for groot:"

interact -o -nobuffer -re $prompt return
send "$var1\r"

expect eof

