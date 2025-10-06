package com.credito.solicitudes.controller;

import com.credito.solicitudes.dto.SolicitudCreditoDTO;
import com.credito.solicitudes.model.SolicitudCredito;
import com.credito.solicitudes.service.SolicitudCreditoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudCreditoController {

    private final SolicitudCreditoService service;

    public SolicitudCreditoController(SolicitudCreditoService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(
            summary = "Crear solicitud de crédito",
            description = "Registra una nueva solicitud con nombre, monto y motivo."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Solicitud creada correctamente",
            content = @Content(schema = @Schema(implementation = SolicitudCredito.class))
    )
    public ResponseEntity<SolicitudCredito> crear(@RequestBody @Valid SolicitudCreditoDTO dto) {
        return ResponseEntity.ok(service.crear(dto));
    }

    @GetMapping
    @Operation(summary = "Listar todas las solicitudes")
    public ResponseEntity<List<SolicitudCredito>> obtenerTodas() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar solicitud por ID")
    @ApiResponse(responseCode = "404", description = "Solicitud no encontrada")
    public ResponseEntity<SolicitudCredito> obtenerPorId(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una solicitud por ID")
    @ApiResponse(responseCode = "404", description = "Solicitud no encontrada")
    public ResponseEntity<SolicitudCredito> actualizar(@PathVariable String id, @RequestBody @Valid SolicitudCreditoDTO dto) {
        return service.actualizar(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una solicitud por ID")
    @ApiResponse(responseCode = "204", description = "Solicitud eliminada con éxito")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (service.eliminar(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
