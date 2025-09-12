import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "expo-router";

export default function Signup({ onSignup }: { onSignup: any }) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      name,
      email,
      password,
      options: {
        data: { role: "student" },
      },
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else if (data.session) {
      onSignup(data.session);
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
        <Text className="text-lg mb-10">
          Create your account to start learning
        </Text>

        <Text className="text-gray-600 mb-1">Name</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-xl mb-4 text-base text-gray-800"
          placeholder="Enter your Name"
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <Text className="text-gray-600 mb-1">BEC Number</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-xl mb-4 text-base text-gray-800"
          placeholder="Enter your BEC Number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password Input */}
        <Text className="text-gray-600 mb-1">Password</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-xl mb-6 text-base text-gray-800"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Signup Button */}
        <Pressable
          className="bg-purple-500 py-4 rounded-2xl mb-4"
          onPress={handleSignup}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Signup
          </Text>
        </Pressable>

        {/* Already have an account? */}
        <Text className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="/(auth)/Login" className="text-purple-500 font-semibold">
            Login
          </Link>
        </Text>
      </View>
    </View>
  );
}
