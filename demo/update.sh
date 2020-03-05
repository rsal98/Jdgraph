#!/bin/bash

dgraph acl -a $2:9080 mod -u $1 --new_password

