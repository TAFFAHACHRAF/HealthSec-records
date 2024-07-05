package healthcare.org.dtos.doctor;

import healthcare.org.ennumerations.GENDER;
import healthcare.org.ennumerations.INSTYPE;
import healthcare.org.entities.Role;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class DoctorSaveRequestDTO {
    @NotBlank(message = "Firstname is required")
    private String firstname;

    @NotBlank(message = "Lastname is required")
    private String lastname;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Gender is required")
    private GENDER gender;

    @NotNull(message = "Date of birth is required")
    private Date dateOfBirth;

    @Column(unique = true)
    @NotBlank(message = "Cin is required")
    private String cin;

    @NotBlank(message = "Doctor specialization is required")
    private String doctorSpecialization;

    @NotNull(message = "HI id is required")
    private Integer hiId;
}
