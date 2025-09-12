import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "expo-router";

const normalizeBec = (input: string) => {
  return `${input.trim().toLowerCase()}@tjit.com`;
};

export default function Login({ onLogin }: { onLogin: any }) {
  const [abcNumber, setAbcNumber] = useState<string>("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const emailAddress = normalizeBec(abcNumber);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailAddress,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else if (data?.session) {
      if (onLogin) onLogin(data.session);
    } else {
      Alert.alert("Login successful", "No session returned");
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      {/* Card Container */}
      <View className="bg-white p-8 rounded-3xl shadow-lg">
        <Text className="text-2xl font-bold mb-2 text-[#2D2D2D]">
          Hi, Student!
        </Text>
        <Text className="text-lg mb-10">Login to your account</Text>
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
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Login
          </Text>
        </Pressable>
        <Text className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link href="/(auth)/Signup" className="text-purple-600 font-semibold">
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}
