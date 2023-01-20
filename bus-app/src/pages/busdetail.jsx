export default function BusDetail(){
    return(
        <>
            <div className="container px-5 py-5">
                <div className="border mb-2">
                    <div className="row pl-5">
                        <div className="col-6 row pt-5">
                            <div className="col-12">
                                <h3>
                                    Medali Mas
                                </h3>
                                <h6 className="font-weight-light">
                                    Executive Class
                                </h6>
                                <h5>
                                    Rp. 145.000
                                </h5>
                                <h6 className="font-weight-light mt-5">
                                    20 Seat Tersedia
                                </h6>
                                <div class="progress w-75">
                                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: '25%'}}></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row">
                            <div className="border mx-2 my-2 w-100">
                                <div className="row px-2 py-2">
                                    <div className="col-12">
                                        <h3 className="border-bottom mb-3">
                                            Summary
                                        </h3>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Tanggal Berangkat
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : 2023-01-10
                                        </h6>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Dari
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : Bandung
                                        </h6>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Menuju
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : Tangerang Selatan
                                        </h6>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Total Seat
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : 3
                                        </h6>
                                    </div>
                                    <div className="col-12 py-3">
                                        <div className="border-bottom">

                                        </div>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h3>
                                            Total Price
                                        </h3>
                                    </div>
                                    <div className="col-6">
                                        <h3 className="font-weight-light">
                                            : Rp. 350.000
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 px-2 mb-2">
                                <button type="submit" class="btn btn-danger w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}