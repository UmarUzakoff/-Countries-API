const button = document.querySelector(".button");
const CountryDetails = document.querySelector(".country__details");
const ClickedCountry = JSON.parse(localStorage.getItem("country"));
const CountryData = JSON.parse(localStorage.getItem("countries"));
const btn = document.querySelector(".border__buttons");

const getDatafromlocal = () => {
  for (let i = 0; i < ClickedCountry.length; i++) {
    const country = ClickedCountry[i];
    const countryName = country.name.common;
    const flag = country.flags.svg;
    const population = country.population.toLocaleString("en-US");
    const region = country.region;
    const subRegion = country.subregion;
    const capital = country.capital;
    const currency = country.currencies;
    const domain = country.tld[0];
    const languages = country.languages;
    const borders = country.borders;
    console.log(borders);

    // const getBorders = () => {
    //   CountryData.map((selectedCountry) => {
    //     borders.map((border) => {
    //       if (border === selectedCountry.cca3) {
    //         const button = document.createElement("button");
    //         button.setAttribute("class", "btn");
    //         button.innerHTML = selectedCountry.name.common;
    //         btn.appendChild(button);
    //         console.log(btn);
    //         // console.log(selectedCountry.name.common);
    //       }
    //     });
    //   });
    // };

    const bor = borders.map((b) => {
      return (btn.innerHTML = b);
    });

    // console.log(bor);
    // String.raw is an extention for html Syntax highlighting in Javascript
    CountryDetails.innerHTML = String.raw` 
      <div class="countries__image">
          <img src="${flag}" alt="flag of ${countryName}" />
      </div>
      <div class="country__info">
                    <h1 class="title__datail">${countryName}</h1>
                    <div class="infomation">
                        <ul class="first__info">
                            <li>Native Name: <span>${countryName}</span></li>
                            <li>Population: <span>${population}</span></li>
                            <li>Region: <span>${region}</span></li>
                            <li>Sub Region: <span>${subRegion}</span></li>
                            <li>Capital: <span>${capital}</span></li>
                        </ul>
                        <ul class="second__info">
                            <li>Top Level Domain: <span>${domain}</span></li>
                            <li>Currencies: <span>${Object.keys(
                              currency
                            )}</span></li>
                            <li>Languages: <span>${Object.keys(languages).map(
                              (language) => {
                                return " " + languages[language];
                              }
                            )}</span></li>
                        </ul>
                    </div>
                    <div class="border__countries">
                        <p>Border Countries: </p>
                        <div class="border__buttons">
                              ${bor}
                        </div>
                    </div>
                </div>
  `;

    // console.log(ClickedCountry[i].name);
  }
};

getDatafromlocal();

button.addEventListener("click", () => {
  window.history.back();
});