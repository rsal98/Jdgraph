#!/bin/bash

ssh -p 22 $1 "wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=$2' -O rdfFiles/hmm.schema"
