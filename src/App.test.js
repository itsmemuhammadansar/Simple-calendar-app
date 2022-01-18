import axios from "axios";
import React from "react";

const baseURL = "https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json";

// https://calendarific.com/api/v2/holidays?&api_key=baa9dc110aa712sd3a9fa2a3dwb6c01d4c875950dc32vs&country=US&year=2019

const key = `6cac707d8da2f1a4425c8f4f76af7f8c7264cb7f`;

export default function App() {
  const [countrydata, getCountrydata] = React.useState([]);
  const [country, getCountry] = React.useState([]);

  const [input, setInput] = React.useState()
  // console.log(countrydata);
  // console.log(country)


  React.useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        getCountrydata(response.data);
      })
      .catch(error => {
        console.log(`countries error: ${error}`);
      })
  }, []);

  function keypress(e) {
    setInput(e.target.value);
  }

  function submitBtn() {
    countrydata.forEach(e => {
      if (e.name === input) {
        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${key}&country=${e.code}&year=2019`)
          .then((response) => {
            getCountry(response.data.response.holidays);
          });
      }
    });
  }
  return (
    <>
      <input list="countries" name="browser" id="browser" value={input} onInput={e => keypress(e)} />
      <datalist id="countries" >
        {
          countrydata.map((element, i) => {
            // console.log(element)
            return <option key={i} value={element.name} />
          })
        }
      </datalist>
      <button onClick={() => { submitBtn() }}>Submit</button>

      <ul>
        {
          country.map((e) => {
            return <ol style={{ border: '1px solid red' }}>
              <li>
                <h5>Title: {e.name} (<small>{e.date.iso}</small>)</h5>
              </li>
              <li>
                <p>{e.description}</p>
              </li>
            </ol>
          })
        }
      </ul>
    </>
  );
}
