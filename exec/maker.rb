require "json"
require "./exec/gengo"
require "csv"
require "redcarpet"
require "redcarpet/render_strip"

class String
    def to_html
        renderer = Redcarpet::Render::HTML.new(filter_html: false)
        markdown = Redcarpet::Markdown.new(renderer, {fenced_code_blocks: true, tables: true})
        markdown.render self
    end

    def html_replace! ragexp, file
        self.gsub! ragexp, open(file).read
    end
end

#古いファイルの削除
rm_ignore_list = CSV.open("./ignore").read.map do |f|
    f[0]
end
rm_list = Dir.glob("*") - rm_ignore_list
rm_list.each do |f|
    `rm -rf #{f}`
    puts "\e[31m-#{f}\e[0m"
end

ls_md = Dir.glob("markdown/**/*.md").map{|i| i.gsub /^markdown\//, ""}.sort #.map{|e| "markdown/"+e.match(/\/markdown\/(.*?\.md)/)[1]}
template = "./template/template.html"
config = JSON.parse open("./exec/config.json").read
ls_md.each do |files|
    str = open("./markdown/#{files}").read
    files =~ /\/(.*?)\.md$/; file = $1
    t = File.mtime "./markdown/#{files}"
    time_i = t.to_i
    date_e = t.era
    depth = files.count "/"

    begin
        open "#{files}", "r"
    rescue
        files =~ /^(.*)\/.*\.md/
        if $1
            unless Dir.exist? $1
                Dir.mkdir $1
            end
        end
    end

    open "#{files.chop.chop}html", "w" do |f|
        str =~ /<!--\s*page:\s*(.*?)\s*-->/
        tmp = $1
        while tmp do
            str.gsub! /<!--\s*page:\s*(.*?)\s*-->/, open("./markdown/#{files}".match(/(.*\/).*$/)[1]+tmp).read
            str =~ /<!--\s*page:\s*(.*?)\s*-->/
            tmp = $1
        end
        
        str = open(template).read.gsub /<!--\s*@article\s*-->/, str.to_html

        str.html_replace! /<!--\s*@header\s*-->/, "./template/header.html"
        str.html_replace! /<!--\s*@footer\s*-->/, "./template/footer.html"
        str.html_replace! /<!--\s*@nav\s*-->/, "./template/nav.html"

        str.gsub! /(<|&lt;)!--\s*@depth\s*--(>|&gt;)/, "#{"../"*depth}./"
        str.gsub! /(<|&lt;)!--\s*@time\s*--(>|&gt;)/, "<!-- #{time_i} -->"
        str.gsub! /(<|&lt;)!--\s*@date_e\s*--(>|&gt;)/, "<time>#{date_e}</time>"
        str.gsub! /(<|&lt;)!--\s*@webtitle\s*--(>|&gt;)/, "#{config["webtitle"]}"
        str.gsub! /(<|&lt;)!--\s*@useragent\s*--(>|&gt;)/, "<script>document.write(window.navigator.userAgent);</script>"

        js = "./js/"+f.path.chop.chop.chop.chop+"js"
        if File.exist? js
            str.gsub! /(<|&lt;)!--\s*@script\s*--(>|&gt;)/, "<script src=\"#{"../"*depth}#{js}\"></script>"
        else 
            str.gsub! /(<|&lt;)!--\s*@script\s*--(>|&gt;)/, ""
        end

        time_a = t.to_a; str.gsub! /(<|&lt;)!--\s*@time_e\s*--(>|&gt;)/, "<time>#{time_a[2]}時#{time_a[1]}分#{time_a[0]}秒</time>"
        str.gsub! /(<|&lt;)!--\s*@datetime_e\s*--(>|&gt;)/, "<time>#{date_e}#{time_a[2]}時#{time_a[1]}分#{time_a[0]}秒</time>"

        # タイトル名
        str =~ /<!--\s*title:\s*(.*?)\s*-->/
        title = $1 ? "#{$1} - #{config["webtitle"]}" : "#{file} - #{config["webtitle"]}"
        str.gsub! /(<|&lt;)!--\s*@title\s*--(>|&gt;)/, "#{title}"
        str.gsub! /<!--\s*title:.*?\s*-->/, ""

        # html作成
        f << str
    end
end
