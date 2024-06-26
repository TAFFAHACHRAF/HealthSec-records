package healthcare.org.mappers;

import healthcare.org.dtos.doctor.DoctorResponseDTO;
import healthcare.org.dtos.doctor.DoctorSaveRequestDTO;
import healthcare.org.dtos.doctor.DoctorUpdateRequestDTO;
import healthcare.org.entities.User;

import java.util.List;

public interface DoctorMapper {
    DoctorResponseDTO toDoctorResponseDTO(User user);
    User toEntity(DoctorSaveRequestDTO dto);
    void updateFromDto(DoctorUpdateRequestDTO dto, User user);
    List<DoctorResponseDTO> toDoctorResponseDTOList(List<User> users);
}
