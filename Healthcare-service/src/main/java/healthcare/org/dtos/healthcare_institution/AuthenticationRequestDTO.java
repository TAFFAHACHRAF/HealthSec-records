package healthcare.org.dtos.healthcare_institution;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequestDTO {
  @NotEmpty(message = "Email is required")
  private String email;

  @NotEmpty(message = "Password is required")
  String password;
}
