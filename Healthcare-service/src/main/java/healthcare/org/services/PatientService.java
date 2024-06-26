package healthcare.org.services;

import healthcare.org.dtos.patient.PatientDTO;
import healthcare.org.dtos.patient.SavePatientReqDTO;
import healthcare.org.exceptions.InvalidPatientDataException;
import healthcare.org.exceptions.PatientNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PatientService {
    PatientDTO addPatient(SavePatientReqDTO savePatientReqDTO) throws InvalidPatientDataException;

    PatientDTO updatePatient(String id, SavePatientReqDTO savePatientReqDTO) throws PatientNotFoundException, InvalidPatientDataException;

    String deletePatient(String id) throws PatientNotFoundException;

    List<PatientDTO> getAllPatients();

    Page<PatientDTO> getAllPatients(Pageable pageable);

    PatientDTO getPatientById(String id) throws PatientNotFoundException;
}
