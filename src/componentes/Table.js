const TableHeader=(props)=>{
    let  columnas
      columnas=  Object.keys(props.columnas[0]).map((columna,index)=>{
            return <th key={index}>{columna}</th>
        })
    return  <thead><tr>{columnas}<th>Acciones</th></tr></thead>
}

const TableBody=(props)=>{ 
    let filas
  filas=props.filas.map((fila,index)=>{
      return <tr key={index}>{Object.values(fila).map((columna,indexcolumna)=>{
        return <td key={indexcolumna}>{columna}</td>
      })}<td><button onClick={()=>props.borrar(fila)}>Borrar</button><button onClick={()=>props.editar(fila)}>Editar</button></td></tr>
  })
  return <tbody>{filas}</tbody>
}
function Table(props){
    const {data,borrar,mostrar}=props
   if(data.length>0){
    return(
        <table>
            <TableHeader columnas={data}/>
            <TableBody filas={data} borrar={borrar} editar={mostrar}/>

        </table>
    )
   }else{
       return(
       <div>
           No se encontraron registros
       </div>
       )
   }  
}
export default Table