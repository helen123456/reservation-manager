import ProfileModule from '@/page/ProfileModule';
import { router } from 'expo-router';
import React from 'react';

export default function ProfileScreen() {
  const handleBack = () => {
    router.back();
  };

  return <ProfileModule onBack={handleBack} />;
}