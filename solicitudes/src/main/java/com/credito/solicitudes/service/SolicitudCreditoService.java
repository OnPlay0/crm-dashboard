package com.credito.solicitudes.service;

import com.credito.solicitudes.dto.SolicitudCreditoDTO;
import com.credito.solicitudes.model.SolicitudCredito;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

public interface SolicitudCreditoService {
    SolicitudCredito crear(SolicitudCreditoDTO dto);

    List<SolicitudCredito> obtenerTodas();

    Optional<SolicitudCredito> obtenerPorId(String id);

    Optional<SolicitudCredito> actualizar(String id, @Valid SolicitudCreditoDTO dto);

    boolean eliminar(String id);

}

