#!/usr/bin/expect -f

set var [lindex $argv 0];
set var1 [lindex $argv 1];
set var2 [lindex $argv 2];
set var3 [lindex $argv 3];

spawn ./bashFiles/assign.sh $var $var2 $var3
set prompt "Current password for groot:"

interact -o -nobuffer -re $prompt return
send "$var1\r"

expect eof

