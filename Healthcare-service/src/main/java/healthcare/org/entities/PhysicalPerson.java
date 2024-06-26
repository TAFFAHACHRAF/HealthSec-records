package healthcare.org.entities;

import healthcare.org.ennumerations.GENDER;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorValue("PHYSICAL_PERSON")
public class PhysicalPerson extends Person {
    @Enumerated(EnumType.STRING)
    private GENDER gender;

    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    private String cin;
}
