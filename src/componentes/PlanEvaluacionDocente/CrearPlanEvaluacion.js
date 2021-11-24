import React, { useEffect, useState } from "react";
import { API_PLANDEEVALUACION, cabeceras, API_EVALUACIONTIPO, API_DOCENTE, API_CORTE } from "../../store/constante"
import axios from "axios";
function CrearPlanEvaluacion(props) {
    const [planevaluacion, setPlanevaluacion] = useState({})
    const [evaluacionTipos, setEvaluacionTipos] = useState([])
    const [cortes, setCortes] = useState([])
    const [asignaturas, setAsignaturas] = useState([])
    useEffect(() => {
        const documento = localStorage.getItem("documento")
        const urlasignatura = process.env.REACT_APP_API_URL + API_DOCENTE + "/documento/" + documento
        const urltipoevaluacion = process.env.REACT_APP_API_URL + API_EVALUACIONTIPO;
        const axiostipoevaluacion = axios.get(urltipoevaluacion, { headers: cabeceras })
        const axioasignatura = axios.get(urlasignatura, { headers: cabeceras })
        axios.all([axiostipoevaluacion, axioasignatura])
            .then(axios.spread((...repuestas) => {
                repuestas.map((repuesta, index) => {
                    console.log(repuesta.data)
                    if (index === 0) {
                        setEvaluacionTipos(repuesta.data);
                    } else if (index === 1) {
                        let docente1 = repuesta.data
                        if (docente1.length > 0) {
                            setAsignaturas(docente1[0]["AsignaturaDocente"])
                        }
                    }
                })
            }))
            .catch(axios.spread((...errores) => {
                errores.map((error, index) => {
                    console.log(error)
                    if (index === 0) {
                        alert("El tipo de evaluacion no fueron listada")
                    } else if (index === 1) {
                        alert("La asignatura no fueron cargadas")
                    }
                })
            }))
    }, [])
    const traerloscorteacademicos = ((Id) => {
        const url = process.env.REACT_APP_API_URL + API_CORTE + "/asignaturasdocentescortes/" + Id
        axios.get(url, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                setCortes(repuesta.data);
            })
            .catch(error => {
                console.log(error)
                alert("Los cortes academicos  no pudieron ser cargadas")
            })
    })
    const crearplanevaluacion = ((event) => {
        event.preventDefault()
        const url = process.env.REACT_APP_API_URL + API_PLANDEEVALUACION;
        const body = {
            Descripcion: planevaluacion["Descripcion"],
            FechaInicialProgramada: planevaluacion["FechaInicio"],
            FechaFinalProgramada: planevaluacion["FechaFinal"],
            Porcentaje: planevaluacion["porcentaje"],
            idEvaluacionesTipo: planevaluacion["Evaluaciontipos"],
            Idasignaturadocentecorte: planevaluacion.Cortes,
        }
        console.log(planevaluacion);
        axios.post(url, body, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                props.crear();
            })
            .catch(error => {
                alert("El plan de evaluacion no fue creado")
                console.log(error)
            })
    })
    const handleChange = (prop) => (event) => {
        setPlanevaluacion({ ...planevaluacion, [prop]: event.target.value })
        if (prop === "Asignatura") {
            traerloscorteacademicos(event.target.value)
        }
    }
    return (
        <div>
            <form onSubmit={crearplanevaluacion}>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue="" onChange={handleChange("Asignatura")}>
                    <option value="" disabled>Seleccione</option>
                    {asignaturas.map((asigantura, index) => {
                        return <option key={index} value={asigantura.Id}>{asigantura["Nombre Asignatura"]}</option>
                    })}
                </select>
                <label>Tipo Evaluacion</label>
                <select name="EvaluacionTipos" onChange={handleChange("Evaluaciontipos")}>
                    <option value=" " disabled selected>seleccione</option>
                    {evaluacionTipos.map((Evaluaciontipo, index) => {
                        return <option key={index} value={Evaluaciontipo.Id}>{Evaluaciontipo.Descripcion}</option>
                    })}
                </select>
                <label></label>
                <input type="text" value={planevaluacion.Descripcion} onChange={handleChange("Descripcion")}></input>
                <label>Fecha Inicio</label>
                <input type="Date" value={planevaluacion.FechaInicio} onChange={handleChange("FechaInicio")}></input>
                <label>Fecha Final</label>
                <input type="Date" value={planevaluacion.FechaFinal} onChange={handleChange("FechaFinal")}></input>
                <label>Corte</label>
                <select name="Cortes" onChange={handleChange("Cortes")}>
                    <option value=" " disabled selected>seleccione</option>
                    {cortes.map((Corte, index) => {
                        return <option key={index} value={Corte.Idasignaturadocentecorte}>{Corte.Descripcion}</option>
                    })}
                </select>
                <label>Porcentaje</label>
                <input type="text" value={planevaluacion.porcentaje} onChange={handleChange("porcentaje")}></input>
                <button type="submit"> Crear</button>
                <button onClick={() => props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearPlanEvaluacion