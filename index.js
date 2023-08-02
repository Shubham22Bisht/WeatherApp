const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
let target = "New Delhi";
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=17dfd0899c9a4f5fb9883213231206&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const {
            current: { temp_c, condition: { text, icon } },
            location: { name, localtime },
        } = data;
        updateDom(temp_c, name, icon, text, localtime);
    } catch (error) {
        alert("Location not found");
    }



};

function updateDom(temperature, city, icon, text, time) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperatureField.innerText = temperature;
    cityField.innerText = city;
    emojiField.src = icon;
    weatherField.innerText = text;
    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
}
fetchData(target);


form.addEventListener("submit", (e) => {
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
});

function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "NAN";
    }
};