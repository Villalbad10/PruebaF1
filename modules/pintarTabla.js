export const pintarTabla = (data, cont) => {
   cont.innerHTML = ''
   data.forEach(element => {
      cont.innerHTML += `
         <tr>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td><button id="${data.indexOf(element)}" name="${element[0]}" class="editar btn btn-warning" data-bs-toggle="modal" data-bs-target="#update">Editar</button></td>
            <td><button id="${data.indexOf(element)}"  class="btn btn-outline-danger eliminar">Eliminar</button></td>
         </tr>
            `
   });
}