import { Router } from 'express';
import {
  getTemperaturas,
  getTemperaturaPorId,
  postTemperaturas,
  putTemperaturas,
  patchTemperaturas,
  deleteTemperaturas
} from '../controllers/temperaturas.controller.js';

const router = Router();

// Ruta para obtener todas las temperaturas
router.get('/', getTemperaturas);

// Ruta para obtener una temperatura por ID
router.get('/:id', getTemperaturaPorId);

// Ruta para crear una nueva temperatura
router.post('/', postTemperaturas);

// Ruta para actualizar una temperatura por ID
router.put('/:id', putTemperaturas);

// Ruta para actualizar parcialmente una temperatura por ID
router.patch('/:id', patchTemperaturas);

// Ruta para eliminar una temperatura por ID
router.delete('/:id', deleteTemperaturas);

export default router;