import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  onAuth?: (session: any) => void;
};

export default function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [abcNumber, setAbcNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeBec = (input: string) =>
    `${input.trim().toLowerCase()}@tjit.com`;

  async function ensureProfile(user: any, displayName?: string) {
    if (!user?.id) return;
    const profile = {
      id: user.id,
      full_name: displayName ?? user.user_metadata?.full_name ?? null,
      email: user.email ?? null,
    };
    const { error: upsertError } = await supabase
      .from("users")
      .upsert([profile], { returning: "minimal" });
    if (upsertError) {
      console.warn("Could not upsert profile:", upsertError);
    }
  }

  const handleSignup = async () => {
    if (!abcNumber || !password || !name) {
      Alert.alert(
        "Missing fields",
        "Please fill BEC number, name and password."
      );
      return;
    }

    setLoading(true);
    const emailAddress = normalizeBec(abcNumber);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailAddress,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        Alert.alert("Signup failed", error.message);
        setLoading(false);
        return;
      }

      const user = data?.user ?? null;

      if (user?.id) {
        await ensureProfile(user, name);
      } else {
        console.log(
          "Signup returned no user object, you may need email confirm flow."
        );
      }
      if (data?.session) {
        onAuth?.(data.session);
      }

      Alert.alert("Signup", user ? "Signup complete." : "Signup done.");
    } catch (err: any) {
      console.error("signup error", err);
      Alert.alert("Signup error", err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!abcNumber || !password) {
      Alert.alert("Missing fields", "Please fill BEC number and password.");
      return;
    }

    setLoading(true);
    const emailAddress = normalizeBec(abcNumber);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailAddress,
        password,
      });

      if (error) {
        Alert.alert("Login failed", error.message);
        setLoading(false);
        return;
      }

      const session = data?.session ?? null;
      const user = data?.user ?? (await supabase.auth.getUser()).data?.user;

      await ensureProfile(user);

      if (session) {
        onAuth?.(session);
      }

      Alert.alert("Login successful");
    } catch (err: any) {
      console.error("login error", err);
      Alert.alert("Login error", err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        className="flex-1 bg-gray-100"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-6">
          <View className="bg-white p-8 rounded-3xl shadow-lg">
            <Text className="text-2xl font-bold mb-2 text-[#2D2D2D]">
              Hi, Student!
            </Text>
            <Text className="text-lg mb-6">
              {mode === "login"
                ? "Login to your account"
                : "Create your account"}
            </Text>

            {mode === "signup" && (
              <>
                <Text className="text-gray-600 mb-1">Name</Text>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl mb-4 text-base text-gray-800"
                  placeholder="Enter your Name"
                  value={name}
                  onChangeText={setName}
                />
              </>
            )}

            <Text className="text-gray-600 mb-1">BEC Number</Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-xl mb-4 text-base text-gray-800"
              placeholder="Enter your BEC Number"
              value={abcNumber}
              onChangeText={setAbcNumber}
              autoCapitalize="none"
            />

            <Text className="text-gray-600 mb-1">Password</Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-xl mb-6 text-base text-gray-800"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              className="bg-purple-600 py-4 rounded-2xl mb-4"
              onPress={mode === "login" ? handleLogin : handleSignup}
              disabled={loading}
            >
              <View style={{ alignItems: "center" }}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-center text-lg font-semibold">
                    {mode === "login" ? "Login" : "Signup"}
                  </Text>
                )}
              </View>
            </Pressable>

            <Text className="text-center text-gray-500 text-sm">
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <Text
                    onPress={() => setMode("signup")}
                    className="text-purple-600 font-semibold"
                  >
                    Sign Up
                  </Text>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Text
                    onPress={() => setMode("login")}
                    className="text-purple-600 font-semibold"
                  >
                    Login
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
