import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.routes.js';
import temperaturasRoutes from './routes/temperaturas.routes.js';
import temperaturasExtremasRoutes from './routes/temperaturasExtremos.routes.js'; // Importar las nuevas rutas

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: '*', // Permitir cualquier origen, puedes restringirlo si es necesario
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions)); // Usar CORS con las opciones configuradas
app.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear formularios (si usas formularios URL encoded)

// Rutas
app.use('/api/usuarios', usuariosRoutes); // Ruta para usuarios
app.use('/api/temperaturas', temperaturasRoutes); // Ruta para temperaturas
app.use('/api/temperaturasExtremos', temperaturasExtremasRoutes); // Ruta para temperaturas extremas

// Manejo de errores 404 (cuando no se encuentra la ruta)
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

export default app;