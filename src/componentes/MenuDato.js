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
import ModificaContrasena from "../paginas/ModificaContrasena"
import EditarPerfil from "../paginas/EditarPerfil"

const menu =[{
    titulo: "Principal",
    ruta: "/",
    exact:true,
    componente:Principal
},
{
    titulo:"Carrera",
    ruta: "/Carrera",
    componente:Carrera
},
{
    titulo:"Asignatura",
    ruta:"/Asignatura",
    componente:Asignatura
},
{
    titulo:"Usuario",
    ruta:"/Usuario",
    componente:Usuario
},
{
    titulo:"Docente",
    ruta:"/Docente",
    componente:Docente
},
{
    titulo:"Estudiante",
    ruta:"/Estudiante",
    componente:Estudiante
},
{
    titulo:"Ubicacion",
    ruta:"/Ubicacion",
    componente:Ubicacion
},{
    titulo:"EvaluacionTipo",
    ruta:"/Evaluaciontipo",
    componente:Evaluaciontipo
},{
    titulo:"Curso",
    ruta:"/Curso",
    componente:Curso
},{
    titulo:"Administrador",
    ruta:"/Administrador",
    componente:Administrador
},{
    titulo:"AsinancionCarrera",
    ruta:"/AsinancionCarrera",
    componente:AsinancionCarrera
},{
    titulo:"Franjas",
    ruta:"/Franja",
    componente:Franjas
},{

    titulo:"RegistroAsistencia",
    ruta:"/RegistroAsistencia",
    componente:RegistroAsistencia
},{
    titulo:"RegistroNotas",
    ruta:"/RegistroNotas",
    componente:RegistroNotas
},{
    titulo:"Registro Plan de evaluacion",
    ruta:"/RegistroPlandeEvaluacion",
    componente:RegistroPlanEvaluacion
},{
    titulo:"AnuncioProfesor",
    ruta:"/AnuncioProfesor",
    componente:AnuncioProfesor
},{
    titulo:"RegistroCortesAcademicos",
    ruta:"/RegistroCortesAcademicos",
    componente:RegistroCortesAcademicos
},{
    titulo:"RegistroPeriodo",
    ruta:"/RegistroPeriodo",
    componente:RegisstroPeriodo
},{
    titulo:"CortesAsignatura",
    ruta:"/CortesAsignatura",
    componente:CortesAsignatura
},{
    titulo:"RegistroAsignatura",
    ruta:"/RegistroAsignatura",
    componente:RegistroAsignatura
},{
    titulo:"ConsultarHorario",
    ruta:"/ConsultaHorario",
    componente:ConsultarHorario
},{
    titulo:"ConsultarNotas",
    ruta:"/ConsultarNota",
    componente:Consultarnotas
},{
    titulo:"ModificarContraseña",
    ruta:"/ModificarContraseña",
    componente:ModificaContrasena
},{
    titulo:"EditarPerfil",
    ruta:"/EditarPerfil",
    componente:EditarPerfil
}]
;
export default menu 