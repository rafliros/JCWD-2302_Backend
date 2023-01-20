import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(){

    let inputdate = useRef()
    let inputfrom = useRef()
    let inputto = useRef()
    let inputtotal_seat = useRef()
    let navigate = useNavigate()

    let onSubmit = () => {
        let date = inputdate.current.value 
        let from = inputfrom.current.value 
        let to = inputto.current.value 
        let total_seat = inputtotal_seat.current.value 

        if(date && from && to && total_seat) return navigate(`/buslist?date=${date}&from=${from}&to=${to}&total_seat=${total_seat}`)
    }

    return(
        <>
            <div className="container px-5 py-5">
                <div class="form-group">
                    <label>Dari</label>
                    <input type="text" ref={inputfrom} class="form-control" />
                </div>
                <div class="form-group">
                    <label>Menuju</label>
                    <input type="text" ref={inputto} class="form-control" />
                </div>
                <div class="form-group">
                    <label>Tanggal Berangkat</label>
                    <input type="text" ref={inputdate} class="form-control" />
                </div>
                <div class="form-group">
                    <label>Jumlah</label>
                    <input type="text" ref={inputtotal_seat} class="form-control" />
                </div>
                <button type="submit" onClick={onSubmit} class="btn btn-danger w-100">Search Bus</button>
            </div>
        </>
    )
}