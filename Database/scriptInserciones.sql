INSERT INTO productos (nombre, descripcion, categoria_id, precio_base, genero, material) 
VALUES ('Pijama Corta Satín', 'Conjunto de dos piezas en tela satín suave', 1, 75900, 'MUJER', 'Satín');

INSERT INTO variantes_producto (producto_id, sku, talla, color, stock) 
VALUES (2, 'PIJ-SATIN-M-NEGRO', 'M', 'Negro', 18);

INSERT INTO cupones (codigo, tipo_descuento, valor, fecha_inicio, fecha_fin) 
VALUES ('PIJAMAS20', 'PORCENTAJE', 20.00, '2026-01-01', '2026-12-31');

INSERT INTO lista_deseos (usuario_id, producto_id) 
VALUES (2, 1);

INSERT INTO resenas_producto (producto_id, usuario_id, calificacion, comentario) 
VALUES (1, 2, 5, 'La tela es muy suave y cómoda para dormir');