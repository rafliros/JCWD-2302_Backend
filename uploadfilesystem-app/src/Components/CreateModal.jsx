import { useState } from "react"
import {Modal, ModalBody} from 'reactstrap';

export default function CreateModal(){

    const[modalOpen, setModalOpen] = useState(false)

    return(
        <>
            <input type="button" value="Insert Product" onClick={() => setModalOpen(true)} className="btn btn-primary rounded-0" />
            <Modal toggle={() => setModalOpen(false)} isOpen={modalOpen}>
                <ModalBody>
                    <div className="text-center px-3 py-3">
                        <h3>
                            Insert Product
                        </h3>
                    </div>
                    <div className="px-3 py-3">
                        <h6>Product Name :</h6>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="px-3 py-3">
                        <h6>Price :</h6>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="px-3 py-3">
                        <h6>Stock :</h6>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="px-3 pt-3">
                        <h6>Select Images :</h6>
                    </div>
                    <div className="row border mx-3 px-3 py-3 rounded">
                        <div className="col-12">
                            <div>
                                <input type="file" accept="image/*" multiple onChange={(e) => this.onImagesValidation(e)} />
                                {/* <input type="button" value="Choose File" onClick={() => this.files.click()} className="btn btn-warning" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="my-3 px-3 py-3">
                        <input type="button" value="Submit Data" className="btn btn-primary w-100" />
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}