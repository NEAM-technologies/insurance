import { create } from "zustand";
import { IconType } from "react-icons";

type AlertState = {
  type: "error" | "info" | "success" | null;
  message: string;
  isVisible: boolean;
  icon?: IconType;
  setAlert: (type: "error" | "info" | "success", message: string, icon?: IconType) => void;
  hideAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  type: null,
  message: "",
  isVisible: false,
  icon: undefined, // Default value for icon
  setAlert: (type, message, icon) => {
    // First, hide the alert
    set({ isVisible: false });

    // Wait for 1 second before setting the new alert
    setTimeout(() => {
      set({ type, message, icon, isVisible: true });
    }, 100);
  },
  hideAlert: () => set({ isVisible: false }),
}));
