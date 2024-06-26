package healthcare.org.dtos.record;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePrescriptionDTO {
    private String medication;
    private String dosage;
    private String frequency;
    private String duration;
}
