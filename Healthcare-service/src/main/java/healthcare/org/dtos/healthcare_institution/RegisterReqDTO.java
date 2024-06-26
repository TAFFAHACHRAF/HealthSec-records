package healthcare.org.dtos.healthcare_institution;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterReqDTO {
  @NotBlank(message = "Firstname is required")
  private String firstname;

  @NotBlank(message = "Lastname is required")
  private String lastname;

  @NotBlank(message = "Email is required")
  @Email(message = "Email should be valid")
  @Column(unique = true)
  private String email;

  @NotBlank(message = "Password is required")
  private String password;
}
