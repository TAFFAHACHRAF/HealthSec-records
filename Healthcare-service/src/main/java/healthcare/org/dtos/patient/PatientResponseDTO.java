package healthcare.org.dtos.patient;

import healthcare.org.ennumerations.GENDER;
import lombok.Data;
import java.util.Date;

@Data
public class PatientResponseDTO {
    private String personID;
    private String firstname;
    private String lastname;
    private String phone;
    private String email;
    private String address;
    private GENDER gender;
    private Date dateOfBirth;
    private String cin;
    private Integer doctorID;
}
