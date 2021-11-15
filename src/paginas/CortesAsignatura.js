import React,{useState,useEffect} from "react"
import {API_DOCENTE,cabeceras,API_CORTE} from "../store/constante"
import axios from "axios";
function CortesAsignatura(){
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState()
    const [porcentajes,setPorcentajes]=useState([])
    useEffect(()=>{
        const documento =localStorage.getItem("documento")
        const url=process.env.REACT_APP_API_URL+API_DOCENTE+"/documento/"+documento
        axios.get(url,{headers:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            let docente1=repuesta.data
            setAsignaturas(docente1[0]["AsignaturaDocente"])
        })
         .catch((error)=>{
                 console.log(error)
                 alert("La asignatura no pudieron ser cargadas")
                
         })
    },[])
    const handleChange=(prop)=>(event)=>{
        console.log(prop)
        if (prop === "Asignatura"){
            setAsignatura(event.target.value)
            consultarcorte(event.target.value)
        }else if (prop ==="Porcentaje"){
            console.log(2)
            setPorcentajes(porcentajes=>{
                const lista=porcentajes.map((porcentaje,index)=>{
                    console.log(porcentaje.Id, event.target.name, typeof porcentaje.Id, typeof event.target.name)
                    if (porcentaje.Id == event.target.name){
                        porcentaje.Porcentaje=event.target.value
                    }
                return porcentaje
                })
                return lista
            })
        }
    }
    const consultarcorte=((Id)=>{
        const url =process.env.REACT_APP_API_URL+ API_CORTE+"/asignaturacorte/"+Id
        axios.get(url,{headers:cabeceras})
        .then((repuesta)=>{
            console.log(repuesta.data)
            setPorcentajes(repuesta.data)
        })
        .catch((error)=>{
            console.log(error)
            alert("Los corte no puedo ser consultado")
        })
    })
    const guarda=(()=>{
        const url=process.env.REACT_APP_API_URL+API_CORTE+"/asignaturaporcorte"
        const peticiones=[...porcentajes]
        axios.all(peticiones.map((peticion,index)=>{
            console.log(peticion)
            const body={
                IdAsignaturaDocente:asignatura,
                IdCorte:peticion.Id,
                Pocentaje:peticion.Porcentaje
            }
          return  axios.post(url,body,{headers:cabeceras})
        }))
       .then(axios.spread((...repuestas)=>{
           repuestas.map((repuesta,index)=>{
            console.log(repuesta.data)
           })
       }))
        .catch(axios.spread((...errores)=>{
            errores.map((error,index)=>{
                console.log(error)
            })
        })) 
        console.log("sss",porcentajes)
    })
    return (
        <div>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue=" " onChange={handleChange("Asignatura")}>
                        <option value=" " disabled selected>seleccione</option>
                        {asignaturas.map((asignatura,index)=>{
                            return <option key={index} value={asignatura.Id}>{asignatura["Nombre Asignatura"]}</option>
                        })}
                </select>
                <div>
                <label>Corte</label>
                {porcentajes.map((corte,index)=>{
                    return <div key={index}><label>{corte.Corte}</label><input type="text" value={corte.Porcentaje} onChange={handleChange("Porcentaje")} name={corte.Id}></input></div>
                })}
                </div>
                <div>
                <button onClick={guarda}>Enviar</button>
            </div>
        </div>
    )
}
export default CortesAsignatura