#!/usr/bin/expect -f

set var0 [lindex $argv 0];
set var1 [lindex $argv 1];

spawn ./bashFiles/runFile.sh $var0

set prompt "$var0's password:"

interact -o -nobuffer -re $prompt return
send "$var1\r"
 
expect eof
