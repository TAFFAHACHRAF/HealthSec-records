package healthcare.org.dtos.doctor;

import healthcare.org.ennumerations.GENDER;
import healthcare.org.ennumerations.INSTYPE;
import healthcare.org.entities.Role;
import lombok.Data;

import java.util.Date;

@Data
public class DoctorResponseDTO {
    private Integer userId;
    private String firstname;
    private String lastname;
    private String phone;
    private String email;
    private String address;
    private GENDER gender;
    private Date dateOfBirth;
    private String cin;
    private String doctorSpecialization;
    private Role role;
    private Integer hiId;
}
