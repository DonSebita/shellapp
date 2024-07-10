import { AuthProvider } from '@/components/authProvider';
import { Slot } from 'expo-router';
import { TotalDepositsProvider } from "@/components/depositos/totalDepositos";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TotalDepositsProvider>
        <Slot />
      </TotalDepositsProvider>
    </AuthProvider>
  );
}
