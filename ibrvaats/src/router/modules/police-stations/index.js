import PoliceStationLayout from "@/layouts/police-stations/PoliceStationLayout.vue";

import { USER_ROLES } from "@/constants";
const { POLICE } = USER_ROLES;

export const policeStations = {
  path: "/police-stations",
  component: PoliceStationLayout,
  children: [
    {
      path: "search",
      name: "PoliceStationSearch",
      component: () => import("@/views/police-stations/search/SearchView.vue"),
      meta: { authenticated: true, authorization: POLICE },
    },

    {
      path: ":policeStationId/dashboard",
      name: "PoliceStationDashboard",
      component: () =>
        import("@/views/police-stations/dashboard/DashboardView.vue"),
      meta: { authenticated: true, authorization: POLICE },
    },
    {
      path: ":policeStationId/users",
      children: [
        {
          path: "summary",
          name: "PoliceStationUsersSummary",
          component: () =>
            import("@/views/police-stations/users/UsersSummary.vue"),
          meta: { authenticated: true, authorization: POLICE },
        },
        {
          path: ":userId",
          name: "PoliceStationUsersView",
          component: () =>
            import("@/views/police-stations/users/UsersView.vue"),
          meta: { authenticated: true, authorization: POLICE },
        },
      ],
    },
    {
      path: ":policeStationId/datas",
      children: [
        {
          path: "summary",
          name: "PoliceStationDatasSummary",
          component: () =>
            import("@/views/police-stations/datas/DatasSummary.vue"),
          meta: { authenticated: true, authorization: POLICE },
        },
        // {
        //   path: ":id",
        //   name: "PolicePetView",
        //   component: () => import("@/views/police-stations/datas/PetView.vue"),
        //   meta: {
        //     authenticated: true,
        //     authorization: POLICE,
        //     mode: "UPDATE",
        //   },
        // },
      ],
    },
    {
      path: ":policeStationId/units",
      children: [
        {
          path: "summary",
          name: "PoliceStationUnitsSummary",
          component: () =>
            import("@/views/police-stations/units/UnitsSummary.vue"),
          meta: { authenticated: true, authorization: POLICE },
        },
      ],
    },
  ],
};
