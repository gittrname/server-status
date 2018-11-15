# server-status
TCP/IPプロトコルを定期的に監視してその結果をWeb画面に表示する簡易な死活監視ツール。


## 1. 使い方 (for Docker)
* config/production.jsonを作成
```
# cp config/sample.json config/production.json
```
> 設定ファイルの構成。
>  - web:
>    - title: 管理Web画面タイトル
>    - detail: 管理Web画面詳細
>  - services:
>    - {サイト識別名}:
>      - detail: サイト詳細
>      - domain: サイトドメイン
>      - host: 監視先IP or Host
>      - port: 監視ポート
>      - cron: 監視間隔(Cron表記)
>  - database: 監視データ保存先

* dockerイメージ作成
```
# docker build . server-status
```
* 起動
```
# docker run -p 3000:3000 server-status
```
## 2. 使い方 (for noDocker)
* Node.JSインストール
* NPMインストール

* 外部ライブラリインストール
```
# cd server-status
# npm install
```

* config/production.jsonを作成
```
# cp config/sample.json config/production.json
```

* 起動
```
# npm start
```
