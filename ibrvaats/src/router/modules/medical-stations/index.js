import MedicalStationLayout from "@/layouts/medical-stations/MedicalStationLayout.vue";

import { USER_ROLES } from "@/constants";
const { MEDIC } = USER_ROLES;

export const medicalStations = {
  path: "/medical-stations",
  component: MedicalStationLayout,
  children: [
    {
      path: "search",
      name: "MedicalStationSearch",
      component: () => import("@/views/medical-stations/search/SearchView.vue"),
      meta: { authenticated: true, authorization: MEDIC },
    },

    {
      path: ":medicalStationId/dashboard",
      name: "MedicalStationDashboard",
      component: () =>
        import("@/views/medical-stations/dashboard/DashboardView.vue"),
      meta: { authenticated: true, authorization: MEDIC },
    },
    {
      path: ":medicalStationId/users",
      children: [
        {
          path: "summary",
          name: "MedicalStationUsersSummary",
          component: () =>
            import("@/views/medical-stations/users/UsersSummary.vue"),
          meta: { authenticated: true, authorization: MEDIC },
        },
        {
          path: ":userId",
          name: "MedicalStationUsersView",
          component: () =>
            import("@/views/medical-stations/users/UsersView.vue"),
          meta: { authenticated: true, authorization: MEDIC },
        },
      ],
    },
    {
      path: ":medicalStationId/datas",
      children: [
        {
          path: "summary",
          name: "MedicalStationDatasSummary",
          component: () =>
            import("@/views/medical-stations/datas/DatasSummary.vue"),
          meta: { authenticated: true, authorization: MEDIC },
        },
        // {
        //   path: ":id",
        //   name: "MedicalPetView",
        //   component: () => import("@/views/medical-stations/datas/PetView.vue"),
        //   meta: {
        //     authenticated: true,
        //     authorization: MEDIC,
        //     mode: "UPDATE",
        //   },
        // },
      ],
    },
    {
      path: ":medicalStationId/units",
      children: [
        {
          path: "summary",
          name: "MedicalStationUnitsSummary",
          component: () =>
            import("@/views/medical-stations/units/UnitsSummary.vue"),
          meta: { authenticated: true, authorization: MEDIC },
        },
      ],
    },
  ],
};
