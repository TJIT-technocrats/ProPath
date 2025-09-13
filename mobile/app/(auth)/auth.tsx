import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { supabase } from "@/lib/supabaseClient";

export default function AuthScreen({ onAuth }: { onAuth?: (session: any) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [abcNumber, setAbcNumber] = useState("");   
  const [password, setPassword] = useState("");    
  const [name, setName] = useState("");           

  const normalizeBec = (input: string) => {
    return `${input.trim().toLowerCase()}@tjit.com`;
  };

  const handleLogin = async () => {
    const emailAddress = normalizeBec(abcNumber);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailAddress,
      password,
    });

    if (error) Alert.alert("Error", error.message);
    else if (data?.session) onAuth?.(data.session);
    else Alert.alert("Login successful", "No session returned");
  };

  const handleSignup = async () => {
    const emailAddress = normalizeBec(abcNumber);
    const { data, error } = await supabase.auth.signUp({
      email: emailAddress,
      password,
      options: {
        data: { name, role: "student" },
      },
    });
    if (error) Alert.alert("Error", error.message);
    else if (data.session) onAuth?.(data.session);
    else Alert.alert("Signup successful, check your email");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-gray-100" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6">
          <View className="bg-white p-8 rounded-3xl shadow-lg">
            <Text className="text-2xl font-bold mb-2 text-[#2D2D2D]">
              Hi, Student!
            </Text>
            <Text className="text-lg mb-10">
              {mode === "login" ? "Login to your account" : "Create your account to start learning"}
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
            >
              <Text className="text-white text-center text-lg font-semibold">
                {mode === "login" ? "Login" : "Signup"}
              </Text>
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
