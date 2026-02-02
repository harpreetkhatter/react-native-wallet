import { Stack } from "expo-router/stack";
import {useUser} from "@clerk/clerk-expo"
import {Redirect} from "expo-router"

export default function Layout() {
  // Avoid calling Clerk hooks here to ensure this layout can render even when
  // the ClerkProvider hasn't been initialized yet.
  const {isSignedIn,isLoaded}= useUser();
  if(!isLoaded) return null;
  if(!isSignedIn) return <Redirect href={"/sign-in"} />
  return <Stack screenOptions={{ headerShown: false }} />;
}
