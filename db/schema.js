const {gql} =  require('apollo-server');

const typeDefs = gql`
     type ProductoApp {
       id: ID
       precio: Float
       cantidad: Int
       descripcion: String
       imagen: String 
       catalogo: Categoria
   }
  
   input ProductoInputApp {
       Descripcion: String
       Precio: Float

       Categoria: String
       
       Existencia: Boolean
       Nombre: String
             
   }
   enum Categoria {
       Frutas
       Verduras
   }
  
    type Query {

         #Producto
         obtenerProductosApp(catalogo: String!) : [ProductoApp] 

         #Carrito
         listarCarrito: [ProductoApp]


       
    }
    type Mutation {
        #Productos
        addCarrito(id: ID!) : String
       
    }
`;

module.exports = typeDefs;




