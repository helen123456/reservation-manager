import SettingsModule from "@/page/SettingsModule";
import React from "react";

export default function SettingsScreen() {
  // SettingsModule 内部已通过 expo-router 自行处理子页面跳转，无需在此再注入回调。
  return <SettingsModule />;
}
