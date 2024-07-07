package healthcare.org.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import healthcare.org.dtos.doctor.DoctorResponseDTO;
import healthcare.org.dtos.doctor.DoctorSaveRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationResponseDTO;
import healthcare.org.dtos.healthcare_institution.ChangePasswordRequestDTO;
import healthcare.org.dtos.healthcare_institution.RegisterReqDTO;
import healthcare.org.entities.Role;
import healthcare.org.entities.User;
import healthcare.org.exceptions.HiNotFoundException;
import healthcare.org.mappers.DoctorMapper;
import healthcare.org.repositories.UserRepository;
import healthcare.org.security.JwtService;
import healthcare.org.token.Token;
import healthcare.org.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthenticationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private DoctorMapper doctorMapper;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerHealthcareInstitution() {
        RegisterReqDTO request = new RegisterReqDTO();
        request.setFirstname("John");
        request.setLastname("Doe");
        request.setEmail("john.doe@example.com");
        request.setPassword("password");

        User user = new User();
        user.setUserId(1);
        user.setFirstname("John");
        user.setLastname("Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("encodedPassword");
        user.setRole(Role.HEALTHCARE_INSTITUTION);

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");
        when(jwtService.generateRefreshToken(any(User.class))).thenReturn("refreshToken");

        AuthenticationResponseDTO response = authenticationService.registerHealthcareInstitution(request);

        assertNotNull(response);
        assertEquals("jwtToken", response.getAccessToken());
        assertEquals("refreshToken", response.getRefreshToken());
        assertEquals(Role.HEALTHCARE_INSTITUTION, response.getRole());
    }

    @Test
    void saveDoctor() {
        DoctorSaveRequestDTO request = new DoctorSaveRequestDTO();
        request.setFirstname("Jane");
        request.setLastname("Doe");
        request.setEmail("jane.doe@example.com");
        request.setPassword("password");
        request.setHiId(1);

        User hi = new User();
        hi.setUserId(1);
        hi.setRole(Role.HEALTHCARE_INSTITUTION);

        User doctor = new User();
        doctor.setUserId(2);
        doctor.setFirstname("Jane");
        doctor.setLastname("Doe");
        doctor.setEmail("jane.doe@example.com");
        doctor.setPassword("encodedPassword");
        doctor.setRole(Role.DOCTOR);
        doctor.setHealthcareInstitution(hi);

        when(userRepository.findById(anyInt())).thenReturn(Optional.of(hi));
        when(doctorMapper.toEntity(any(DoctorSaveRequestDTO.class))).thenReturn(doctor);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(doctor);
        when(doctorMapper.toDoctorResponseDTO(any(User.class))).thenReturn(new DoctorResponseDTO());

        DoctorResponseDTO response = authenticationService.saveDoctor(request);

        assertNotNull(response);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void authenticate() {
        AuthenticationRequestDTO request = new AuthenticationRequestDTO();
        request.setEmail("john.doe@example.com");
        request.setPassword("password");

        User user = new User();
        user.setUserId(1);
        user.setEmail("john.doe@example.com");
        user.setPassword("encodedPassword");
        user.setRole(Role.HEALTHCARE_INSTITUTION);

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");
        when(jwtService.generateRefreshToken(any(User.class))).thenReturn("refreshToken");

        AuthenticationResponseDTO response = authenticationService.authenticate(request);

        assertNotNull(response);
        assertEquals("jwtToken", response.getAccessToken());
        assertEquals("refreshToken", response.getRefreshToken());
        assertEquals(Role.HEALTHCARE_INSTITUTION, response.getRole());
    }



    @Test
    void getAllDoctors() {
        User doctor = new User();
        doctor.setUserId(1);
        doctor.setRole(Role.DOCTOR);

        when(userRepository.findByRole(Role.DOCTOR)).thenReturn(Collections.singletonList(doctor));
        when(doctorMapper.toDoctorResponseDTO(any(User.class))).thenReturn(new DoctorResponseDTO());

        List<DoctorResponseDTO> response = authenticationService.getAllDoctors();

        assertNotNull(response);
        assertEquals(1, response.size());
    }

    @Test
    void testGetAllDoctors_withPaging() {
        User doctor = new User();
        doctor.setUserId(1);
        doctor.setRole(Role.DOCTOR);

        Pageable pageable = PageRequest.of(0, 10);
        Page<User> doctorPage = new PageImpl<>(Arrays.asList(doctor), pageable, 1);

        when(userRepository.findByRole(Role.DOCTOR, pageable)).thenReturn(doctorPage);
        when(doctorMapper.toDoctorResponseDTO(any(User.class))).thenReturn(new DoctorResponseDTO());

        Page<DoctorResponseDTO> response = authenticationService.getAllDoctors(pageable);

        assertNotNull(response);
        assertEquals(1, response.getTotalElements());
    }

    @Test
    void findById() {
        User user = new User();
        user.setUserId(1);

        when(userRepository.findById(anyInt())).thenReturn(Optional.of(user));

        User foundUser = authenticationService.findById(1);

        assertNotNull(foundUser);
    }

    @Test
    void updateDoctor() {
        User user = new User();
        user.setUserId(1);

        when(userRepository.save(any(User.class))).thenReturn(user);

        authenticationService.updateDoctor(user);

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void deleteDoctor() {
        User user = new User();
        user.setUserId(1);
        user.setRole(Role.DOCTOR);

        when(userRepository.findById(anyInt())).thenReturn(Optional.of(user));
        doNothing().when(userRepository).deleteByUserIdAndRole(anyInt(), any(Role.class));

        authenticationService.deleteDoctor(1);

        verify(userRepository, times(1)).deleteByUserIdAndRole(1, Role.DOCTOR);
    }
}
