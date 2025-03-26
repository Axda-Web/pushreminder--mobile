import { Stack } from "expo-router";
import { RevenueCatProvider } from "@/providers/RevenueCatProvider";

export default function RootLayout() {
  return (
    <RevenueCatProvider>
      <Stack />
    </RevenueCatProvider>
  );
}
