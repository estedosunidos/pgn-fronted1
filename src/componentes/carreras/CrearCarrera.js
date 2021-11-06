import axios from "axios";
import React,{useState} from "react";
import  {API_CARRERA,cabeceras} from "../../store/constante"
function CrearCarrera(props){
    const [carrera,setCarrera]=useState({Nombre_Carrera:"",TotalCredito:"",CantidadSemestre:""})
    const crearcarrera=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CARRERA;
        const body={
            Nombre_Carrera:carrera.Nombre_Carrera,
            CantidadSemestre:carrera.CantidadSemestre,
            TotalCredito:carrera.TotalCredito,
            idAdministrador:JSON.parse(localStorage.getItem("perfil"))["idAdministrador"]
        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("La carrera no fue creada")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setCarrera({...carrera,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                <h2>Registrar Carrera </h2>
            </div>
            <form onSubmit={crearcarrera}>
                    <label>Nombre carrera</label>
                    <input type="text" value={carrera.Nombre_Carrera} onChange={handleChange("Nombre_Carrera")}></input>
                    <label>Cantidad de semetres </label>
                    <input type="text" value={carrera.CantidadSemestre} onChange={handleChange("CantidadSemestre")}></input> 
                    <label>Total de creditos</label>
                    <input type="text" value={carrera.TotalCredito} onChange={handleChange("TotalCredito")} ></input>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearCarrera;