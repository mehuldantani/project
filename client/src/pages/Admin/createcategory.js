import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import Adminmenu from '../../components/layout/adminmenu.js';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Createcategory = () => {
  const [categories, setCategories] = useState([]);

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
            <div>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td> {/* Access the name property of each category */}
                      <td>Actions</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createcategory;
