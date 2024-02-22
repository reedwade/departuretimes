#!/bin/bash -e

. ../../.env.local

curl \
  -H Accept:application/json \
  -H X-Api-Key:${VITE_API_KEY} \
  https://api.opendata.metlink.org.nz/v1/gtfs/stops \
  | \
jq \
  -c \
  'sort_by(.stop_name) | [.[] | {label:(.stop_id +" - "+ .stop_name), id:.stop_id}]' \
  > stops.json
