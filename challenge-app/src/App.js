// import axios from 'axios';
// import {useEffect, useState, useRef} from 'react';
// import {useLocation} from 'react-router-dom';

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

// function App(){

//     const [province, setProvince] = useState([])
//     const [cityOrigin, setCityOrigin] = useState([])
//     const [cityDestination, setCityDestination] = useState([])
//     const [selectedData, setSelectedData] = useState({
//         origin_id: '',
//         origin_name: '',
//         destination_id: '',
//         destination_name: '', 
//         weight: 1700, 
//         courier: 'jne'
//     })

//     let getDataProvince = async() => {
//         try {
//             let response = await axios.get(`https://s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-province`,
//                 {headers: {
//                     'key': '598395fbbd5364b73d2c50d57df09682'
//                 }}
//             )
//             setProvince(response.data.data.rajaongkir.province)
//         } catch (error) {
            
//         }
//     }

//     let getDataCity = async(type, value) => {
//         try {
//             let response = await axios.get(`https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-city?province_id=${value}`,
//             {headers: {
//                 'key': '598395fbbd5364b73d2c50d57df09682'
//             }})
            
//             if(type === 'origin'){
//                 setCityOrigin(response.data.data.rajaongkir.city)
//             }else{
//                 setCityDestination(response.data.data.rajaongkir.city)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     let onSelectCity = (type, valll) => {
//         let newSelectedData = {...selectedData}

//         if(type === 'origin'){
//             newSelectedData.origin_id = valll.split('&')[0]
//             newSelectedData.origin_name = valll.split('&')[1]
//         }else{
//             newSelectedData.destination_id = valll.split('&')[0]
//             newSelectedData.destination_name = valll.split('&')[1]
//         }

//         setSelectedData(newSelectedData)
//     }

//     let onSubmit = async() => {
//         try {
//             let response = await axios.post(`https://jcwd-s-challenge-raja-ongkir-api.vercel.app/rajaongkir/get-shipping-cost`,
//             {
//                 origin: selectedData.origin_id,
//                 destination: selectedData.destination_id, 
//                 weight: 1700, 
//                 courier: selectedData.courier
//             },
//             {headers: {
//                 'key': '598395fbbd5364b73d2c50d57df09682'
//             }})
//             console.log(response)
//         } catch (error) {
            
//         }
//     }

//     useEffect(() => {
//         getDataProvince()
//     }, [])
 
//     return(
//         <>
//             <div className="container px-5 py-5">
//                 <div className="row">
//                     <div className="col-12">
                        
//                         <h1 className="text-primary">
//                             CekOngkir
//                         </h1>
//                     </div>
//                     <div className="col-7">
//                         <h5>
//                             Origin:
//                         </h5>
//                         <select onChange={(e) => getDataCity('origin', e.target.value)} class="form-control form-control-lg">
//                             <option>Select Province</option>
//                             {
//                                 province.map((value, index) => {
//                                     return(
//                                         <option key={index} value={value.province_id}>{value.province}</option>
//                                     )
//                                 })
//                             }
//                         </select>
//                         {
//                             cityOrigin.length > 0?
//                                 <select onChange={(e) => onSelectCity('origin', e.target.value)} class="form-control form-control-lg mt-3">
//                                     <option>Select City</option>
//                                     {
//                                         cityOrigin.map((value, index) => {
//                                             return(
//                                                 <option key={index} value={`${value.city_id}&${value.city_name}`}>{value.city_name}</option>
//                                             )
//                                         })
//                                     }
//                                 </select>
//                             :
//                                 null
//                         }

//                         <h5 className="mt-3">
//                             Destination:
//                         </h5>
//                         <select onChange={(e) => getDataCity('destination', e.target.value)} class="form-control form-control-lg">
//                             <option>Select Province</option>
//                             {
//                                 province.map((value, index) => {
//                                     return(
//                                         <option key={index} value={value.province_id}>{value.province}</option>
//                                     )
//                                 })
//                             }
//                         </select>
                        
//                             {
//                             cityDestination.length > 0?
//                                 <select onChange={(e) => onSelectCity('destination', e.target.value)} class="form-control form-control-lg mt-3">
//                                     <option>Select City</option>
//                                     {
//                                         cityDestination.map((value, index) => {
//                                             return(
//                                                 <option key={index} value={`${value.city_id}&${value.city_name}`}>{value.city_name}</option>
//                                             )
//                                         })
//                                     }
//                                 </select>
//                             :
//                                 null
//                         }

