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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Slf4j
class PatientServiceImplTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private PatientMapper patientMapper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PatientServiceImpl patientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void updatePatient() throws PatientNotFoundException, InvalidPatientDataException {
        String patientId = "patient123";
        UpdatePatientReqDTO updatePatientReqDTO = new UpdatePatientReqDTO();
        //updatePatientReqDTO.setCin("CIN123");

        Patient existingPatient = new Patient();
        when(patientRepository.findById(anyString())).thenReturn(Optional.of(existingPatient));
        when(patientMapper.toPatientDTO(any(Patient.class))).thenReturn(new PatientResponseDTO());

        PatientResponseDTO responseDTO = patientService.updatePatient(patientId, updatePatientReqDTO);

        assertNotNull(responseDTO);
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    void deletePatient() {
        String patientId = "patient123";
        Patient existingPatient = new Patient();
        existingPatient.setPersonID(patientId);
        when(patientRepository.findById(anyString())).thenReturn(Optional.of(existingPatient));

        String response = patientService.deletePatient(patientId);

        assertEquals("Patient deleted with id " + patientId, response);
        verify(patientRepository, times(1)).delete(any(Patient.class));
    }

    @Test
    void getAllPatients() {
        Patient patient = new Patient();
        when(patientRepository.findAll()).thenReturn(Collections.singletonList(patient));
        when(patientMapper.toPatientDTO(any(Patient.class))).thenReturn(new PatientResponseDTO());

        var response = patientService.getAllPatients();

        assertEquals(1, response.size());
    }

    @Test
    void testGetAllPatients_withPaging() {
        Patient patient = new Patient();
        Pageable pageable = PageRequest.of(0, 10);
        Page<Patient> patientPage = new PageImpl<>(Arrays.asList(patient), pageable, 1);
        when(patientRepository.findAll(pageable)).thenReturn(patientPage);
        when(patientMapper.toPatientDTO(any(Patient.class))).thenReturn(new PatientResponseDTO());

        var response = patientService.getAllPatients(pageable);

        assertEquals(1, response.getTotalElements());
    }

    @Test
    void getPatientById() throws PatientNotFoundException {
        String patientId = "patient123";
        Patient patient = new Patient();
        when(patientRepository.findById(anyString())).thenReturn(Optional.of(patient));
        when(patientMapper.toPatientDTO(any(Patient.class))).thenReturn(new PatientResponseDTO());

        PatientResponseDTO responseDTO = patientService.getPatientById(patientId);

        assertNotNull(responseDTO);
    }
}
