SELECT p.nombre, p.precio_base, c.nombre AS categoria 
FROM productos p 
JOIN categorias c ON p.categoria_id = c.id 
WHERE c.nombre = 'Pijamas';

SELECT vp.sku, p.nombre, vp.talla, vp.color, vp.stock 
FROM variantes_producto vp 
JOIN productos p ON vp.producto_id = p.id 
JOIN categorias c ON p.categoria_id = c.id 
WHERE c.nombre = 'Pijamas' AND vp.stock > 0;

SELECT u.nombre AS usuario, p.nombre AS producto, rp.calificacion 
FROM resenas_producto rp 
JOIN usuarios u ON rp.usuario_id = u.id 
JOIN productos p ON rp.producto_id = p.id 
JOIN categorias c ON p.categoria_id = c.id 
WHERE c.nombre = 'Pijamas';

SELECT o.id AS orden, p.nombre AS producto, do.cantidad 
FROM ordenes_compra o 
JOIN detalle_orden do ON o.id = do.orden_id 
JOIN variantes_producto vp ON do.variante_id = vp.id 
JOIN productos p ON vp.producto_id = p.id 
JOIN categorias c ON p.categoria_id = c.id 
WHERE c.nombre = 'Pijamas';

SELECT cc.id AS carrito, p.nombre AS producto, dc.cantidad 
FROM carritos_compra cc 
JOIN detalle_carrito dc ON cc.id = dc.carrito_id 
JOIN variantes_producto vp ON dc.variante_id = vp.id 
JOIN productos p ON vp.producto_id = p.id 
JOIN categorias c ON p.categoria_id = c.id 
WHERE c.nombre = 'Pijamas';