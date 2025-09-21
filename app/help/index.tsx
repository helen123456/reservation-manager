import HelpSupport from '@/page/HelpSupport';
import { router } from 'expo-router';
import React from 'react';

export default function HelpScreen() {
  const handleBack = () => {
    router.back();
  };

  return <HelpSupport onBack={handleBack} />;
}