//                         <h5 className="mt-3">
//                             Courier:
//                         </h5>
//                         <select class="form-control form-control-lg">
//                             <option>Select Courier</option>
//                             <option value='jne'>JNE</option>
//                         </select>
//                     </div>
//                     <div className="col-5 mt-3 px-4 py-3 border">
//                         <h5 className="border-bottom pb-3">
//                             Summary
//                         </h5>
//                         <table class="table table-bordered">
//                             <tbody>
//                                 <tr>
//                                     <th scope="row" className="border-right-0 w-25">Origin</th>
//                                     <td className="border-left-0">: {selectedData.origin_name}</td>
//                                 </tr>
//                                 <tr>
//                                     <th scope="row" className="border-right-0 w-25">Destination</th>
//                                     <td className="border-left-0">: {selectedData.destination_name}</td>
//                                 </tr>
//                                 <tr>
//                                     <th scope="row" className="border-right-0 w-25">Courier</th>
//                                     <td className="border-left-0">: jne</td>
//                                 </tr>
//                             </tbody>
//                         </table>
                        
//                         <button onClick={onSubmit} className="btn btn-primary w-100 rounded-0">
//                             Cek Ongkir
//                         </button>
//                     </div>
//                     <div className="col-12 mt-5">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                             <th scope="col">No</th>
//                             <th scope="col">Service Name</th>
//                             <th scope="col">Description</th>
//                             <th scope="col">Estimation</th>
//                             <th scope="col">Ongkir</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th scope="row"></th>
//                                 <td></td>
//                                 <td></td>
//                                 <td>Days</td>
//                                 <td></td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default App










// import {BsArrowRightCircle} from 'react-icons/bs';
// import {TbSteeringWheel} from 'react-icons/tb';
// import {MdOutlineChair} from 'react-icons/md';
// // import axios from 'axios';

// export default function App(){

//     let scheduledate = useLocation().search.split('&')[0].split('=')[1]
//     let totalseat = useLocation().search.split('&')[3].split('=')[1]

//     const [data, setData] = useState([])
//     const [leftSeat, setLeftSeat] = useState([])
//     const [rightSeat, setRightSeat] = useState([])
//     const [selectedSeat, setSelectedSeat] = useState([])

//     let onGetData = async() => {
//         try {
//             let response = await axios.get('https://s-challenge-raja-ongkir-api-n5cm.vercel.app/bus/details')
//             console.log(response.data.data[0].category[1].travel.lists[0])

//             // ###
//             let leftSeat = []
//             for(let i=1; i<=response.data.data[0].category[1].travel.lists[0].total_left_seat; i++){
//                 if(i % 2 === 0){
//                     leftSeat.push(`${i}${response.data.data[0].category[1].travel.lists[0].left_row_name[1]
//                     }`)
//                 }else{
//                     leftSeat.push(`${i}${response.data.data[0].category[1].travel.lists[0].left_row_name[0]
//                     }`)
//                 }
//             }
//             setLeftSeat(leftSeat) // [1A 2B 3A 4B ...]

//             let rightSeat = []
//             for(let i=1; i<=response.data.data[0].category[1].travel.lists[0].total_right_seat; i++){
//                 if(i % 2 === 0){
//                     rightSeat.push(`${i}${response.data.data[0].category[1].travel.lists[0].right_row_name[1]
//                     }`)
//                 }else{
//                     rightSeat.push(`${i}${response.data.data[0].category[1].travel.lists[0].right_row_name[0]
//                     }`)
//                 }
//             }
//             setRightSeat(rightSeat) // [1C 2D 3C 4D ...]





//             setData(response.data.data[0].category[1].travel.lists[0])
//         } catch (error) {
            
//         }
//     }

//     let onSelectedSeat = (seat) => {
//         let newSelectedSeat = [...selectedSeat]

//         if(!newSelectedSeat.includes(seat)){
//             newSelectedSeat.push(seat)
//         }else{
//             let idx = newSelectedSeat.indexOf(seat)
//             newSelectedSeat.splice(idx, 1)
//         }

//         setSelectedSeat(newSelectedSeat)
//     }

//     useEffect(() => {
//         onGetData()
//     }, [])

