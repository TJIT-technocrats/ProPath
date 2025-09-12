import { Stack } from "expo-router";
import "../global.css";
import { useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";

import Login from "./(auth)/Login";
import Signup from "./(auth)/Signup";
import { supabase } from "@/lib/supabaseClient";

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

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
    return () => subscription.subscription.unsubscribe();
  }, []);

  if (loading) return <Text>Loading…</Text>;

  if (!session) {
    return showSignup ? (
      <Signup onSignup={setSession} onShowLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={setSession} onShowSignup={() => setShowSignup(true)} />
    );
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
