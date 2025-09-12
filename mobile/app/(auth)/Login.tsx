// import React, { useState } from "react";
// import { View, Text, TextInput, Alert, Pressable } from "react-native";
// import { supabase } from "@/lib/supabaseClient";

// export default function Login({ onLogin }: { onLogin: any }) {
//   const [abcNumber, setAbcNumber] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     // Example: use abcNumber as username stored in metadata
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: `${abcNumber}`,
//       password,
//     });
//     if (error) Alert.alert("Error", error.message);
//     else onLogin(data.session);
//   };

//   return (
//     <View className="h-screen flex items-center justify-center">
//       <Text className="text-3xl">Student Login</Text>
//       <TextInput
//         placeholder="ABC Number"
//         value={abcNumber}
//         onChangeText={setAbcNumber}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Pressable onPress={handleLogin}>
//         <Text>Login</Text>
//       </Pressable>
//     </View>
//   );
// }
import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, Link } from "expo-router";

export default function Login({ onLogin }: { onLogin: any }) {
  const [abcNumber, setAbcNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${abcNumber}`,
      password,
    });
    if (error) Alert.alert("Error", error.message);
    else onLogin(data.session);
  };

  return (
    <View className="flex-1 bg-gray-50 justify-center px-6">
      {/* Card Container */}
      <View className="bg-white p-8 rounded-3xl shadow-lg">
        <Text className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Student Login
        </Text>

        {/* ABC Number Input */}
        <Text className="text-gray-600 mb-1">ABC Number</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-xl mb-4 text-base text-gray-800"
          placeholder="Enter your ABC Number"
          value={abcNumber}
          onChangeText={setAbcNumber}
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

        {/* Login Button */}
        <Pressable
          className="bg-purple-600 py-4 rounded-2xl mb-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Login
          </Text>
        </Pressable>

        {/* Forgot Password / Signup Prompt */}
        <Text className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          {/* <Text
            className="text-purple-600 font-semibold"
            onPress={() => {
              router.push("/(auth)/Signup");
            }}
          >
            Sign Up
          </Text> */}
          <Link href="/Signup" className="text-purple-600 font-semibold">
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
}
