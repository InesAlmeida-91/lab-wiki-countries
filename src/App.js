import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import ErrorPage from './components/ErrorPage';
//import countryList from './countries.json';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';


function App() {
  const [countries, setCountries] = useState([]); //before useState(countryList)

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  return (
    <div className="App">
      <Navbar />
      <CountriesList countryList={countries} />

      <Routes>
        <Route path="/countryDetails/:countryCode" element={<CountryDetails countryList={countries} />} />
        <Route path="*" element={ <ErrorPage /> } />
      </Routes>
    </div>
  );
}

export default App;
