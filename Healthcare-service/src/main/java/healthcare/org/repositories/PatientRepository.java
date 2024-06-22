package healthcare.org.repositories;

import healthcare.org.entities.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface PatientRepository extends CrudRepository<Patient, String> {

    Page<Patient> findAll(Pageable pageable);

    Patient findByCin(String cin);

    Patient findByEmail(String email);

    Patient findByCinOrEmail(String cin, String email);
}
