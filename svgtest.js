document.addEventListener("DOMContentLoaded", function () {
    svgProgram();
});

async function svgProgram() {


    let mySvg = await fetch("husetagernavne.svg");
    let svg = await mySvg.text();

    document.querySelector("#house").innerHTML = svg;

};

function openNav() {
    document.getElementById("sideNavigation").style.width = "40vw";

    console.log("Åben Menu");

}

function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";

    document.getElementById("main").style.marginLeft = "0";
    console.log("Luk Menu")
}
