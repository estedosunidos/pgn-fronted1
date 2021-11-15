import React,{useState} from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import {FormControl,InputLabel,Input, InputAdornment, IconButton} from '@material-ui/core';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import { Visibility,VisibilityOff,AccountCircle,Lock} from "@material-ui/icons";
import "../css/Login.css"
import Routes from "../routes/Routes";
import  {API_LOGIN} from "../store/constante"
const useStyles=makeStyles((theme)=>({
    root:{
        '& .MuiTextField-root':{
            margin:theme.spacing(1),
            width :200}

    }
}));
//:asignacion de un atributo
function Login(){
    const clases=useStyles();
   const [values,setValues]=useState({usuario:"",Contraseña:"",mostrar:false});
    const  handleChange=(prop)=>(event)=>{
        setValues({...values,[prop]:event.target.value})

    };
    const  ingresar=(event)=>{
      event.preventDefault();
      const url=process.env.REACT_APP_API_URL+API_LOGIN
      const body={Nombre_de_Usuario:values.usuario,
                    Contraseña:values.Contraseña
                    }
        axios.post(url,body)
        .then(repuesta=>{
            console.log(repuesta.data)
            validacionLogica(repuesta.data);
        })
        .catch(error=>{
            alert("Se ha presentado un error  al ingresar")
            console.log(error)
        })
        
    }
    //&& =y   || = or not =!
    function validacionLogica(repuesta){
        if(repuesta['token']===""&& 'Nombre' in repuesta){
            alert("La contraseña es incorrecta")
        }else if(repuesta['token']===""){
          alert("El usuario y la contraseña son incorrectas");

        }else{
            localStorage.setItem("token",repuesta['token'])
            localStorage.setItem("nombre_de_usuario",repuesta['Nombre']+" "+repuesta['Apellido']);
            localStorage.setItem("documento",repuesta['Documento']);
            localStorage.setItem("token","Bearer "+repuesta["token"]);
            localStorage.setItem("perfil",JSON.stringify(repuesta["Perfil"]))
            //localStorage.setItem("foto",JSON.stringify(repuesta["foto"]))
            ReactDOM.render(
                <React.StrictMode>
                  <Routes/>
                </React.StrictMode>,
                document.getElementById('root')
              );
        }
    }
    const mostrarPassword=()=>{
        setValues({...values,mostrar:!values.mostrar})

    }
    const handleMouseDownPassword=(event)=>{
        event.preventDefault()
    }
    return(
        <div className="App">
            <div className="App-header">
        <label>Login</label>
       <form onSubmit={ingresar}>
           <div>
               <FormControl className={clsx(clases.margin, clases.textField)}>
                    <InputLabel htmlFor="txtUsuario">Usuario</InputLabel>
                    <Input type="text" id="txtUsuario" value={values.usuario} onChange={handleChange("usuario")} startAdornment={<InputAdornment position="start"><AccountCircle/></InputAdornment>} endAdornment={<InputAdornment position="end"><IconButton></IconButton></InputAdornment>}></Input>
               </FormControl>
           </div>
           <div>
            <FormControl className={clsx(clases.margin, clases.textField)}>
                <InputLabel htmlFor="txtPassword">Contrase&ntilde;a</InputLabel>
                <Input type={values.mostrar ? "text" : "password"} id="txtPassword" value={values.contraseña} onChange={handleChange("Contraseña")} startAdornment={<InputAdornment position="start"><Lock/></InputAdornment>} endAdornment={<InputAdornment position="end"><IconButton onMouseDown={handleMouseDownPassword}  aria-label="Mostrar/Ocultar Contraseña" onClick={mostrarPassword}>{ values.mostrar ? <Visibility/>:<VisibilityOff/>}</IconButton></InputAdornment>}></Input>
            </FormControl>
           </div>
           <button type="submit">Ingresar</button>
       </form>
       </div>
       </div>
    );
}
export default Login;