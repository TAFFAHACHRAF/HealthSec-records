package healthcare.org.controllers;

import healthcare.org.dtos.healthcare_institution.AuthenticationRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationResponseDTO;
import healthcare.org.dtos.healthcare_institution.ChangePasswordRequestDTO;
import healthcare.org.dtos.healthcare_institution.RegisterReqDTO;
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
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class AuthenticationController {

  private final AuthenticationService authenticationService;
  /*
    This controller manage :
        Healthcare institutions [Registration, Authentication, change password, refresh token]
   */

  @PatchMapping("/changepassword")
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
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(
          @Validated @RequestBody RegisterReqDTO registerReqDTO
  ) {
    try {
      AuthenticationResponseDTO responseDTO = authenticationService.registerHealthcareInstitution(registerReqDTO);
      return ResponseEntity.ok(responseDTO);
    } catch (Exception e) {
      // Handle 500 Internal Server Error for any unexpected exceptions
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

  @PostMapping("/refresh-token")
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    try {
      authenticationService.refreshToken(request, response);
    } catch (AccessDeniedException e) {
      // Handle 403 Forbidden (Access Denied)
      response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden: " + e.getMessage());
    } catch (Exception e) {
      // Handle other unexpected errors with a 500 Internal Server Error
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal Server Error: " + e.getMessage());
    }
  }

}
