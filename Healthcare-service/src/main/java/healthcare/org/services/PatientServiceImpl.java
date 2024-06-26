package healthcare.org.services;

import healthcare.org.dtos.patient.PatientDTO;
import healthcare.org.dtos.patient.SavePatientReqDTO;
import healthcare.org.entities.Patient;
import healthcare.org.exceptions.InvalidPatientDataException;
import healthcare.org.exceptions.PatientNotFoundException;
import healthcare.org.mappers.PatientMapper;
import healthcare.org.repositories.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Override
    @Transactional
    public PatientDTO addPatient(SavePatientReqDTO savePatientReqDTO) throws InvalidPatientDataException {
        try {
            Patient existingPatient = patientRepository.findByCinOrEmail(savePatientReqDTO.getCin(), savePatientReqDTO.getEmail());
            if (existingPatient != null) {
                throw new InvalidPatientDataException("CIN or email already exists");
            }

            Patient patient = patientMapper.toPatient(savePatientReqDTO);
            patient.setPersonID(UUID.randomUUID().toString());
            patientRepository.save(patient);
            log.info("Patient added: {}", patient);
            return patientMapper.toPatientDTO(patient);
        } catch (DataIntegrityViolationException ex) {
            throw new InvalidPatientDataException("CIN or email already exists");
        }
    }

    @Override
    @Transactional
    public PatientDTO updatePatient(String id, SavePatientReqDTO savePatientReqDTO) throws PatientNotFoundException, InvalidPatientDataException {
        try {
            Patient existingPatient = patientRepository.findByCinOrEmail(savePatientReqDTO.getCin(), savePatientReqDTO.getEmail());
            if (existingPatient != null && !existingPatient.getPersonID().equals(id)) {
                throw new InvalidPatientDataException("CIN or email already exists");
            }

            Patient patient = patientRepository.findById(id)
                    .orElseThrow(() -> new PatientNotFoundException("Patient with id " + id + " not found"));

            patientMapper.updatePatientFromDTO(savePatientReqDTO, patient);
            patientRepository.save(patient);
            log.info("Patient updated: {}", patient);
            return patientMapper.toPatientDTO(patient);
        } catch (DataIntegrityViolationException ex) {
            throw new InvalidPatientDataException("CIN or email already exists");
        }
    }

    @Override
    public String deletePatient(String id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient with id " + id + " not found"));

        patientRepository.delete(patient);
        log.info("Patient deleted: {}", patient);
        return "Patient deleted";
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        return StreamSupport.stream(patientRepository.findAll().spliterator(), false)
                .map(patientMapper::toPatientDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PatientDTO> getAllPatients(Pageable pageable) {
        return patientRepository.findAll(pageable)
                .map(patientMapper::toPatientDTO);
    }

    @Override
    public PatientDTO getPatientById(String id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient with id " + id + " not found"));
        return patientMapper.toPatientDTO(patient);
    }
}
