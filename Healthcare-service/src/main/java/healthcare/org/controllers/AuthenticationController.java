package healthcare.org.controllers;

import healthcare.org.dtos.healthcare_institution.AuthenticationRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationResponseDTO;
import healthcare.org.dtos.healthcare_institution.ChangePasswordRequestDTO;
import healthcare.org.dtos.healthcare_institution.RegisterReqDTO;
import healthcare.org.exceptions.HiNotFoundException;
import healthcare.org.exceptions.PatientNotFoundException;
import healthcare.org.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:7075/", maxAge = 3600)
public class AuthenticationController {

  private final AuthenticationService authenticationService;
  /*
    This controller manage :
        Healthcare institutions [Registration, Authentication, change password, refresh token]
   */

  /*@PatchMapping("/changepassword")
  public ResponseEntity<?> changePassword(
          @Validated @RequestBody ChangePasswordRequestDTO changePasswordRequestDTO,
          Principal connectedUser
  ) {
    try {
      authenticationService.changePassword(changePasswordRequestDTO, connectedUser);
      return ResponseEntity.ok().build();
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }*/

  @PostMapping("/register")
  public ResponseEntity<?> register(
          @Validated @RequestBody RegisterReqDTO registerReqDTO
  ) {
    try {
      AuthenticationResponseDTO responseDTO = authenticationService.registerHealthcareInstitution(registerReqDTO);
      return ResponseEntity.ok(responseDTO);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }

  @PostMapping("/authenticate")
  public ResponseEntity<?> authenticate(
          @RequestBody AuthenticationRequestDTO authenticationRequest
  ) {
    try {
      AuthenticationResponseDTO authenticationResponseDTO = authenticationService.authenticate(authenticationRequest);
      return ResponseEntity.ok(authenticationResponseDTO);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }

  @PostMapping("/refreshtoken")
  public ResponseEntity<?> refreshToken( HttpServletRequest request, HttpServletResponse response ){
    try {
      authenticationService.refreshToken(request, response);
      return ResponseEntity.ok().build();
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: " + e.getMessage());
    } catch (AccessDeniedException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
    }
  }

  @ExceptionHandler(HiNotFoundException.class)
  public ResponseEntity<String> handleHiNotFoundException(HiNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

}
