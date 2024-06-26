package healthcare.org.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import healthcare.org.entities.MedicalRecord;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, String> {
}
