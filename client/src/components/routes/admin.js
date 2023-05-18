import { useState,useEffect } from "react";
import {useAuth} from '../../context/auth'
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from '../spinner.js'
import toast from 'react-hot-toast'

export default function AdminRoute(){
    const [ok,setOk] = useState(false)
    const [auth,setAuth] = useAuth()

    useEffect(()=>{
        const authcheck = async()=>{
            try {
                const res = await axios.post("http://localhost:4000/api/v1/auth/admin-auth")

                if(res.data.ok){
                    setOk(true)
                }else{
                    setOk(false)
                }
            } catch (error) {
                console.log(error)
                // show error message to the user
                toast.error("Something went wrong");
            }
            
        }
        
        if(auth?.token) authcheck()

    },[auth?.token])

    return ok ? <Outlet/>:<Spinner path=""/>
};