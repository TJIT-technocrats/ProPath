import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabaseClient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Interface definitions (kept from your original code)
interface Option {
    id: number;
    option_text: string;
    is_correct: boolean;
}

interface Question {
    id: number;
    question_text: string;
    marks: number;
}
// Assuming Aptitude structure from your fetches
interface Aptitude {
    id: number;
    title: string;
    time_limit: number;
    date: string; // Assuming a date field exists
    company_id: string;
}

export default function AttemptAptitude() {
    const router = useRouter();
    const { companyId } = useLocalSearchParams();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [aptitude, setAptitude] = useState<Aptitude | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [options, setOptions] = useState<{ [key: number]: Option[] }>({});
    const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [user, setUser] = useState<any>(null);
    const [alreadyAttempted, setAlreadyAttempted] = useState(false);
    const [companyName, setCompanyName] = useState("Loading Company...");


    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data?.user);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return;
                
                // --- 1. Fetch Aptitude and Company Info ---
                const { data: aptitudeData, error: aptitudeError } = await supabase
                    .from("aptitudes")
                    .select("*")
                    .eq("company_id", companyId)
                    .maybeSingle();
                
                if (aptitudeError) throw aptitudeError;

                if (!aptitudeData) {
                    Alert.alert("No aptitude found", "This company has no aptitude yet.");
                    setLoading(false);
                    return;
                }
                
                // Fetch Company Name (Mocked or real query based on your schema)
                const { data: companyData } = await supabase
                    .from("company_details")
                    .select("company_name")
                    .eq("id", companyId)
                    .single();
                if (companyData) setCompanyName(companyData.company_name);


                // --- 2. Check Attempt Status ---
                const { data: alreadyResp } = await supabase
                    .from("aptitude_responses")
                    .select("id")
                    .eq("user_id", user.id)
                    .eq("aptitude_id", aptitudeData.id)
                    .limit(1);

                if (alreadyResp && alreadyResp.length > 0) {
                    setAlreadyAttempted(true);
                    setAptitude(aptitudeData as Aptitude);
                    setLoading(false);
                    return;
                }

                setAptitude(aptitudeData as Aptitude);
                setTimeLeft(aptitudeData.time_limit * 60);

                // --- 3. Fetch Questions and Options ---
                const { data: questionData, error: qError } = await supabase
                    .from("aptitude_questions")
                    .select("id, question_text, marks") // Select only necessary fields for Question interface
                    .eq("aptitude_id", aptitudeData.id);

                if (qError) throw qError;
                setQuestions(questionData as Question[]);

                const optionsObj: { [key: number]: Option[] } = {};
                for (const q of questionData) {
                    const { data: optData, error: optError } = await supabase
                        .from("aptitude_options")
                        .select("id, option_text, is_correct") // Select only necessary fields for Option interface
                        .eq("question_id", q.id);
                    if (optError) throw optError;
                    optionsObj[q.id] = optData as Option[];
                }
                setOptions(optionsObj);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (companyId && user) fetchData();
    }, [companyId, user]);

    useEffect(() => {
        if (!timeLeft || alreadyAttempted) return;
        if (timeLeft <= 0) {
            handleSubmit(true);
            return;
        }
        const t = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, alreadyAttempted]);

    const handleAnswerChange = (qId: number, optId: number) => {
        setAnswers((prev) => ({ ...prev, [qId]: optId }));
    };

    const handleSubmit = async (auto = false) => {
        if (!user || !aptitude) return;
        if (submitting) return;

        setSubmitting(true);

        const responseEntries = [];
        for (const q of questions) {
            const selectedOptionId = answers[q.id];
            
            // Only submit an entry if an option was selected
            if (selectedOptionId === undefined || selectedOptionId === null) continue;

            const optList = options[q.id] || [];
            // Find the correct option to determine marks
            const correctOpt = optList.find((o) => o.is_correct); 
            // Calculate marks
            const markObtained = selectedOptionId === correctOpt?.id ? q.marks : 0;

            responseEntries.push({
                user_id: user.id,
                aptitude_id: aptitude.id,
                question_id: q.id,
                selected_option_id: selectedOptionId,
                marks_obtained: markObtained,
                time_limit: aptitude.time_limit,
                company_id: aptitude.company_id,
                date_of_submission: new Date().toISOString(),
            });
        }

        if (responseEntries.length === 0) {
            if (!auto) Alert.alert("No answers selected", "Please select at least one answer before submitting.");
            setSubmitting(false);
            return;
        }

        const { error } = await supabase
            .from("aptitude_responses")
            .insert(responseEntries);

        if (error) {
            console.error("Insert error:", error);
            Alert.alert("Submission failed", error.message);
        } else {
            Alert.alert(
                "Aptitude submitted",
                auto ? "Time is up. Auto-submitted." : "Submitted successfully!",
                [{ text: "OK", onPress: () => router.back() }]
            );
        }
        setSubmitting(false);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    if (loading)
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );

    if (alreadyAttempted)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#7260C1' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>{aptitude?.title}</Text>
                <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, elevation: 5 }}>
                    <Ionicons name="alert-circle-outline" size={50} color="#DC2626" />
                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#DC2626', marginTop: 10 }}>Already Attempted</Text>
                    <Text style={{ fontSize: 16, color: '#4B5563', marginTop: 8, textAlign: 'center' }}>
                        You have already submitted your responses for this aptitude test.
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ backgroundColor: '#7C3AED', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginTop: 20 }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#7260C1" }}> 
            
            {/* Custom Header with Back Button */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    style={{ 
                        width: 40, height: 40, borderRadius: 20, 
                        alignItems: 'center', justifyContent: 'center', 
                        backgroundColor: 'white', marginRight: 12, 
                        shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 
                    }}
                >
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
                    Aptitude Test
                </Text>
            </View>
            
            {/* Aptitude Info (In the purple section) */}
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
                {/* Company Name */}
                <View
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: 18,
                        alignSelf: "flex-start",
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ color: "#7260C1", fontWeight: "800", fontSize: 16 }}>
                        Company: {companyName}
                    </Text>
                </View>

                {/* Title and Time Left */}
                <View
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: 18,
                        alignSelf: "flex-start",
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        minWidth: '50%',
                    }}
                >
                    <Text style={{ color: "#DC2626", fontWeight: "800", fontSize: 16 }}>
                        Time Left: {formatTime(timeLeft)}
                    </Text>
                </View>
            </View>

            {/* --- START: WHITE CONTAINER FOR QUESTIONS --- */}
            <View 
                style={{
                    flex: 1, 
                    backgroundColor: 'white', 
                    borderTopLeftRadius: 35, 
                    borderTopRightRadius: 35, 
                    paddingHorizontal: 16,
                    paddingTop: 20,
                }}
            >
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                    
                    {questions.map((q, idx) => {
                        // --- ALTERNATING BACKGROUND COLOR LOGIC APPLIED HERE ---
                        const questionCardBg = idx % 2 === 0 ? "#DFE9FB" : "#DBDCFF"; // Alternating two colors
                        // --------------------------------------------------------

                        return (
                            <View
                                key={q.id}
                                style={{
                                    backgroundColor: questionCardBg, 
                                    borderRadius: 16,
                                    padding: 16,
                                    marginBottom: 12,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 4,
                                    elevation: 3,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2937", marginBottom: 10 }}>
                                    Q{idx + 1}: {q.question_text} (Marks: {q.marks})
                                </Text>

                                {/* Options Mapping */}
                                {options[q.id]?.map((opt) => {
                                    const isSelected = answers[q.id] === opt.id;
                                    
                                    return (
                                        <TouchableOpacity
                                            key={opt.id}
                                            onPress={() => handleAnswerChange(q.id, opt.id)}
                                            style={{
                                                padding: 12,
                                                borderRadius: 12,
                                                marginBottom: 6,
                                                // Highlight selected option with the primary color
                                                backgroundColor: isSelected ? "#7C3AED" : "#F3F4F6", 
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: isSelected ? "white" : "#111827",
                                                    fontWeight: isSelected ? "600" : "400",
                                                }}
                                            >
                                                {opt.option_text}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        );
                    })}

                    <TouchableOpacity
                        onPress={() => handleSubmit(false)}
                        disabled={submitting}
                        style={{
                            borderRadius: 16,
                            paddingVertical: 15,
                            alignItems: 'center',
                            marginTop: 15,
                            marginBottom: 20,
                            backgroundColor: submitting ? "#9CA3AF" : "#7C3AED", // Primary purple color
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            elevation: 5,
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                            {submitting ? "Submitting..." : "Submit Test"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {/* --- END: WHITE CONTAINER FOR QUESTIONS --- */}
        </SafeAreaView>
    );
}