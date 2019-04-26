#!/bin/sh

# package with:
# docker build --tag=packager .
# docker run -v ${pwd}/src/:/usr/app/src -v ${pwd}/scripts:/usr/app/scripts -v ${pwd}/package.json:/usr/app/package.json packager ./scripts/package.sh

rm ./scripts/package-previous.zip
mv ./scripts/package.zip ./scripts/package-previous.zip
npm install --only prod
zip -qr ./scripts/package.zip package.json node_modules
cd src
zip -qr ../scripts/package.zip aws/*.js google/*.js core/*.js thermostats/*.js
