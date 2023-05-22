import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/adminmenu.js'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Createcoupon = () => {

  const [coupons, setCoupons] = useState([]);

  //get all categories
  const getAllCoupons = async () => {
    try {
      const resp = await axios.get('http://localhost:4000/api/v1/coupon');
      if (resp.status === 200 && resp.data.success) {
        setCoupons(resp.data.coupons); // Set coupons directly without Object.entries()
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
    getAllCoupons();
  }, []);


  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
                <Adminmenu />
            </div>
            <div className='col-md-9'>
            <h3>Manage Coupons</h3>
            <div>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th scope='col-4'>Name</th>
                    <th scope='col'>Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c._id}>
                      <td>{c.code}</td> {/* Access the name property of each category */}
                      <td>{c.discount} %</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
  </Layout>
  )
}

export default Createcoupon