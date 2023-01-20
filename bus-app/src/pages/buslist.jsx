import {useLocation} from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function BusList(){

    let query = useLocation().search.slice(0, -2)
    console.log(query)
    
    const [data, setData] = useState([])

    let search = async() => {
        try {
            let result = await axios.get(`http://localhost:5004/bus/search${query}`)
            setData(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        search()
    }, [])

    return(
        <>
            <div className="container px-5 py-5">
                {
                    data.map((value, index) => {
                        return(
                            <div className="border mb-2">
                    <div className="row pl-5">
                        <div className="col-4 row">
                            <div className="col-12">
                                <h3>
                                    {value.name}
                                </h3>
                            </div>
                            <div className="col-12">
                                <h6 className="font-weight-light">
                                    {value.class}
                                </h6>
                            </div>
                        </div>
                        <div className="col-4 row">
                            <div className="col-4">
                                <h5>
                                    14:00
                                </h5>
                            </div>
                            <div className="col-4 text-center">
                                <h6 className="font-weight-light">
                                    14j 50m
                                </h6>
                            </div>
                            <div className="col-4">
                                <h5>
                                    04:00
                                </h5>
                            </div>
                            <div className="col-4">
                                <h6>
                                    {value.from}
                                </h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6 className="font-weight-light">
                                    -
                                </h6>
                            </div>
                            <div className="col-4">
                                <h6>
                                    {value.to}
                                </h6>
                            </div>
                        </div>
                        <div className="col-4 text-right">
                            <div className="col-12">
                                <h3>
                                    Rp. {value.price.toLocaleString()}
                                </h3>
                            </div>
                            <div className="col-12">
                                <h6 className="font-weight-light">
                                    {value.total_seat_booked} Booked from {value.total_seat_available}
                                </h6>
                                <div class="progress">
                                    <div class="progress-bar bg-danger" role="progressbar"  style={{width: `${value.total_seat_booked / value.total_seat * 100}%`}}></div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" class="btn btn-danger w-20 mt-3 mb-3">Book Seat</button>
                            </div>
                        </div>
                    </div>
                </div>
                        )
                    })
                }
            </div>
        </>
    )
}