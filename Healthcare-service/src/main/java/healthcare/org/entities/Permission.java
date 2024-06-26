package healthcare.org.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    READ_PATIENTS("read_patients"),
    READ_THEIR_DOCTORS("hi_read_their_doctors"),
    ADD_DOCTOR("hi_add_doctor"),
    UPDATE_ITS_DOCTOR("hi_update_its_doctor"),
    DELETE_ITS_DOCTOR("hi_delete_its_doctor"),
    ADD_PATIENTS("add_patients"),
    UPDATE_ITS_PATIENT("doctor_update_its_patient"),
    DELETE_ITS_PATIENT("doctor_delete_its_patient"),
    READ_PATIENT_RECORDS("read_patient_records"),
    ADD_PATIENT_RECORD("add_patient_record");

    @Getter
    private final String permission;
}
