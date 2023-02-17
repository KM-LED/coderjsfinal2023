const armarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h1 class= "modal-header-title">Productos</h1>`;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>$ ${product.precio}</p>
    <button class="restar">-</button>
    <p>cant: ${product.cantidad}<p>
    <button class="sumar">+</button>
    <p>$ total: ${product.cantidad * product.precio}<p>
    <span class="delete-product"> 🗑 </span>
    
    `;
    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto eliminado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      saveLocal();
      armarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado",
        showConfirmButton: false,
        timer: 2000,
      });

      saveLocal();
      armarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const totalComprado = document.createElement("div");
  totalComprado.className = "total-content";
  totalComprado.innerHTML = `TOTAL A PAGAR $: ${total}`;
  modalContainer.append(totalComprado);

  const ComprarTodo = document.createElement("button");
  ComprarTodo.className = "comprarCarrito";
  ComprarTodo.innerHTML = `COMPRAR CARRITO`;
  modalContainer.append(ComprarTodo);
  ComprarTodo.addEventListener("click", () => {
    Swal.fire({
      title: "Desea comprar el carrito ?",
      showDenyButton: true,

      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Gracias por tu compra!!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Hasta la proxima", "", "success");
      }
    });
  });
};

verCarrito.addEventListener("click", armarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  contadorCarrito();
  saveLocal();
  armarCarrito();
};

const contadorCarrito = () => {
  cantidadCarrito.style.display = "block";

  const carritolength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritolength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

contadorCarrito();
