import { conmysql } from '../db.js'

// Obtener todas las temperaturas
export const getTemperaturas = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_actual`, `humedad_actual`, `fecha_registro` FROM temperaturas')
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Obtener una temperatura por ID
export const getTemperaturaPorId = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_actual`, `humedad_actual`, `fecha_registro` FROM temperaturas WHERE id = ?', [req.params.id])
    
    if (result.length <= 0) {
      return res.status(404).json({
        id: 0,
        message: 'Temperatura no encontrada'
      })
    }
    res.json(result[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Crear una nueva entrada de temperatura
export const postTemperaturas = async (req, res) => {
  try {
    const { usuario_id, temperatura_actual, humedad_actual, fecha_registro } = req.body
    
    const [rows] = await conmysql.query(
      'INSERT INTO temperaturas (usuario_id, temperatura_actual, humedad_actual, fecha_registro) VALUES (?, ?, ?, ?)',
      [usuario_id, temperatura_actual, humedad_actual, fecha_registro]
    )
    res.send({
      id: rows.insertId,
      message: 'Temperatura registrada con éxito :)'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Actualizar una entrada de temperatura
export const putTemperaturas = async (req, res) => {
  try {
    const { id } = req.params
    const { usuario_id, temperatura_actual, humedad_actual, fecha_registro } = req.body
    
    const [result] = await conmysql.query(
      'UPDATE temperaturas SET usuario_id = ?, temperatura_actual = ?, humedad_actual = ?, fecha_registro = ? WHERE id = ?',
      [usuario_id, temperatura_actual, humedad_actual, fecha_registro, id]
    )
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'Temperatura no encontrada'
      })
    }
    
    const [rows] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_actual`, `humedad_actual`, `fecha_registro` FROM temperaturas WHERE id = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Actualizar parcialmente una entrada de temperatura
export const patchTemperaturas = async (req, res) => {
  try {
    const { id } = req.params
    const { usuario_id, temperatura_actual, humedad_actual, fecha_registro } = req.body
    
    const [result] = await conmysql.query(
      'UPDATE temperaturas SET usuario_id = IFNULL(?, usuario_id), temperatura_actual = IFNULL(?, temperatura_actual), humedad_actual = IFNULL(?, humedad_actual), fecha_registro = IFNULL(?, fecha_registro) WHERE id = ?',
      [usuario_id, temperatura_actual, humedad_actual, fecha_registro, id]
    )
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'Temperatura no encontrada'
      })
    }
    
    const [rows] = await conmysql.query('SELECT `id`, `usuario_id`, `temperatura_actual`, `humedad_actual`, `fecha_registro` FROM temperaturas WHERE id = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Eliminar una entrada de temperatura
export const deleteTemperaturas = async (req, res) => {
  try {
    const [result] = await conmysql.query('DELETE FROM temperaturas WHERE id = ?', [req.params.id])
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'No pudo eliminar la temperatura'
      })
    }
    
    res.json({
      id: 1,
      message: 'Temperatura eliminada con éxito :)'
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}