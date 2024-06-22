package healthcare.org.dtos;

import healthcare.org.ennumerations.GENDER;
import lombok.Data;
import java.util.Date;

@Data
public class PatientDTO {
    private String personID;
    private String name;
    private String phone;
    private String email;
    private String address;
    private GENDER gender;
    private Date dateOfBirth;
    private String cin;
}
