import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const TableHeaderCustom=(props)=>{
    let  columnas
      columnas=  Object.keys(props.columnas[0]).map((columna,index)=>{
            return <StyledTableCell key={index}>{columna}</StyledTableCell>
        })
    return  <TableHead><TableRow>{columnas}<StyledTableCell>Acciones</StyledTableCell></TableRow></TableHead>
}

const TableBodyCustom=(props)=>{ 
    let filas
  filas=props.filas.map((fila,index)=>{
      return <TableRow key={index}>{Object.values(fila).map((columna,indexcolumna)=>{
        return <StyledTableCell key={indexcolumna}>{columna}</StyledTableCell>
      })}<StyledTableCell><button onClick={()=>props.borrar(fila)}>Borrar</button><button onClick={()=>props.editar(fila)}>Editar</button></StyledTableCell></TableRow>
  })
  return <TableBody>{filas}</TableBody>
}
function TableCustom(props){
    const {data,borrar,mostrar}=props
   if(data.length>0){
    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">

            <TableHeaderCustom columnas={data}/>
            <TableBodyCustom filas={data} borrar={borrar} editar={mostrar}/>

        </Table>
        </TableContainer>
    )
   }else{
       return(
       <div>
           No se encontraron registros
       </div>
       )
   }  
}
export default TableCustom