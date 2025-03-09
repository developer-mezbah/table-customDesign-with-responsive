
// ===================Country modal functionality=============
// Open Modal
function openModal() {
    document.getElementById("country-modal").style.display = "flex";
  }
  
  // Close Modal
  function closeModal() {
    document.getElementById("country-modal").style.display = "none";
  }
  
  // Close modal when clicking outside
  window.onclick = function (event) {
    if (event.target === document.getElementById("country-modal")) {
      closeModal();
    }
  };
  // Ended Country modal functionality
  
  // brands logo slides
//   var copy = document.querySelector(".logos-slide").cloneNode(true);
//   document.querySelector(".logos").appendChild(copy);
  
  
  
  // Jquery Code and fetch api 
  $(document).ready(function () {
    fetchCountries();
  });
  
  function fetchCountries() {
    $.ajax({
      url: "https://restcountries.com/v3.1/all",
      method: "GET",
      success: function (countries) {
        let countryList = $("#country-list");
        countryList.empty();
  console.log(countries);
  
        countries.forEach((country) => {
          let flag = country.flags?.png || ""; 
          let name = country.name.common;
          let countryCode = country.cca2 || ""; // Short country code
  
          let listItem = `
            <li onclick="selectCountry('${flag}', '${countryCode}')">
              <img width="20" height="20" style="margin-right: 5px" src="${flag}" alt="${name}" />
              ${name}
            </li>
          `;
          countryList.append(listItem);
        });
  
        attachSearchFunction();
      },
      error: function (error) {
        console.error("Error fetching countries:", error);
      },
    });
  }
  
  function attachSearchFunction() {
    $("#search-box").on("input", function () {
      let value = $(this).val().toLowerCase();
      $("#country-list li").filter(function () {
        $(this).toggle($(this).text().toLowerCase().includes(value));
      });
    });
  }
  
  // ============== function when selec country ===========
  function selectCountry(flag, code) {
    // Update Selected Country Display
    $(".selected-flag").html(`<img width="20" height="20" src="${flag}" alt="${code}" />`);
    $(".selected-country").text(code);
  
    closeModal();
  }
  
  function closeModal() {
    $("#country-modal").hide();
  }