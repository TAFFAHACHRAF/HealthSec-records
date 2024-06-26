package healthcare.org.repositories;

import healthcare.org.entities.Role;
import healthcare.org.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);
  Page<User> findByRole(Role role, Pageable pageable);
  List<User> findByRole(Role role);
  void deleteByUserIdAndRole(Integer id, Role role);
}
