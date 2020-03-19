#!/usr/bin/expect -f

set var1 [lindex $argv 0];
set var2 [lindex $argv 1];
set var3 [lindex $argv 2];
set var4 [lindex $argv 3];
set var5 [lindex $argv 4];

spawn ./bashFiles/first.sh $var1 $var5
set prompt "Current password for groot:"
set prompt2 "New password for $var1:"
set prompt3 "Retype new password for $var1:"

interact -o -nobuffer -re $prompt return
send "$var2\r"
interact -o -nobuffer -re $prompt2 return
send "$var3\r"
interact -o -nobuffer -re $prompt3 return
send "$var4\r"

expect eof





