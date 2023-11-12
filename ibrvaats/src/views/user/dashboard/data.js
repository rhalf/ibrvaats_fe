import { USER_ROLES } from "@/constants";
const { POLICE, MEDIC, ADMIN } = USER_ROLES;

export const dashboardItems = [
  {
    icon: "mdi-police-station",
    title: "Police Stations",
    height: 240,
    roles: [POLICE, ADMIN],
    visible: true,
    soon: false,
    disabled: false,
    to: { name: "PoliceStationSearch" },
  },
  {
    icon: "mdi-hospital-building",
    title: "MEDICAL Stations",
    height: 240,
    roles: [MEDIC, ADMIN],
    visible: true,
    soon: false,
    disabled: false,
    to: { name: "MedicalStationSearch" },
  },
  {
    icon: "mdi-account-network",
    title: "Admin Panel",
    height: 240,
    roles: [ADMIN],
    visible: true,
    soon: false,
    disabled: false,

    to: { name: "AdminDashboard" },
  },
];
