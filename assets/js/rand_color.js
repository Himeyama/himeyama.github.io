class ColorTheme{}

function rand_color(){
    let req = new XMLHttpRequest
    req.open("GET", "https://himeyama.github.io/assets/json/color_list.json")
    req.send()
    req.onload = function(e){
        ColorTheme.palette = JSON.parse(req.response)
        let color_name = Object.keys(ColorTheme.palette)[parseInt(Math.random() * Object.keys(ColorTheme.palette).length)]
        let color, light, dark
        [color, light, dark] = ColorTheme.palette[color_name]
        let style = document.createElement("style")
        style.innerHTML = `body{ --color: ${color}; --light: ${light}; --dark: ${dark}; }`
        document.head.append(style)
    }
}
rand_color()