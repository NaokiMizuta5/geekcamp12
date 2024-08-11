#!/bin/bash
set -e  # エラーが発生したら即座に終了

# フロントエンドのビルド
echo "Building frontend..."
cd frontend
yarn install
yarn build

# バックエンドの準備
echo "Preparing backend..."
cd ../backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate

# ルートディレクトリに戻る
cd ..