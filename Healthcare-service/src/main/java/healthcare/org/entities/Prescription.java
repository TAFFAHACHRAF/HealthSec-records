package healthcare.org.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Prescription {
    @Id
    private String prescriptionID;

    private String medication;
    private String dosage;
    private String frequency;
    private String duration;

    @ManyToOne
    @JoinColumn(name = "recordID")
    private MedicalRecord medicalRecord;
}
