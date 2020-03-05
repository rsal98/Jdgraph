#!/usr/bin/expect -f

set var0 [lindex $argv 0];
set var1 [lindex $argv 1];
set var2 [lindex $argv 2];

spawn ./forDownload1.sh $var0 $var2

set prompt "$var0's password:"

interact -o -nobuffer -re $prompt return
send "$var1\r"
 
expect eof
