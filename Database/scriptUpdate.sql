UPDATE productos 
SET precio_base = 84900 
WHERE id = 1 AND categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas');

UPDATE variantes_producto 
SET stock = stock + 10 
WHERE producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas')) AND talla = 'S';

UPDATE productos 
SET precio_oferta = precio_base * 0.85 
WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas');

UPDATE variantes_producto 
SET activo = FALSE 
WHERE producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas')) AND stock = 0;

UPDATE productos 
SET descripcion = 'Pijama de algodón orgánico con nuevo diseño' 
WHERE id = 1;