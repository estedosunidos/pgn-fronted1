import {API_LOGOUT} from "../store/constante"
import axios from "axios";
import ReactDOM from 'react-dom';
import Login from "../paginas/Login"
import React,{useState} from "react";
import ModificarContrasena from "../componentes/Principal/ModificarContrasena";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Principal(){
    const nombre_completo =localStorage.getItem("nombre_de_usuario");
    const documento=localStorage.getItem("documento");
    const [mostraanuncio,setMostraanuncio]=useState(false)
    const [mostracambiodecontrasena,setMostracambiodecontrasena]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    //const [mostracambiocontrasena,setMostracambiocontrasena]=useSate(false)e
    const perfil=JSON.parse(localStorage.getItem("perfil"))
    const salir=(event)=>{
        event.preventDefault();
        const url=process.env.REACT_APP_API_URL+API_LOGOUT+documento;
        axios.put(url)
        .then(repuesta=>{
            console.log(repuesta.data);
           localStorage.removeItem("token")
            localStorage.removeItem("nombre_de_usuario");
            localStorage.removeItem("documento");
            localStorage.removeItem("token");
            localStorage.removeItem("perfil")
            localStorage.removeItem("foto")
            ReactDOM.render(
                <React.StrictMode>
                  <Login/>
                </React.StrictMode>,
                document.getElementById('root')
              );
        })
        
    }
    const muestramodal1=(()=>{
        setMostracambiodecontrasena(true)
    })
    const anuncioestudiante1=((event)=>{
        event.preventDefault();
        setMostraanuncio(!mostraanuncio)
    })
    const actualizarcontrasena=((event)=>{
        event.preventDefault();
        setMostracambiodecontrasena(!mostracambiodecontrasena)
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
        <label>Bienvenido: {nombre_completo}</label>
        <button onClick={salir}>Salir</button>
        <button onClick={actualizarcontrasena}>Actualizar Contraseña</button>
        {mostracambiodecontrasena && <ModificarContrasena muestramodal={muestramodal1} documento={documento}></ModificarContrasena>}
        {showError && <Dialog onClose={handleClose} open={showError}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-error">{textError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>}
        </div>       
    );
}
export default Principal;