import PoliceStationLayout from "@/layouts/police-stations/PoliceStationLayout.vue";

export const policeStationsSearch = {
  path: "/police-stations",
  component: PoliceStationLayout,
  children: [
    {
      path: "search",
      name: "PoliceStationSearch",
      component: () => import("@/views/police-stations/search/SearchView.vue"),
      meta: { authenticated: true, authorization: "POLICE" },
    },
  ],
};
