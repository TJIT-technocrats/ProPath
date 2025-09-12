// import React, { useState } from "react";
// import { View, Text, TextInput, Alert, Pressable } from "react-native";
// import { supabase } from "@/lib/supabaseClient";

// export default function Signup({ onSignup }: { onSignup: any }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { role: "student" },
//       },
//     });
//     if (error) Alert.alert("Error", error.message);
//     else onSignup(data.session);
//   };

//   return (
//     <View>
//       <Text>Student Signup</Text>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Pressable onPress={handleSignup}>
//         <Text>Signup</Text>
//       </Pressable>
//     </View>
//   );
// }
import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable, StyleSheet, Image } from "react-native";
import { supabase } from "@/lib/supabaseClient";

export default function Signup({ onSignup }: { onSignup: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "student" },
      },
    });
    if (error) Alert.alert("Error", error.message);
    else onSignup(data.session);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, Student!</Text>
      <Text style={styles.subtitle}>Create your account to start learning</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
    color: "#2D2D2D",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FFD23F",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D2D2D",
  },
});
