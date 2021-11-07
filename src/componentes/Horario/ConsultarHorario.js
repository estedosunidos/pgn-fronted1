const TableHeader=(props)=>{
    let  columnas
      columnas=  Object.keys(props.columnas[0]).map((columna,index)=>{
            return <th key={index}>{columna}</th>
        })
    return <thead><tr>{columnas}</tr></thead>
}

const TableBody=(props)=>{ 
    let filas
  filas=props.filas.map((fila,index)=>{
      return <tr key={index}>{Object.values(fila).map((columna,indexcolumna)=>{
        return <td key={indexcolumna}>{columna}</td>
      })}</tr>
  })
  return <tbody>{filas}</tbody>
}
function ConsultarHorario(props){
    const {data}=props
   if(data.length>0){
    return(
        <table>
            <TableHeader columnas={data}/>
            <TableBody filas={data}/>

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
export default ConsultarHorario