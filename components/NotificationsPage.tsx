import React from "react";
import NotificationsModule from "./NotificationsModule";
import { NotificationsPageProps } from "./NotificationsModule/types";

export default function NotificationsPage({ onBack }: NotificationsPageProps) {
  return <NotificationsModule onBack={onBack} />;
}
