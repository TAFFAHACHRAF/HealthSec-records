package healthcare.org.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PATIENT")
public class Patient extends PhysicalPerson {

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<EmergencyContact> emergencyContacts;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords;
}
