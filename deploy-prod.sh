#!/bin/bash -e

if [ -n "$(git status --porcelain)" ]; then 
  echo "git repo is not clean"
  exit 1
fi

v=$(./get-version.js)

echo "Deploying v$v"

npm run build 
rsync -a dist/ kittens.nz:departuretimes.click/ 

echo "done, see https://departuretimes.click/"

