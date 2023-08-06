import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from "axios";

function CountryDetails({countryList}) {
    const [foundCountry, setFoundCountry] = useState(null);

    const { countryCode } = useParams();

/*     useEffect(() => {
        const country =  countryList.find((countryObj) => {
            return countryObj.alpha3Code === countryCode;
        }) 

        if(country) {
            setFoundCountry(country);
        }

    }, [countryCode, countryList]) */

    useEffect(() => {
        axios
          .get(`https://ih-countries-api.herokuapp.com/countries/${countryCode}`)
          .then((response) => {
            setFoundCountry(response.data);
          })
          .catch((error) => {
            console.error("Error fetching country details:", error);
            setFoundCountry(null);
          });
      }, [countryCode]);

    if (!foundCountry) {
        return <div>Loading...</div>;
      }

      const getCountryName = (alpha3Code) => {
        const country = countryList.find((countryObj) => {
          return countryObj.alpha3Code === alpha3Code;
        });
    
        return country ? country.name.common : alpha3Code;
      };
    

    return(
        <div className="col-7">
        <img src={`https://flagpedia.net/data/flags/icon/72x54/${foundCountry.alpha2Code.toLowerCase()}.png`} alt="country-flag"/>
        <h1>{foundCountry.name.common}</h1>
        <table class="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{width: "30%"}}>Capital</td>
              <td>{foundCountry.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
              {foundCountry.area}m
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                    {foundCountry.borders.length === 0 ? "No borders found" :
                <ul> {foundCountry.borders.map((border) => 
                    <li key={border.alpha3Code}>
                        <Link to={`/countryDetails/${border}`}>{getCountryName(border)}</Link>
                    </li> )}
                </ul>
                    }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        )
}


export default CountryDetails;