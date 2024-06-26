package healthcare.org.dtos.healthcare_institution;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChangePasswordRequestDTO {
    @NotEmpty(message = "Current password is required")
    private String currentPassword;

    @NotEmpty(message = "New password is required")
    private String newPassword;

    @NotEmpty(message = "Password confirmation is required")
    private String confirmationPassword;
}
