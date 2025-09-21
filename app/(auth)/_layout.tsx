import { NavBack } from '@/components';
import { Stack, router } from 'expo-router';


export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown:false
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          headerShown: true,
          header:()=><NavBack onBack={()=>router.back()}/>
        }} 
      />
    </Stack>
  );
}