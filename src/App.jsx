import { useState } from "react";
import Cards from "./components/Cards";
import Nav from "./components/Nav";
import axios from "axios";
const isCityRepeat = (collection, city) => {
  const value = collection.find(({ name }) => name === city);
  return value === city;
};

function App() {
  const [cities, setCities] = useState([]);

  function onSearch(city) {
    axios(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"f9f30e85a3620f9348c6224619794461"}&units=metric`
    ).then(({ data }) => {
      const { main } = data;
      if (main !== undefined) {
        const city = {
          min: Math.round(main.temp_min),
          max: Math.round(main.temp_max),
          img: data.weather[0].icon,
          id: data.id,
          wind: data.wind.speed,
          temp: data.main.temp,
          name: data.name,
          weather: data.weather[0].main,
          clouds: data.clouds.all,
          latitud: data.coord.lat,
          longitud: data.coord.lon,
        };
        setCities((oldCities) => [...oldCities, city]);
      } else {
        alert("City no found");
      }
    });
  }

  return (
    <div className="App">
      <Nav onSearch={onSearch} />
      <Cards cities={cities} />
    </div>
  );
}

export default App;
