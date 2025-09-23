import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function ProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [application, setApplication] = useState("");
  const [objective, setObjective] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [projects, setProjects] = useState("");
  const [certificates, setCertificates] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Error", "No logged-in user found");
        router.replace("/(auth)/auth");
      } else {
        setUserId(user.id);
      }
    };
    getUser();
  }, []);

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    if (!userId) return;

    setLoading(true);
    try {
      const updateData = {
        phone,
        department,
        current_year: currentYear,
        cgpa: parseFloat(cgpa) || 0,
        application,
        objective,
        skills: skills.split(",").map((s) => s.trim()),
        education: education.split(",").map((s) => s.trim()),
        projects: projects.split(",").map((s) => s.trim()),
        certificates: certificates.split(",").map((s) => s.trim()),
        profile_completed: true,
      };

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", userId);

      if (error) throw error;

      Alert.alert("Profile Setup", "Profile setup complete!");
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Error", err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => step > 1 && setStep(step - 1);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      await uploadAvatar(result.assets[0].uri);
    }
  };

  // const uploadAvatar = async (uri: string) => {
  //   if (!userId) return;

  //   // Convert image to blob
  //   const response = await fetch(uri);
  //   const blob = await response.blob();

  //   // Create a unique file name
  //   const fileExt = uri.split(".").pop() || "jpg";
  //   const fileName = ${userId}.${fileExt};
  //   const filePath = ${fileName};

  //   let { error } = await supabase.storage
  //     .from("avatars")
  //     .upload(filePath, blob, {
  //       cacheControl: "3600",
  //       upsert: true, // replaces old avatar if exists
  //       contentType: blob.type,
  //     });

  //   if (error) {
  //     Alert.alert("Upload Error", error.message);
  //     return;
  //   }

  //   // If bucket is public, you can build the public URL:
  //   const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  //   const publicUrl = data.publicUrl;

  //   // Update your user profile row in DB with avatar URL
  //   const { error: updateError } = await supabase
  //     .from("users")
  //     .update({ avatar_url: publicUrl })
  //     .eq("id", userId);

  //   if (updateError) {
  //     Alert.alert("DB Update Error", updateError.message);
  //   } else {
  //     Alert.alert("Success", "Avatar uploaded successfully!");
  //   }
  // };

  const uploadAvatar = async (uri: string) => {
    if (!userId) return;

    try {
      // Read file as a blob
      const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const blob = new Blob(
        [Uint8Array.from(atob(file), (c) => c.charCodeAt(0))],
        {
          type: "image/jpeg",
        }
      );

      const fileExt = uri.split(".").pop() || "jpg";
      const fileName = `${userId}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, blob, {
          cacheControl: "3600",
          upsert: true,
          contentType: blob.type,
        });

      if (error) throw error;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      await supabase
        .from("users")
        .update({ avatar_url: data.publicUrl })
        .eq("id", userId);

      Alert.alert("Success", "Avatar uploaded successfully!");
    } catch (err: any) {
      Alert.alert("Upload Error", err.message ?? String(err));
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-6">
      <View className="flex h-screen items-center justify-center">
        {/* Header with Background and Icon */}
        <View className="items-center mb-6">
          <View className="w-full h-32 bg-purple-500 rounded-b-3xl absolute -top-6"></View>
          <View className="bg-white p-4 rounded-full shadow-md -mt-16">
            <View className="w-24 h-24 rounded-full bg-purple-100 justify-center items-center">
              <AntDesign name="form" size={50} color="#6366F1" />
            </View>
          </View>
          <TouchableOpacity
            onPress={pickImage}
            className="bg-purple-500 px-4 py-2 rounded-xl mb-4"
          >
            <Text className="text-white font-bold text-center">
              {avatarUri ? "Change Avatar" : "Upload Avatar"}
            </Text>
          </TouchableOpacity>

          {avatarUri && (
            <Image
              source={{ uri: avatarUri }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginTop: 10,
              }}
            />
          )}

          <Text className="text-2xl font-bold text-white mt-1">
            Profile Setup
          </Text>
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-md">
          {step === 1 && (
            <>
              <Text className="text-xl font-bold mb-4 text-gray-800">
                Step 1: Contact & Department 📝
              </Text>
              <View className="flex-row items-center mb-4 border border-gray-300 rounded-lg p-3">
                <AntDesign name="phone" size={20} color="#6B7280" />
                <TextInput
                  placeholder="Phone"
                  value={phone}
                  onChangeText={setPhone}
                  className="flex-1 ml-3 text-base text-gray-700"
                  keyboardType="phone-pad"
                />
              </View>
              <View className="flex-row items-center mb-4 border border-gray-300 rounded-lg p-3">
                <AntDesign name="book" size={20} color="#6B7280" />
                <TextInput
                  placeholder="Department"
                  value={department}
                  onChangeText={setDepartment}
                  className="flex-1 ml-3 text-base text-gray-700"
                />
              </View>
            </>
          )}
          {step === 2 && (
            <>
              <Text className="text-xl font-bold mb-4 text-gray-800">
                Step 2: Academic Info 🎓
              </Text>
              <View className="flex-row items-center mb-4 border border-gray-300 rounded-lg p-3">
                <AntDesign name="calendar" size={20} color="#6B7280" />
                <TextInput
                  placeholder="Current Year"
                  value={currentYear}
                  onChangeText={setCurrentYear}
                  className="flex-1 ml-3 text-base text-gray-700"
                />
              </View>
              <View className="flex-row items-center mb-4 border border-gray-300 rounded-lg p-3">
                <AntDesign className="linechart" size={20} color="#6B7280" />
                <TextInput
                  placeholder="CGPA"
                  value={cgpa}
                  onChangeText={setCgpa}
                  className="flex-1 ml-3 text-base text-gray-700"
                  keyboardType="numeric"
                />
              </View>
            </>
          )}
          {step === 3 && (
            <>
              <Text className="text-xl font-bold mb-4 text-gray-800">
                Step 3: Application & Objective 🎯
              </Text>
              <View className="mb-4 border border-gray-300 rounded-lg p-3">
                <Text className="text-gray-500 text-sm">Application</Text>
                <TextInput
                  placeholder="Application"
                  value={application}
                  onChangeText={setApplication}
                  className="text-base text-gray-700"
                  multiline
                />
              </View>
              <View className="mb-4 border border-gray-300 rounded-lg p-3">
                <Text className="text-gray-500 text-sm">Objective</Text>
                <TextInput
                  placeholder="Objective"
                  value={objective}
                  onChangeText={setObjective}
                  className="text-base text-gray-700"
                  multiline
                />
              </View>
              <View className="mb-4 border border-gray-300 rounded-lg p-3">
                <Text className="text-gray-500 text-sm">
                  Skills (comma separated)
                </Text>
                <TextInput
                  placeholder="e.g., React, Node.js, SQL"
                  value={skills}
                  onChangeText={setSkills}
                  className="text-base text-gray-700"
                  multiline
                />
              </View>
            </>
          )}
          {step === 4 && (
            <>
              <Text className="text-xl font-bold mb-4 text-gray-800">
                Step 4: Education 📖
              </Text>
              <View className="mb-4 border border-gray-300 rounded-lg p-3">
                <Text className="text-gray-500 text-sm">Education details</Text>
                <TextInput
                  placeholder="e.g., B.Tech in Computer Science, 2024"
                  value={education}
                  onChangeText={setEducation}
                  className="text-base text-gray-700"
                  multiline
                />
              </View>
            </>
          )}
          {step === 5 && (
            <>
              <Text className="text-xl font-bold mb-4 text-gray-800">
                Step 5: Projects & Certificates 🏆
              </Text>
              <View className="mb-4 border border-gray-300 rounded-lg p-3">
                <Text className="text-gray-500 text-sm">
                  Projects (comma separated)
                </Text>
                <TextInput
                  placeholder="e.g., E-commerce App, Portfolio Website"
                  value={projects}
                  onChangeText={setProjects}
                  className="text-base text-gray-700"
                  multiline
                />
              </View>
              <View className="mb-4 border border-gray-300 rounded-lg p-3">
                <Text className="text-gray-500 text-sm">
                  Certificates (comma separated)
                </Text>
                <TextInput
                  placeholder="e.g., AWS Certified Developer, Google Analytics"
                  value={certificates}
                  onChangeText={setCertificates}
                  className="text-base text-gray-700"
                  multiline
                />
              </View>
            </>
          )}
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row justify-between mt-6">
          {step > 1 && (
            <TouchableOpacity
              onPress={handlePrevious}
              className="flex-1 bg-gray-400 px-6 py-4 rounded-xl shadow-md mr-2"
            >
              <Text className="text-white font-bold text-center">Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleNext}
            disabled={loading}
            className={`flex-1 ${step > 1 ? "ml-2" : ""} bg-purple-500 px-6 py-4 rounded-xl shadow-md`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-center">
                {step === 5 ? "Finish" : "Next"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}