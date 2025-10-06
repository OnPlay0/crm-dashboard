package com.credito.solicitudes.service.impl;

import com.credito.solicitudes.dto.SolicitudCreditoDTO;
import com.credito.solicitudes.model.SolicitudCredito;
import com.credito.solicitudes.repository.SolicitudCreditoRepository;
import com.credito.solicitudes.service.SolicitudCreditoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class SolicitudCreditoServiceImpl implements SolicitudCreditoService {

    private final SolicitudCreditoRepository repository;

    public SolicitudCreditoServiceImpl(SolicitudCreditoRepository repository) {
        this.repository = repository;
    }

    @Override
    public SolicitudCredito crear(SolicitudCreditoDTO dto) {
        log.info("Recibida solicitud para crear: {}", dto);
        SolicitudCredito solicitud = new SolicitudCredito();
        solicitud.setNombreSolicitante(dto.getNombreSolicitante());
        solicitud.setMonto(dto.getMonto());
        solicitud.setMotivo(dto.getMotivo());
        solicitud.setFechaSolicitud(LocalDateTime.now());
        SolicitudCredito guardado = repository.save(solicitud);
        log.info("Solicitud guardada con ID: {}", guardado.getId());
        return guardado;
    }

    @Override
    public List<SolicitudCredito> obtenerTodas() {
        return repository.findAll();
    }

    @Override
    public Optional<SolicitudCredito> obtenerPorId(String id) {
        log.debug("Buscando solicitud con ID: {}", id);
        return repository.findById(id);
    }

    @Override
    public Optional<SolicitudCredito> actualizar(String id, SolicitudCreditoDTO dto) {
        log.debug("Intentando actualizar solicitud con ID: {}", id);

        Optional<SolicitudCredito> resultado = repository.findById(id).map(existing -> {
            log.info("Solicitud encontrada con ID: {}. Actualizando datos...", id);
            existing.setNombreSolicitante(dto.getNombreSolicitante());
            existing.setMonto(dto.getMonto());
            existing.setMotivo(dto.getMotivo());
            SolicitudCredito actualizada = repository.save(existing);
            log.info("Solicitud actualizada con éxito. ID: {}, nuevo estado: {}", id, actualizada);
            return actualizada;
        });

        if (resultado.isEmpty()) {
            log.warn("No se encontró solicitud con ID: {} para actualizar", id);
        }

        return resultado;
    }


    @Override
    public boolean eliminar(String id) {
        if (repository.existsById(id)) {
            log.warn("Eliminando solicitud con ID: {}", id);
            repository.deleteById(id);
            return true;
        }
        log.warn("No se encontró solicitud con ID: {} para eliminar", id);
        return false;
    }

}
