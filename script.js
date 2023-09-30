/*
 * Optativa JavaScript
 * Evaluación 1
 * Yankiel Yong Martínez
 */

/*
 * Implementa una clase "ProveedorSuministros" con propiedades como "nombre",
 * "productos suministrados" y "ubicación". A continuación, crea funciones que permitan
 * agregar, editar y eliminar proveedores de suministros en un registro. Además, crea
 * una función que muestre los proveedores que suministran un producto específico.
 */

class ProveedorSuministros {
    constructor(nombre = "Proveedor", productos = [], ubicacion = "CUJAE") {
        let _nombre = nombre;
        let _productos = productos;
        let _ubicacion = ubicacion;

        this.getNombre = () => _nombre;
        this.getProductos = () => _productos;
        this.getUbicacion = () => _ubicacion;

        this.setNombre = function (nombreNuevo) {
            _nombre = nombreNuevo;
        };

        this.setUbicacion = function (ubicacionNueva) {
            _ubicacion = ubicacionNueva;
        };

        /*
         * Si ya este proveedor tiene ese producto, no se agregará
         */
        this.agregarProducto = function (productoNuevo) {
            if (_productos.indexOf(productoNuevo) == -1)
                _productos.push(productoNuevo);
        };

        this.eliminarProducto = function (productoEliminar) {
            let indice = _productos.indexOf(productoEliminar);
            if (indice != -1) _productos.splice(indice, 1);
        };
    }
}

class Mercado {
    constructor() {
        let _proveedores = [];

        this.getProveedores = () => _proveedores;

        /*
         * Agregué una validación para que no se pueda repetir el nombre de los proveedores,
         * y poder identificarlos por este atributo, sobre todo a la hora de eliminarlo
         */
        this.agregarProveedor = function (nombre, productos, ubicacion) {
            let yaExiste = false;
            for (let i = 0; i < _proveedores.length && !yaExiste; i++) {
                if (_proveedores[i].getNombre == nombre) yaExiste = true;
            }
            if (!yaExiste)
                _proveedores.push(
                    new ProveedorSuministros(nombre, productos, ubicacion)
                );
        };

        /*
         * Para editar los datos de un proveedor se hace mediante las funcionas de la clase
         * ProveedorSuministros (los setters y las funciones de agregar y eliminar productos)
         */

        this.eliminarProveedor = function (nombreProveedor) {
            let indice = -1;
            let encontrado = false;
            for (let i = 0; i < _proveedores.length && !encontrado; i++) {
                if (_proveedores[i].getNombre() == nombreProveedor) {
                    encontrado = true;
                    indice = i;
                }
            }
            if (indice > -1) _proveedores.splice(indice, 1);
        };

        /*
         *Funcion que muestra los proveedores que suministran un producto especifico
         */
        this.proveedoresQueSuministranProducto = function (producto) {
            let proveedores = "";
            for (let i = 0; i < _proveedores.length; i++) {
                if (_proveedores[i].getProductos().indexOf(producto) != -1)
                    proveedores += "\n" + _proveedores[i].getNombre();
            }
            console.log(
                `Los proveedores que suministran ${producto} son: ${proveedores}`
            );
        };
    }
}

/*
 *Codigo para probar algunas funcionalidades
 */
const mercado = new Mercado();
mercado.agregarProveedor("Jose", ["Arroz", "Frijoles"], "Cerro");
mercado.agregarProveedor(
    "Juan",
    ["Jamonada", "Queso", "Tomate"],
    "10 de Octubre"
);
mercado.agregarProveedor("Ana", ["Jamonada", "Arroz"], "Vedado");
mercado.agregarProveedor("Pepe", ["Queso"], "Vedado");

mercado.proveedoresQueSuministranProducto("Queso");

mercado.getProveedores()[2].agregarProducto("Queso");
mercado.proveedoresQueSuministranProducto("Queso");

mercado.eliminarProveedor("Pepe");
mercado.proveedoresQueSuministranProducto("Queso");