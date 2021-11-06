import React,{useState} from "react";
import axios from "axios";
import  {API_CORTE,cabeceras} from "../../store/constante"
function CrearCortes(props){
    const [corte,setCorte]=useState({})
    const crearcortes=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CORTE;
        const body={
            Descripcion:corte.Descripcion
        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("El corte academico no fue creada")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setCorte({...corte,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                <h2>Registra  Corte Academico</h2>
            </div>
            <form onSubmit={crearcortes}>
                    <label>Corte Academico</label>
                    <input type="text" value={corte.Descripcion} onChange={handleChange("Descripcion")}></input>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearCortes