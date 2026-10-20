package com.natymoo.backend.service;

import com.natymoo.backend.entity.DetalleCarrito;
import com.natymoo.backend.exception.ResourceNotFoundException;
import com.natymoo.backend.repository.DetalleCarritoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DetalleCarritoService {

    private final DetalleCarritoRepository repository;

    public List<DetalleCarrito> findAll() {
        return repository.findAll();
    }

    public DetalleCarrito findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontro detalle de carrito con id: " + id));
    }

    public DetalleCarrito create(DetalleCarrito entidad) {
        return repository.save(entidad);
    }

    public DetalleCarrito update(Long id, DetalleCarrito datosActualizados) {
        DetalleCarrito existente = findById(id);
        copiarCampos(existente, datosActualizados);
        return repository.save(existente);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("No se encontro detalle de carrito con id: " + id);
        }
        repository.deleteById(id);
    }

    private void copiarCampos(DetalleCarrito existente, DetalleCarrito nuevo) {
        org.springframework.beans.BeanUtils.copyProperties(nuevo, existente, "id");
    }
}
