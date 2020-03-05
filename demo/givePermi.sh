#!/usr/bin/expect -f

set var [lindex $argv 0];
set var1 [lindex $argv 1];
set var2 [lindex $argv 2];
set var3 [lindex $argv 3];
set var4 [lindex $argv 4];

spawn ./addPermi.sh $var $var2 $var3 $var4
set prompt "Current password for groot:"

interact -o -nobuffer -re $prompt return
send "$var1\r"

expect eof



