import AdminLayout from "@/layouts/admin/AdminLayout.vue";

export const admin = {
  path: "/admin",
  component: AdminLayout,
  children: [
    {
      path: "dashboard",
      name: "AdminDashboard",
      component: () => import("@/views/admin/dashboard/DashboardView.vue"),
      meta: { authenticated: true, authorization: "ADMIN" },
    },
    {
      path: "police-stations",
      children: [
        {
          path: "summary",
          name: "AdminPoliceStationsSummary",
          component: () =>
            import("@/views/admin/police-stations/PoliceStationsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "medical-stations",
      children: [
        {
          path: "summary",
          name: "AdminMedicalStationsSummary",
          component: () =>
            import("@/views/admin/medical-stations/MedicalStationsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "units",
      children: [
        {
          path: "summary",
          name: "AdminUnitsSummary",
          component: () => import("@/views/admin/units/UnitsSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
        {
          path: "bulk-upload",
          name: "AdminUnitsBulkUpload",
          component: () => import("@/views/admin/units/UnitsBulkUpload.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
    {
      path: "users",
      children: [
        {
          path: "summary",
          name: "AdminUsersSummary",
          component: () => import("@/views/admin/users/UsersSummary.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
        {
          path: ":userId",
          name: "AdminUsersView",
          component: () => import("@/views/admin/users/UsersView.vue"),
          meta: { authenticated: true, authorization: "ADMIN" },
        },
      ],
    },
  ],
};
