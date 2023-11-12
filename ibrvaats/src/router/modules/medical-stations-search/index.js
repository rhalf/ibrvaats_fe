import MedicalStationLayout from "@/layouts/medical-stations/MedicalStationLayout.vue";

export const medicalStationsSearch = {
  path: "/medical-stations",
  component: MedicalStationLayout,
  children: [
    {
      path: "search",
      name: "MedicalStationSearch",
      component: () => import("@/views/medical-stations/search/SearchView.vue"),
      meta: { authenticated: true, authorization: "MEDIC" },
    },
  ],
};
