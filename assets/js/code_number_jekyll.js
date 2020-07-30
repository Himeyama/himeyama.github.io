function code_number_jekyll(){
    let codes = document.getElementsByTagName("pre")
    for(let i = 0; i < codes.length; i++){
        let n = codes[i]
        if(n.className != "highlight") continue
        let r = n.innerHTML.match(/.*\n/g)
        for(let j = 0; j < r.length; j++){
            r[j] = `<code>${r[j].replace(/\r?\n/g, "")}</code>\n`
        }
        n.innerHTML = "<div class='icon'><div class='copy' onclick='copy_code(this)'></div></div><code>" + r.join("") + "</code>"
    }
}
code_number_jekyll()

function copy_code(e){
    let str = e.parentElement.parentElement.getElementsByTagName("code")[0].innerText
    navigator.clipboard.writeText(str)
    let modal_window = document.createElement("div")
    modal_window.classList += "cp_modal_window"
    modal_window.innerHTML = `<div class="main"><div class='message'>コピーしました！</div>
    <div class="button"><input type="button" value="OK" onclick="close_modal_window(this)"></div></div>`
    document.body.append(modal_window)
}

function close_modal_window(e){
    e.parentElement.parentElement.parentElement.remove()
}