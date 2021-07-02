import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CountryCard from "./components/CountryCard";
import "./scss/mainStyles.scss";
import "./scss/selectComponent.scss";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("americas");

  function handleChangeCountry(e) {
    setSelectedValue(e.target.value);
  }

  function getDataCountries() {
    fetch(`https://restcountries.eu/rest/v2/region/${selectedValue}?fields=name;capital;flag`).then(
      (response) => {
        if (response.ok) {
          response.json().then((data) => {
            setCountriesData(data);
          });
        } else {
          alert(response.status)          
        }
      }
    );
  }

  useEffect(() => {
    getDataCountries();
  });

  return (
    <div className="mainContainer">
      <Navbar></Navbar>

      <div className="selectRegionDiv">
        <p>Select a Region:</p>
        <select onChange={handleChangeCountry}>
          <option value="americas">Americas</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <div className="containerCards">
        {countriesData.map((item) => {
          return (
            <CountryCard
              countryName={item.name}
              countryCapital={item.capital}
              countryFlag={item.flag}              
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
