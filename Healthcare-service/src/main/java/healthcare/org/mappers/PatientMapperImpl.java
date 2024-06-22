package healthcare.org.mappers;

import healthcare.org.entities.Patient;
import healthcare.org.dtos.PatientDTO;
import healthcare.org.dtos.SavePatientReqDTO;
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
    public PatientDTO toPatientDTO(Patient patient) {
        PatientDTO patientDTO = new PatientDTO();
        BeanUtils.copyProperties(patient, patientDTO);
        return patientDTO;
    }

    @Override
    public List<PatientDTO> toPatientDTOList(List<Patient> patients) {
        return patients.stream()
                .map(this::toPatientDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updatePatientFromDTO(SavePatientReqDTO savePatientReqDTO, Patient patient) {
        BeanUtils.copyProperties(savePatientReqDTO, patient);
    }
}
