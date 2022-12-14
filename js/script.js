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
   const id = Number(document.querySelector('.addId').value);
   const nombre = document.querySelector('.addNombre').value;
   const descripcion = document.querySelector('.addDescripcion').value;

   if (!nombre || !id || !descripcion) {
      Swal.fire({
         icon: 'error',
         title: 'Complete todos los campos',
      })
   } else {
      array.push([id, nombre, descripcion]);
      pintarTabla(array, tab)
      limpiar();
      toastr.success('Registro agregado con exito');
   }

})

const limpiar = () => {
   document.querySelector('.addId').value = "";
   document.querySelector('.addNombre').value = "";
   document.querySelector('.addDescripcion').value = "";
}

const limpiarEdit = () => {
   document.querySelector('.upId').value = "";
   document.querySelector('.upNombre').value = "";
   document.querySelector('.upDescripcion').value = "";
}


document.addEventListener('click', ({ target }) => {
   if (target.classList.contains('eliminar')) {
      array.splice(target.id, 1);
      pintarTabla(array, tab);
      toastr.error('Registro eliminado con exito');

      // const dat = array.filter(res => res[0] != target.id)
      // array = dat;
      // pintarTabla(dat, tab);\
   }
})

document.addEventListener('click', ({ target }) => {
   if (target.classList.contains('editar')) sessionStorage.setItem('index', target.id);
})

document.querySelector('.saveEditar').addEventListener('click', () => {
   const index = sessionStorage.getItem('index');
   const id = Number(document.querySelector('.upId').value);
   const nombre = document.querySelector('.upNombre').value;
   const descripcion = document.querySelector('.upDescripcion').value;

   array.splice(index, 1, [id, nombre, descripcion]);
   //console.log(array[index]);
   pintarTabla(array, tab);
   toastr.info('Se edit?? el registro')
   limpiarEdit();

})


document.querySelector('.orden').addEventListener('change', ({ target }) => {
   target.value === "nombre" ? (
      array.sort(ordenaNombre),
      pintarTabla(array, tab),
      toastr.info('Se orden?? por nombre')
   ) : ('');
   target.value === "id" ? (
      array.sort(ordenaId),
      //console.log(array),
      pintarTabla(array, tab),
      toastr.info('Se orden?? por id')
   ) : ('');

})

document.querySelector('.descargar').addEventListener('click', () => {

   const csvDoc = "data:text/csv;charset=utf-8,"
      + array.map(res => res.join(";")).join("\n");

   const doc = encodeURI(csvDoc);
   window.open(doc);

});


window.addEventListener('beforeunload', (e) => e.preventDefault());