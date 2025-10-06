package com.credito.solicitudes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Data
@Schema(description = "Objeto de transferencia de datos para solicitudes de crédito")
public class SolicitudCreditoDTO {

    @NotBlank
    @Schema(description = "Nombre completo del solicitante", example = "Charly García")
    private String nombreSolicitante;

    @Min(1000)
    @Schema(description = "Monto solicitado en pesos argentinos", example = "50000")
    private double monto;

    @NotBlank
    @Schema(description = "Motivo o finalidad del préstamo", example = "Grabar un nuevo disco")
    private String motivo;
}
