#!/bin/bash
set -e  # エラーが発生したら即座に終了

# フロントエンドのビルド
echo "Building frontend..."
cd frontend
yarn install
yarn build
cd ..

# バックエンドの準備
echo "Preparing backend..."
pip install -r requirements.txt
cd backend
python manage.py collectstatic --noinput
python manage.py migrate
cd ..