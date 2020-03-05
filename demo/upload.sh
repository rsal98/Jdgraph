#!/bin/bash

ssh -p 22 $1 "rm -r dgraph1/p && ./bulk.sh && cp -avr rdfFiles/out/0/p dgraph1"


