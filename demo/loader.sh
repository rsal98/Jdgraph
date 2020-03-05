#!/bin/bash

sshpass -p '123456' ssh -p 22 $1 "./bulk.sh && rm -r dgraph/p && cp -avr rdfFiles/out/0/p dgraph"

