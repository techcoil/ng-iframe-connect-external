#!/usr/bin/env bash

script=$(echo $(cat << JS
    console.log('export const environment = ' + JSON.stringify({
        production: process.env.NODE_ENV === 'production',
        frameUrl: process.env.FRAME_URL || '/',
    },null, 2));
JS
))

node -e "$script" > src/environment/environment.ts

yarn --frozen-lockfile install;
yarn build