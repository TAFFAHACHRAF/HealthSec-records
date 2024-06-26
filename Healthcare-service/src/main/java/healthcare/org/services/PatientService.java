package healthcare.org.services;

import healthcare.org.dtos.patient.PatientResponseDTO;
import healthcare.org.dtos.patient.SavePatientReqDTO;
import healthcare.org.exceptions.InvalidPatientDataException;
import healthcare.org.exceptions.PatientNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PatientService {
    PatientResponseDTO addPatient(SavePatientReqDTO savePatientReqDTO) throws InvalidPatientDataException;

    PatientResponseDTO updatePatient(String id, SavePatientReqDTO savePatientReqDTO) throws PatientNotFoundException, InvalidPatientDataException;

    String deletePatient(String id) throws PatientNotFoundException;

    List<PatientResponseDTO> getAllPatients();

    Page<PatientResponseDTO> getAllPatients(Pageable pageable);

    PatientResponseDTO getPatientById(String id) throws PatientNotFoundException;
}
