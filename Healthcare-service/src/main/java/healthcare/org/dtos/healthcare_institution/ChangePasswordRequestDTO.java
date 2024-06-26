package healthcare.org.dtos.healthcare_institution;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChangePasswordRequestDTO {
    private String currentPassword;
    private String newPassword;
    private String confirmationPassword;
}
