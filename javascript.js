document.addEventListener("DOMContentLoaded", getJSON);

let events = [];
let eventType;
let postTemplate = document.querySelector("[data-template]");
let postContainer = document.querySelector(".container");
let eventTypeFilter = "alle";
let dest = document.querySelector(".data-container");


async function getJSON() {

    let musicJson = await fetch("https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/musikevents");
    let musicev = await musicJson.json();

    musicev.forEach(event => {

        events.push(event);
    });


    let filmJson = await fetch("https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/filmevents");
    let filmev = await filmJson.json();

    filmev.forEach(event => {

        events.push(event);
    });

    let ordJson = await fetch("https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/ordevents");
    let ordev = await ordJson.json();

    ordev.forEach(event => {

        events.push(event);
    });


    let scenekunstJson = await fetch("https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/scenekunst");
    let scenekunstev = await scenekunstJson.json();

    scenekunstev.forEach(event => {

        events.push(event);
    });

    let andetJson = await fetch("https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/andet");
    let andetev = await andetJson.json();

    andetev.forEach(event => {

        events.push(event);

    });


    visPosts();
}

document.querySelectorAll(".sort_item").forEach(knap => {
    knap.addEventListener("click", filtrering);
})

function filtrering() {

    console.log("filter Aply");
    eventTypeFilter = this.getAttribute("data-eventType");
    console.log(eventTypeFilter);
    visPosts();
}


function visPosts() {


    postContainer.innerHTML = "";


    events.sort(
        function (a, b) {
        return a.acf.dato - b.acf.dato;
    });


    events.forEach(event => {



        if (event.acf.eventtype == eventTypeFilter || eventTypeFilter == "alle") {
            console.log(events);


            let klon = postTemplate.cloneNode(true).content;
            klon.querySelector("article").addEventListener("click", () => {
                window.location.href = "singleview.html?id=" + event.id +
                    "&eventType=" + event.acf.eventtype;
                console.log("klik på Event")
            });

            let dag = event.acf.dato.substring(0, 2);
            let month = event.acf.dato.substring(2, 4);
            let year = event.acf.dato.substring(4);


            klon.querySelector("[data-title]").textContent = event.title.rendered;
            klon.querySelector("[data-title-to]").textContent = event.acf.titelKopi;
            klon.querySelector("[data-img]").setAttribute("src", event.acf.billede);
            klon.querySelector("[data-text]").innerHTML = event.content.rendered;
            klon.querySelector("[data-tid]").textContent = dag + "/" + month + "/" + year + " kl " + event.acf.tid;
            klon.querySelector("[data-sted]").textContent = "Sted: " + event.acf.sted;
            klon.querySelector("[data-genre]").textContent = "Genre: " + " " + event.acf.genre;
            klon.querySelector("[data-pris]").textContent = event.acf.pris;

            postContainer.appendChild(klon);

        }

    });
}


function openNav() {
    document.getElementById("sideNavigation").style.width = "40vw";

    console.log("Åben Menu");

}

function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";

    document.getElementById("main").style.marginLeft = "0";
    console.log("Luk Menu")
}

document.querySelector("#modal_vindue").addEventListener("click", lukModal);

function visModal() {
    document.getElementById("modal_vindue").style.opacity = "1";
    document.getElementById("modal_vindue").style.pointerEvents = "auto";
    console.log("Vis Modal");
}

function lukModal() {
    document.getElementById("modal_vindue").style.opacity = "0";
    document.getElementById("modal_vindue").style.pointerEvents = "none";
    console.log("luk Modal");
}

function visForm() {
    document.getElementById("nyhedsbrevForm").classList.toggle("toggleNyhedsbrev1");
    document.getElementById("nyhedsbrevForm").classList.toggle("toggleNyhedsbrev2");
    document.getElementById("nyhedsbrevImg").classList.remove("puls");

    document.getElementById("nyhedsTxt").classList.toggle("toggleShow");
    document.getElementById("nyhedsArea").classList.toggle("toggleShow");
    document.getElementById("nyhedsSubmit").classList.toggle("toggleShow");



}
