#!/bin/bash

dgraph acl mod -a $4:9080 -g $1 -p $2 -m $3
