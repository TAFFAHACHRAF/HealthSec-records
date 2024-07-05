package healthcare.org.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import healthcare.org.dtos.doctor.DoctorResponseDTO;
import healthcare.org.dtos.doctor.DoctorSaveRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationResponseDTO;
import healthcare.org.dtos.healthcare_institution.ChangePasswordRequestDTO;
import healthcare.org.dtos.healthcare_institution.RegisterReqDTO;
import healthcare.org.entities.Patient;
import healthcare.org.entities.Role;
import healthcare.org.entities.User;
import healthcare.org.exceptions.HiNotFoundException;
import healthcare.org.exceptions.PatientNotFoundException;
import healthcare.org.mappers.DoctorMapper;
import healthcare.org.repositories.UserRepository;
import healthcare.org.security.JwtService;
import healthcare.org.token.Token;
import healthcare.org.token.TokenRepository;
import healthcare.org.token.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

  private final UserRepository userRepository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final DoctorMapper doctorMapper;

  @Override
  public AuthenticationResponseDTO registerHealthcareInstitution(RegisterReqDTO request) {
    User user = createUserFromRequest(request, Role.HEALTHCARE_INSTITUTION);
    return processUserRegistration(user);
  }

  @Override
  public DoctorResponseDTO saveDoctor(DoctorSaveRequestDTO request) {
    try {
      User hi = userRepository.findById(request.getHiId())
              .orElseThrow(() -> new HiNotFoundException("HealthcareInstitution with id " + request.getHiId() + " not found"));

      User user = doctorMapper.toEntity(request);
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setRole(Role.DOCTOR);
      user.setHealthcareInstitution(hi);
      User savedUser = userRepository.save(user);
      return doctorMapper.toDoctorResponseDTO(savedUser);
    } catch (HiNotFoundException e) {
      throw new HiNotFoundException(e.getMessage());
    }
  }

  @Override
  public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getEmail()));
    String jwtToken = jwtService.generateToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponseDTO.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .role(user.getRole())
            .personID(user.getUserId())
            .build();
  }

  @Override
  public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      User user = userRepository.findByEmail(userEmail)
              .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userEmail));
      if (jwtService.isTokenValid(refreshToken, user)) {
        String accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        AuthenticationResponseDTO authResponse = AuthenticationResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }

  @Override
  public void changePassword(ChangePasswordRequestDTO request, Principal connectedUser) {
    User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
      throw new IllegalStateException("Wrong current password");
    }
    if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
      throw new IllegalStateException("New passwords do not match");
    }

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);
  }

  @Override
  public List<DoctorResponseDTO> getAllDoctors() {
    return userRepository.findByRole(Role.DOCTOR).stream()
            .map(doctorMapper::toDoctorResponseDTO)
            .collect(Collectors.toList());
  }

  @Override
  public Page<DoctorResponseDTO> getAllDoctors(Pageable pageable) {
    return userRepository.findByRole(Role.DOCTOR, pageable)
            .map(doctorMapper::toDoctorResponseDTO);
  }

  @Override
  public User findById(Integer id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
  }

  @Override
  public void updateDoctor(User user) {
    userRepository.save(user);
  }

  @Override
  @Transactional
  public void deleteDoctor(Integer id) {
    // Check if user exists with id and has role DOCTOR
    User user = userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("Doctor not found with id: " + id));
    if (user.getRole() != Role.DOCTOR) {
      throw new IllegalStateException("User with id " + id + " is not a doctor");
    }
    userRepository.deleteByUserIdAndRole(id, Role.DOCTOR);
  }

  private User createUserFromRequest(RegisterReqDTO request, Role role) {
    return User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(role)
            .build();
  }

  private User createUserFromDoctorRequest(DoctorSaveRequestDTO request, Role role) {
    return User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(role)
            .build();
  }

  private AuthenticationResponseDTO processUserRegistration(User user) {
    User savedUser = userRepository.save(user);
    String jwtToken = jwtService.generateToken(savedUser);
    String refreshToken = jwtService.generateRefreshToken(savedUser);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponseDTO.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .role(user.getRole())
            .personID(user.getUserId())
            .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    Token token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }
}
