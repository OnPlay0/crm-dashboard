package com.credito.solicitudes.repository;

import com.credito.solicitudes.model.SolicitudCredito;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudCreditoRepository extends MongoRepository<SolicitudCredito, String> {
}

