import { Stack } from "expo-router";
import "../global.css";
import { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { supabase } from "@/lib/supabaseClient";
import AuthScreen from "./(auth)/auth"; // new combined login/signup

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading…</Text>
      </View>
    );
  }

  if (!session) {
    return <AuthScreen onAuth={setSession} />;
  }

  return (
    <>
      <StatusBar hidden={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(companyDetails)" />
      </Stack>
    </>
  );
}
