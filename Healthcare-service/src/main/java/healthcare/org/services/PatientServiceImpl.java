package healthcare.org.services;

import healthcare.org.dtos.patient.PatientResponseDTO;
import healthcare.org.dtos.patient.SavePatientReqDTO;
import healthcare.org.dtos.patient.UpdatePatientReqDTO;
import healthcare.org.entities.Patient;
import healthcare.org.entities.User;
import healthcare.org.exceptions.DoctorNotFoundException;
import healthcare.org.exceptions.InvalidPatientDataException;
import healthcare.org.exceptions.PatientNotFoundException;
import healthcare.org.mappers.PatientMapper;
import healthcare.org.repositories.PatientRepository;
import healthcare.org.repositories.UserRepository;
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
    private final UserRepository userRepository;

    @Override
    @Transactional
    public PatientResponseDTO addPatient(SavePatientReqDTO savePatientReqDTO) throws InvalidPatientDataException {
        try {
            // Check if patient with same CIN or email already exists
            Patient existingPatient = patientRepository.findByCinOrEmail(savePatientReqDTO.getCin(), savePatientReqDTO.getEmail());
            if (existingPatient != null) {
                throw new InvalidPatientDataException("CIN or email already exists");
            }

            // Find the doctor by ID from the request
            User doctor = userRepository.findById(savePatientReqDTO.getDoctorID())
                    .orElseThrow(() -> new DoctorNotFoundException("Doctor with ID " + savePatientReqDTO.getDoctorID() + " not found"));

            // Map SavePatientReqDTO to Patient entity
            Patient patient = patientMapper.toPatient(savePatientReqDTO);
            patient.setPersonID(UUID.randomUUID().toString()); // Generate personID (if needed)
            patient.setDoctor(doctor); // Set the doctor

            // Save patient to repository
            patientRepository.save(patient);

            // Map patient entity back to DTO for response
            return patientMapper.toPatientDTO(patient);
        } catch (DataIntegrityViolationException ex) {
            throw new InvalidPatientDataException("CIN or email already exists");
        }
    }

    @Override
    @Transactional
    public PatientResponseDTO updatePatient(String id, UpdatePatientReqDTO updatePatientReqDTO) throws PatientNotFoundException, InvalidPatientDataException {
        try {
            Patient patient = patientRepository.findById(id)
                    .orElseThrow(() -> new PatientNotFoundException("Patient with id " + id + " not found"));

            patientMapper.updatePatientFromDTO(updatePatientReqDTO, patient);
            patientRepository.save(patient);
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
        return "Patient deleted with id "+patient.getPersonID();
    }

    @Override
    public List<PatientResponseDTO> getAllPatients() {
        return StreamSupport.stream(patientRepository.findAll().spliterator(), false)
                .map(patientMapper::toPatientDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PatientResponseDTO> getAllPatients(Pageable pageable) {
        return patientRepository.findAll(pageable)
                .map(patientMapper::toPatientDTO);
    }

    @Override
    public PatientResponseDTO getPatientById(String id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient with id " + id + " not found"));
        return patientMapper.toPatientDTO(patient);
    }
}
