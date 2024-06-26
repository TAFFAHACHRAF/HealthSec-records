package healthcare.org.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "medical_record")
public class MedicalRecord {
    @Id
    private String recordID;

    private Date date;
    private String notes;
    private String diagnosis;
    private String treatment;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private User institution;

    @OneToMany(mappedBy = "medicalRecord", cascade = CascadeType.ALL)
    private List<Prescription> prescriptions;

    @Override
    public String toString() {
        return "MedicalRecord{" +
                "id=" + recordID +
                ", recordID='" + recordID + '\'' +
                ", date=" + date +
                ", notes='" + notes + '\'' +
                ", diagnosis='" + diagnosis + '\'' +
                ", treatment='" + treatment + '\'' +
                ", patient=" + (patient != null ? patient.getPersonID() : null) + // Avoid infinite loop
                '}';
    }
}
