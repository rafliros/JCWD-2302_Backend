import axios from 'axios';
import {useEffect, useState, useRef} from 'react';

import './App.css'

// function App() {

//   const[standings, setStandings] = useState([]) // [{}]

//   let onGetData = async() => {
//     try {
//       let response = await axios.get('http://localhost:5000/data')
//       console.log(response.data.football.liga1.season.standings)
//       setStandings(response.data.football.liga1.season.standings)
//     } catch (error) {
      
//     }
//   }

//   useEffect(() => {
//     onGetData()
//   }, [])

//   return (
//     <div className="container py-5">
//       <table class="table table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">No.</th>
//             <th scope="col">Club</th>
//             <th scope="col">P</th>
//             <th scope="col">W</th>
//             <th scope="col">D</th>
//             <th scope="col">L</th>
//             <th scope="col">GS</th>
//             <th scope="col">GC</th>
//             <th scope="col">GD</th>
//             <th scope="col">Point</th>
//             <th scope="col">5 Last Match</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             standings.map((value, index)=> {
//               return(
//                 <tr>
//                   <th scope="row">{index+1}</th>
//                   <td>{value.teamName}</td>
//                   {
//                     value.tables.split(',').map((value, index) => {
//                       return(
//                         <>
//                           <td>{value.split('|')[1]}</td>
//                           {/* <td>10</td>
//                           <td>9</td>
//                           <td>1</td>
//                           <td>46</td>
//                           <td>25</td>
//                           <td>20</td>
//                           <td>50</td> */}
//                         </>
//                       )
//                     })
//                   }
//                   <td>
//                     <div className="d-flex">
//                       {
//                         value.last_match.split(',').map((value, index) => {
//                           return(
//                             <div className={value === 'w'? "bg-success text-center text-light": value === 'd'? "bg-secondary text-center text-light" : "bg-danger text-center text-light"} style={{ width: '25px', height: '25px', borderRadius: '100%' }}>
//                               {value}
//                             </div>
//                           )
//                         })
//                       }
//                     </div>
//                   </td>
//                 </tr>
//               )
//             })
//           }
//         </tbody>
//       </table>

//     </div>
//   );
// }

function App(){

    const [provinceOrigin, setProvinceOrigin] = useState([])
    const [cityOrigin, setCityOrigin] = useState([])
    const [provinceDestination, setProvinceDestination] = useState([])
    const [cityDestination, setCityDestination] = useState([])
    const [dataToFind, setDataToFind] = useState(
        {
            cityOrigin_id: null, 
            cityOrigin_name: '', 
            cityDestination_id: null, 
            cityDestination_name: '', 
            courier: ''
        }
    )
    const [serviceList, setServiceList] = useState([])
    const [loading, setLoading] = useState(false)

    let onGetProvince = async() => {
        try {
            let response = await axios.get('https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-province', 
                {}, {
                headers: {
                    'key': ''
                }
            })
            setProvinceOrigin(response.data.data.rajaongkir.province)
            setProvinceDestination(response.data.data.rajaongkir.province)
        } catch (error) {
            
        }
    }

    let onGetCityOrigin = async(province) => {
        try {
            let response = await axios.get(`https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-city?province_id=${province}`)
            
            setCityOrigin(response.data.data.rajaongkir.city)
        } catch (error) {
            console.log(error)
        }
    }

    let onGetCityDestination = async(province) => {
        try {
            console.log(province)
            let response = await axios.get(`https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-city?province_id=${province}`)
           setCityDestination(response.data.data.rajaongkir.city)
        } catch (error) {
            console.log(error)
        }
    }

    let onSelectCity = (type, city) => {
        let newDataToFind = {...dataToFind}
        if(type === 'origin'){
            newDataToFind.cityOrigin_id = city.split('&')[0]
            newDataToFind.cityOrigin_name = city.split('&')[1]
        }else if(type === 'destination'){
            newDataToFind.cityDestination_id = city.split('&')[0]
            newDataToFind.cityDestination_name = city.split('&')[1]
        }
        setDataToFind(newDataToFind)
    }

    let onSelectCourier = async(courier) => {
        try {
            let newDataToFind = {...dataToFind}
            newDataToFind.courier = courier
            setDataToFind(newDataToFind)
        } catch (error) {
            
        }
    }

    let onGetCost = async() => {
        try {
            let origin = dataToFind.cityOrigin_id
            let destination = dataToFind.cityDestination_id
            let courier = dataToFind.courier
            let weight = 1000
            setLoading(true)

            let response = await axios.post(`
                https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-shipping-cost
            `, {origin, destination, weight, courier})

            setServiceList(response.data.data.rajaongkir.shipping_cost.cost[0].costs)
            setLoading(false)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        onGetProvince()
    }, [])

    return(
        <>
            <div className="container px-5 py-5">
                <div className="row">
                    <div className="col-12">
                        
                        <h1 className="text-primary">
                            CekOngkir
                        </h1>
                    </div>
                    <div className="col-7">
                        <h5>
                            Origin:
                        </h5>
                        <select onChange={(e) => onGetCityOrigin(e.target.value)} class="form-control form-control-lg">
                            <option>Select Province</option>
                            {
                                provinceOrigin.map((value, index) => {
                                    return(
                                        <option value={value.province_id}>{value.province}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            cityOrigin.length > 0?
                                <select onChange={(e) => onSelectCity('origin', e.target.value)} class="form-control form-control-lg mt-3">
                                    <option>Select City</option>
                                    {
                                        cityOrigin.map((value, index) => {
                                            return(
                                                <option value={`${value.city_id}&${value.city_name}`}>{value.city_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            :
                                    null
                        }

                        <h5 className="mt-3">
                            Destination:
                        </h5>
                        <select onChange={(e) => onGetCityDestination(e.target.value)} class="form-control form-control-lg">
                            <option>Select Province</option>
                            {
                                provinceDestination.map((value, index) => {
                                    return(
                                        <option value={value.province_id}>{value.province}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            cityDestination.length > 0?
                                <select onChange={(e) => onSelectCity('destination', e.target.value)} class="form-control form-control-lg mt-3">
                                    <option>Select City</option>
                                    {
                                        cityDestination.map((value, index) => {
                                            return(
                                                <option value={`${value.city_id}&${value.city_name}`}>{value.city_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            :
                                    null
                        }

                        <h5 className="mt-3">
                            Courier:
                        </h5>
                        <select onChange={(e) => onSelectCourier(e.target.value)} class="form-control form-control-lg">
                            <option>Select Courier</option>
                            <option value='jne'>JNE</option>
                        </select>
                    </div>
                    <div className="col-5 mt-3 px-4 py-3 border">
                        <h5 className="border-bottom pb-3">
                            Summary
                        </h5>
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Origin</th>
                                    <td className="border-left-0">: {dataToFind.cityOrigin_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Destination</th>
                                    <td className="border-left-0">: {dataToFind.cityDestination_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Courier</th>
                                    <td className="border-left-0">: {dataToFind.courier}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <button onClick={onGetCost} className="btn btn-primary w-100 rounded-0">
                            Cek Ongkir
                        </button>
                    </div>
                    <div className="col-12 mt-5">
                        {
                            loading === false?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Service Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Estimation</th>
                                    <th scope="col">Ongkir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        serviceList.map((value, index)=> {
                                            return(
                                                <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{value.service}</td>
                                                    <td>{value.description}</td>
                                                    <td>{value.cost[0].etd} Days</td>
                                                    <td>{value.cost[0].value}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            :
                            <>
                                <div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-warning" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-info" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
