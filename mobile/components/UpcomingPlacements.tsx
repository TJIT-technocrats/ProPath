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
        console.log("Companies fetched:", data);
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
        width: 300, // Slightly increased width to accommodate new layout
        marginRight: 16,
        borderRadius: 24,
        padding: 20, // Increased padding for a spacious look
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      {/* Top section with icon and company name/type */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16, // Increased margin for spacing
        }}
      >
        <View
          style={{
            width: 50, // Slightly smaller icon container
            height: 50,
            borderRadius: 12, // More rounded corners
            backgroundColor: "#F3F4F6", // Lighter background for icon
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <MaterialCommunityIcons name="briefcase" size={28} color="#8B5CF6" /> {/* Darker icon color */}
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text
            style={{
              fontSize: 20, // Bigger font size for company name
              fontWeight: "bold",
              color: "#1F2937",
            }}
          >
            {item.company_name}
          </Text>
          <Text style={{ fontSize: 15, color: "#6B7280" }}>{item.type}</Text> {/* Adjusted font size */}
        </View>
      </View>

      {/* Salary/Stipend Info */}
      {item.salary_or_stipend ? (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500", // Slightly lighter weight
            color: "#4B5563", // Darker gray for better contrast
            marginBottom: 20, // Increased margin for spacing
          }}
        >
          {item.salary_or_stipend}
        </Text>
      ) : (
        <Text style={{ fontSize: 16, color: "#4B5563", marginBottom: 20 }}> {/* Adjusted font size and color */}
          No salary/stipend info
        </Text>
      )}

      {/* Status badge and interview date */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        {/* Status badge */}
        <View
          style={{
            backgroundColor: "#D1FAE5", // Light green background
            paddingHorizontal: 16, // Wider padding
            paddingVertical: 8, // Taller padding
            borderRadius: 20, // Fully rounded capsule shape
            marginRight: 10, // Space between badge and date
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#059669" }}> {/* Slightly larger text */}
            OPEN
          </Text>
        </View>

        {/* Interview Date */}
        <View style={{ 
          flexDirection: "row", 
          alignItems: "center",
          backgroundColor: "#1F2937", // Dark background for date
          paddingHorizontal: 16, // Padding for the date box
          paddingVertical: 8,
          borderRadius: 20, // Rounded corners for date box
        }}>
          <Ionicons name="calendar" size={18} color="white" /> {/* Filled calendar icon, white color */}
          <Text style={{ fontSize: 14, color: "white", fontWeight: "600", marginLeft: 8 }}> {/* White text, bolder */}
            {new Date(item.interview_date).toDateString().substring(0, 10).toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())} {/* Format date to match image "Wed Sept 24 2025" */}
          </Text>
        </View>
      </View>
    </Pressable>
  );

if (loading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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