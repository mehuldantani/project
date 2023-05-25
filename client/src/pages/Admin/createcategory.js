import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import Adminmenu from '../../components/layout/adminmenu.js';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare ,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import CategoryForm from '../../components/Form/categoryform'
import {Modal} from 'antd'

const Createcategory = () => {

  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("")
  const [updatedname,setUpdatedname] = useState("")
  const [selected,setSelected] = useState(null)
  const [visible,setVisible] = useState(false)

  //form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const resp = await axios.post("http://localhost:4000/api/v1/collection",{
        "name": name
    }
      );
      if (resp.status === 200 && resp.data.success) {
        
        toast.success(`${name} Added.`);
        setName("")  
        getAllCategories() 
      } else {
        // show error message to the user
        toast.error("Something Went Wrong.");
      }
    } catch(error){
      console.log(error)
      toast.error("Something Went Wrong.")
    }

  }

  const handleUpdate = async (e) => {

    e.preventDefault()

    try{
      const resp = await axios.post(`http://localhost:4000/api/v1/collection/${selected._id}`,{
        "name": updatedname
    }
      );
      if (resp.status === 200 && resp.data.success) {
        
        toast.success(`Updated to ${updatedname}.`);
        setName("")  
        getAllCategories() 
        setVisible(false)
        setUpdatedname("")
        setSelected(null)
      } else {
        // show error message to the user
        toast.error("Something Went Wrong.");
      }
    } catch(error){
      console.log(error)
      toast.error("Something Went Wrong.")
    }

  }

  const handleDelete = async (itemid) => {

    try{
      const resp = await axios.delete(`http://localhost:4000/api/v1/collection/${itemid}`);
      if (resp.status === 200 && resp.data.success) {
        
        toast.success(`${name} Deleted`);
        setName("")  
        getAllCategories()
      } else {
        // show error message to the user
        toast.error("Something Went Wrong.");
      }
    } catch(error){
      console.log(error)
      toast.error("Something Went Wrong.")
    }

  }
  //get all categories
  const getAllCategories = async () => {
    try {
      const resp = await axios.get('http://localhost:4000/api/v1/collection');

      if (resp.status === 200 && resp.data.success) {
        console.log('req is true');
        console.log(resp.data.allCollections);
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
          <div className='col-md-9'>
            <h3>Manage Categories</h3>
            <div className='p-3 w-50'>
              <CategoryForm HandleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td><FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                        setVisible(true); setUpdatedname(c.name); setSelected(c)}
                        } /></td>
                      <td><FontAwesomeIcon icon={faTrashCan} onClick={()=>{handleDelete(c._id)}} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel ={()=> setVisible(false)} footer = {null} visible ={visible}>
          <CategoryForm HandleSubmit={handleUpdate} value={updatedname} setValue={setUpdatedname} />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Createcategory;
