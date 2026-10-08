SELECT nombre, precio_base 
FROM productos 
WHERE categoria_id IN (SELECT id FROM categorias WHERE nombre = 'Pijamas') 
  AND precio_base < (SELECT AVG(precio_base) FROM productos JOIN categorias ON productos.categoria_id = categorias.id WHERE categorias.nombre = 'Pijamas');

SELECT p.nombre, p.precio_base 
FROM productos p 
WHERE p.categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas') 
  AND p.id NOT IN (SELECT producto_id FROM resenas_producto);

SELECT vp.sku, vp.talla, vp.color, vp.stock 
FROM variantes_producto vp 
WHERE vp.producto_id IN (SELECT id FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas')) 
  AND vp.stock = (SELECT MAX(vp2.stock) FROM variantes_producto vp2 JOIN productos p2 ON vp2.producto_id = p2.id WHERE p2.categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas'));

SELECT u.nombre, u.email 
FROM usuarios u 
WHERE u.id IN (SELECT o.usuario_id FROM ordenes_compra o JOIN detalle_orden do ON o.id = do.orden_id JOIN variantes_producto vp ON do.variante_id = vp.id JOIN productos p ON vp.producto_id = p.id WHERE p.categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas'));

SELECT p.nombre, p.precio_base 
FROM productos p 
WHERE p.categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas') 
  AND p.precio_base = (SELECT MAX(precio_base) FROM productos WHERE categoria_id = (SELECT id FROM categorias WHERE nombre = 'Pijamas'));