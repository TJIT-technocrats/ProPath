// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Alert,
//   Pressable,
//   KeyboardAvoidingView,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "expo-router";

// type Props = {};

// export default function AuthScreen({}: Props) {
//   const [mode, setMode] = useState<"login" | "signup">("login");
//   const [abcNumber, setAbcNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const normalizeBec = (input: string) =>
//     ${input.trim().toLowerCase()}@tjit.com;

//   async function ensureProfile(user: any, displayName?: string) {
//     if (!user?.id) return;

//     // Fetch existing profile
//     const { data: existingProfile } = await supabase
//       .from("users")
//       .select("profile_completed")
//       .eq("id", user.id)
//       .single();

//     const profile = {
//       id: user.id,
//       full_name: displayName ?? user.user_metadata?.full_name ?? null,
//       email: user.email ?? null,
//       profile_completed: existingProfile?.profile_completed ?? false, // keep existing value
//     };

//     await supabase.from("users").upsert([profile], { returning: "minimal" });
//   }

//   const handleLoginOrSignup = async () => {
//     if (!abcNumber || !password || (mode === "signup" && !name)) {
//       Alert.alert("Missing fields", "Please fill all required fields.");
//       return;
//     }

//     setLoading(true);
//     const email = normalizeBec(abcNumber);

//     try {
//       let user;
//       if (mode === "signup") {
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: { data: { full_name: name } },
//         });
//         if (error) throw error;
//         user = data?.user;
//         if (user) await ensureProfile(user, name);
//       } else {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         user = data?.user ?? (await supabase.auth.getUser()).data?.user;
//         if (user) await ensureProfile(user);
//       }

//       const { data: profileData } = await supabase
//         .from("users")
//         .select("profile_completed")
//         .eq("id", user.id)
//         .single();

//       if (!profileData?.profile_completed) {
//         router.replace("/(profileSetup)");
//       } else {
//         router.replace("/(tabs)");
//       }
//     } catch (err: any) {
//       Alert.alert(
//         mode === "login" ? "Login Error" : "Signup Error",
//         err.message ?? String(err)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         className="bg-gray-100"
//       >
//         <View className="flex-1 justify-center px-6">
//           <View className="bg-white p-8 rounded-3xl shadow-lg">
//             <Text className="text-2xl font-bold mb-2 text-[#2D2D2D]">
//               Hi, Student!
//             </Text>
//             <Text className="text-lg mb-6">
//               {mode === "login"
//                 ? "Login to your account"
//                 : "Create your account"}
//             </Text>

//             {mode === "signup" && (
//               <>
//                 <Text className="text-gray-600 mb-1">Name</Text>
//                 <TextInput
//                   placeholder="Enter your Name"
//                   value={name}
//                   onChangeText={setName}
//                   className="bg-gray-100 p-4 rounded-xl mb-4"
//                 />
//               </>
//             )}

//             <Text className="text-gray-600 mb-1">BEC Number</Text>
//             <TextInput
//               placeholder="Enter your BEC Number"
//               value={abcNumber}
//               onChangeText={setAbcNumber}
//               autoCapitalize="none"
//               className="bg-gray-100 p-4 rounded-xl mb-4"
//             />

//             <Text className="text-gray-600 mb-1">Password</Text>
//             <TextInput
//               placeholder="Enter your password"
//               secureTextEntry
//               value={password}
//               onChangeText={setPassword}
//               className="bg-gray-100 p-4 rounded-xl mb-6"
//             />

//             <Pressable
//               className="bg-purple-600 py-4 rounded-2xl mb-4"
//               onPress={handleLoginOrSignup}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text className="text-white text-center text-lg font-semibold">
//                   {mode === "login" ? "Login" : "Signup"}
//                 </Text>
//               )}
//             </Pressable>

//             <Text className="text-center text-gray-500 text-sm">
//               {mode === "login" ? (
//                 <>
//                   Don’t have an account?{" "}
//                   <Text
//                     onPress={() => setMode("signup")}
//                     className="text-purple-600 font-semibold"
//                   >
//                     Sign Up
//                   </Text>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{" "}
//                   <Text
//                     onPress={() => setMode("login")}
//                     className="text-purple-600 font-semibold"
//                   >
//                     Login
//                   </Text>
//                 </>
//               )}
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

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
  Platform,
} from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};

