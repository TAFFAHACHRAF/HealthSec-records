// types/record.ts

export interface ResponseMedicalRecordDTO {
    recordID: string;
    date: Date;
    notes: string;
    diagnosis: string;
    treatment: string;
    patientId: string;
    doctorId: number;
  }
  