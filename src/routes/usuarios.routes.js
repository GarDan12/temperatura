import { Router } from 'express';
import {
  getUsuarios,
  getUsuarioxid,
  postUsuarios,
  putUsuarios,
  patchUsuarios,
  deleteUsuarios
} from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', getUsuarioxid);

// Ruta para crear un nuevo usuario
router.post('/', postUsuarios);

// Ruta para actualizar un usuario por ID
router.put('/:id', putUsuarios);

// Ruta para actualizar parcialmente un usuario por ID
router.patch('/:id', patchUsuarios);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUsuarios);

export default router;