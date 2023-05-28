import React,{useState,useEffect} from 'react';
import Layout from '../components/layout/layout.js';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {Checkbox,Radio} from 'antd'
import {prices} from '../components/layout/filterprices.js'
import {useCart} from '../context/cart.js'

const HomePage = () => {

  const [cart,setCart] = useCart([])

  const [products,setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [checked,setCheceked] = useState([])
  const [radio,setRadio] = useState([])

  useEffect(() => {
    getAllCategories();
  }, []);
  
  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getallproducts();
    }
  }, [checked.length, radio.length]);
  


  useEffect(() => {
    if (checked.length || radio.length) filteredproducts();
  }, [checked.length, radio.length]);

  const getallproducts = async ()=>{
    try {
      const resp = await axios.get('/api/v1/product');

      if (resp.status === 200 && resp.data?.success) {
        console.log('called all product')
        setProducts(resp.data.products); // Set categories directly without Object.entries()
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

  //get all categories
  const getAllCategories = async () => {
    try {
      const resp = await axios.get('http://localhost:4000/api/v1/collection');

      if (resp.status === 200 && resp.data.success) {
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

  const handleFilter = (value,id) => {
    let all = [...checked]

    if (value){
      all.push(id)
    }
    else{
      all = all.filter((c) => c !== id)
    }
    setCheceked(all);
  }

  const filteredproducts = async () =>{

    const args = {
      "categories":checked,
      "price":radio
      };

    try {
      console.log(args)
      const resp = await axios.post('http://localhost:4000/api/v1/product/filter-products',args);

      if (resp.status === 200 && resp.data?.success) {
        console.log('filtered',resp.data.products)
        setProducts(resp.data.products); // Set categories directly without Object.entries()
        
      }
    } catch (error) {
      if (error.response) {
        // handle error response with status code 400
        setProducts([])
        toast.error(error.response.data.message);
      } else {
        // handle other errors
        console.log(error);
        toast.error('Something Went Wrong.');
      }
    }
  }

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-2'>
          <h6 className='text-left'> Filters</h6>
          <div className='d-flex flex-column'>
          <h6 className='mt-4 font-weight-bold'>Categories</h6>
          {categories?.map((c) => (
            <Checkbox key={c._id} onChange={(e)=>{handleFilter(e.target.checked,c._id)}}>
                {c.name}
            </Checkbox>
          ))}
          </div>
          <div className='d-flex flex-column'>
          <h6 className='mt-4 font-weight-bold'>Prices</h6>
          <Radio.Group onChange={(e) =>{setRadio(e.target.value)}}>
          {prices?.map((c) => (
            <div key={c._id}>
              <Radio value={c.array}>{c.name}</Radio>
            </div>
          ))}
          </Radio.Group>
          </div>
          <div className='d-flex flex-column m-2 float-right'>
            <button style={{
              backgroundColor: "transparent",
              color: "black",
              border: "1px solid gray",
              width: 70
            }} onClick={()=>{
                        setCheceked([])
                        setRadio([])
                      }}>Reset</button>
          </div>
        </div>
        <div className='col-md-10'>
          <h4 className='text-left'>Best of CloudCart Exclusive</h4>
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
                  className="card-img-top m-4"
                  src='https://cloud-cart.s3.ap-south-1.amazonaws.com/products/6471f1fe66f3b36622234f30/photo_1.png'
                  alt='No Image'
                  style={{ width: "80%", height: "200px" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title"><strong>{product.name}</strong></h5>
                <p className="card-text">{product.description.substring(0,100)}</p>
                <div className="card-text font-weight-bold"><h6>Rs. {product.price}</h6></div>
                <button className="btn btn-primary" onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem('cart',JSON.stringify([...cart, product]))
                  toast.success(`${product.name} Added to Cart`);
                }}>
                  Add to Cart
                </button>

              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;
