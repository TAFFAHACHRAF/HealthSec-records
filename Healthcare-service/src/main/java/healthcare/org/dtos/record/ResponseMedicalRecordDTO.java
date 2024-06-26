package healthcare.org.dtos.record;

import healthcare.org.entities.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMedicalRecordDTO {
    private String recordID;
    private Date date;
    private String notes;
    private String diagnosis;
    private String treatment;
    private String patientId;
    private Integer doctorId;
}
