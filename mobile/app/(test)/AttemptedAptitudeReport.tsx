import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabaseClient";
import { SafeAreaView } from "react-native-safe-area-context";

interface Option {
    id: number;
    option_text: string;
    is_correct: boolean;
}

interface Question {
    id: number;
    question_text: string;
    marks: number;
    options: Option[];
    selected_option_id: number | null;
}

const AttemptedAptitudeReport: React.FC = () => {
    const router = useRouter();
    const { aptitude_id } = useLocalSearchParams<{ aptitude_id: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalMarks, setTotalMarks] = useState(0);
    const [obtainedMarks, setObtainedMarks] = useState(0);
    const [aptitudeTitle, setAptitudeTitle] = useState("");
    const [companyName, setCompanyName] = useState("Loading Company...");
    console.log(aptitudeTitle);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user?.id || !aptitude_id) return;

                // --- 1. Fetch Aptitude and Company Info ---
                const { data: aptitudeData } = await supabase
                    .from("aptitudes")
                    .select("title, company_id")
                    .eq("id", aptitude_id)
                    .single();
                
                if (aptitudeData) {
                    setAptitudeTitle(aptitudeData.title);

                    if (aptitudeData.company_id) {
                        const { data: companyData } = await supabase
                            .from("company_details")
                            .select("company_name")
                            .eq("id", aptitudeData.company_id)
                            .single();
                        if (companyData) setCompanyName(companyData.company_name);
                    } else {
                        setCompanyName("N/A");
                    }
                } else {
                    setAptitudeTitle("Aptitude Report");
                    setCompanyName("Aptitude Details Not Found");
                }


                // --- 2. Fetch Questions, Options, and Responses ---
                const { data: questionsData, error: questionsError } = await supabase
                    .from("aptitude_questions")
                    .select("id, question_text, marks")
                    .eq("aptitude_id", aptitude_id);

                if (questionsError || !questionsData) throw questionsError || new Error("No questions data.");

                const { data: optionsData } = await supabase
                    .from("aptitude_options")
                    .select("id, question_id, option_text, is_correct")
                    .in(
                        "question_id",
                        questionsData.map((q: any) => q.id)
                    );

                const { data: responsesData } = await supabase
                    .from("aptitude_responses")
                    .select("question_id, selected_option_id, marks_obtained")
                    .eq("aptitude_id", aptitude_id)
                    .eq("user_id", user.id);

                let total = 0;
                let obtained = 0;

                const combined: Question[] = (questionsData || []).map((q: any) => {
                  const qOptions = (optionsData || []).filter(
                    (opt: any) => opt.question_id === q.id
                  );
                  const qResponse = (responsesData || []).find(
                    (r: any) => r.question_id === q.id
                  );

                  total += q.marks;
                  if (qResponse?.marks_obtained) obtained += qResponse.marks_obtained;

                  return {
                    id: q.id,
                    question_text: q.question_text,
                    marks: q.marks,
                    options: qOptions,
                    selected_option_id: qResponse?.selected_option_id || null,
                  };
                });

                setQuestions(combined);
                setTotalMarks(total);
                setObtainedMarks(obtained);
            } catch (error: any) {
                console.error("Error fetching report:", error.message);
                setCompanyName("Error Loading Company");
                setAptitudeTitle("Error Loading Report");
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [aptitude_id]);

    if (loading)
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#7C3AED" />
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
                    Attempted Aptitude Report
                </Text>
            </View>
            
            {/* Score and Company Info (In the purple section) */}
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
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
                    <Text style={{ color: "#2F496E", fontWeight: "800", fontSize: 16 }}>
                        Company: {companyName}
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: "#2F496E",
                        borderRadius: 18,
                        alignSelf: "flex-start",
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                    }}
                >
                    <Text style={{ color: "#ffffff", fontWeight: "800", fontSize: 16 }}>
                        Score: {obtainedMarks} / {totalMarks}
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
                    paddingHorizontal: 20,
                    paddingTop: 20, // Add padding at the top of the white container
                }}
            >

                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                    
                    {/* Questions List */}
                    {questions.map((q, idx) => {
                        const response = q.options.find(opt => opt.id === q.selected_option_id);
                        const isResponseCorrect = response?.is_correct || false;
                        
                        // --- ALTERNATING BACKGROUND COLOR LOGIC APPLIED HERE ---
                        const questionCardBg = idx % 2 === 0 ? "#DBDCFF" : "#DFE9FB"; // Alternating two colors
                        // --------------------------------------------------------

                        return (
                            <View
                                key={q.id}
                                style={{
                                    backgroundColor: questionCardBg, // Use the alternating color
                                    borderRadius: 16,
                                    padding: 20,
                                    marginBottom: 12,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 4,
                                    elevation: 3,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2937", marginBottom: 10 }}>
                                    Q{idx + 1}. {q.question_text}
                                </Text>

                                {/* Options Mapping */}
                                {q.options.map((opt) => {
                                    const isSelected = opt.id === q.selected_option_id;
                                    const isCorrect = opt.is_correct;
                                    
                                    // Option background color logic (kept the correct/wrong colors as requested)
                                    let optionBgColor = "#FCFCFD";
                                    let optionTextColor = "#111827"; 
                                    
                                    if (isSelected) {
                                        optionBgColor = isCorrect ? "#DCFCE7" : "#FECACA";
                                        optionTextColor = isCorrect ? "#16A34A" : "#DC2626";
                                    } else if (isCorrect) {
                                        optionBgColor = "#ECFDF5";
                                    }

                                    return (
                                        <View
                                            key={opt.id}
                                            style={{
                                                padding: 12,
                                                borderRadius: 12,
                                                marginBottom: 6,
                                                backgroundColor: optionBgColor,
                                            }}
                                        >
                                            <Text style={{ fontWeight: isCorrect ? "600" : "400", color: optionTextColor }}>
                                                {opt.option_text}
                                            </Text>
                                            
                                            {/* Status Text */}
                                            {isSelected && (
                                                <Text style={{ fontSize: 12, color: isCorrect ? "#16A34A" : "#DC2626", marginTop: 2 }}>
                                                    (Your Answer)
                                                </Text>
                                            )}
                                            {isCorrect && !isSelected && (
                                                <Text style={{ fontSize: 12, color: "#16A34A", marginTop: 2 }}>
                                                    (Correct Answer)
                                                </Text>
                                            )}
                                        </View>
                                    );
                                })}
                                
                                {/* Marks Display */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: "#6B7280" }}>
                                        Marks Earned: 
                                        <Text style={{ color: isResponseCorrect ? "#10B981" : "#F59E0B" }}>
                                            {" "}
                                            {q.options.find(opt => opt.id === q.selected_option_id)?.is_correct ? q.marks : 0}
                                        </Text>
                                    </Text>
                                    <Text style={{ fontSize: 14, color: "#6B7280" }}>
                                        Total Marks: {q.marks}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            {/* --- END: WHITE CONTAINER FOR QUESTIONS --- */}
        </SafeAreaView>
    );
};

export default AttemptedAptitudeReport;