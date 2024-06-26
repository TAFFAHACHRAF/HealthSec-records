package healthcare.org.mappers;

import healthcare.org.dtos.patient.UpdatePatientReqDTO;
import healthcare.org.entities.Patient;
import healthcare.org.dtos.patient.PatientResponseDTO;
import healthcare.org.dtos.patient.SavePatientReqDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PatientMapperImpl implements PatientMapper {

    @Override
    public SavePatientReqDTO toSavePatientReqDTO(Patient patient) {
        SavePatientReqDTO savePatientReqDTO = new SavePatientReqDTO();
        BeanUtils.copyProperties(patient, savePatientReqDTO);
        return savePatientReqDTO;
    }

    @Override
    public Patient toPatient(SavePatientReqDTO savePatientReqDTO) {
        Patient patient = new Patient();
        BeanUtils.copyProperties(savePatientReqDTO, patient);
        return patient;
    }

    @Override
    public PatientResponseDTO toPatientDTO(Patient patient) {
        PatientResponseDTO patientDTO = new PatientResponseDTO();
        BeanUtils.copyProperties(patient, patientDTO);
        patientDTO.setDoctorID(patient.getDoctor().getUserId()); // Corrected mapping
        return patientDTO;
    }


    @Override
    public List<PatientResponseDTO> toPatientDTOList(List<Patient> patients) {
        return patients.stream()
                .map(this::toPatientDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updatePatientFromDTO(UpdatePatientReqDTO updatePatientReqDTO, Patient patient) {
        BeanUtils.copyProperties(updatePatientReqDTO, patient);
    }
}
