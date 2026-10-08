SELECT nombre, precio_base, material 
FROM productos 
WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas');

SELECT sku, talla, color, stock 
FROM variantes_producto 
WHERE producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas')) 
  AND stock > 5;

SELECT calificacion, comentario 
FROM resenas_producto 
WHERE producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas'));

SELECT nombre, precio_oferta 
FROM productos 
WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas') 
  AND precio_base < 90000;

SELECT id, nombre, descripcion 
FROM categorias 
WHERE nombre = 'Pijamas';