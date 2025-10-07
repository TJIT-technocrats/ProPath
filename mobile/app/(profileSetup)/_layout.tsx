// Inside app/(companyDetails)/_layout.tsx
// AND
// Inside app/(profileSetup)/_layout.tsx

import { Stack } from 'expo-router';

export default function Layout() {
    return (
    <Stack
      screenOptions={{
        headerShown: false, // ✅ Disable stack header
      }}
    />
  );
}