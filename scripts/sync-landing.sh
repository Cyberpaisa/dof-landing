#!/bin/bash
# sync-landing.sh — Sincroniza dof-home.html → index.html y despliega a producción
# Uso: bash ~/dof-landing/scripts/sync-landing.sh
set -e

cd "$(dirname "$0")/.."

cp public/dof-home.html public/index.html
git add public/index.html
git commit --author="Cyber <jquiceva@gmail.com>" \
  -m "sync: index.html ← dof-home.html"
git push
vercel --prod
