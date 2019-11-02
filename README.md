---
layout: article
title: README
---

# jekyll-hikari

## 概要
jekyll を使った超シンプルなホームページを作る。

## jekyll のインストール
```sh
gem install jekyll
```

## リポジトリのクローン
```sh
git clone https://github.com/Himeyama/jekyll-hikari
```

## 設定

リポジトリ名がxxxxxx.github.ioの場合、`_config.yml`を以下のようにする。

```yml
# baseurl: ""
```

リポジトリ名がそれ以外の場合、

```yml
baseurl: "/リポジトリ名"
```

## 仮サーバーを立ち上げる
```sh
jekyll s -H 0.0.0.0
```

## スマホからアクセスする場合

1. コンピューターのIPアドレスを調べる

```sh
ifconfig
```

2. スマホからアクセスする。

以下はサーバーのアドレスが`192.168.0.2`の場合、`192.168.0.2:4000/(リポジトリ名)`

リポジトリ名は`xxxxxx.github.io`の場合はなし。