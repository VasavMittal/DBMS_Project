import React, {  useState } from "react";
import '../App.css';
import Axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import students from './Images/loginteach.png';

function TeacherLogin() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState ("");
    const[loginStatus,setLoginStatus]=useState(false);
    const navigate=useNavigate();
    useEffect(() => {
    console.log(loginStatus);
    }, [loginStatus]);
   
    const login1 = (event) => {
      event.preventDefault();
        Axios.post("http://localhost:3001/loginTeach", {
           email: email,
           password: password,
        }).then((response) => {
           if (response.data.length>0) {
            console.log("Successfully logged in");
            setLoginStatus(true);
            console.log(response);
            sessionStorage.setItem("teacher_email",email);
            sessionStorage.setItem("tid",response.data[0].tid);
            navigate('/td');
           } else {
            setLoginStatus(false);
            console.log(response.data);
            console.log(loginStatus);
            console.log("Invalid!!");
           }
        });
        };
 
    return (
      <div id="logindiv">
       
      <div className="registration">
      <h1>Teacher Login</h1>
      <h3>Enter Your Details Below</h3>
          <form>
         
          <div id="fimg-2">
          <img src={students} alt="studentimage"></img>
          </div>
         <div id="finput-1" >
         
         <div className="fontuser">

         <label>Email ID</label>
         <input type="email" required onChange={(e) => {
            setemail(e.target.value);

         }}/>
         <i className="fa fa-envelope fa-lg"></i>
         <br/>

         </div>


         <div className="fontuser password">
         <label>Password</label>
         <input type="password" required onChange={(e) =>{
               setPassword(e.target.value);
            }}/> 
         <i className="fa fa-lock fa-lg"></i>
         </div>
               
          <button onClick={(e)=>login1(e)} id="regbtn"> Login</button>
          </div>
          </form>
         
       </div>
       <h1 style={{color:"white"}}> {loginStatus}</h1>
  </div>
    );
 }
  
 export default TeacherLogin;