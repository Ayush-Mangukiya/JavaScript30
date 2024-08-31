const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
fetch(endpoint)
  .then((data) => data.json())
  .then((json) => cities.push(...json))
  .catch((error) => console.log(error));

function findMatches(value, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(value, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatch() {
  console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(
              place.population
            )}</span>
        </li>
    `;
    })
    .join(" ");
  suggestions.innerHTML = html;
}

const text = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

text.addEventListener("keyup", displayMatch);
text.addEventListener("change", displayMatch);

// If json array is directly push inside cities[] then it'll create a 2D array.
// cities = [json[]]
// To avoid it first destructure array then push it.
