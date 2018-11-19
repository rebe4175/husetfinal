let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let type = urlParams.get("eventType");
let eventurl;
let jsonData;
let single;
let postContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", visPosts);

async function visPosts() {
    console.log(id);
    console.log(type);
    postContainer.innerHTML = "";

    if (type == "Musik") {
        eventurl = "https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/musikevents";
    }
    if (type == "Ord") {
        eventurl = "https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/ordevents";
    }
    if (type == "Film") {
        eventurl = "https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/filmevents";
    }
    if (type == "Scenekunst") {
        eventurl = "https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/scenekunst";
    }
    if (type == "Andet") {
        eventurl = "https://ceciliewig.com/kea/07-cms/huset_kbh/wordpress/wp-json/wp/v2/andet";
    }

    let jsonData = await fetch(eventurl + "/" + id);
    let single = await jsonData.json();
    console.log(jsonData);
    console.log(eventurl);

    let dag = single.acf.dato.substring(0, 2);
    let month = single.acf.dato.substring(2, 4);
    let year = single.acf.dato.substring(4);



    document.querySelector("[data-title]").textContent = single.title.rendered;
    document.querySelector("[data-img]").setAttribute("src", single.acf.billede);
    document.querySelector("[data-text]").innerHTML = single.content.rendered;
    document.querySelector("[data-tid]").textContent = dag + "/" + month + "/" + year + " kl " + single.acf.tid;
    document.querySelector("[data-sted]").textContent = "Sted: " + single.acf.sted;
    document.querySelector("[data-genre]").textContent = "Genre: " + " " + single.acf.genre;
    document.querySelector("[data-pris]").textContent = "Pris: " + single.acf.pris;
    document.querySelector("[data-beskrivelse]").textContent = single.acf.beskrivelse;

}
