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

    const [province, setProvince] = useState([])
    const [cityOrigin, setCityOrigin] = useState([])
    const [cityDestination, setCityDestination] = useState([])
    const [selectedData, setSelectedData] = useState({
        origin_id: '',
        origin_name: '',
        destination_id: '',
        destination_name: '', 
        weight: 1700, 
        courier: 'jne'
    })

    let getDataProvince = async() => {
        try {
            let response = await axios.get(`https://s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-province`,
                {headers: {
                    'key': '598395fbbd5364b73d2c50d57df09682'
                }}
            )
            setProvince(response.data.data.rajaongkir.province)
        } catch (error) {
            
        }
    }

    let getDataCity = async(type, value) => {
        try {
            let response = await axios.get(`https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-city?province_id=${value}`,
            {headers: {
                'key': '598395fbbd5364b73d2c50d57df09682'
            }})
            
            if(type === 'origin'){
                setCityOrigin(response.data.data.rajaongkir.city)
            }else{
                setCityDestination(response.data.data.rajaongkir.city)
            }
        } catch (error) {
            console.log(error)
        }
    }

    let onSelectCity = (type, valll) => {
        let newSelectedData = {...selectedData}

        if(type === 'origin'){
            newSelectedData.origin_id = valll.split('&')[0]
            newSelectedData.origin_name = valll.split('&')[1]
        }else{
            newSelectedData.destination_id = valll.split('&')[0]
            newSelectedData.destination_name = valll.split('&')[1]
        }

        setSelectedData(newSelectedData)
    }

    let onSubmit = async() => {
        try {
            let response = await axios.post(`https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-shipping-cost`,
            {
                origin: selectedData.origin_id,
                destination: selectedData.destination_id, 
                weight: 1700, 
                courier: selectedData.courier
            },
            {headers: {
                'key': '598395fbbd5364b73d2c50d57df09682'
            }})
            console.log(response)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataProvince()
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
                        <select onChange={(e) => getDataCity('origin', e.target.value)} class="form-control form-control-lg">
                            <option>Select Province</option>
                            {
                                province.map((value, index) => {
                                    return(
                                        <option key={index} value={value.province_id}>{value.province}</option>
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
                                                <option key={index} value={`${value.city_id}&${value.city_name}`}>{value.city_name}</option>
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
                        <select onChange={(e) => getDataCity('destination', e.target.value)} class="form-control form-control-lg">
                            <option>Select Province</option>
                            {
                                province.map((value, index) => {
                                    return(
                                        <option key={index} value={value.province_id}>{value.province}</option>
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
                                                <option key={index} value={`${value.city_id}&${value.city_name}`}>{value.city_name}</option>
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
                        <select class="form-control form-control-lg">
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
                                    <td className="border-left-0">: {selectedData.origin_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Destination</th>
                                    <td className="border-left-0">: {selectedData.destination_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Courier</th>
                                    <td className="border-left-0">: jne</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <button onClick={onSubmit} className="btn btn-primary w-100 rounded-0">
                            Cek Ongkir
                        </button>
                    </div>
                    <div className="col-12 mt-5">
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
                            <tr>
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td>Days</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
