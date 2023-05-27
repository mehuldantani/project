import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/adminmenu.js'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {Select} from 'antd'
import {useNavigate} from 'react-router-dom'

const {Option} = Select

const Createproduct = () => {

  const navigate = useNavigate()

  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState('')
  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("")
  const [stock,setStock] = useState("")
  const [photos,setPhotos] = useState("")

   //get all categories
   const getAllCategories = async () => {
    try {
      const resp = await axios.get('http://localhost:4000/api/v1/collection');

      if (resp.status === 200 && resp.data?.success) {
       setCategories(resp.data.allCollections); // Set categories directly without Object.entries()
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // handle error response with status code 400
        toast.error(error.response.data.message);
      } else {
        // handle other errors
        console.log(error);
        toast.error('Something Went Wrong.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{

      //create instance of form type data
      const newproduct = new FormData()

      newproduct.append('name',name)
      newproduct.append('description',description)
      newproduct.append('collectionId',category)
      newproduct.append('price',price)
      newproduct.append('stock',stock)
      newproduct.append('files',photos)

      const resp = await axios.post("http://localhost:4000/api/v1/product",newproduct);
      console.log(resp)
      if (resp.status === 200 && resp.data.success) {
        
        toast.success(`${name} Added Successfully`);
        setName("")
        setDescription('')
        setCategory('') 
        setPrice('')
        setStock('')
        setPhotos('') 
        navigate('/dashboard/admin/products')
      } else {
        // show error message to the user
        toast.error("Something Went Wrong.");
      }
    } catch(error){
      if (error.response) {
        // handle error response with status code 400
        toast.error(error.response.data.message);
      } else {
        // handle other errors
        console.log(error);
        toast.error('Something Went Wrong.');
      }
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
                <Adminmenu />
            </div>
            <div className='col-md-9'><h3>Create product</h3>
            <div className='m-1 w-75'>
              <div className='w-25'>
                <span>Choose a category</span>
                <Select bordered={false} 
                placeholder="Select a Category" 
                size='large' 
                required
                showSearch 
                className="form-select mb-3" onChange = {(value)=> setCategory(value)} >
                  {categories.map(c => (
                    <Option key ={c._id} value ={c._id}>{c.name}</Option>
                  ))}
                </Select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photos ? photos.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhotos(e.target.files[0])}
                    hidden
                    required
                  />
                </label>
              </div>
              <div className='mb-3'>
                  {photos && (
                    <div className='text-center'>
                      <img 
                      src={URL.createObjectURL(photos)} 
                      alt='product_img' 
                      height={'200px'}
                      className='img img-responsive' />
                    </div>
                  )}
              </div>
              <div className='mb-3'>
                  <input
                  type='text'
                  value={name}
                  placeholder='Product Name'
                  className='form-control'
                  onChange={(e)=> setName(e.target.value)}
                  required
                  />
              </div>
              <div className='mb-3'>
                  <input
                  type='text'
                  value={description}
                  placeholder='Description'
                  className='form-control h-50'
                  onChange={(e)=> setDescription(e.target.value)}
                  required
                  />
              </div>
              <div className='mb-3'>
                  <input
                  type='number'
                  value={price}
                  placeholder='Price'
                  className='form-control'
                  onChange={(e)=> setPrice(Math.max(0, Math.min(e.target.value, 100000)))}
                  required
                  />
              </div>
              <div className='mb-3'>
                  <input
                  type='number'
                  value={stock}
                  placeholder='Stock'
                  className='form-control'
                  onChange={(e)=> setStock(Math.max(0, Math.min(e.target.value, 1000)))}
                  required
                  />
              </div>
              <div className='mb-3'>
                  <button className='btn btn-primary' onClick={handleSubmit}>
                    Create Product
                  </button>
              </div>
            </div>
            </div>
          </div>
      </div>
    </Layout>
  )
}

export default Createproduct