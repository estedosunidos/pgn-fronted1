import axios from "axios";
import React,{useState} from "react";
import  {API_CARRERA,cabeceras} from "../../store/constante"
function  EditarCarrera(props){
    const [carrera,setCarrera]= useState(props.carrera)
    const  handleChange=(prop)=>(event)=>{
        setCarrera({...carrera,[prop]:event.target.value})

    };
    const editarcarrera=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CARRERA+"/"+carrera.Id;
        const body={Nombre_Carrera:carrera.Carrera ,
            CantidadSemestre:carrera.Semestres,
            TotalCredito:carrera["Total Creditos"]
            }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        }
        )
        .catch(error=>{
            alert("Se ha presentado un error")
            console.log(error)
        })

    })
    return(
        <div>
            <h2>Editar Carrera</h2>
            <div>
                <form onSubmit={editarcarrera}>
                    <label>Nombre carrera</label>
                    <input type="text" value={carrera.Carrera} onChange={handleChange("Carrera")}></input>
                    <label>Cantidad de semetres </label>
                    <input type="text" value={carrera.Semestres} onChange={handleChange("Semestres")}></input> 
                    <label>Total de creditos</label>
                    <input type="text" value={carrera["Total Creditos"]} onChange={handleChange("Total Creditos")} ></input>
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}
export  default EditarCarrera;