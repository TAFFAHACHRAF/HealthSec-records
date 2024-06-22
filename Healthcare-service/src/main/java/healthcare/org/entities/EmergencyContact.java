/*package healthcare.org.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("EMERGENCYCONTACT")
public class EmergencyContact extends PhysicalPerson{
    private String relationship;

    @ManyToOne
    @JoinColumn(name = "patientID")
    private Patient patient;
}
*/