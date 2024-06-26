package healthcare.org.controllers;

import healthcare.org.dtos.healthcare_institution.AuthenticationRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationResponseDTO;
import healthcare.org.dtos.healthcare_institution.ChangePasswordRequestDTO;
import healthcare.org.dtos.healthcare_institution.RegisterReqDTO;
import healthcare.org.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  @PatchMapping
  public ResponseEntity<?> changePassword(
          @Validated @RequestBody ChangePasswordRequestDTO request,
          Principal connectedUser
  ) {
    authenticationService.changePassword(request, connectedUser);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponseDTO> register(
          @Validated @RequestBody RegisterReqDTO request
  ) {
    return ResponseEntity.ok(authenticationService.registerHealthcareInstitution(request));
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponseDTO> authenticate(
      @RequestBody AuthenticationRequestDTO request
  ) {
    return ResponseEntity.ok(authenticationService.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    authenticationService.refreshToken(request, response);
  }

}
