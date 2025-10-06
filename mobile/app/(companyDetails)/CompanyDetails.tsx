import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabaseClient";
import { SafeAreaView } from 'react-native-safe-area-context';

// --- HELPER FUNCTIONS ---

const renderList = (data: string[] | undefined, bulletType: 'dot' | 'number') => {
    if (!data || data.length === 0 || (data.length === 1 && data[0].trim() === '')) 
        return <Text className="text-base text-gray-500">Not provided.</Text>;

    return data.map((item: string, idx: number) => (
        // Added a key and trimmed each item to ensure clean rendering
        <Text key={idx} className="text-base text-gray-700 mb-2 leading-6">
            {bulletType === 'dot' ? '•' : `${idx + 1}.`} {item.trim()}
        </Text>
    ));
};

// --- COMPONENT ---

export default function CompanyDetails() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [company, setCompany] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            supabase
                .from("company_details")
                .select("*")
                .eq("id", id)
                .single()
                .then(({ data, error }) => {
                    if (error) console.error(error);
                    else setCompany(data);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading)
        return (
            <View className="flex-1 items-center justify-center bg-gray-100">
                <ActivityIndicator size="large" color="#8B5CF6" />
            </View>
        );

    if (!company)
        return (
            <View className="flex-1 items-center justify-center bg-gray-100">
                <Text>No company found</Text>
            </View>
        );

    // Data normalization logic is kept the same
    const jobDescription = Array.isArray(company.job_description)
        ? company.job_description
        : company.job_description?.split("\n");
    const requirements = Array.isArray(company.requirements)
        ? company.requirements
        : company.requirements?.split("\n");
    const selectionProcess = Array.isArray(company.selection_process)
        ? company.selection_process
        : company.selection_process?.split("\n");

    return (
        // Main container with the overall light purple background
        <SafeAreaView edges={['top']} className="flex-1 bg-[#7260C1]"> 
            
            {/* Header Section */}
            <View className="px-6 pt-4 pb-7 flex-row items-center bg-transparent z-10">
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    className="w-12 h-12 rounded-full items-center justify-center bg-white shadow-lg"
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white ml-4">
                    Company Details
                </Text>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 120 }} // Add padding for the fixed button
                showsVerticalScrollIndicator={false}
            >
                {/* Main Company Card (White background for details, part of the purple zone) */}
                <View className="bg-white mx-6 p-6 rounded-2xl shadow-lg mt-0">
                    
                    {/* Company Title and Logo */}
                    <View className="flex-row items-start mb-4">
                        {/* Logo Placeholder */}
                        <View className="w-16 h-16 rounded-lg bg-purple-200/50 items-center justify-center mr-4">
                             <MaterialIcons name="business" size={36} color="#8B5CF6" />
                        </View>
                        
                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-gray-800 mb-0">
                                {company.company_name || "Dhee Coding Lab"}
                            </Text>
                            <Text className="text-base text-gray-600">
                                {company.type || "Internship"}
                            </Text>
                        </View>
                    </View>

                    {/* Status and Details Pills - MODIFIED SECTION */}
                    <View>
                        {/* FIRST ROW: Status and Location */}
                        <View className="flex-row items-center space-x-2 mb-2 ">
                            {/* Status Pill */}
                            <View
                                className={`px-3 py-2 rounded-lg self-start mr-2 ${
                                    (company.status === "Open" || company.status === "OPEN") ? "bg-green-100" : "bg-red-100"
                                }`}
                            >
                                <Text
                                    className={`text-xs font-semibold ${
                                        (company.status === "Open" || company.status === "OPEN") ? "text-green-700" : "text-red-700"
                                    }`}
                                >
                                    {company.status || "OPEN"}
                                </Text>
                            </View>
                            
                            {/* Location Pill */}
                            {company.location && (
                                <View className="flex-row items-center px-3 py-1 rounded-lg"
                                style={{ backgroundColor: "#CEC4FA" }}>
                                    <Ionicons name="location-outline" size={14} color="#374151" />
                                    <Text className="text-sm text-gray-700 ml-1">
                                        {company.location || "Bangalore"}
                                    </Text>
                                </View>
                            )}
                        </View>
                        
                        {/* SECOND ROW: Date and Salary */}
                        <View className="flex-row items-center space-x-4 mb-3">
                            {/* Date Pill (Black background) */}
                            {company.last_date && (
                                <View className="flex-row items-center bg-gray-900 px-3 py-1 rounded-lg mr-2">
                                    <FontAwesome name="calendar" size={12} color="white" />
                                    <Text className="text-sm text-white ml-2">
                                        {company.last_date || "2025-09-19"}
                                    </Text>
                                </View>
                            )}
                            
                            {/* Salary Pill (Soft purple background) */}
                            {company.salary && (
                                <View className="flex-row items-center bg-indigo-200 px-3 py-1 rounded-lg ">
                                    <FontAwesome name="dollar" size={12} color="#4F46E5" />
                                    <Text className="text-sm text-indigo-700 ml-2">
                                        {company.salary || "$ 10,000"}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                </View>
                {/* --- SINGLE LARGE WHITE CONTENT CONTAINER START --- */}
                {/* This container defines the large white card with the rounded top corners. */}
                <View 
                    className="bg-gray-50 flex-1 mx-0 pt-6 shadow-md"
                    style={{ 
                        marginTop: 24, // Matches the gap in your design
                        borderTopLeftRadius: 35, // Large radius for top-left
                        borderTopRightRadius: 35, // Large radius for top-right
                        paddingHorizontal: 24, // Horizontal padding for the content inside
                        paddingBottom: 20, // Padding at the bottom before the button space
                    }}
                >
                    
                    {/* 1. Job Description Section (Light grey box) */}
                    <View className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#DFE9FB" }}> 
                        <Text className="text-xl font-bold text-gray-900 mb-4">
                            JOB DESCRIPTION
                        </Text>
                        {renderList(jobDescription, 'dot')}
                    </View>

                    {/* 2. Requirements Section (Light grey box) */}
                    <View className=" p-6 rounded-2xl mb-6" style={{ backgroundColor: "#DBDCFF" }}>
                        <Text className="text-xl font-bold text-gray-900 mb-4">
                            REQUIREMENTS
                        </Text>
                        {renderList(requirements, 'dot')}
                    </View>

                    {/* 3. Selection Process Section (Light grey box) */}
                    <View className=" p-6 rounded-2xl" style={{ backgroundColor: "#DFE9FB" }}>
                        <Text className="text-xl font-bold text-gray-900 mb-4">
                            SELECTION PROCESS
                        </Text>
                        {renderList(selectionProcess, 'number')}
                    </View>
                    
                </View>
                {/* --- SINGLE LARGE WHITE CONTENT CONTAINER END --- */}
                
            </ScrollView>

            {/* Fixed Start Aptitude Button at the bottom */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
                <Pressable
                    onPress={() => {
                        router.push({
                            pathname: "/(test)/AttemptAptitude",
                            params: { companyId: company.id },
                        });
                    }}
                    // Used a custom style object for the button color to match the design's soft purple
                    className="h-14 rounded-xl flex items-center justify-center shadow-lg" 
                    style={{ backgroundColor: '#9E87FD' }} 
                >
                    <Text className="text-white text-xl font-semibold">Start Aptitude</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}