let countries = [
    "Options...",
    "United States",
    "Lithuania",
    "Poland",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Sweden",
    "Netherlands",
    "Belgium"
  ];
  
  let cities = {
    "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    "Lithuania": ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys"],
    "Poland": ["Warsaw", "Krakow", "Lodz", "Wroclaw", "Poznan"],
    "Germany": ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
    "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
    "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo"],
    "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza"],
    "Sweden": ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Linkoping"],
    "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    "Belgium": ["Brussels", "Antwerp", "Ghent", "Bruges", "Liege"]
  };
  
  function generateCountryOptions() {
    let optionsHTML = "";
    countries.forEach(country => {
      optionsHTML += `<option>${country}</option>`;
    });
    return optionsHTML;
  }
  
  function generateCityOptions(country) {
    let optionsHTML = "";
    cities[country].forEach(city => {
      optionsHTML += `<option>${city}</option>`;
    });
    return optionsHTML;
  }
  
  // Call the function to generate the country options
  let countrySelect = document.getElementById("country-select");
  countrySelect.innerHTML = generateCountryOptions();
  
  // Add an event listener to the country select element
  countrySelect.addEventListener("change", function() {
    let selectedCountry = this.value;
    let citySelect = document.getElementById("city-select");
    citySelect.innerHTML = generateCityOptions(selectedCountry);
  });