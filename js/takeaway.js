const precios = {
    muzzarella: 8,
    fugazzeta: 10,
    hawaina: 9
  };

// Aquí tienes el código para actualizar la imagen, descripción y precio al seleccionar una pizza.
document.getElementById('pizza').addEventListener('change', function() {
  const selectedOption = this.options[this.selectedIndex];
  const imagePath = selectedOption.getAttribute('data-img');
  const description = selectedOption.getAttribute('data-desc');
  const pizzaValue = selectedOption.value; // Obtiene el valor de la opción seleccionada

  // Actualiza la imagen y la descripción
  document.getElementById('pizzaImage').src = imagePath;
  document.getElementById('pizzaDesc').textContent = description;

  // Actualiza el precio según la pizza seleccionada
  const precio = precios[pizzaValue]; // Obtiene el precio usando el valor de la pizza seleccionada
  document.getElementById('pizzaPrice').textContent = `Precio: $${precio}`; // Actualiza el precio en el HTML
});

// Aquí agregas el código para gestionar la lista de pedidos y el precio total.
const listaPedido = document.getElementById('listaPedido');
const precioTotal = document.getElementById('precioTotal');



// Función para agregar un producto al pedido
function agregarProducto(pizza, cantidad) {
  const precioPizza = precios[pizza] * cantidad;

  // Crear el elemento de la lista para el pedido
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  listItem.innerHTML = `
    <div class="d-flex justify-content-between w-100">
      <span>${cantidad}x ${pizza.charAt(0).toUpperCase() + pizza.slice(1)}</span>
      <div class="d-flex align-items-center">
        <span class="badge bg-primary ms-2">$${precioPizza}</span>
        <button class="btn btn-danger btn-sm ms-3 eliminar-btn">Eliminar</button>
      </div>
    </div>
  `;
  // Agregar el producto a la lista de pedidos
  listaPedido.appendChild(listItem);

  // Agregar funcionalidad al botón de eliminar
  listItem.querySelector('.eliminar-btn').addEventListener('click', function() {
    eliminarProducto(listItem, precioPizza);
  });

  // Actualizar el precio total
  actualizarPrecioTotal();
}

// Función para eliminar un producto del pedido
function eliminarProducto(listItem, precioPizza) {
  listaPedido.removeChild(listItem); // Eliminar el producto de la lista
  actualizarPrecioTotal(-precioPizza); // Restar el precio al total
}

// Función para actualizar el precio total
function actualizarPrecioTotal(precio = 0) {
  let total = 0;
  const productos = listaPedido.querySelectorAll('.list-group-item');
  productos.forEach(item => {
    const precioItem = parseFloat(item.querySelector('.badge').textContent.replace('$', ''));
    total += precioItem;
  });
  precioTotal.textContent = `Total: $${total}`;
}

// Ejemplo de cómo agregar productos a la lista (se llamará cuando el usuario elija algo)
document.getElementById('agregarPizza').addEventListener('click', function() {
  const pizza = document.getElementById('pizza').value; // Pizza seleccionada
  const cantidad = parseInt(document.getElementById('cantidad').value) || 1; // Cantidad seleccionada
  agregarProducto(pizza, cantidad); // Agregar producto a la lista
});