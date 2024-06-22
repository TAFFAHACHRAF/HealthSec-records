package healthcare.org.controllers;

import healthcare.org.dtos.SavePatientReqDTO;
import healthcare.org.dtos.PatientDTO;
import healthcare.org.exceptions.*;
import healthcare.org.services.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patients")
@AllArgsConstructor
@Validated
public class PatientController {
    private final PatientService patientService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllPatients(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sort", defaultValue = "cin") String[] sort) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
            Page<PatientDTO> patientDTOS = patientService.getAllPatients(pageable);
            return ResponseEntity.ok(patientDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getby/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable String id) {
        try {
            PatientDTO patientDTO = patientService.getPatientById(id);
            return ResponseEntity.ok(patientDTO);
        } catch (PatientNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPatient(@Validated @RequestBody SavePatientReqDTO savePatientReqDTO) {
        try {
            PatientDTO patientDTO = patientService.addPatient(savePatientReqDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(patientDTO);
        } catch (InvalidPatientDataException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable String id, @Validated @RequestBody SavePatientReqDTO savePatientReqDTO) {
        try {
            PatientDTO patientDTO = patientService.updatePatient(id, savePatientReqDTO);
            return ResponseEntity.ok(patientDTO);
        } catch (PatientNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (InvalidPatientDataException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable String id) {
        try {
            String response = patientService.deletePatient(id);
            return ResponseEntity.ok(response);
        } catch (PatientNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
