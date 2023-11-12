import { cloneDeep } from "lodash";

export const USER_ROLES = {
  ADMIN: "ADMIN",
  POLICE: "POLICE",
  MEDIC: "MEDIC",
};

export const Statuses = {
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
  SUSPENDED: "SUSPENDED",
};

export const Privacies = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
};

export const ADDRESS = {
  country: null,
  state: null,
  region: null,
  province: null,
  city: null,
  barangay: null,
  division: null,
  exact: null,
};

export const NAME = {
  title: null,
  first: null,
  middle: null,
  last: null,
  suffix: null,
};

export const Profile = {
  name: cloneDeep(NAME),
  address: cloneDeep(ADDRESS),
  gender: null,
  birthDate: null,
  photoUrl: null,
  phoneNumber: null,
  headline: null,
};

//Default USER
export const USER = Object.freeze({
  id: null,
  email: null,
  emailVerified: null,
  mobileNumber: null,
  approved: false,

  roles: [],

  policeStation: null,
  medicalStation: null,

  status: Statuses.ENABLED,
  profile: cloneDeep(Profile),
});

//Default Beneficiary
export const PET = {
  name: null,
  animal: null,
  color: null,
  weight: null,
  height: null,
  gender: null,
  birthDate: null,

  photos: [],
  photo: [],
};

export const VACCINATION = {
  pet: null, //PET
  veterinarian: null, //VET
};

//Signup
export const SIGNUP = Object.freeze({
  email: null,
  password1: null,
  password2: null,
  policeStation: null,
  medicalStation: null,
  role: null,
});

//POLICE_STATION
export const POLICE_STATION = Object.freeze({
  name: null,
  address: cloneDeep(ADDRESS),
});

//MEDICAL_STATION
export const MEDICAL_STATION = Object.freeze({
  name: null,
  address: cloneDeep(ADDRESS),
});
