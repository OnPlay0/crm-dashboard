package com.credito.solicitudes.service.impl;

import com.credito.solicitudes.dto.SolicitudCreditoDTO;
import com.credito.solicitudes.model.SolicitudCredito;
import com.credito.solicitudes.repository.SolicitudCreditoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class SolicitudCreditoServiceImplTest {

    @Mock
    private SolicitudCreditoRepository repository;

    @InjectMocks
    private SolicitudCreditoServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCrearSolicitud() {
        // Arrange
        SolicitudCreditoDTO dto = new SolicitudCreditoDTO();
        dto.setNombreSolicitante("Charly García");
        dto.setMonto(50000);
        dto.setMotivo("Compra de artilugios de musica");

        SolicitudCredito expected = new SolicitudCredito(
                null,
                dto.getNombreSolicitante(),
                dto.getMonto(),
                dto.getMotivo(),
                LocalDateTime.now()
        );

        when(repository.save(any(SolicitudCredito.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        SolicitudCredito resultado = service.crear(dto);

        // Assert
        assertEquals(dto.getNombreSolicitante(), resultado.getNombreSolicitante());
        assertEquals(dto.getMonto(), resultado.getMonto());
        assertEquals(dto.getMotivo(), resultado.getMotivo());
        verify(repository, times(1)).save(any(SolicitudCredito.class));
    }
}
