package healthcare.org.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalRecord {
    @Id
    private String recordID;

    private Date date;
    private String notes;
    private String diagnosis;
    private String treatment;

    @ManyToOne
    @JoinColumn(name = "patientID")
    private Patient patient;

    /*@ManyToOne
    @JoinColumn(name = "doctorID")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "institutionID")
    private HealthcareInstitution institution;*/

    @OneToMany(mappedBy = "medicalRecord", cascade = CascadeType.ALL)
    private List<Prescription> prescriptions;
}
