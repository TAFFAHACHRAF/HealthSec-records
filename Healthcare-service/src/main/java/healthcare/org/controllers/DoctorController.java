package healthcare.org.controllers;

import healthcare.org.dtos.doctor.DoctorResponseDTO;
import healthcare.org.dtos.doctor.DoctorSaveRequestDTO;
import healthcare.org.dtos.doctor.DoctorUpdateRequestDTO;
import healthcare.org.entities.User;
import healthcare.org.services.AuthenticationService;
import healthcare.org.mappers.DoctorMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
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
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  @PostMapping("/save")
  @PreAuthorize("hasAuthority('hi_add_doctor')")
  public ResponseEntity<DoctorResponseDTO> saveDoctor(@Validated @RequestBody DoctorSaveRequestDTO request) {
    DoctorResponseDTO response = authenticationService.saveDoctor(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/update/{id}")
  @PreAuthorize("hasAuthority('hi_update_its_doctor')")
  public ResponseEntity<Void> updateDoctor(@PathVariable("id") Integer id, @Validated @RequestBody DoctorUpdateRequestDTO request) {
    User user = authenticationService.findById(id);
    if (user == null) {
      return ResponseEntity.notFound().build();
    }
    doctorMapper.updateFromDto(request, user);
    authenticationService.updateDoctor(user);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/delete/{id}")
  @PreAuthorize("hasAuthority('hi_delete_its_doctor')")
  public ResponseEntity<Void> deleteDoctor(@PathVariable("id") Integer id) {
    authenticationService.deleteDoctor(id);
    return ResponseEntity.noContent().build();
  }
}