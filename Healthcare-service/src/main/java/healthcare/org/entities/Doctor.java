/*package healthcare.org.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("DOCTOR")
public class Doctor extends PhysicalPerson{
    private String specialization;

    @ManyToOne
    @JoinColumn(name = "institutionID")
    private HealthcareInstitution institution;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords;
}
*/