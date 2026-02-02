import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { styles } from '../assets/styles/home.styles.js'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors.js'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/'))
          } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
          }
        }
      }
    ])
  }
  return (
    <TouchableOpacity style={styles.logOutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={24} color={COLORS.text} />
    </TouchableOpacity>
  )
}