import { conmysql } from '../db.js'

// Obtener todas las temperaturas extremas
export const getTemperaturasExtremos = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_max`, `temperatura_min`, `fecha_registro` FROM temperaturas_extremos')
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Obtener una temperatura extrema por ID
export const getTemperaturaExtremaPorId = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_max`, `temperatura_min`, `fecha_registro` FROM temperaturas_extremos WHERE id = ?', [req.params.id])
    
    if (result.length <= 0) {
      return res.status(404).json({
        id: 0,
        message: 'Temperatura extrema no encontrada'
      })
    }
    res.json(result[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Crear una nueva temperatura extrema
export const postTemperaturasExtremos = async (req, res) => {
  try {
    const { usuario_id, temperatura_max, temperatura_min, fecha_registro } = req.body
    
    // Validar que el usuario exista
    const [userExists] = await conmysql.query('SELECT * FROM usuarios WHERE id = ?', [usuario_id])
    
    if (userExists.length === 0) {
      return res.status(404).json({
        id: 0,
        message: 'Usuario no encontrado'
      })
    }

    const [rows] = await conmysql.query(
      'INSERT INTO temperaturas_extremos (usuario_id, temperatura_max, temperatura_min, fecha_registro) VALUES (?, ?, ?, ?)',
      [usuario_id, temperatura_max, temperatura_min, fecha_registro]
    )
    
    res.send({
      id: rows.insertId,
      message: 'Temperatura extrema registrada con éxito :)'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Actualizar una temperatura extrema
export const putTemperaturasExtremos = async (req, res) => {
  try {
    const { id } = req.params
    const { usuario_id, temperatura_max, temperatura_min, fecha_registro } = req.body
    
    const [result] = await conmysql.query(
      'UPDATE temperaturas_extremos SET usuario_id = ?, temperatura_max = ?, temperatura_min = ?, fecha_registro = ? WHERE id = ?',
      [usuario_id, temperatura_max, temperatura_min, fecha_registro, id]
    )
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'Temperatura extrema no encontrada'
      })
    }
    
    const [rows] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_max`, `temperatura_min`, `fecha_registro` FROM temperaturas_extremos WHERE id = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Actualizar parcialmente una temperatura extrema
export const patchTemperaturasExtremos = async (req, res) => {
  try {
    const { id } = req.params
    const { usuario_id, temperatura_max, temperatura_min, fecha_registro } = req.body
    
    const [result] = await conmysql.query(
      'UPDATE temperaturas_extremos SET usuario_id = IFNULL(?, usuario_id), temperatura_max = IFNULL(?, temperatura_max), temperatura_min = IFNULL(?, temperatura_min), fecha_registro = IFNULL(?, fecha_registro) WHERE id = ?',
      [usuario_id, temperatura_max, temperatura_min, fecha_registro, id]
    )
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'Temperatura extrema no encontrada'
      })
    }
    
    const [rows] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_max`, `temperatura_min`, `fecha_registro` FROM temperaturas_extremos WHERE id = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Eliminar una temperatura extrema
export const deleteTemperaturasExtremos = async (req, res) => {
  try {
    const [result] = await conmysql.query('DELETE FROM temperaturas_extremos WHERE id = ?', [req.params.id])
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'No pudo eliminar la temperatura extrema'
      })
    }
    
    res.json({
      id: 1,
      message: 'Temperatura extrema eliminada con éxito :)'
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Obtener el valor máximo de temperatura extrema
export const getTemperaturaExtremaMaxima = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT MAX(temperatura_max) AS temperatura_maxima FROM temperaturas_extremos')
    
    if (result.length <= 0 || result[0].temperatura_maxima === null) {
      return res.status(404).json({
        message: 'No hay temperaturas extremas registradas'
      })
    }

    res.json({
      temperatura_maxima: result[0].temperatura_maxima
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Obtener el valor mínimo de temperatura extrema
export const getTemperaturaExtremaMinima = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT MIN(temperatura_min) AS temperatura_minima FROM temperaturas_extremos')
    
    if (result.length <= 0 || result[0].temperatura_minima === null) {
      return res.status(404).json({
        message: 'No hay temperaturas extremas registradas'
      })
    }

    res.json({
      temperatura_minima: result[0].temperatura_minima
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}