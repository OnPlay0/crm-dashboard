package com.credito.solicitudes.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Document(collection = "solicitudes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudCredito {

    @Id
    private String id;

    @NotBlank
    private String nombreSolicitante;

    @Min(1000)
    private double monto;

    @NotBlank
    private String motivo;

    private LocalDateTime fechaSolicitud = LocalDateTime.now();
}
