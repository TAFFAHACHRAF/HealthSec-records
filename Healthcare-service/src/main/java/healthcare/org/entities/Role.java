package healthcare.org.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static healthcare.org.entities.Permission.*;

@RequiredArgsConstructor
public enum Role {
  USER(Collections.emptySet()),
  HEALTHCARE_INSTITUTION(
          Set.of(
                  READ_PATIENTS,
                  ADD_PATIENTS,
                  UPDATE_ITS_PATIENT,
                  DELETE_ITS_PATIENT,
                  READ_THEIR_DOCTORS,
                  ADD_DOCTOR,
                  UPDATE_ITS_DOCTOR,
                  DELETE_ITS_DOCTOR,
                  READ_PATIENT_RECORDS,
                  ADD_PATIENT_RECORD
          )
  ),
  DOCTOR(
          Set.of(
                  READ_PATIENTS,
                  ADD_PATIENTS,
                  UPDATE_ITS_PATIENT,
                  DELETE_ITS_PATIENT,
                  READ_PATIENT_RECORDS,
                  ADD_PATIENT_RECORD
          )
  ),
  ADMINISTRATOR(
          Set.of(
                  // Add relevant permissions here
          )
  );

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions().stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}
