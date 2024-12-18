const express = require('express');  // Importa Express para manejar el servidor
const { ApolloServer, gql } = require('apollo-server-express');  // Importa Apollo Server para manejar GraphQL
const mongoose = require('mongoose');  // Importa Mongoose para interactuar con MongoDB
const Tarea = require('./app/models/tarea'); // Importar el modelo Tarea
const Responsable = require('./app/models/responsable'); // Importar el modelo Responsable
const tareaRoutes = require('./app/routes/tareaRoutes');// Importar rutas de tareas paramanejar las solcitudes específicas de tareas

const app = express();
app.use(express.json()); // Middleware para manejar JSON en las solicitudes

// Conectar a MongoDB
mongoose.connect('mongodb+srv://vmartin:8Nl1KFgDme9lGSzh@cluster0.no371.mongodb.net/gestion_tareas?retryWrites=true&w=majority&appName=Cluster0', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Conectado a MongoDB...')) // Mensaje de éxito al conectarse
  .catch(err => console.error('No se pudo conectar a MongoDB...', err)); // Mensaje de error en caso de fallo

// Definir el esquema de GraphQL
const typeDefs = gql`
  type Tarea {
    id_tarea: String
    nombre_tarea: String
    descripcion_tarea: String
    fecha_tarea: String
    observaciones: String
    estado_tarea: String
    responsable: Responsable
  }

  type Responsable {
    id_responsable: String
    nombre_responsable: String
  }

  type Query {
    tareas: [Tarea]
    tarea(id_tarea: String!): Tarea
  }

  type Mutation {
    agregarTarea(
      id_tarea: String!, 
      nombre_tarea: String!, 
      descripcion_tarea: String!, 
      fecha_tarea: String!, 
      observaciones: String, 
      estado_tarea: String!
    ): Tarea
    actualizarTarea(
      id_tarea: String!, 
      nombre_tarea: String, 
      descripcion_tarea: String, 
      fecha_tarea: String, 
      observaciones: String, 
      estado_tarea: String
    ): Tarea
    eliminarTarea(id_tarea: String!): Tarea
  }
`;

// Definir los resolvers de GraphQL
const resolvers = {
  Query: {
    tareas: async () => {
      return await Tarea.find(); // Devuelve todas las tareas
    },
    tarea: async (_, { id_tarea }) => {
      return await Tarea.findOne({ id_tarea }); // Devuelve una tarea específica por su id
    }
  },
  Mutation: {
    agregarTarea: async (_, args) => {
      const tarea = new Tarea(args); // Crea una nueva tarea con los argumentos proporcionados
      await tarea.save(); // Guarda la tarea en la base de datos
      return tarea; // Devuelve la tarea agregada
    },
    actualizarTarea: async (_, { id_tarea, ...resto }) => {
      const tarea = await Tarea.findOneAndUpdate({ id_tarea }, resto, { new: true }); // Actualiza la tarea existente
      return tarea; // Devuelve la tarea actualizada
    },
    eliminarTarea: async (_, { id_tarea }) => {
      const tarea = await Tarea.findOneAndDelete({ id_tarea }); // Elimina la tarea por su id
      return tarea; // Devuelve la tarea eliminada
    }
  },
};

// Configurar Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers }); // Crea una nueva instancia de Apollo Server
  await server.start(); // Inicia el servidor Apollo
  server.applyMiddleware({ app }); // Aplica el middleware de Apollo a la aplicación Express
}

startServer(); // Llama a la función para iniciar el servidor Apollo

// Rutas de Express
app.use('/api/tareas', tareaRoutes);

// Configurar el puerto del servidor
const PORT = process.env.PORT || 4000; // Establece el puerto a usar, o 4000 por defecto
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/graphql`); // Mensaje que indica que el servidor está corriendo
});
