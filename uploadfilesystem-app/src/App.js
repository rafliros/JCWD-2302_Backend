import {useState, useEffect} from 'react';
import axios from 'axios'; 

import {Modal, ModalBody} from 'reactstrap';
import CreateModal from './Components/CreateModal';

function App(){
  const[modalOpen, setModalOpen] = useState(false)
  const[data, setData] = useState(null)
  const[previewImage, setPreviewImage] = useState(null)
  const[dataProducts, setDataProducts] = useState([])
  const[imagePreview, setImagePreview] = useState('')
  const[selectedImage, setSelectedImage] = useState([])
  const[idImageSelected, setIdImageSelected] = useState([])
  const[onEdit, setOnEdit] = useState(null)

    let onGetData = async() => {
        try {
            let getData = await axios.get(`http://localhost:5000/products/get`)
            setDataProducts(getData.data.data)
        } catch (error) {
            
        }
    }

    let onClickImage = (index, path, idImage) => {
      let currentDataProducts = [...dataProducts]
      let currentIdImageSelected = [...idImageSelected]

      currentDataProducts[index].main_image = path 
      currentIdImageSelected[index] = idImage 
      console.log(currentIdImageSelected)

      setDataProducts(currentDataProducts)
      setIdImageSelected(currentIdImageSelected)
    }

    let onUpdateImage = (e) => {
      try {
        if(e.target.files[0].type.split('/')[0] !== 'image') throw { message: 'File must be image' }
        if(e.target.files[0].size > 100000) throw { message: 'File too large' }
        if(e.target.files.length > 1) throw { message: 'One image only' }

        let files = [...e.target.files] // [{}]
        console.log(files)

        let reader = new FileReader()
        // console.log(reader)
        reader.readAsDataURL(files[0])
        reader.onload = () => {
          if(reader.readyState === 2){
            setImagePreview(reader.result)
            setSelectedImage(files)
          }
        }

      } catch (error) {
        console.log(error.message)
      }
    }

    let onSubmitImage = async() => {
      try {
        let fd = new FormData()
        fd.append('images', selectedImage[0])
        await axios.patch(`http://localhost:5000/products/update/${idImageSelected[onEdit]}`, fd)
        alert('Success')
      } catch (error) {
        
      }
    }

    let onClickEdit = (index) => {
      setModalOpen(true) 
      setOnEdit(index)
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
                    <div className='col-4 mx-1'>
                      {/* Card Content */}
                      <div className="row card rounded-0 px-2 py-2 w-100" style={{width: '18rem', position: 'absolute'}}>
                          
                          {/* Main Image */}
                          <img src={`http://localhost:5000/${value.main_image}`} className="card-img-top" sytle={{width: 300, height:240}}/>
                          <div className="row justify-content-center">
                              <input type="button" value="Edit Image" onClick={() => onClickEdit(index)} className="btn btn-warning rounded-0" style={{position: 'relative', bottom: '50px', width: '100px', opacity: 0.9}} />
                          </div>
                          
                          {/* Others Images */}
                          <div className='row mt-2'>
                            {
                              value.products_images.map((val, idx) => {
                                return(
                                  <div className ='col-4'>
                                    <div>{val.id}</div>
                                    <img src={`http://localhost:5000/${val.path}`} onClick={() => onClickImage(index, val.path, val.id)} className="card-img-top" sytle={{width: 300, height:240}} 
                                    />
                                  </div>
                                )
                              })
                            }
                          </div>
                          {/* Detail Produk */}
                          <div className="card-body">
                              <div className='d-flex justify-content-between'>
                                  <h5 className="card-title">{value.name.slice(0, 25) + '...'}</h5>
                              </div>
                              <h6 className="card-title mt-n2"><h5 className="card-title">{value.price.toLocaleString()}</h5></h6>
                              <p className="card-title" style={{fontSize: 14}}>{value.stocks} Stok Tersedia</p> 
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
                            {imagePreview? <img src={`${imagePreview}`} className='w-100 h-100' /> : 'Image Preview Here'}
                        </div>
                        <div className="col-12 mt-3">
                            <div>
                                <input type="file" accept="image/*" onChange={(e) => onUpdateImage(e)} />
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            
                        </div>
                        <div className="col-12 mt-3">
                            <input type="button" value="Submit" onClick={onSubmitImage} className="btn btn-primary w-100" />
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