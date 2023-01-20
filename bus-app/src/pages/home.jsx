export default function Login(){
    return(
        <>
            <div className="container px-5 py-5">
                <div class="form-group">
                    <label>Dari</label>
                    <input type="text" class="form-control" />
                </div>
                <div class="form-group">
                    <label>Menuju</label>
                    <input type="text" class="form-control" />
                </div>
                <div class="form-group">
                    <label>Tanggal Berangkat</label>
                    <input type="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-danger w-100">Search Bus</button>
            </div>
        </>
    )
}