//     return(
//         <div className="container px-5 py-5">
//             <div className="border mb-2">
//                 <div className="row pl-5 py-5">
//                     <div className="col-6 row pt-2">
//                         <div className='col-12 border'>
//                             <img src='https://www.daytrans.co.id/css/daytrans/images/icon/bus.png' className='w-100' />
//                         </div>
//                         <div className="col-12 pt-3">
//                             <h3>
//                                 Purwadhika Trans
//                             </h3>
//                             <h6 className="font-weight-light" style={{marginTop: '-10px'}}>
//                                 Executive Class
//                             </h6>
//                             <h5>
//                                 Rp.185.000
//                             </h5>
//                             <h6 className="font-weight-light mt-2">
//                                 30 Seat Available
//                             </h6>
//                             <div class="progress w-75">
//                                 <div class="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: `30%`}}></div>
//                             </div>
//                             <div className='mt-5 d-flex align-items-center justify-content-between border-bottom w-100 '>
//                                 <h5>
//                                     View Seat 
//                                 </h5>
//                                 <BsArrowRightCircle style={{fontSize: '18px', marginTop: '-3px'}} /> 
//                             </div>
//                             <div className='pl-3 pt-3'>
//                                 <div className='mb-3'>
//                                     <TbSteeringWheel style={{fontSize: '23px', marginLeft: '186px'}} />
//                                 </div>
//                                 <div className='row pl-3'>
//                                     <div className='col-4 row h-100'>
//                                         {
//                                             leftSeat.map((value, index) => {
//                                                 return(
//                                                     <div className='col-5' style={{display: 'inline-block', color: data.seat_booked.includes(value)? 'red':selectedSeat.includes(value)?'green':'black'}}>
//                                                         <MdOutlineChair onClick={() => onSelectedSeat(value)} style={{fontSize: '23px'}} />
//                                                         <span style={{fontSize: '15px', marginLeft: '3px', color: data.seat_booked.includes(value)? 'red':'black'}}>
//                                                         {value}
//                                                         </span>
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div>
//                                     <div className='col-4 row'>
//                                         {
//                                             rightSeat.map(value => {
//                                                 return(
//                                                     <div className='col-5' style={{display: 'inline-block'}}>
//                                                         <MdOutlineChair onClick={() => onSelectedSeat(value)} style={{fontSize: '23px', color: data.seat_booked.includes(value)? 'red':selectedSeat.includes(value)?'green':'black' }} />
//                                                         <span style={{fontSize: '15px', marginLeft: '3px', color: data.seat_booked.includes(value)? 'red':'black'}}>
//                                                         {value}
//                                                         </span>
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-6">
//                         <div className="border mx-2 my-2 w-100">
//                             <div className="row px-2 py-2">
//                                 <div className="col-12">
//                                     <h3 className="border-bottom mb-3">
//                                         Summary
//                                     </h3>
//                                 </div>
//                                 <div className="col-6 pl-4">
//                                     <h6>
//                                         Tanggal Berangkat
//                                     </h6>
//                                 </div>
//                                 <div className="col-6">
//                                     <h6 className="font-weight-light">
//                                         : {scheduledate}
//                                     </h6>
//                                 </div>
//                                 <div className="col-6 pl-4">
//                                     <h6>
//                                         Dari
//                                     </h6>
//                                 </div>
//                                 <div className="col-6">
//                                     <h6 className="font-weight-light">
//                                         : Bandung
//                                     </h6>
//                                 </div>
//                                 <div className="col-6 pl-4">
//                                     <h6>
//                                         Menuju
//                                     </h6>
//                                 </div>
//                                 <div className="col-6">
//                                     <h6 className="font-weight-light">
//                                         : Jakarta
//                                     </h6>
//                                 </div>
//                                 <div className="col-6 pl-4">
//                                     <h6>
//                                         Total Seat
//                                     </h6>
//                                 </div>
//                                 <div className="col-6">
//                                     <h6 className="font-weight-light">
//                                         : {totalseat}
//                                     </h6>
//                                 </div>
//                                 <div className="col-6 pl-4">
//                                     <h6>
//                                         Selected Seat
//                                     </h6>
//                                 </div>
//                                 <div className="col-6">
//                                     <h6 className="font-weight-light">
//                                         : {selectedSeat.join(', ')}
//                                     </h6>
//                                 </div>
//                                 <div className="col-12 py-3">
//                                     <div className="border-bottom">

//                                     </div>
//                                 </div>
//                                 <div className="col-6 pl-4">
//                                     <h3>
//                                         Total Price
//                                     </h3>
//                                 </div>
//                                 <div className="col-6">
//                                     <h3 className="font-weight-light">
//                                         : Rp.500.000
//                                     </h3>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-100 px-2 mb-2">
//                             <button type="submit" class="btn btn-danger w-100">Book Now</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import axios from 'axios';
import {useEffect, useState} from 'react';

