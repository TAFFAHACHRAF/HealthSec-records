package healthcare.org.mappers;

import healthcare.org.dtos.record.CreateMedicalRecordDTO;
import healthcare.org.dtos.record.ResponseMedicalRecordDTO;
import healthcare.org.entities.MedicalRecord;

public interface MedicalRecordMapper {
    ResponseMedicalRecordDTO toMedicalRecordDTO(MedicalRecord medicalRecord);

    MedicalRecord toMedicalRecordEntity(CreateMedicalRecordDTO medicalRecordDTO);
}