export default function AuthScreen({}: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [abcNumber, setAbcNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const normalizeBec = (input: string) =>
    `${input.trim().toLowerCase()}@tjit.com`;

  async function ensureProfile(user: any, displayName?: string) {
    if (!user?.id) return;

    const { data: existingProfile } = await supabase
      .from("users")
      .select("profile_completed")
      .eq("id", user.id)
      .single();

    const profile = {
      id: user.id,
      full_name: displayName ?? user.user_metadata?.full_name ?? null,
      email: user.email ?? null,
      profile_completed: existingProfile?.profile_completed ?? false,
    };

    await supabase.from("users").upsert([profile], { returning: "minimal" });
  }

  const handleLoginOrSignup = async () => {
    if (!abcNumber || !password || (mode === "signup" && !name)) {
      Alert.alert("Missing fields", "Please fill all required fields.");
      return;
    }

    setLoading(true);
    const email = normalizeBec(abcNumber);

    try {
      let user;
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        user = data?.user;
        if (user) await ensureProfile(user, name);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        user = data?.user ?? (await supabase.auth.getUser()).data?.user;
        if (user) await ensureProfile(user);
      }

      const { data: profileData } = await supabase
        .from("users")
        .select("profile_completed")
        .eq("id", user.id)
        .single();

      if (!profileData?.profile_completed) {
        router.replace("/(profileSetup)");
      } else {
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      Alert.alert(
        mode === "login" ? "Login Error" : "Signup Error",
        err.message ?? String(err)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Gradient background */}
        <LinearGradient
          colors={["#C1AFFC", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />

        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}>
          <View
            style={{
              backgroundColor: "#E6E7FC",
              padding: 32,
              borderRadius: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 8,
                color: "#6366f1",
                textAlign: "center",
              }}
            >
              Hi, Student!
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 24,
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              {mode === "login" ? "Login to your account" : "Create your account"}
            </Text>

            {mode === "signup" && (
              <>
                <Text style={{ color: "#6b7280", marginBottom: 4, fontSize: 16 }}>Name</Text>
                <TextInput
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 16,
                    fontSize: 16,
                    color: "#1f2937",
                  }}
                  placeholder="Enter your Name"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                />
              </>
            )}

            <Text style={{ color: "#6b7280", marginBottom: 4, fontSize: 16 }}>BEC Number</Text>
            <TextInput
              style={{
                backgroundColor: "#f3f4f6",
                padding: 16,
                borderRadius: 12,
                marginBottom: 16,
                fontSize: 16,
                color: "#1f2937",
              }}
              placeholder="Enter your BEC Number"
              placeholderTextColor="#9ca3af"
              value={abcNumber}
              onChangeText={setAbcNumber}
              autoCapitalize="none"
            />

            <Text style={{ color: "#6b7280", marginBottom: 4, fontSize: 16 }}>Password</Text>
            <TextInput
              style={{
                backgroundColor: "#f3f4f6",
                padding: 16,
                borderRadius: 12,
                marginBottom: 24,
                fontSize: 16,
                color: "#1f2937",
              }}
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              style={{
                backgroundColor: "#6366f1",
                paddingVertical: 16,
                borderRadius: 16,
                marginBottom: 16,
                shadowColor: "#6366f1",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
              onPress={handleLoginOrSignup}
              disabled={loading}
            >
              <View style={{ alignItems: "center" }}>
                {loading ? (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <ActivityIndicator color="white" size="small" />
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                      {mode === "login" ? "Logging in..." : "Creating Account..."}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    {mode === "login" ? "Login" : "Signup"}
                  </Text>
                )}
              </View>
            </Pressable>

            {mode === "login" ? (
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
                <Text style={{ textAlign: "center", color: "#6b7280", fontSize: 14 }}>
                  Not having an account?
                </Text>
                <Pressable onPress={() => setMode("signup")}>
                  <Text style={{ color: "#6366f1", fontWeight: "600", marginLeft: 4 }}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
                <Text style={{ textAlign: "center", color: "#6b7280", fontSize: 14 }}>
                  Already have an account?
                </Text>
                <Pressable onPress={() => setMode("login")}>
                  <Text style={{ color: "#6366f1", fontWeight: "600", marginLeft: 4 }}>
                    Login
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}