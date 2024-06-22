package healthcare.org.dtos;

import healthcare.org.ennumerations.GENDER;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class SavePatientReqDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Gender is required")
    private GENDER gender;

    @NotNull(message = "Date of birth is required")
    private Date dateOfBirth;

    @Column(unique = true)
    @NotBlank(message = "Cin is required")
    private String cin;
}
