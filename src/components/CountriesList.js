import { Link } from 'react-router-dom';

function CountriesList({countryList}) {
    return(
        <div className="col-5" style={{maxHeight: "90vh", overflow: "scroll"}}>
            <ul className="list-group">
                {countryList.map((country) => (
                    <li key={country.alpha3Code}>
                        <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt="country-flag"/>
                        <Link className="list-group-item list-group-item-action" to={`/countryDetails/${country.alpha3Code}`}>{country.name.common}</Link>
                    </li>
            ))}
            </ul>
        </div>
    )
}

export default CountriesList;