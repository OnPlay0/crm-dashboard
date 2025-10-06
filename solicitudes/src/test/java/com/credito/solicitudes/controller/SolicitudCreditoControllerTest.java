package com.credito.solicitudes.controller;

import com.credito.solicitudes.dto.SolicitudCreditoDTO;
import com.credito.solicitudes.model.SolicitudCredito;
import com.credito.solicitudes.service.SolicitudCreditoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDateTime;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SolicitudCreditoController.class)
public class SolicitudCreditoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SolicitudCreditoService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCrearSolicitud() throws Exception {
        // Arrange: Simulamos el input y el resultado
        SolicitudCreditoDTO dto = new SolicitudCreditoDTO();
        dto.setNombreSolicitante("Charly");
        dto.setMonto(50000);
        dto.setMotivo("Grabar nuevo disco");

        SolicitudCredito respuesta = new SolicitudCredito(
                "1",
                dto.getNombreSolicitante(),
                dto.getMonto(),
                dto.getMotivo(),
                LocalDateTime.now()
        );

        when(service.crear(any(SolicitudCreditoDTO.class))).thenReturn(respuesta);

        // Act & Assert: simulamos una request POST
        mockMvc.perform(post("/api/solicitudes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombreSolicitante").value("Charly"))
                .andExpect(jsonPath("$.monto").value(50000))
                .andExpect(jsonPath("$.motivo").value("Grabar nuevo disco"));
    }
}
