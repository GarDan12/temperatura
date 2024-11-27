import { Router } from 'express';
import {
  getTemperaturasExtremos,
  getTemperaturaExtremaPorId,
  postTemperaturasExtremos,
  putTemperaturasExtremos,
  patchTemperaturasExtremos,
  deleteTemperaturasExtremos,
  getTemperaturaExtremaMaxima,  // Ruta para obtener la temperatura extrema máxima
  getTemperaturaExtremaMinima   // Ruta para obtener la temperatura extrema mínima
} from '../controllers/temperaturasExtremos.controller.js';

const router = Router();

// Ruta para obtener todas las temperaturas extremas
router.get('/', getTemperaturasExtremos);

// Ruta para obtener una temperatura extrema por ID
router.get('/:id', getTemperaturaExtremaPorId);

// Ruta para crear una nueva temperatura extrema
router.post('/', postTemperaturasExtremos);

// Ruta para actualizar una temperatura extrema por ID
router.put('/:id', putTemperaturasExtremos);

// Ruta para actualizar parcialmente una temperatura extrema por ID
router.patch('/:id', patchTemperaturasExtremos);

// Ruta para eliminar una temperatura extrema por ID
router.delete('/:id', deleteTemperaturasExtremos);

// Ruta para obtener el valor máximo de temperatura extrema
router.get('/maxima', getTemperaturaExtremaMaxima);

// Ruta para obtener el valor mínimo de temperatura extrema
router.get('/minima', getTemperaturaExtremaMinima);

export default router;