let countries = ""
//? Tum sayfa yuklendiginde API'den ulke bilgilerini getir.
window.onload = async function (e) {
    e.preventDefault()
    allCountries()
}


//? Tum ulke bilgilerini getir
const allCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        if (!response.ok) {
            renderError(`Something went wrong:${response.status}`)
            throw new Error
        }
        const data = await response.json()
        getCountryName(data)
    } catch (error) {
        console.log(error)
    }
}

//? Tum ulkelerin isimlerini elde edip bunlari dropmenu'ye yaz
const getCountryName = (data) => {
    countries = data
    data.forEach((country) => {
        const dropMenu = document.querySelector("#country-select")
        dropMenu.innerHTML += `
        <option value='${country.name.common}'>${country.name.common}</option> 
        `
    })
}

//? hata olmasi durumunda DOM'a mesaji bas
const renderError = (err) => {
    const countries = document.querySelector(".countries")
    countries.innerHTML = `
      <h3 class="text-danger">${err}</h3>
      <img src='./404.png' alt="" />
    `
}

const selectCountry = document.querySelector("#country-select")

document.addEventListener("change", () => {
    const countryName = document.querySelector("#country-select").value

    //?Eger countryName varsa (true) getCountry metotunu cagir.
    if (countryName) {
        const selectedCountry = countries.filter(
            (country) => country.name.common === countryName
        )
        //! Secilen ulkeyi DOM'a bas
        renderCountry(selectedCountry[0])
    }
})

const renderCountry = (country) => {
    console.log(country)
    const {
        name: { common },
        capital,
        region,
        flags: { svg },
        languages,
        currencies,
        population,
        borders,
        maps,
    } = country
    const countries = document.querySelector(".countries")
    console.log(countries)
    countries.innerHTML = `
    <div class="card shadow-lg" style="width: 22rem">
    <img src="${svg}" class="card-img-top shadow" alt="..." />
    <div >
      <h5 class="p-2 text-center">${common}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-landmark"></i>
        <span class="fw-bold"> Capitals:</span> ${capital}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-comments"></i>
        <span class="fw-bold"> Languages:</span> ${Object.values(languages)}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-money-bill-wave"></i>
        <span class="fw-bold"> Currencies:</span> ${Object.values(currencies)[0].name
        },
        ${Object.values(currencies)[0].symbol}
      </li>
      <li class="list-group-item">
      <i class="fa-solid fa-people-group"></i></i>
      <span class="fw-bold"> Population:</span> ${population.toLocaleString(
            "en-US"
        )}
    </li>
      <li class="list-group-item">
      <i class="fa-sharp fa-solid fa-road-barrier"></i>
      <span class="fw-bold"> Borders:</span>  ${borders ? borders : "None"}
    </li>
    </li>
    <li class="list-group-item">
      <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href=${maps.googleMaps
        } target='_blank'> Go to google map</a> </li>
    </ul>
  </div>
    `
}
