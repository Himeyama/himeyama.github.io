window.addEventListener("resize", function(event) {
    load()
})

function load(){
    if(document.body.clientWidth <= 800){
        document.getElementById("canvas").setAttribute("width", `${document.getElementsByTagName("section")[0].clientWidth - 32}px`)
        document.getElementById("canvas").setAttribute("height", `${(document.getElementsByTagName("section")[0].clientWidth - 32) / 8}px`)
    }else{
        document.getElementById("canvas").setAttribute("width", `${document.getElementsByTagName("section")[0].clientWidth - 32}px`)
        document.getElementById("canvas").setAttribute("height", `${(document.getElementsByTagName("section")[0].clientWidth - 32) / 16}px`)
    }

    let load_font = setInterval(
        function(){
            if(EleBB.fonts){
                elebb.reset_elebb()
                elebb.green = document.title
                elebb.display()
                clearInterval(load_font)
            }
        },
        100
    )
}

load()
EleBB.load_font() // フォントの読み込み
elebb = new EleBB
elebb.element = "canvas"
