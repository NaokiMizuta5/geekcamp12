#!/bin/bash

# React のビルド
cd frontend
npm install
npm run build

# Django の静的ファイル収集
cd ../backend
python manage.py collectstatic --noinput