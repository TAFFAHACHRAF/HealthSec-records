package healthcare.org.services;

import healthcare.org.dtos.record.CreateMedicalRecordDTO;
import healthcare.org.dtos.record.ResponseMedicalRecordDTO;
import healthcare.org.entities.MedicalRecord;
import healthcare.org.entities.Patient;
import healthcare.org.entities.User;
import healthcare.org.exceptions.DoctorNotFoundException;
import healthcare.org.exceptions.PatientNotFoundException;
import healthcare.org.mappers.MedicalRecordMapper;
import healthcare.org.repositories.MedicalRecordRepository;
import healthcare.org.repositories.PatientRepository;
import healthcare.org.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordMapper medicalRecordMapper;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    @Override
    public List<ResponseMedicalRecordDTO> getAllMedicalRecords() {
        List<MedicalRecord> medicalRecords = medicalRecordRepository.findAll();
        return medicalRecords.stream()
                .map(medicalRecordMapper::toMedicalRecordDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ResponseMedicalRecordDTO getMedicalRecordById(String id) {
        Optional<MedicalRecord> optionalMedicalRecord = medicalRecordRepository.findById(id);
        return optionalMedicalRecord.map(medicalRecordMapper::toMedicalRecordDTO).orElse(null);
    }

    @Override
    @Transactional
    public ResponseMedicalRecordDTO saveMedicalRecord(CreateMedicalRecordDTO medicalRecordDTO) {
        try {
            MedicalRecord medicalRecord = medicalRecordMapper.toMedicalRecordEntity(medicalRecordDTO);
            medicalRecord.setRecordID(UUID.randomUUID().toString());

            Patient patient = patientRepository.findById(medicalRecordDTO.getPatientId())
                    .orElseThrow(() -> new PatientNotFoundException("Patient not found with ID: " + medicalRecordDTO.getPatientId()));
            medicalRecord.setPatient(patient);

            User doctor = userRepository.findById(medicalRecordDTO.getDoctorID())
                    .orElseThrow(() -> new DoctorNotFoundException("Doctor not found with ID: " + medicalRecordDTO.getDoctorID()));
            medicalRecord.setDoctor(doctor);

            MedicalRecord savedMedicalRecord = medicalRecordRepository.save(medicalRecord);
            return medicalRecordMapper.toMedicalRecordDTO(savedMedicalRecord);
        } catch (PatientNotFoundException e) {
            // Log the exception
            log.error("Patient not found", e);
            throw new PatientNotFoundException("Patient not found");
        } catch (DoctorNotFoundException e) {
            // Log the exception
            log.error("Doctor not found", e);
            throw new DoctorNotFoundException("Doctor not found");
        } catch (Exception e) {
            // Log the exception
            log.error("Failed to save medical record", e);
            throw new RuntimeException("Failed to save medical record", e);
        }
    }

    @Override
    public void deleteMedicalRecord(String id) {
        medicalRecordRepository.deleteById(id);
    }

    // Implementing pagination
    @Override
    public Page<ResponseMedicalRecordDTO> getAllMedicalRecords(Pageable pageable) {
        return medicalRecordRepository.findAll(pageable)
                .map(medicalRecordMapper::toMedicalRecordDTO);
    }
}
