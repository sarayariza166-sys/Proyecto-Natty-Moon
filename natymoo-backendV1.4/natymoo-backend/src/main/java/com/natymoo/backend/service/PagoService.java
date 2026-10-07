package com.natymoo.backend.service;

import com.natymoo.backend.entity.Pago;
import com.natymoo.backend.exception.ResourceNotFoundException;
import com.natymoo.backend.repository.PagoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PagoService {

    private final PagoRepository repository;

    public List<Pago> findAll() {
        return repository.findAll();
    }

    public Pago findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontro pago con id: " + id));
    }

    public Pago create(Pago entidad) {
        return repository.save(entidad);
    }

    public Pago update(Long id, Pago datosActualizados) {
        Pago existente = findById(id);
        copiarCampos(existente, datosActualizados);
        return repository.save(existente);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("No se encontro pago con id: " + id);
        }
        repository.deleteById(id);
    }

    private void copiarCampos(Pago existente, Pago nuevo) {
        org.springframework.beans.BeanUtils.copyProperties(nuevo, existente, "id");
    }
}
