import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabaseClient";

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
  const { aptitude_id } = useLocalSearchParams<{ aptitude_id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMarks, setTotalMarks] = useState(0);
  const [obtainedMarks, setObtainedMarks] = useState(0);
  const [aptitudeTitle, setAptitudeTitle] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id || !aptitude_id) return;

        const { data: aptitudeData } = await supabase
          .from("aptitudes")
          .select("title")
          .eq("id", aptitude_id)
          .single();
        if (aptitudeData) setAptitudeTitle(aptitudeData.title);

        const { data: questionsData } = await supabase
          .from("aptitude_questions")
          .select("id, question_text, marks")
          .eq("aptitude_id", aptitude_id);

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

        const combined: Question[] = questionsData.map((q: any) => {
          const qOptions = optionsData.filter((opt: any) => opt.question_id === q.id);
          const qResponse = responsesData.find((r: any) => r.question_id === q.id);
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
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [aptitude_id]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 24,
          padding: 16,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1F2937", marginBottom: 8 }}>
          {aptitudeTitle}
        </Text>
        <View
          style={{
            backgroundColor: "#DDD6FE",
            borderRadius: 50,
            alignSelf: "flex-start",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <Text style={{ color: "#7C3AED", fontWeight: "600", fontSize: 16 }}>
            Score: {obtainedMarks} / {totalMarks}
          </Text>
        </View>
      </View>

      {questions.map((q, idx) => (
        <View
          key={q.id}
          style={{
            backgroundColor: "white",
            borderRadius: 24,
            padding: 16,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#1F2937", marginBottom: 8 }}>
            Q{idx + 1}. {q.question_text}
          </Text>

          {q.options.map((opt) => {
            const isSelected = opt.id === q.selected_option_id;
            const isCorrect = opt.is_correct;
            return (
              <View
                key={opt.id}
                style={{
                  padding: 12,
                  borderRadius: 16,
                  marginBottom: 6,
                  backgroundColor: isSelected
                    ? isCorrect
                      ? "#DCFCE7"
                      : "#FECACA"
                    : isCorrect
                    ? "#ECFDF5"
                    : "#F3F4F6",
                }}
              >
                <Text style={{ fontWeight: isCorrect ? "600" : "400", color: "#111827" }}>
                  {opt.option_text}
                </Text>
                {isSelected && (
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>(Your Answer)</Text>
                )}
                {isCorrect && !isSelected && (
                  <Text style={{ fontSize: 12, color: "#16A34A" }}>(Correct Answer)</Text>
                )}
              </View>
            );
          })}

          <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>
            Marks: {q.marks}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AttemptedAptitudeReport;
