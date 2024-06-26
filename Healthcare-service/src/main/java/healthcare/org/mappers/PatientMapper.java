package healthcare.org.mappers;

import healthcare.org.dtos.patient.UpdatePatientReqDTO;
import healthcare.org.entities.Patient;
import healthcare.org.dtos.patient.PatientResponseDTO;
import healthcare.org.dtos.patient.SavePatientReqDTO;

import java.util.List;

public interface PatientMapper {
    SavePatientReqDTO toSavePatientReqDTO(Patient patient);
    Patient toPatient(SavePatientReqDTO savePatientReqDTO);
    PatientResponseDTO toPatientDTO(Patient patient);
    List<PatientResponseDTO> toPatientDTOList(List<Patient> patients);

    void updatePatientFromDTO(UpdatePatientReqDTO updatePatientReqDTO, Patient patient);
}
