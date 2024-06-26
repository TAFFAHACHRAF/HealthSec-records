package healthcare.org.entities;

import healthcare.org.ennumerations.GENDER;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmergencyContact {
    @Id
    private String emergencyContactID;
    private String firstname;
    private String lastname;
    private String phone;
    private String email;
    private String address;
    private String relationship;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Enumerated(EnumType.STRING)
    private GENDER gender;

    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    private String cin;
}
