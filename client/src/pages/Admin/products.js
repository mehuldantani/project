import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout.js'
import Adminmenu from '../../components/layout/adminmenu.js'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Products = () => {

  const [products,setProducts] = useState([])

  const getallproducts = async ()=>{
    try {
      const resp = await axios.get('/api/v1/product');

      if (resp.status === 200 && resp.data?.success) {
        setProducts(resp.data.products); // Set categories directly without Object.entries()
        console.log(products)
      }
    } catch (error) {
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
    getallproducts();
  }, []);

  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
            <Adminmenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>Products</h1>
          <div className='d-flex flex-wrap'>
          {products?.map(product => (
            <div className="card m-2 zoom-image" style={{ width: "15rem" }}>
              {product.photos && product.photos.length > 0 ? (
                <img
                  className="card-img-top m-4 zoom-image"
                  src={product.photos[0].secure_url}
                  alt={product.name}
                  style={{ width: "80%", height: "200px" }}
                />
              ) : (
                <img
                  className="card-img-top"
                  src='https://cloud-cart.s3.ap-south-1.amazonaws.com/products/6471f1fe66f3b36622234f30/photo_1.png'
                  alt='No Image'
                  style={{ width: "80%", height: "200px" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <div className="card-text font-weight-bold"><strong>Rs. {product.price}</strong></div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Products