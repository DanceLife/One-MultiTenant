function switchTheme(currentTheme){
        links = document.querySelectorAll('[rel=stylesheet]');

        for(let i=0; i < links.length; i++){
        let link = links[i];
        let ref = link.href;
        if(ref.indexOf(currentTheme) > -1 || ref.indexOf("styles.css") > -1 || ref.indexOf("themerules.css") > -1){
            link.disabled = false;
        }else{
            link.disabled = true;
        }
    }
}
// let defaultTheme = "light";
let currentTheme = localStorage.getItem('One-Theme-Style') 
    // if(!currentTheme){
    //     currentTheme = defaultTheme;
    //     alert("Current theme reset to default: " + defaultTheme);
    // } 
switchTheme(currentTheme);
