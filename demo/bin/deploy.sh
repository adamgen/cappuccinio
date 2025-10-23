#!/bin/bash

# --branch main to upload to prod
npx wrangler pages deploy dist --project-name demo
