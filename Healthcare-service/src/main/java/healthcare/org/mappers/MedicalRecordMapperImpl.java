package healthcare.org.mappers;

import healthcare.org.dtos.record.CreateMedicalRecordDTO;
import healthcare.org.dtos.record.CreatePrescriptionDTO;
import healthcare.org.dtos.record.ResponseMedicalRecordDTO;
import healthcare.org.entities.MedicalRecord;
import healthcare.org.entities.Prescription;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MedicalRecordMapperImpl implements MedicalRecordMapper {

    @Override
    public ResponseMedicalRecordDTO toMedicalRecordDTO(MedicalRecord medicalRecord) {
        return new ResponseMedicalRecordDTO(
                medicalRecord.getRecordID(),
                medicalRecord.getDate(),
                medicalRecord.getNotes(),
                medicalRecord.getDiagnosis(),
                medicalRecord.getTreatment(),
                medicalRecord.getPatient() != null ? medicalRecord.getPatient().getPersonID() : null,
                medicalRecord.getDoctor() != null ? medicalRecord.getDoctor().getUserId() : null
        );
    }

    @Override
    public MedicalRecord toMedicalRecordEntity(CreateMedicalRecordDTO medicalRecordDTO) {
        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setDate(new Date());
        medicalRecord.setNotes(medicalRecordDTO.getNotes());
        medicalRecord.setDiagnosis(medicalRecordDTO.getDiagnosis());
        medicalRecord.setTreatment(medicalRecordDTO.getTreatment());
        //medicalRecord.setPatient(medicalRecordDTO.getPatient());
        // Set doctor based on doctorId in your service layer
        // Example: medicalRecord.setDoctor(userRepository.findById(medicalRecordDTO.getDoctorId()).orElse(null));
        // Adjust the above line based on how you fetch and set the doctor entity
        return medicalRecord;
    }

    private CreatePrescriptionDTO toPrescriptionDTO(Prescription prescription) {
        return new CreatePrescriptionDTO(
                prescription.getMedication(),
                prescription.getDosage(),
                prescription.getFrequency(),
                prescription.getDuration()
        );
    }

    private Prescription toPrescriptionEntity(CreatePrescriptionDTO prescriptionDTO) {
        Prescription prescription = new Prescription();
        prescription.setPrescriptionID(UUID.randomUUID().toString()); // Example method to generate ID
        prescription.setMedication(prescriptionDTO.getMedication());
        prescription.setDosage(prescriptionDTO.getDosage());
        prescription.setFrequency(prescriptionDTO.getFrequency());
        prescription.setDuration(prescriptionDTO.getDuration());
        return prescription;
    }
}
