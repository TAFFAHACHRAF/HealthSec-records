package healthcare.org.controllers;

import healthcare.org.dtos.record.CreateMedicalRecordDTO;
import healthcare.org.dtos.record.ResponseMedicalRecordDTO;
import healthcare.org.services.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/records")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('read_patient_records')")
    public ResponseEntity<List<ResponseMedicalRecordDTO>> getAllMedicalRecords() {
        List<ResponseMedicalRecordDTO> medicalRecordDTOs = medicalRecordService.getAllMedicalRecords();
        return new ResponseEntity<>(medicalRecordDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMedicalRecordDTO> getMedicalRecordById(@PathVariable("id") String id) {
        ResponseMedicalRecordDTO medicalRecordDTO = medicalRecordService.getMedicalRecordById(id);
        if (medicalRecordDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicalRecordDTO, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('add_patient_record')")
    public ResponseEntity<ResponseMedicalRecordDTO> addMedicalRecord(@Validated @RequestBody CreateMedicalRecordDTO medicalRecordDTO) {
        ResponseMedicalRecordDTO savedMedicalRecordDTO = medicalRecordService.saveMedicalRecord(medicalRecordDTO);
        return new ResponseEntity<>(savedMedicalRecordDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable("id") String id) {
        medicalRecordService.deleteMedicalRecord(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
