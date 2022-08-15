import { ordenaId } from "../modules/ordenaId.js";
import { ordenaNombre } from "../modules/ordenaNombre.js";
import { pintarTabla } from "../modules/pintarTabla.js";

let array = []
const tab = document.querySelector('.tablares');
const opciones = document.querySelector('#opciones');

document.querySelector('.upload').addEventListener('change', ({ target }) => {
   const archivo = target.files[0];
   if (!archivo) {
      return;
   }
   const lector = new FileReader();
   lector.onload = ({ target }) => {
      //console.log(target.result); 
      datosArray(target.result);
      opciones.removeAttribute('id');
      toastr.success('Datos cargados con exito');
   }
   lector.readAsText(archivo);
});


const datosArray = (data) => {
   const todasFilas = data.split(/\r?\n|\r/);
   //console.log(todasFilas);
   for (let fila = 0; fila < todasFilas.length; fila++) {
      const celdasFila = todasFilas[fila].split(";");
      //console.log(celdasFila);
      array.push(celdasFila);
   }
   //console.log(array);
   pintarTabla(array, tab);
}

document.querySelector('.agregar').addEventListener('click', () => {
   let id = Number(document.querySelector('.addId').value);
   let nombre = document.querySelector('.addNombre').value;
   let descripcion = document.querySelector('.addDescripcion').value;

   if (!nombre || !id || !descripcion) {
      Swal.fire({
         icon: 'error',
         title: 'Complete todos los campos',
      })
   } else {
      array.push([id, nombre, descripcion]);
      pintarTabla(array, tab)
      limpiar();
      toastr.success('Dato agregado con exito');
   }

})

const limpiar = () => {
   document.querySelector('.addId').value = "";
   document.querySelector('.addNombre').value = "";
   document.querySelector('.addDescripcion').value = "";
}

//  const limpiarEdit = () => {
// //    document.querySelector('.upId').value = "";
// //    document.querySelector('.upNombre').value = "";
// //    document.querySelector('.upDescripcion').value = "";
//  }


document.addEventListener('click', ({ target }) => {
   if (target.classList.contains('eliminar')) {
      array.splice(target.id, 1);
      pintarTabla(array, tab);
      toastr.error('Dato eliminado con exito');

      // const dat = array.filter(res => res[0] != target.id)
      // array = dat;
      // pintarTabla(dat, tab);\
   }
})

// document.addEventListener('click', ({ target }) => {

//    if (target.classList.contains('editar')) {
//       const id = document.querySelector('.upId').value;
//       const nombre = document.querySelector('.upNombre').value;
//       const descripcion = document.querySelector('.upDescripcion').value;
//       array.splice(target.id, 1, [id, nombre, descripcion]);
//       pintarTabla(array, tab);
//    }
// })



// document.addEventListener('click', ({ target }) => {
//    //const elemento = array.find(res => res[0] == target.name);
//    if (target.classList.contains('editar')) {
//       console.log(target.id);
//       document.querySelector('.saveEditar').addEventListener('click', (e) => {
//          e.preventDefault()
//          const id = Number(document.querySelector('.upId').value);
//          const nombre = document.querySelector('.upNombre').value;
//          const descripcion = document.querySelector('.upDescripcion').value;
//          console.log(target.id);
//          array.splice(Number(target.id), 1, [id, nombre, descripcion]);
//          pintarTabla(array, tab);
//       })
//    }


//    //limpiarEdit()

// })
document.querySelector('.orden').addEventListener('change', ({ target }) => {
   target.value === "nombre" ? (
      array.sort(ordenaNombre),
      pintarTabla(array, tab),
      toastr.info('Se ordenó por nombre')
   ) : ('');
   target.value === "id" ? (
      array.sort(ordenaId),
      pintarTabla(array, tab),
      toastr.info('Se ordenó por id')
   ) : ('');

})

document.querySelector('.descargar').addEventListener('click', () => {

   const csvDoc = "data:text/csv;charset=utf-8,"
      + array.map(res => res.join(";")).join("\n");

   const doc = encodeURI(csvDoc);
   window.open(doc);

});


window.addEventListener('beforeunload', (e) => e.preventDefault());