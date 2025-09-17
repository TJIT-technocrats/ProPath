import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabaseClient";

interface Company {
  id: number;
  company_name: string;
  type: string;
  salary_or_stipend: string;
  interview_date: string;
}

export default function UpcomingPlacements() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("company_details")
        .select("*")
        .gt("interview_date", new Date().toISOString())
        .order("interview_date", { ascending: true });

      if (error) {
        console.log("Error fetching companies", error);
      } else {
        console.log("Companies fetched:", data); // 👈 check your salary field here
        setCompanies(data as Company[]);
      }
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const renderCompany = ({ item }: { item: Company }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/CompanyDetails",
          params: { id: item.id },
        })
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
      {/* top section with icon */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
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
          <MaterialCommunityIcons name="briefcase" size={32} color="#7C3AED" />
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#1F2937",
            }}
          >
            {item.company_name}
          </Text>
          <Text style={{ fontSize: 14, color: "#6B7280" }}>{item.type}</Text>
        </View>
      </View>

      {/* salary */}
      {item.salary_or_stipend ? (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#059669",
            marginBottom: 8,
          }}
        >
          💰 {item.salary_or_stipend}
        </Text>
      ) : (
        <Text style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 8 }}>
          No salary/stipend info
        </Text>
      )}

      {/* interview date */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <Ionicons name="calendar-outline" size={18} color="#6B7280" />
        <Text style={{ fontSize: 14, color: "#6B7280", marginLeft: 6 }}>
          {new Date(item.interview_date).toDateString()}
        </Text>
      </View>

      {/* status badge */}
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#D1FAE5",
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#059669" }}>
          Open
        </Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <FlatList
      data={companies}
      renderItem={renderCompany}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

