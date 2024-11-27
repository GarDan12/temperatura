import { conmysql } from '../db.js'

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT `id`, `nombre`, `correo`, `password`, `fecha_registro`, `temperatura_ideal` FROM usuarios')
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Obtener un usuario por ID
export const getUsuarioxid = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT `id`, `nombre`, `correo`, `password`, `fecha_registro`, `temperatura_ideal` FROM usuarios WHERE id = ?', [req.params.id])
    
    if (result.length <= 0) {
      return res.status(404).json({
        id: 0,
        message: 'Usuario no encontrado'
      })
    }
    res.json(result[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Crear un nuevo usuario
export const postUsuarios = async (req, res) => {
  try {
    const { nombre, correo, password, fecha_registro, temperatura_ideal } = req.body
    
    // Validar que no se repita el correo
    const [existingUser] = await conmysql.query('SELECT * FROM usuarios WHERE correo = ?', [correo])
    
    if (existingUser.length > 0) {
      return res.status(404).json({
        id: 0,
        message: 'El correo ' + correo + ' ya está registrado'
      })
    }

    const [rows] = await conmysql.query(
      'INSERT INTO usuarios (nombre, correo, password, fecha_registro, temperatura_ideal) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, password, fecha_registro, temperatura_ideal]
    )
    res.send({
      id: rows.insertId,
      message: 'Usuario registrado con éxito :)'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Actualizar un usuario
export const putUsuarios = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, correo, password, fecha_registro, temperatura_ideal } = req.body
    
    const [result] = await conmysql.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, password = ?, fecha_registro = ?, temperatura_ideal = ? WHERE id = ?',
      [nombre, correo, password, fecha_registro, temperatura_ideal, id]
    )
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      })
    }
    
    const [rows] = await conmysql.query('SELECT `id`, `nombre`, `correo`, `password`, `fecha_registro`, `temperatura_ideal` FROM usuarios WHERE id = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Actualizar parcialmente un usuario
export const patchUsuarios = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, correo, password, fecha_registro, temperatura_ideal } = req.body
    
    const [result] = await conmysql.query(
      'UPDATE usuarios SET nombre = IFNULL(?, nombre), correo = IFNULL(?, correo), password = IFNULL(?, password), fecha_registro = IFNULL(?, fecha_registro), temperatura_ideal = IFNULL(?, temperatura_ideal) WHERE id = ?',
      [nombre, correo, password, fecha_registro, temperatura_ideal, id]
    )
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      })
    }
    
    const [rows] = await conmysql.query('SELECT `id`, `nombre`, `correo`, `password`, `fecha_registro`, `temperatura_ideal` FROM usuarios WHERE id = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

// Eliminar un usuario
export const deleteUsuarios = async (req, res) => {
  try {
    const [result] = await conmysql.query('DELETE FROM usuarios WHERE id = ?', [req.params.id])
    
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'No pudo eliminar el usuario'
      })
    }
    
    res.json({
      id: 1,
      message: 'Usuario eliminado con éxito :)'
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}