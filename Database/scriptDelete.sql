DELETE FROM detalle_carrito 
WHERE variante_id IN (SELECT vp.id FROM variantes_producto vp JOIN productos p ON vp.producto_id = p.id WHERE p.categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas') AND vp.stock = 0);

DELETE FROM lista_deseos 
WHERE producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas') AND activo = FALSE);

DELETE FROM resenas_producto 
WHERE calificacion < 2 AND producto_id IN (SELECT id FROM categorias c JOIN productos p ON c.id = p.categoria_id WHERE c.nombre = 'Pijamas');

DELETE FROM variantes_producto 
WHERE stock = 0 AND producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas'));

DELETE FROM imagenes_producto 
WHERE producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas') AND activo = FALSE);