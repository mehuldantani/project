import React from 'react';
import Layout from '../components/layout/layout.js';
import {Link} from 'react-router-dom'
import { useAuth } from '../context/auth.js';

const HomePage = () => {

  const [auth,setAuth] = useAuth()

  return (
    <Layout>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  );
};

export default HomePage;
