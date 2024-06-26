package healthcare.org.services;

import healthcare.org.dtos.record.CreateMedicalRecordDTO;
import healthcare.org.dtos.record.ResponseMedicalRecordDTO;

import java.util.List;

public interface MedicalRecordService {
    List<ResponseMedicalRecordDTO> getAllMedicalRecords();

    ResponseMedicalRecordDTO getMedicalRecordById(String id);

    ResponseMedicalRecordDTO saveMedicalRecord(CreateMedicalRecordDTO medicalRecordDTO);

    void deleteMedicalRecord(String id);
}
