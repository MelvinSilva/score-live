// ga-config.js

import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("G-9Q33CB6BDV");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
