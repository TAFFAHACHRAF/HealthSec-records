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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Slf4j
class MedicalRecordServiceImplTest {

    @Mock
    private MedicalRecordRepository medicalRecordRepository;

    @Mock
    private MedicalRecordMapper medicalRecordMapper;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MedicalRecordServiceImpl medicalRecordService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllMedicalRecords() {
        MedicalRecord medicalRecord = new MedicalRecord();
        when(medicalRecordRepository.findAll()).thenReturn(Collections.singletonList(medicalRecord));
        when(medicalRecordMapper.toMedicalRecordDTO(any(MedicalRecord.class))).thenReturn(new ResponseMedicalRecordDTO());

        List<ResponseMedicalRecordDTO> response = medicalRecordService.getAllMedicalRecords();

        assertEquals(1, response.size());
    }

    @Test
    void getMedicalRecordById() {
        String recordId = "record123";
        MedicalRecord medicalRecord = new MedicalRecord();
        when(medicalRecordRepository.findById(anyString())).thenReturn(Optional.of(medicalRecord));
        when(medicalRecordMapper.toMedicalRecordDTO(any(MedicalRecord.class))).thenReturn(new ResponseMedicalRecordDTO());

        ResponseMedicalRecordDTO responseDTO = medicalRecordService.getMedicalRecordById(recordId);

        assertNotNull(responseDTO);
    }


    @Test
    void deleteMedicalRecord() {
        String recordId = "record123";
        doNothing().when(medicalRecordRepository).deleteById(anyString());

        medicalRecordService.deleteMedicalRecord(recordId);

        verify(medicalRecordRepository, times(1)).deleteById(recordId);
    }

    @Test
    void testGetAllMedicalRecords_withPaging() {
        MedicalRecord medicalRecord = new MedicalRecord();
        Pageable pageable = PageRequest.of(0, 10);
        Page<MedicalRecord> medicalRecordPage = new PageImpl<>(Arrays.asList(medicalRecord), pageable, 1);
        when(medicalRecordRepository.findAll(pageable)).thenReturn(medicalRecordPage);
        when(medicalRecordMapper.toMedicalRecordDTO(any(MedicalRecord.class))).thenReturn(new ResponseMedicalRecordDTO());

        Page<ResponseMedicalRecordDTO> response = medicalRecordService.getAllMedicalRecords(pageable);

        assertEquals(1, response.getTotalElements());
    }
}
