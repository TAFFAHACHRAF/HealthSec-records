package healthcare.org.services;

import healthcare.org.dtos.doctor.DoctorResponseDTO;
import healthcare.org.dtos.doctor.DoctorSaveRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationRequestDTO;
import healthcare.org.dtos.healthcare_institution.AuthenticationResponseDTO;
import healthcare.org.dtos.healthcare_institution.ChangePasswordRequestDTO;
import healthcare.org.dtos.healthcare_institution.RegisterReqDTO;
import healthcare.org.entities.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.io.IOException;
import java.security.Principal;
import java.util.List;

public interface AuthenticationService {
    AuthenticationResponseDTO registerHealthcareInstitution(RegisterReqDTO request);
    DoctorResponseDTO saveDoctor(DoctorSaveRequestDTO request); // Changed parameter type here
    AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    void changePassword(ChangePasswordRequestDTO request, Principal connectedUser);
    List<DoctorResponseDTO> getAllDoctors();
    Page<DoctorResponseDTO> getAllDoctors(Pageable pageable);
    User findById(Integer id);
    void updateDoctor(User user);
    void deleteDoctor(Integer id);
}
