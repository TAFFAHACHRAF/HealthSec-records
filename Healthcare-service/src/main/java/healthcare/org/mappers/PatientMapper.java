package healthcare.org.mappers;

import healthcare.org.entities.Patient;
import healthcare.org.dtos.patient.PatientDTO;
import healthcare.org.dtos.patient.SavePatientReqDTO;

import java.util.List;

public interface PatientMapper {
    SavePatientReqDTO toSavePatientReqDTO(Patient patient);
    Patient toPatient(SavePatientReqDTO savePatientReqDTO);
    PatientDTO toPatientDTO(Patient patient);
    List<PatientDTO> toPatientDTOList(List<Patient> patients);

    void updatePatientFromDTO(SavePatientReqDTO savePatientReqDTO, Patient patient);
}
