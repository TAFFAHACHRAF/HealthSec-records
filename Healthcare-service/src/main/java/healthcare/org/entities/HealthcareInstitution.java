/*package healthcare.org.entities;

import healthcare.org.ennumerations.INSTYPE;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("INSTITUTION")
public class HealthcareInstitution extends Person{
    @Id
    private String institutionID;

    private INSTYPE instype;

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL)
    private List<Doctor> doctors;

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords;
}
*/