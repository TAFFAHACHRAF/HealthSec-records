package healthcare.org.mappers;

import healthcare.org.dtos.doctor.DoctorResponseDTO;
import healthcare.org.dtos.doctor.DoctorSaveRequestDTO;
import healthcare.org.dtos.doctor.DoctorUpdateRequestDTO;
import healthcare.org.entities.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorMapperImpl implements DoctorMapper {

    @Override
    public DoctorResponseDTO toDoctorResponseDTO(User user) {
        if (user == null) {
            return null;
        }
        DoctorResponseDTO dto = new DoctorResponseDTO();
        BeanUtils.copyProperties(user, dto);
        if(user.getHealthcareInstitution() != null)
            dto.setHiId(user.getHealthcareInstitution().getUserId());
        return dto;
    }

    @Override
    public User toEntity(DoctorSaveRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        BeanUtils.copyProperties(dto, user);
        return user;
    }

    @Override
    public void updateFromDto(DoctorUpdateRequestDTO dto, User user) {
        if (dto == null || user == null) {
            return;
        }
        BeanUtils.copyProperties(dto, user);
    }

    @Override
    public List<DoctorResponseDTO> toDoctorResponseDTOList(List<User> users) {
        return users.stream()
                .map(this::toDoctorResponseDTO)
                .collect(Collectors.toList());
    }
}
