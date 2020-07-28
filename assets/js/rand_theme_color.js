function random_theme_color(){
    let colors = ["#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", 
        "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", 
        "#FFC107", "#FF9800", "#FF5722"]
    let colors2 = ["#d32f2f", "#C2185B", "#7B1FA2", "#512DA8", "#303F9F", "#1976D2",
        "#0288D1", "#0097A7", "#00796B", "#388E3C", "#689F38", "#AFB42B",
        "#FFA000", "#F57C00", "#E64A19"]
    let rand = parseInt(Math.random() * colors.length)
    let color = colors[rand]
    let color2 = colors2[rand]
    let style = document.createElement("style")
    style.innerHTML = `body{ --theme_color: ${color}; --theme_color2: ${color2}}`
    document.getElementsByTagName("head")[0].appendChild(style)
}
random_theme_color()