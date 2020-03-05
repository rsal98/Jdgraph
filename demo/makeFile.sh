#!/bin/bash

sshpass -p '123456' ssh -p 22 $1 "echo -e \"#!/bin/bash \n curl localhost:8080/admin/shutdown \" >> ~/shutDown.sh && chmod +x shutDown.sh && echo -e \"#!/bin/bash\n cd rdfFiles && dgraph bulk -f data.rdf.gz -s hmm.schema --map_shards=1 --reduce_shards=1 --http localhost:8000 --zero=localhost:5080 \" >> ~/bulk.sh && chmod +x bulk.sh && echo -e \"#!/bin/bash \n rm -r bulk.sh && rm -r shutDown.sh && rm -r startAlpha.sh && cd dgraph && dgraph alpha --my=localhost:7080 --lru_mb=1024 --zero=localhost:5080 --acl_secret_file ./secret\" >> ~/startAlpha.sh && chmod +x startAlpha.sh"


