export const items = [
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    subtitle: "Dashboard View",
    to: { name: "AdminDashboard" },
  },
  {
    icon: "mdi-police-station",
    title: "Police Stations",
    subtitle: "Manage Police Stations",
    to: { name: "AdminPoliceStationsSummary" },
  },
  {
    icon: "mdi-hospital-building",
    title: "Medical Stations",
    subtitle: "Manage Medical Stations",
    to: { name: "AdminMedicalStationsSummary" },
  },
  {
    icon: "mdi-access-point",
    title: "Units",
    subtitle: "Manage Units",
    to: { name: "AdminUnitsSummary" },

    // children: [
    //   {
    //     icon: "mdi-format-list-bulleted",
    //     title: "Summary",
    //     subtitle: "Manage Units",
    //     to: { name: "AdminUnitsSummary" },
    //   },
    //   {
    //     icon: "mdi-package-up",
    //     title: "Bulk Upload",
    //     subtitle: "Multiple Registration",
    //     to: { name: "AdminUnitsBulkUpload" },
    //   },
    // ],
  },
  {
    icon: "mdi-account-multiple",
    title: "Users",
    subtitle: "Manage Users",
    to: { name: "AdminUsersSummary" },
  },
];
