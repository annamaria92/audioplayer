# deploy.sh

#!/usr/bin/env sh

# abort on errors
set -e

# build
echo Linting..
npm run lint
echo Building. this may take a minute...
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'example.com' > CNAME

echo Deploying..
git init
git add -A
git commit -m 'deploy'

# deploy
git remote add origin https://github.com/annamaria92/audioplayer
git checkout -B gh-pages

# Go to /dist
# Rename href=/ to href=/audioplayer/
# Rename src=/ to src=/audioplayer/

git add *
git commit -m "update"

git push -f origin gh-pages

cd -