export default function App(){

    const [data, setData] = useState([])
    const [hformations, setHFormations] = useState([])
    const [aformations, setAFormations] = useState([])

    let onGetData = async() => {
        try {
            let response = await axios.get('https://pwd-selectiontchallenge-cfw95jhtr-ryanfandy-gmailcom.vercel.app/football/stats')
            let hometeam_formation = response.data.data.match_result[0].hometeam.formations.split('-')
            let awayteam_formation = response.data.data.match_result[0].awayteam.formations.split('-')
            let hometeam_map = []
            let idxH = 0
            for(let i=0; i<hometeam_formation.length; i++){
                let mapToPush = []
                for(let j=0; j<hometeam_formation[i]; j++){
                    mapToPush.push(response.data.data.match_result[0].hometeam.starting_lineup[idxH])
                    idxH++
                }
                hometeam_map.push(mapToPush)
            }

            let awayteam_map = []
            let idxA = 0
            for(let i=awayteam_formation.length-1; i >= 0; i--){
                let mapToPush = []
                for(let j=0; j<awayteam_formation[i]; j++){
                    mapToPush.push(response.data.data.match_result[0].awayteam.starting_lineup[idxA])
                    idxA++
                }
                awayteam_map.push(mapToPush)
            }
            setAFormations(awayteam_map)
            setHFormations(hometeam_map)
            setData(response.data.data.match_result[0])
        } catch (error) {
            
        }
    }

    useEffect(() => {
        onGetData()
    }, [])

    return(
        <div className='container px-5 py-5'>
            <div className='shadow rounded px-4 py-3'>
                {/* Statistic Section */}
                <div>
                    <h5>
                        Match Preview
                    </h5>
                    <div className='row d-flex align-items-center px-5 pt-5 pb-3'>
                        <div className='col-4 text-center'>
                            <img style={{width: '100px'}} src='https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Persib_Bandung_crest_with_stars.svg/1200px-Persib_Bandung_crest_with_stars.svg.png' />
                            <h3>
                                Persib Bandung
                            </h3>
                            <h6 style={{color: 'grey'}}>
                                League Rank: 1
                            </h6>
                            <h6 style={{color: 'grey'}}>
                                (3-4-2-1)
                            </h6>
                        </div>
                        <div className='col-4 row'>
                            <div className='col-4 text-center'>
                                <h1>
                                    1
                                </h1>
                            </div>
                            <div className='col-4 text-center'>
                                <h1>
                                    :
                                </h1>
                            </div>
                            <div className='col-4 text-center'>
                                <h1>
                                    0
                                </h1>
                            </div>
                        </div>
                        <div className='col-4 text-center'>
                            <img style={{width: '115px'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Lambang_Persija_Jakarta.svg/1200px-Lambang_Persija_Jakarta.svg.png' />
                            <h3>
                                Persija Jakarta
                            </h3>
                            <h6 style={{color: 'grey'}}>
                                League Rank: 2
                            </h6>
                            <h6 style={{color: 'grey'}}>
                                (4-3-3)
                            </h6>
                        </div>
                    </div>
                </div>

                {/* Other Section */}
                <div className='border border-bottom'>

                </div>
                <div className='px-3 py-3'>
                    <btn className='btn btn-dark'>
                        Formations
                    </btn>
                    <btn className='btn btn-dark mx-3'>
                        Timeline
                    </btn>
                    <btn className='btn btn-dark'>
                        Match Stats
                    </btn>

                    <div className='bg-success rounded mt-4 px-3 py-3'>
                        {
                            hformations.map(value => {
                                return <div className='row py-5'>
                                    {value.map(val => {
                                        return <div className={`col-${12/value.length} d-flex justify-content-center`}>
                                                    <h6 className='bg-primary text-light d-flex justify-content-center align-items-center' style={{width: '50px', height: '50px', borderRadius: '100%'}}>
                                                        {val}
                                                    </h6>
                                                </div>
                                    })}
                                </div>
                            })
                        }
                        <div className='border-top'>

                        </div>
                        {
                            aformations.map(value => {
                                return <div className='row py-5'>
                                    {value.map(val => {
                                        return <div className={`col-${12/value.length} d-flex justify-content-center`}>
                                                    <h6 className='bg-danger text-light d-flex justify-content-center align-items-center' style={{width: '50px', height: '50px', borderRadius: '100%'}}>
                                                        {val}
                                                    </h6>
                                                </div>
                                    })}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}