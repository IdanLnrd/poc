#!/bin/bash
mkdir -p docs
git add .
git commit -m "deploy"
git push origin main
echo "Done"