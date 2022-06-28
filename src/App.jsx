import { useState } from "react";
import Cards from "./components/Cards";
import Nav from "./components/Nav";
const isCityRepeat = (collection, city) => {
  const value = collection.find(({ name }) => name === city);
  return value === city;
};

function App() {
  const [cities, setCities] = useState([]);

  function onSearch(city) {
    if (!isCityRepeat(cities, city)) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"f9f30e85a3620f9348c6224619794461"}&units=metric`
      )
        .then((r) => r.json())
        .then((response) => {
          if (response.main !== undefined) {
            const city = {
              min: Math.round(response.main.temp_min),
              max: Math.round(response.main.temp_max),
              img: response.weather[0].icon,
              id: response.id,
              wind: response.wind.speed,
              temp: response.main.temp,
              name: response.name,
              weather: response.weather[0].main,
              clouds: response.clouds.all,
              latitud: response.coord.lat,
              longitud: response.coord.lon,
            };
            setCities((oldCities) => [...oldCities, city]);
          } else {
            alert("City no found");
          }
        });
    }
  }

  return (
    <div className="App">
      <Nav onSearch={onSearch} />
      <Cards cities={cities} />
    </div>
  );
}

export default App;
