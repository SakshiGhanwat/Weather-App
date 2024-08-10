    /*  import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

const App = () => {
  const apiKey="f56f24967aaf51182d1d4df628297c6d";
const[data,setData]=useState({});
const [inputCity, setInputCity] = useState("")

const getWetherDetails=(cityName)=>{
  if (!cityName) return
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
  axios.get(apiURL).then((res) => {
    console.log("response", res.data)
    setData(res.data)
  }).catch((err) => {
    console.log("err", err)
  })
}
useEffect(()=>{
  getWetherDetails("delhi");
},[])


const handleChangeInput = (e) => {
  console.log("value", e.target.value)
  setInputCity(e.target.value)
}


const handleSearch = () => {
 getWetherDetails(inputCity)
 //alert("click");
}


  return (
   <>
   <div className='col-md-12'>
    <div className='wetherBg'>
      <h1 className='heading'>Weather App</h1>
      <div className='d-grid gap-3 col-4 mt-r'>
    <input type=' text' className='form-control'/> 
    <button className='btn btn-primary' type='button' onClick={handleSearch}  onChange={handleChangeInput}>Search</button>
    </div>
   </div>
   <div className='col-md-12 text-center mt-5'>
    <div className='shadow rounded  wetherResultBox'>
    <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />
  <h5 className="weathorCity"> {data?.name}</h5>
  <h6 className='weathorTemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
    </div>
   </div>
   </div>
   </>
  )
}

export default App
*/

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';

function App() {


  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000); // Update every second
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  
    const formatDate = (date) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };
    const formatTime = (date) => {
      return date.toLocaleTimeString();
    };

  

  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }
  


  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

            <h5 className="weathorCity">
              {data?.name}
            </h5>
            <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
            <p>Date: {formatDate(currentDateTime)}</p>
      <p>Time: {formatTime(currentDateTime)}</p>
      <p>Day: {currentDateTime.toLocaleDateString(undefined, { weekday: 'long' })}</p>
          </div>
        </div>
      }

    </div>
  );
}

export default App;