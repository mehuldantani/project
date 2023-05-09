import React from 'react';
import Layout from '../components/layout/layout.js';
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <Layout>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="max-width-150 rounded p-4 login-container">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" class="form-text">____________________________________________________________</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="mt-3 text-center">
      <Link to='/register' className="singup">
        Don't have an account yet ? Sign up now
        </Link>
      </div>
    </div>
  </div>
</Layout>

  )
}

export default HomePage;
