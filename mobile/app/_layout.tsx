// import { Stack } from "expo-router";
// import "../global.css";
// import { useEffect, useState } from "react";
// import { StatusBar, Text, View } from "react-native";
// import { supabase } from "@/lib/supabaseClient";
// import AuthScreen from "./(auth)/auth";

// export default function RootLayout() {
//   const [session, setSession] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setLoading(false);
//     });

//     const { data: subscription } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session);
//       }
//     );

//     return () => {
//       subscription.subscription.unsubscribe();
//     };
//   }, []);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text>Loading…</Text>
//       </View>
//     );
//   }

//   if (!session) {
//     return <AuthScreen onAuth={setSession} />;
//   }

//   return (
//     <>
//       <StatusBar hidden={false} />
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" />
//         <Stack.Screen name="(companyDetails)" />
//       </Stack>
//     </>
//   );
// }
import { Stack } from "expo-router";
import "../global.css";
import { useEffect, useState } from "react";
import { StatusBar, View, Text } from "react-native";
import { supabase } from "@/lib/supabaseClient";
import AuthScreen from "./(auth)/auth";

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading…</Text>
      </View>
    );
  }

  if (!session) return <AuthScreen onAuth={setSession} />;

  return (
    <>
      <StatusBar hidden={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(companyDetails)" />
        <Stack.Screen name="(profileSetup)" />
      </Stack>
    </>
  );
}