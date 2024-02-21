#!/bin/bash -e

t=$(date -Iseconds)

crof=https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=CROF
well=https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=WELL
s3000=https://api.opendata.metlink.org.nz/v1/stop-predictions?stop_id=3000

alerts=https://api.opendata.metlink.org.nz/v1/gtfs-rt/servicealerts


curl -H Accept:application/json  -H X-Api-Key:${key} \
    -o ${t}-alerts.json  ${alerts}

curl -H Accept:application/json  -H X-Api-Key:${key} \
    -o ${t}-crof.json  ${crof}

curl -H Accept:application/json  -H X-Api-Key:${key} \
    -o ${t}-well.json  ${well}

curl -H Accept:application/json  -H X-Api-Key:${key} \
    -o ${t}-s3000.json  ${s3000}

