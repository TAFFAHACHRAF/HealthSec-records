export type Patient = {
  personID: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    gender: 'MALE' | 'FEMALE';
    dateOfBirth: string;
    cin: string;
    doctorID: number;
  }
  