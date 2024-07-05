package healthcare.org.controllers;

import healthcare.org.dtos.doctor.DoctorResponseDTO;
import healthcare.org.dtos.doctor.DoctorSaveRequestDTO;
import healthcare.org.dtos.doctor.DoctorUpdateRequestDTO;
import healthcare.org.entities.User;
import healthcare.org.exceptions.HiNotFoundException;
import healthcare.org.services.AuthenticationService;
import healthcare.org.mappers.DoctorMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:7075/", maxAge = 3600)
public class DoctorController {
  private final AuthenticationService authenticationService;
  private final DoctorMapper doctorMapper;

  @GetMapping("/all")
  @PreAuthorize("hasAuthority('hi_read_their_doctors')")
  public ResponseEntity<?> getAllDoctors(
          @RequestParam(name = "page", defaultValue = "0") int page,
          @RequestParam(name = "size", defaultValue = "10") int size,
          @RequestParam(name = "sort", defaultValue = "lastname") String[] sort) {
    try {
      Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
      Page<DoctorResponseDTO> doctorDTOS = authenticationService.getAllDoctors(pageable);
      return ResponseEntity.ok(doctorDTOS);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }

  @PostMapping("/add")
  @PreAuthorize("hasAuthority('hi_add_doctor')")
  public ResponseEntity<?> saveDoctor(@Validated @RequestBody DoctorSaveRequestDTO request) {
    try {
      DoctorResponseDTO response = authenticationService.saveDoctor(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException | HiNotFoundException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }

  @GetMapping("/getby/{id}")
  @PreAuthorize("hasAuthority('hi_read_their_doctors')")
  public ResponseEntity<?> getDoctorById(@PathVariable("id") Integer id) {
    try {
      User user = authenticationService.findById(id);
      DoctorResponseDTO responseDTO = doctorMapper.toDoctorResponseDTO(user);
      return ResponseEntity.ok(responseDTO);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (HiNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }

  @PutMapping("/update/{id}")
  @PreAuthorize("hasAuthority('hi_update_its_doctor')")
  public ResponseEntity<?> updateDoctor(@PathVariable("id") Integer id, @Validated @RequestBody DoctorUpdateRequestDTO request) {
    try {
      User user = authenticationService.findById(id);
      if (user == null) {
        return ResponseEntity.notFound().build();
      }
      doctorMapper.updateFromDto(request, user);
      authenticationService.updateDoctor(user);
      return ResponseEntity.ok(doctorMapper.toDoctorResponseDTO(user));
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }

  @DeleteMapping("/delete/{id}")
  @PreAuthorize("hasAuthority('hi_delete_its_doctor')")
  public ResponseEntity<?> deleteDoctor(@PathVariable("id") Integer id) {
    try {
      authenticationService.deleteDoctor(id);
      return ResponseEntity.ok("Deleted Doctor with id: " + id);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }
}
