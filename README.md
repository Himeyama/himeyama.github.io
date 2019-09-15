# static-page-maker
static-page-makerは静的サイトを簡単に作成するツールです。
rubyで動きます。

## bundle
とりあえずbundleしてください。

```ruby
bundle
```

## デモ
[https://hikaright.github.io/static-page-maker/](https://hikaright.github.io/static-page-maker/)

## 使い方
### 記事を書く
* `markdown`で書きたいウェブサイトの内容をマークダウンで記述します。
* `markdown`のディレクトリーは階層化できます。(最新版)
* タイトルをつけるには、マークダウンに`<!--title:タイトル-->`を記述します。（この場合、タイトルは「タイトル」になります。）

### CSSとJavaScript
* CSSとJavaScriptは`css`と`js`の中にあるファイルに記述します。
* 階層化に一部対応しました。たとえば、`/article/index.html`のファイルの場合、`js/article/index.js`がある場合、それを読み込む。


### テンプレート
テンプレートは共通部分を二度記述するのを省くために設けています。
header.htmlやfooter.htmlが読み込まれ、*.htmlに組み込まれます。

### ./make
`./make`を実行することで、`markdown`の中にあるmarkdownファイルをもとに、
htmlファイルを生成します。

Markdownを更新したときは、実行してください。

## 埋め込みコメントタグ
埋め込みコメントタグは特殊なコメントを環境変数として埋め込むことができます。

### 更新日時のコメントを埋め込む
```
<!-- @time -->
#=> <!-- xxxxxxxxxx -->
```
xxxxxxxxxxに入る値は起算時からの経過秒数を整数にしたものになります。

```
<!-- @date_e -->
#=> <time>平成XX年X月X日</time>
```

```
<!- @datetime_e -->
#=> <time>平成XX年X月X日X時X分X秒</time>
```

```
<!- @time_e -->
#=> <time>X時X分X秒</time>
```

### タイトルを埋め込む
```
<!-- @title -->
#=> タイトル
```

### 相対パス
たとえば、`/index.html`と`/article/index.html`があるとします。
その2つのページは共通のスタイルシート`/css/main.css`を使いたい場合、
普通は`/css/main.css`とすればいいですが、サーバー無しでテストしたい場合や、
一番階層の浅いディレクトリーがルートディレクトリーではない場合はすべてのページにおいて読み込むことができないため、
その対処法として相対パスを利用することができます。

相対パスは、一番浅いディレクトリーを基準にしてパスを生成します。
```
# /article/index.htmlの場合、
<!-- @depth -->
#=> .././
```

## プレビュー

```
./server.sh
```

でプレビューすることができます。

[http://localhost:8080/](http://localhost:8080/)
で見ることができます。