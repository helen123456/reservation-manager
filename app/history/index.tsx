import HistoryOrder from '@/page/HistoryOrder';
import { router } from 'expo-router';
import React from 'react';

export default function HistoryScreen() {
  const handleBack = () => {
    router.back();
  };

  return <HistoryOrder onBack={handleBack} />;
}