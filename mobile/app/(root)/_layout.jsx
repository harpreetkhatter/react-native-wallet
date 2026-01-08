import { Stack } from "expo-router/stack";

export default function Layout() {
  // Avoid calling Clerk hooks here to ensure this layout can render even when
  // the ClerkProvider hasn't been initialized yet.
  return <Stack screenOptions={{ headerShown: false }} />;
}
