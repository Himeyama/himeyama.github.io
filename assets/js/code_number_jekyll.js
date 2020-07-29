function code_number_jekyll(){
    let codes = document.getElementsByTagName("pre")
    for(let i = 0; i < codes.length; i++){
        let n = codes[i]
        if(n.className != "highlight") continue
        let r = n.innerHTML.match(/.*\n/g)
        for(let j = 0; j < r.length; j++){
            r[j] = `<code>${r[j].replace(/\r?\n/g, "")}</code>\n`
        }
        n.innerHTML = "<div class='icon'><div class='copy' onclick='copy_code(this)'></div></div>" + r.join("")
    }
}
code_number_jekyll()

function copy_code(e){
    let str = e.parentElement.parentElement.getElementsByTagName("code")[0].innerText
    navigator.clipboard.writeText(str)
}