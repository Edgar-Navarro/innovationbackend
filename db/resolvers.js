const shortid = require('shortid');
const path = require("path");
const sql = require('../config/db');
require('dotenv').config({path: 'variables.env'});


//resolver
const resolvers = {
    Query:{
        obtenerProductosApp: async (_, {catalogo}, ctx) =>{
            try {
                const QueryProductos = (query) => {
                    return new Promise((resolve, reject) => {
                        sql.query('SELECT id,precio,cantidad,descripcion,imagen,catalogo FROM productos WHERE catalogo =  ?',[catalogo], (error, results, fields) => {
                            if(error) return reject(error);
                            return resolve(results);
                        });
                    });
                }
    
                const productos = await QueryProductos();
                return productos;
            } catch (error) {
                console.log(error);
            }

        },
        listarCarrito: async () =>{
            try {
                const QueryCarrito = (query) => {
                    return new Promise((resolve, reject) => {
                        sql.query('SELECT * FROM carrito WHERE id =  ?',[1], (error, results, fields) => {
                            if(error) return reject(error);
                            return resolve(results);
                        });
                    });
                }
    
                const carrito = await QueryCarrito();
                console.log(JSON.parse(carrito[0].carrito));
                let arreglo = JSON.parse(carrito[0].carrito);
                let array = arreglo.map(i=>Number(i));
                console.log(array.toString());

                const QueryProductos = (query) => {
                    return new Promise((resolve, reject) => {
                        sql.query('SELECT * FROM productos WHERE id IN ('+array.toString()+')', (error, results, fields) => {
                            if(error) return reject(error);
                            return resolve(results);
                        });
                    });
                }
    
                const producto = await QueryProductos();
                console.log(producto);
                return producto;
            } catch (error) {
                console.log(error);
            }

        }
    },
    Mutation:{
        addCarrito: async (_,{id}, ctx) => {           
         console.log(id);
           try {
            const QueryProducto = (query) => {
                return new Promise((resolve, reject) => {
                    sql.query('SELECT * FROM productos WHERE id = ?', [id], (error, results, fields) => {
                        if (error) return reject(error);
                        return resolve(results);
                    });
                });
            }
            const producto = await QueryProducto();
            console.log(producto)
            if (producto == "") {
                throw new Error('Producto no encontrado');
            }

            if(producto[0].cantidad = 0){
                throw new Error('No hay stock disponible');
            }

            const QueryCarrito = (query) => {
                return new Promise((resolve, reject) => {
                    sql.query('SELECT * FROM carrito WHERE id = ?', [1], (error, results, fields) => {
                        if (error) return reject(error);
                        return resolve(results);
                    });
                });
            }
            const carrito = await QueryCarrito();
            console.log(carrito)
            let arr = JSON.parse(carrito[0].carrito);
            console.log('carrito',arr)
            const buscar = arr.find(element => element == id);
            console.log(buscar)
            if(buscar){
                throw new Error('El producto ya está en el carrito');
            }

            arr.push(id);
            const ActualizarCarrito = (query) => {
                return new Promise((resolve, reject) => {
                    sql.query('UPDATE carrito SET carrito = ? WHERE id = ?',
                        [JSON.stringify(arr), 1],
                        (error, results, fields) => {
                            if (error) return reject(error);
                            return resolve(results);
                        });
                });
            }
            await ActualizarCarrito();
            
         return "Se agregó al carrito"
 
 
        } catch (error) {
            console.log(error);
            return error;
        }
 

 
         },
    }
}

module.exports = resolvers;

