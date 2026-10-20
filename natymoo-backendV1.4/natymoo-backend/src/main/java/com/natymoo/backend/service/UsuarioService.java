package com.natymoo.backend.service;

import com.natymoo.backend.entity.Usuario;
import com.natymoo.backend.exception.ResourceNotFoundException;
import com.natymoo.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {

    private final UsuarioRepository repository;
     private final BCryptPasswordEncoder passwordEncoder;

    public List<Usuario> findAll() {
        return repository.findAll();
    }

    public Usuario findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontro usuario con id: " + id));
    }

    // Se agrega criptacion a la contraseña cuando se crea un usuario nuevo
    public Usuario create(Usuario entidad) {
        String pwd = passwordEncoder.encode(entidad.getPasswordHash());
        entidad.setPasswordHash(pwd);
        return repository.save(entidad);
    }

    public Usuario update(Long id, Usuario datosActualizados) {
        Usuario existente = findById(id);
        copiarCampos(existente, datosActualizados);
        return repository.save(existente);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("No se encontro usuario con id: " + id);
        }
        repository.deleteById(id);
    }

    private void copiarCampos(Usuario existente, Usuario nuevo) {
        org.springframework.beans.BeanUtils.copyProperties(nuevo, existente, "id");
    }
}
