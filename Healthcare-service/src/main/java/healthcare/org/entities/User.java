package healthcare.org.entities;

import healthcare.org.ennumerations.GENDER;
import healthcare.org.ennumerations.INSTYPE;
import healthcare.org.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer userId;

  private String firstname;
  private String lastname;
  private String phone;
  private String email;
  private String address;
  private String password;

  @Enumerated(EnumType.STRING)
  private GENDER gender;

  @Temporal(TemporalType.DATE)
  private Date dateOfBirth;

  private String cin;
  private String doctorSpecialization;

  @Enumerated(EnumType.STRING)
  private Role role;

  @Enumerated(EnumType.STRING)
  private INSTYPE institutionInstype;

  @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
  private List<Patient> patients; // One doctor can have multiple patients

  @ManyToOne
  @JoinColumn(name = "institution_id")
  private User healthcareInstitution;

  @OneToMany(mappedBy = "healthcareInstitution", cascade = CascadeType.ALL)
  private List<User> doctors;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
