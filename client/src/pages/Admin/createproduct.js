import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/adminmenu.js'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {Select} from 'antd'

const {Option} = Select

const Createproduct = () => {

  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState([])
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
              showSearch 
              className="form-select mb-3" onchange = {(value)=> setCategory(value)} >
                {categories.map(c => (
                  <Option key ={c._id} value ={c.name}>{c.name}</Option>
                ))}
              </Select>
              </div>
              <div className='mb-3'>
                <label htmlFor='Upload Images' className='btn btn-outline-secondary col-md-12'>
                  {photos ? photos.name : "Upload Photo"}
                  <input 
                    type="file" 
                    name="photo" 
                    accept="image/*"
                    onChange={(e) => setPhotos(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
            </div>
            </div>
          </div>
      </div>
    </Layout>
  )
}

export default Createproduct