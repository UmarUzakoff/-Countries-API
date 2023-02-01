const themebutton = document.querySelector(".change__theme");
const darkTheme = "dark__theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  return document.body.classList.contains(darkTheme) ? "dark" : "light";
};

const getCurrentIcon = () => {
  return themebutton.classList.contains(iconTheme)
    ? "ri-sun-line"
    : "ri-moon-line";
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themebutton.classList[selectedIcon === "ri-sun-line" ? "add" : "remove"](
    iconTheme
  );
}

themebutton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themebutton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

const Countries = document.querySelector(".countries");
const Search = document.querySelector(".search");
const Continent = document.querySelector(".Region");
let countriesData;

const getCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  countriesData = await res.json();

  //   console.log(countriesData);

  CountryElement(
    countriesData.filter((country) => {
      return (
        country.name.common !== "Israel" &&
        country.name.common !== "Western Sahara"
      );
    })
  );

  localStorage.setItem("countries", JSON.stringify(countriesData));
};

Search.addEventListener("keyup", (e) => {
  let KeySearch = e.target.value;
  let data = JSON.parse(localStorage.getItem("countries"));
  //   console.log(data);

  Continent.value = "";
  Countries.innerHTML = "";

  //   console.log(e.target.value);

  if (KeySearch) {
    CountryElement(
      data.filter((x) => {
        return (
          x.name.common.startsWith(
            KeySearch[0].toUpperCase() + KeySearch.slice(1, -1)
          ) &&
          x.name.common !== "Israel" &&
          x.name.common !== "Western Sahara"
        );
      })
    );
  } else {
    CountryElement(data);
  }
});

Continent.addEventListener("change", () => {
  const FilterRegion = Continent.value;
  const data = JSON.parse(localStorage.getItem("countries"));

  Countries.innerHTML = "";
  Search.value = "";

  if (FilterRegion === "") {
    CountryElement(
      data.filter((country) => {
        return country.name.common !== "Israel";
      })
    );
  } else {
    CountryElement(
      data.filter((x) => {
        return (
          x.region === FilterRegion &&
          x.name.common !== "Israel" &&
          x.name.common !== "Western Sahara"
        );
      })
    );
  }
});

// const getCountriesByRegion = async () => {
//   const FilterRegion = Continent.value;
//   // const newUrl = "/" + FilterRegion;

//   console.log(FilterRegion);
//   const res = await fetch(
//     "https://restcountries.com/v3.1/region/" + FilterRegion
//   );
//   countriesData = await res.json();

//   Countries.innerHTML = "";

//   if (FilterRegion === "") {
//     getCountries();
//     return;
//   }
//   CountryElement(countriesData);

//   // history.pushState(null, null, newUrl);
// };

// // const titleDatails = document.querySelector(".title__datail");

const CountryElement = (dataProvided) => {
  dataProvided.map((country) => {
    const Title = country.name.common;
    const flag = country.flags.png;
    const population = country.population.toLocaleString("en-US");
    const region = country.region;
    const capital = country.capital;

    countryCard = `
        <div class="card country animate__animated animate__fadeIn">
                <div class="country__image">
                    <img src="${flag}" alt=${flag}" loading="lazy" />
                </div>
                <div class="card__info">
                    <h2 class="card__title" title=${Title}>${Title}</h2>
                    <div class="card__descrition">
                        <p><code>Population:</code> <span>${population}</span></p>
                        <p><code>Region:</code> <span>${region}</span></p>
                        <p><code>Capital:</code> <span>${
                          typeof capital !== "undefined"
                            ? capital[0]
                            : "no capital"
                        }</span></p>
                    </div>
                </div>
            </div>
    `;

    Countries.insertAdjacentHTML("beforeend", countryCard);
  });

  const card = document.querySelectorAll(".card__title");

  card.forEach((c) => {
    c.addEventListener("click", async (e) => {
      const countryName = e.target.textContent;

      const result = await fetch(
        "https://restcountries.com/v3.1/name/" + countryName
      );
      countriesData = await result.json();

      localStorage.setItem("country", JSON.stringify(countriesData));

      window.location.assign("/details.html");
    });
  });
};

window.addEventListener("DOMContentLoaded", getCountries());