package healthcare.org.controllers;

import healthcare.org.dtos.record.CreateMedicalRecordDTO;
import healthcare.org.dtos.record.ResponseMedicalRecordDTO;
import healthcare.org.services.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
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
    public ResponseEntity<?> getAllMedicalRecords() {
        try{
            List<ResponseMedicalRecordDTO> medicalRecordDTOs = medicalRecordService.getAllMedicalRecords();
            return new ResponseEntity<>(medicalRecordDTOs, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMedicalRecordById(@PathVariable("id") String id) {
        try {
            ResponseMedicalRecordDTO medicalRecordDTO = medicalRecordService.getMedicalRecordById(id);
            if (medicalRecordDTO == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(medicalRecordDTO, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('add_patient_record')")
    public ResponseEntity<?> addMedicalRecord(@Validated @RequestBody CreateMedicalRecordDTO medicalRecordDTO) {
        try {
            ResponseMedicalRecordDTO savedMedicalRecordDTO = medicalRecordService.saveMedicalRecord(medicalRecordDTO);
            return new ResponseEntity<>(savedMedicalRecordDTO, HttpStatus.CREATED);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicalRecord(@PathVariable("id") String id) {
        try {
            medicalRecordService.deleteMedicalRecord(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }
}