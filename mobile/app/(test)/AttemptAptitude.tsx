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

export default function AttemptAptitude() {
  const router = useRouter();
  const { companyId } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [aptitude, setAptitude] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [options, setOptions] = useState<{ [key: number]: any[] }>({});
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const [user, setUser] = useState<any>(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user);
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
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

        const { data: alreadyResp } = await supabase
          .from("aptitude_responses")
          .select("id")
          .eq("user_id", user.id)
          .eq("aptitude_id", aptitudeData.id)
          .limit(1);

        if (alreadyResp && alreadyResp.length > 0) {
          setAlreadyAttempted(true);
          setAptitude(aptitudeData);
          setLoading(false);
          return;
        }

        setAptitude(aptitudeData);
        setTimeLeft(aptitudeData.time_limit * 60);

        const { data: questionData, error: qError } = await supabase
          .from("aptitude_questions")
          .select("*")
          .eq("aptitude_id", aptitudeData.id);

        if (qError) throw qError;
        setQuestions(questionData);

        const optionsObj: any = {};
        for (const q of questionData) {
          const { data: optData, error: optError } = await supabase
            .from("aptitude_options")
            .select("*")
            .eq("question_id", q.id);
          if (optError) throw optError;
          optionsObj[q.id] = optData;
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
      if (!selectedOptionId) continue;

      const optList = options[q.id] || [];
      const correctOpt = optList.find((o) => o.is_correct);
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
      if (!auto) Alert.alert("No answers selected");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("aptitude_responses")
      .insert(responseEntries);

    if (error) {
      console.error("Insert error:", error);
      Alert.alert("Submission failed");
    } else {
      Alert.alert(
        "Aptitude submitted",
        auto ? "Time is up. Auto-submitted." : "Submitted successfully!"
      );
      router.back();
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
      <View className="flex-1 items-center justify-center p-6 bg-gray-50">
        <Text className="text-2xl font-bold mb-3">{aptitude?.title}</Text>
        <Text className="text-base text-gray-700">
          You’ve already attempted this aptitude test.
        </Text>
      </View>
    );

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="bg-white rounded-2xl p-4 shadow-lg mb-4">
        <Text className="text-2xl font-bold mb-2">{aptitude?.title}</Text>
        <Text className="text-base mb-2">Date: {aptitude?.date}</Text>
        <Text className="text-base mb-2">
          Time Limit: {aptitude?.time_limit} min
        </Text>
        <Text className="text-red-600 font-semibold">
          Time Left: {formatTime(timeLeft)}
        </Text>
      </View>

      {questions.map((q, idx) => (
        <View key={q.id} className="bg-white p-4 rounded-2xl mb-3 shadow-md">
          <Text className="font-bold mb-2 text-lg">
            Q{idx + 1}: {q.question_text} (Marks: {q.marks})
          </Text>
          {options[q.id]?.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              onPress={() => handleAnswerChange(q.id, opt.id)}
              className={`p-3 mb-2 rounded-xl ${
                answers[q.id] === opt.id ? "bg-purple-500" : "bg-gray-100"
              }`}
            >
              <Text
                className={`${
                  answers[q.id] === opt.id ? "text-white" : "text-gray-700"
                }`}
              >
                {opt.option_text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity
        onPress={() => handleSubmit(false)}
        disabled={submitting}
        className={`rounded-2xl py-4 items-center mt-4 ${
          submitting ? "bg-gray-400" : "bg-purple-600"
        }`}
      >
        <Text className="text-white text-lg font-semibold">
          {submitting ? "Submitting..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
