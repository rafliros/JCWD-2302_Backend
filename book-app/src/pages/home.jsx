import { useState } from 'react';

import './home.css';
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

export default function Home(){

    const [selectMenu, setSelectMenu] = useState(0)
    const [startDate, setStartDate] = useState(new Date());

    return(
        <>
            {/* Jumbotron Section */}
            <div className='home-jumbotron flex justify-center py-8' style={{ height: '200px' }}>
                <h1 className='text-4xl text-white font-light mr-1'>
                    Hai,
                </h1>
                <h1 className='text-4xl text-white font-semibold'>
                    mau ke mana?
                </h1>
            </div>

            {/* Search Box Section */}
            <div className='grid grid-cols-1 flex justify-center px-52' style={{marginTop: '-95px'}}>
                <div className='bg-white rounded-md drop-shadow-xl px-10 py-5'>
                    <div>
                        <span onClick={() => setSelectMenu(0)} className={selectMenu === 0? 'text-lg text-sky-500 font-semibold border-b-2 border-sky-500':'text-lg'}>
                            Hotel
                        </span>
                        <span onClick={() => setSelectMenu(1)} className={selectMenu === 1? 'text-lg text-sky-500 font-semibold border-b-2 border-sky-500 ml-3':'text-lg ml-3'}>
                            Bus
                        </span>
                    </div>
                    {
                        selectMenu === 0?
                            <div className='py-5'>
                                <div className='grid grid-cols-2 gap-x-8 mb-5'>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            City
                                        </span>
                                        <input type="text" className="mt-1 px-3 py-2 bg-white border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Bandung" />
                                    </div>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            Total Rooms
                                        </span>
                                        <input type="text" className="mt-1 px-3 py-2 bg-white border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="1 Room" />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 mb-5'>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            Check-in
                                        </span>
                                        <DatePicker dateFormat="yyyy/mm/dd" selected={startDate} onChange={(date) => setStartDate(date)} className='border border-slate-300 rounded-md w-full px-2 py-1.5 text-slate-400 text-sm shadow-sm' />
                                    </div>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            Check-out
                                        </span>
                                        <DatePicker dateFormat="yyyy/mm/dd" selected={startDate} onChange={(date) => setStartDate(date)} className='border border-slate-300 rounded-md w-full px-2 py-1.5 text-slate-400 text-sm shadow-sm' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 flex items-center'>
                                    <div>
                                        <span className='border-b border-slate-400 text-slate-400'>
                                            *Syarat perjalanan berlaku selama pandemi
                                        </span>
                                    </div>
                                    <div className="flex justify-end pt-3">
                                        <button className="bg-orange-500 text-slate-50 font-semibold rounded-md px-10 py-2">
                                            Cari Hotel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        :
                            <div className='py-5'>
                                <div className='grid grid-cols-2 gap-x-8 mb-5'>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            From
                                        </span>
                                        <input type="text" className="mt-1 px-3 py-2 bg-white border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Bandung" />
                                    </div>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            To
                                        </span>
                                        <input type="text" className="mt-1 px-3 py-2 bg-white border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tangerang Selatan" />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 mb-5'>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            Departure Date
                                        </span>
                                        <DatePicker dateFormat="yyyy/mm/dd" selected={startDate} onChange={(date) => setStartDate(date)} className='border border-slate-300 rounded-md w-full px-2 py-1.5 text-slate-400 text-sm shadow-sm' />
                                    </div>
                                    <div>
                                        <span className='text-lg font-bold'>
                                            Total Seat
                                        </span>
                                        <input type="text" className="px-3 py-1.5 bg-white border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Max. 3 Seat Only" />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 flex items-center'>
                                    <div>
                                        <span className='border-b border-slate-400 text-slate-400'>
                                            *Syarat perjalanan berlaku selama pandemi
                                        </span>
                                    </div>
                                    <div className="flex justify-end pt-3">
                                        <button className="bg-orange-500 text-slate-50 font-semibold rounded-md px-10 py-2">
                                            Cari Bus
                                        </button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}