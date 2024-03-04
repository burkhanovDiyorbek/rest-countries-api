const dark = document.querySelector(".dark-mode");

dark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const select = document.querySelector(".select"),
  option = document.querySelector(".option"),
  pEl = select.querySelector("p"),
  optionItem = option.querySelectorAll(".option_item"),
  filter = document.querySelector(".filter");

select.addEventListener("click", () => {
  option.classList.toggle("option_show");
});
let countries = [];
async function c() {
  let result = await fetch("https://restcountries.com/v3.1/all");
  countries = await result.json();
  showCountries(countries);
  return countries;
}
c();

function showCountries(arr) {
  document.querySelector(".country-container").textContent = "";
  arr.forEach((item) => {
    document.querySelector(".country-container").innerHTML += `
    <div class="country-card">
       <img src="${item.flags.png}" alt="${item.flags.alt}" />
       <div class="country-card-about">
         <h3>${item.name.official}</h3>
         <p><b>Population:</b> ${item.population}</p>
         <p><b>Region:</b> ${item.region}</p>
         <p><b>Capital:</b> ${item.capital}</p>
        </div>
    </div>
    `;
  });
}
optionItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    option.classList.remove("option_show");
    pEl.innerHTML = item.textContent;
    if (e.target.textContent != "Filter by Region") {
      showCountries(
        countries.filter((item) => item.region == e.target.textContent)
      );
    } else {
      showCountries(countries);
    }
  });
});

const input = document.querySelector("input");

input.addEventListener("change", (e) => {
  if (e.target.value) {
    showCountries(
      countries.filter((item) =>
        item.name.official.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  } else {
    showCountries(countries);
  }
});
