import SettingsModule from "@/page/SettingsModule";
import { router } from "expo-router";
import React from "react";

export default function SettingsScreen() {
  const handleNavigate = (section: string) => {
    // 根据section导航到对应页面
    switch (section) {
      case "business-hours":
        router.push("/reserveTimeSetting" as any);
        break;
      case "notifications":
        router.push("/notifications" as any);
        break;
      case "profile":
        router.push("/profile");
        break;
      default:
        console.log("Navigate to:", section);
    }
  };

  return <SettingsModule onNavigate={handleNavigate} />;
}
