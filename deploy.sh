#!/bin/bash
mkdir -p docs
echo "Build client start"
cd client
ng build --prod
cd ..
echo "Build client done"
echo "Copy dist directory"
cp -R ./client/dist/client ./docs
echo "Copy done"
echo "Push repository"
git add .
git commit -m "deploy"
git push origin main
echo "Done"