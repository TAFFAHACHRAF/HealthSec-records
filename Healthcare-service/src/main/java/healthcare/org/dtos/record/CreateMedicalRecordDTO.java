package healthcare.org.dtos.record;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateMedicalRecordDTO {

    /*@NotNull
    @PastOrPresent(message = "Date must be in the past or present")
    private Date date;*/

    @NotBlank(message = "Notes must not be blank")
    private String notes;

    @NotBlank(message = "Diagnosis must not be blank")
    private String diagnosis;

    @NotBlank(message = "Treatment must not be blank")
    private String treatment;

    @Valid
    @NotBlank(message = "Treatment must not be blank")
    private String patientId;

    @NotNull(message = "Doctor ID must not be null")
    private Integer doctorID;
}
