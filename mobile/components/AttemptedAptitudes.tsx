import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabaseClient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AttemptedAptitude {
  id: number;
  title: string;
  company_name: string;
  total_marks: number;
  obtained_marks: number;
}

export default function AttemptedAptitudes() {
  const router = useRouter();
  const [attempts, setAttempts] = useState<AttemptedAptitude[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttemptedAptitudes = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user?.id) return;

        const { data: attemptsData, error: attemptsError } = await supabase
          .from("aptitude_responses")
          .select("aptitude_id, marks_obtained")
          .eq("user_id", user.id);
        if (attemptsError) throw attemptsError;
        if (!attemptsData || attemptsData.length === 0) {
          setAttempts([]);
          setLoading(false);
          return;
        }

        const aptitudeScores: { [key: number]: { obtained: number } } = {};
        const aptitudeIdsSet = new Set<number>();
        for (let res of attemptsData) {
          const aptitudeId = res.aptitude_id;
          aptitudeIdsSet.add(aptitudeId);
          aptitudeScores[aptitudeId] = aptitudeScores[aptitudeId] || { obtained: 0 };
          aptitudeScores[aptitudeId].obtained += res.marks_obtained || 0;
        }
        const aptitudeIds = Array.from(aptitudeIdsSet);

        const { data: aptitudeData } = await supabase
          .from("aptitudes")
          .select("id, title, company_id")
          .in("id", aptitudeIds);

        const companyIds = aptitudeData.map((apt: any) => apt.company_id);
        const { data: companyData } = await supabase
          .from("company_details")
          .select("id, company_name")
          .in("id", companyIds);

        const { data: questionsData } = await supabase
          .from("aptitude_questions")
          .select("aptitude_id, marks");

        const totalMarksMap: { [key: number]: number } = {};
        questionsData.forEach((q: any) => {
          totalMarksMap[q.aptitude_id] = (totalMarksMap[q.aptitude_id] || 0) + q.marks;
        });

        const finalAttempts: AttemptedAptitude[] = aptitudeData.map((apt: any) => {
          const company = companyData.find((c: any) => c.id === apt.company_id);
          return {
            id: apt.id,
            title: apt.title,
            company_name: company?.company_name || "Unknown Company",
            total_marks: totalMarksMap[apt.id] || 0,
            obtained_marks: aptitudeScores[apt.id].obtained || 0,
          };
        });

        setAttempts(finalAttempts);
      } catch (error: any) {
        console.error("Error fetching attempted aptitudes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttemptedAptitudes();
  }, []);

  const renderAttempt = ({ item }: { item: AttemptedAptitude }) => (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/AttemptedAptitudeReport", params: { aptitude_id: item.id } })
      }
      style={{
        backgroundColor: "white",
        width: 280,
        marginRight: 16,
        borderRadius: 24,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            backgroundColor: "#EDE9FE",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <MaterialCommunityIcons name="book-open-page-variant" size={32} color="#7C3AED" />
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1F2937" }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 14, color: "#6B7280" }}>{item.company_name}</Text>
        </View>
      </View>

      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#DDD6FE",
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#7C3AED" }}>
          Score: {item.obtained_marks} / {item.total_marks}
        </Text>
      </View>
    </Pressable>
  );

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );

  if (attempts.length === 0)
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text style={{ color: "#6B7280", fontSize: 16 }}>No attempted aptitudes yet.</Text>
      </View>
    );

  return (
    <FlatList
      data={attempts}
      renderItem={renderAttempt}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

