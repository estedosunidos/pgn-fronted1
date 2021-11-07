import Principal from "../paginas/Principal"
import Carrera from "../paginas/Carrera"
import Asignatura from "../paginas/Asignatura"
import Docente from "../paginas/Docente"
import Estudiante from "../paginas/Estudiante"
import Usuario from "../paginas/Usuario"
import Ubicacion from "../paginas/Ubicacion"
import Evaluaciontipo from "../paginas/Evaluaciontipo"
import Curso from "../paginas/Curso"
import Administrador from "../paginas/Administrador"
import AsinancionCarrera from "../paginas/AsinanacionCarrera"
import Franjas from "../paginas/Franjas"
import RegistroNotas from "../paginas/RegistroNotas"
import RegistroAsistencia from "../paginas/RegistroAsistencia"
import RegistroPlanEvaluacion from "../paginas/RegistroPlanEvaluacion"
import AnuncioProfesor from "../paginas/AnuncioProfesor"
import RegistroCortesAcademicos from "../paginas/Registrodecortesacademicos"
import RegisstroPeriodo from "../paginas/RegistroPeridod"
import CortesAsignatura from "../paginas/CortesAsignatura"
import RegistroAsignatura from "../paginas/RegistroAsignatura"
import ConsultarHorario from "../paginas/Consultarhorario"
import Consultarnotas from "../paginas/Consultarnotas"


const menu =[{
    titulo: "Principal",
    ruta: "/",
    exact:true,
    componente:Principal
},
{
    titulo:"Carrera",
    ruta: "/Carrera",
    componente:Carrera,
    IsAdministrativo:true
},
{
    titulo:"Asignatura",
    ruta:"/Asignatura",
    componente:Asignatura,
    IsAdministrativo:true
},
{
    titulo:"Usuario",
    ruta:"/Usuario",
    componente:Usuario,
    IsAdministrativo:true
},
{
    titulo:"Docente",
    ruta:"/Docente",
    componente:Docente,
    IsAdministrativo:true
},
{
    titulo:"Estudiante",
    ruta:"/Estudiante",
    componente:Estudiante,
    IsAdministrativo:true
},
{
    titulo:"Ubicacion",
    ruta:"/Ubicacion",
    componente:Ubicacion,
    IsAdministrativo:true
},{
    titulo:"EvaluacionTipo",
    ruta:"/Evaluaciontipo",
    componente:Evaluaciontipo,
    IsAdministrativo:true
},{
    titulo:"Curso",
    ruta:"/Curso",
    componente:Curso,
    IsAdministrativo:true
},{
    titulo:"Administrador",
    ruta:"/Administrador",
    componente:Administrador,
    IsAdministrativo:true
},{
    titulo:"AsinancionCarrera",
    ruta:"/AsinancionCarrera",
    componente:AsinancionCarrera,
    IsAdministrativo:true
},{
    titulo:"Franjas",
    ruta:"/Franja",
    componente:Franjas,
    IsAdministrativo:true
},{

    titulo:"RegistroAsistencia",
    ruta:"/RegistroAsistencia",
    componente:RegistroAsistencia,
    IsDocente:true
},{
    titulo:"RegistroNotas",
    ruta:"/RegistroNotas",
    componente:RegistroNotas,
    IsDocente:true
},{
    titulo:"Registro Plan de evaluacion",
    ruta:"/RegistroPlandeEvaluacion",
    componente:RegistroPlanEvaluacion,
    IsDocente:true
},{
    titulo:"AnuncioProfesor",
    ruta:"/AnuncioProfesor",
    componente:AnuncioProfesor,
    IsDocente:true
},{
    titulo:"RegistroCortesAcademicos",
    ruta:"/RegistroCortesAcademicos",
    componente:RegistroCortesAcademicos,
    IsAdministrativo:true
},{
    titulo:"RegistroPeriodo",
    ruta:"/RegistroPeriodo",
    componente:RegisstroPeriodo,
    IsDocente:true
},{
    titulo:"CortesAsignatura",
    ruta:"/CortesAsignatura",
    componente:CortesAsignatura,
    IsDocente:true
},{
    titulo:"RegistroAsignatura",
    ruta:"/RegistroAsignatura",
    componente:RegistroAsignatura,
    IsEstudiante:true
},{
    titulo:"ConsultarHorario",
    ruta:"/ConsultaHorario",
    componente:ConsultarHorario,
    IsEstudiante:true
},{
    titulo:"ConsultarNotas",
    ruta:"/ConsultarNota",
    componente:Consultarnotas,
    IsEstudiante:true
}]
;
export default menu 