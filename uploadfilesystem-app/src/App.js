import {useState, useEffect} from 'react';
import axios from 'axios'; 

import {Modal, ModalBody} from 'reactstrap';
import CreateModal from './Components/CreateModal';

function App(){
  const[modalOpen, setModalOpen] = useState(false)
  const[data, setData] = useState(null)
  const[previewImage, setPreviewImage] = useState(null)
  const[dataProducts, setDataProducts] = useState([])

    let onGetData = async() => {
        try {
            let getData = await axios.get(`http://localhost:5000/products/get`)
            setDataProducts(getData.data.data)
        } catch (error) {
            
        }
    }

    let onClickImage = (index, path) => {
      let currentDataProducts = [...dataProducts]

      currentDataProducts[index].main_image = path 

      setDataProducts(currentDataProducts)
    }

    useEffect(() => {
        onGetData()
    }, [])

  return(
      <>
        <div>
          <div className="container px-5 py-5">
            {/* Navbar */}
            <div className="row">
                <div className="col-6">
                    <h3>
                        Data Products
                    </h3>
                </div>
                <div className="col-6 text-right">
                    <CreateModal />
                </div>
            </div>
            <div>
                <hr />
            </div>
            {/* Card Layout */}
            <div className ='row'>
              {
                dataProducts.map((value, index) => {
                  return(
                    <div className='col-4'>
                      {/* Card Content */}
                      <div className="row card rounded-0 mx-1 px-3 py-3" style={{width: '18rem', position: 'absolute'}}>
                          
                          {/* Main Image */}
                          <img src={`http://localhost:5000/${value.main_image}`} className="card-img-top" sytle={{width: 300, height:240}}/>
                          <div className="row justify-content-center">
                              <input type="button" value="Edit Image" onClick={() => setModalOpen(true)} className="btn btn-warning rounded-0" style={{position: 'relative', bottom: '50px', width: '100px', opacity: 0.9}} />
                          </div>
                          
                          {/* Others Images */}
                          <div className='row mt-2'>
                            {
                              value.products_images.map((val, idx) => {
                                return(
                                  <div className ='col-4'>
                                    <img src={`http://localhost:5000/${val.path}`} onClick={() => onClickImage(index, val.path)} className="card-img-top" sytle={{width: 300, height:240}} 
                                    />
                                  </div>
                                )
                              })
                            }
                          </div>
                          {/* Detail Produk */}
                          <div className="card-body">
                              <div className='d-flex justify-content-between'>
                                  <h5 className="card-title">Sepatu</h5>
                              </div>
                              <h6 className="card-title mt-n2"><h5 className="card-title">Rp.1.500.000</h5></h6>
                              <p className="card-title" style={{fontSize: 14}}>100 Stok Tersedia</p>                                    
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <input type="button" value="Delete Product" className="btn btn-danger rounded-0 w-100" />
                          </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <Modal toggle={() => setModalOpen(false)} isOpen={modalOpen}>
            <ModalBody>
                <div className="px-3">
                    <div className="row justify-content-center">
                        <div className="col-12 d-flex justify-content-center align-items-center border border-primary">
                            Image Preview
                        </div>
                        <div className="col-12 mt-3">
                            <div>
                                <input type="file" accept="image/*" multiple />
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            Error Message
                        </div>
                        <div className="col-12 mt-3">
                            <input type="button" value="Submit" className="btn btn-primary w-100" />
                        </div>
                    </div>
                </div>
            </ModalBody>
          </Modal>
        </div>
      </>
  )
}

export default App