import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const allSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "SQL",
  "AWS",
  "C",
  "C++",
  "C#",
  "Computer Networks",
  "Computer-Aided Design (CAD)",
  "Construction Management",
  "Create 'C'",
  "Team Collaboration",
  "TypeScript",
  "MongoDB",
  "Visual Studio Code",
  "Google Cloud Platform",
  "Postman",
  "PostgreSQL",
  "Git",
  "Express.js",
  "Java",
  "HTML5",
  "CSS3",
  "Firebase",
  "React Native",
];

const Profile = () => {
  const [editContactModalVisible, setEditContactModalVisible] = useState(false);
  const [editObjectiveModalVisible, setEditObjectiveModalVisible] =
    useState(false);
  const [editSkillsModalVisible, setEditSkillsModalVisible] = useState(false);
  const [editEducationModalVisible, setEditEducationModalVisible] =
    useState(false);
  const [editProjectsModalVisible, setEditProjectsModalVisible] =
    useState(false);
  const [editCertModalVisible, setEditCertModalVisible] = useState(false);

  const [name, setName] = useState("Yugitha B");
  const [email, setEmail] = useState("yugithabalaji@college.edu");
  const [phone, setPhone] = useState("+91 9876543210");
  const [objective, setObjective] = useState(
    "Aspiring software engineer eager to contribute to innovative projects with strong problem-solving and teamwork skills."
  );
  const [education, setEducation] = useState([
    {
      level: "10th",
      institution: "Sri Chaitanya Techno School",
      year: "2019",
      score: "92%",
    },
    {
      level: "12th / PUC",
      institution: "Sri Chaitanya PU College",
      year: "2021",
      score: "90%",
    },
    {
      level: "B.E CSE (UG)",
      institution: "XYZ Engineering College",
      year: "2025",
      score: "8.0 CGPA",
    },
  ]);
  const [certifications, setCertifications] = useState([
    {
      course: "Full Stack Web Development",
      platform: "Udemy",
      year: "2024",
      description:
        "A comprehensive course covering front-end and back-end web technologies.",
      skills: ["JavaScript", "React", "Node.js", "Express.js"],
      isOngoing: false,
      startDate: "Jan 2024",
      endDate: "Mar 2024",
    },
    {
      course: "AWS Cloud Practitioner",
      platform: "AWS Training",
      year: "2023",
      description: "Foundational knowledge of AWS cloud concepts and services.",
      skills: ["AWS", "Cloud Computing"],
      isOngoing: false,
      startDate: "Dec 2023",
      endDate: "Dec 2023",
    },
  ]);
  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "AWS",
  ]);
  const [projects, setProjects] = useState([
    {
      title: "E-commerce Platform",
      tech: ["React", "Node.js", "MongoDB"],
      desc: "Full-stack web application with payment integration",
      startDate: "Jan 2023",
      endDate: "Mar 2023",
      isOngoing: false,
    },
    {
      title: "Task Management App",
      tech: ["React Native", "Firebase"],
      desc: "Cross-platform mobile app for project management",
      startDate: "Apr 2024",
      endDate: null,
      isOngoing: true,
    },
  ]);

  // temp copies for editing (we'll also push new blank objects into these when adding)
  const [tempContact, setTempContact] = useState({ name, email, phone });
  const [tempObjective, setTempObjective] = useState(objective);
  const [tempEducation, setTempEducation] = useState([...education]);
  const [tempSkills, setTempSkills] = useState([...skills]);
  const [tempProjects, setTempProjects] = useState([...projects]);
  const [tempCertifications, setTempCertifications] = useState([
    ...certifications,
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState([]);
  const [certSearchTerm, setCertSearchTerm] = useState("");
  const [certSuggestions, setCertSuggestions] = useState([]);

  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingCertIndex, setEditingCertIndex] = useState(null);

  const saveContact = () => {
    setName(tempContact.name);
    setEmail(tempContact.email);
    setPhone(tempContact.phone);
    setEditContactModalVisible(false);
  };

  const saveObjective = () => {
    setObjective(tempObjective);
    setEditObjectiveModalVisible(false);
  };

  // --- EDUCATION: save can now handle both edit & add ---
  const saveEducation = () => {
    if (editingEducationIndex !== null) {
      const updatedEducation = [...education];
      // if index exists in original array -> replace; otherwise append
      if (editingEducationIndex < updatedEducation.length) {
        updatedEducation[editingEducationIndex] =
          tempEducation[editingEducationIndex];
      } else {
        // add new
        updatedEducation.push(tempEducation[editingEducationIndex]);
      }
      setEducation(updatedEducation);
    }
    setEditingEducationIndex(null);
    setEditEducationModalVisible(false);
  };

  const deleteEducation = () => {
    if (editingEducationIndex !== null) {
      if (editingEducationIndex < education.length) {
        const updatedEducation = education.filter(
          (_, index) => index !== editingEducationIndex
        );
        setEducation(updatedEducation);
      } else {
        // was a temporary unsaved education => remove from tempEducation only
        const updatedTemp = tempEducation.filter(
          (_, index) => index !== editingEducationIndex
        );
        setTempEducation(updatedTemp);
      }
    }
    setEditingEducationIndex(null);
    setEditEducationModalVisible(false);
  };

  // add new education button handler
  const addEducation = () => {
    const newTemp = [
      ...tempEducation,
      { level: "New", institution: "", year: "", score: "" },
    ];
    setTempEducation(newTemp);
    setEditingEducationIndex(newTemp.length - 1);
    setEditEducationModalVisible(true);
  };

  const saveSkills = () => {
    setSkills(tempSkills.filter((skill) => skill.trim() !== ""));
    setEditSkillsModalVisible(false);
    setSearchTerm("");
    setSuggestions([]);
  };

  // --- PROJECTS: save/delete handle add as well ---
  const saveProjects = () => {
    if (editingProjectIndex !== null) {
      const updatedProjects = [...projects];
      if (editingProjectIndex < updatedProjects.length) {
        updatedProjects[editingProjectIndex] =
          tempProjects[editingProjectIndex];
      } else {
        updatedProjects.push(tempProjects[editingProjectIndex]);
      }
      setProjects(updatedProjects);
    }
    setEditingProjectIndex(null);
    setEditProjectsModalVisible(false);
    setProjectSearchTerm("");
    setProjectSuggestions([]);
  };

  const deleteProject = () => {
    if (editingProjectIndex !== null) {
      if (editingProjectIndex < projects.length) {
        const updatedProjects = projects.filter(
          (_, index) => index !== editingProjectIndex
        );
        setProjects(updatedProjects);
      } else {
        // remove unsaved temp
        const updatedTemp = tempProjects.filter(
          (_, index) => index !== editingProjectIndex
        );
        setTempProjects(updatedTemp);
      }
    }
    setEditingProjectIndex(null);
    setEditProjectsModalVisible(false);
  };

  const addProject = () => {
    const newTemp = [
      ...tempProjects,
      {
        title: "",
        tech: [],
        desc: "",
        startDate: "",
        endDate: null,
        isOngoing: false,
      },
    ];
    setTempProjects(newTemp);
    setEditingProjectIndex(newTemp.length - 1);
    setEditProjectsModalVisible(true);
  };

  const saveCertifications = () => {
    if (editingCertIndex !== null) {
      const updatedCerts = [...certifications];
      if (editingCertIndex < updatedCerts.length) {
        updatedCerts[editingCertIndex] = tempCertifications[editingCertIndex];
      } else {
        updatedCerts.push(tempCertifications[editingCertIndex]);
      }
      setCertifications(updatedCerts);
    }
    setEditingCertIndex(null);
    setEditCertModalVisible(false);
    setCertSearchTerm("");
    setCertSuggestions([]);
  };

  const deleteCert = () => {
    if (editingCertIndex !== null) {
      if (editingCertIndex < certifications.length) {
        const updatedCerts = certifications.filter(
          (_, index) => index !== editingCertIndex
        );
        setCertifications(updatedCerts);
      } else {
        // remove unsaved temp entry
        const updatedTemp = tempCertifications.filter(
          (_, index) => index !== editingCertIndex
        );
        setTempCertifications(updatedTemp);
      }
    }
    setEditingCertIndex(null);
    setEditCertModalVisible(false);
  };

  const addCert = () => {
    const newTemp = [
      ...tempCertifications,
      {
        course: "",
        platform: "",
        year: "",
        description: "",
        skills: [],
        isOngoing: false,
        startDate: "",
        endDate: null,
      },
    ];
    setTempCertifications(newTemp);
    setEditingCertIndex(newTemp.length - 1);
    setEditCertModalVisible(true);
  };

  // Logic for the main Skills section
  const handleSkillSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filtered = allSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(text.toLowerCase()) &&
          !tempSkills.includes(skill)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skill) => {
    if (!tempSkills.includes(skill)) {
      setTempSkills([...tempSkills, skill]);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setTempSkills(tempSkills.filter((skill) => skill !== skillToRemove));
  };

  // Logic for the Projects technology section
  const handleProjectSearch = (text) => {
    setProjectSearchTerm(text);
    if (text) {
      const currentTech = tempProjects[editingProjectIndex]?.tech || [];
      const filtered = allSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(text.toLowerCase()) &&
          !currentTech.includes(skill)
      );
      setProjectSuggestions(filtered);
    } else {
      setProjectSuggestions([]);
    }
  };

  const addProjectSkill = (skill) => {
    const updatedProjects = [...tempProjects];
    const currentTech = updatedProjects[editingProjectIndex]?.tech || [];
    if (!currentTech.includes(skill)) {
      updatedProjects[editingProjectIndex].tech = [...currentTech, skill];
      setTempProjects(updatedProjects);
      setProjectSearchTerm("");
      setProjectSuggestions([]);
    }
  };

  const removeProjectSkill = (skillToRemove) => {
    const updatedProjects = [...tempProjects];
    const currentTech = updatedProjects[editingProjectIndex]?.tech || [];
    updatedProjects[editingProjectIndex].tech = currentTech.filter(
      (skill) => skill !== skillToRemove
    );
    setTempProjects(updatedProjects);
  };

  // Logic for the Certifications skills section
  const handleCertSearch = (text) => {
    setCertSearchTerm(text);
    if (text) {
      const currentSkills = tempCertifications[editingCertIndex]?.skills || [];
      const filtered = allSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(text.toLowerCase()) &&
          !currentSkills.includes(skill)
      );
      setCertSuggestions(filtered);
    } else {
      setCertSuggestions([]);
    }
  };

  const addCertSkill = (skill) => {
    const updatedCerts = [...tempCertifications];
    const currentSkills = updatedCerts[editingCertIndex]?.skills || [];
    if (!currentSkills.includes(skill)) {
      updatedCerts[editingCertIndex].skills = [...currentSkills, skill];
      setTempCertifications(updatedCerts);
      setCertSearchTerm("");
      setCertSuggestions([]);
    }
  };

  const removeCertSkill = (skillToRemove) => {
    const updatedCerts = [...tempCertifications];
    const currentSkills = updatedCerts[editingCertIndex]?.skills || [];
    updatedCerts[editingCertIndex].skills = currentSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setTempCertifications(updatedCerts);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      showsVerticalScrollIndicator={false}
    >
      <View className="h-[7em] bg-purple-500"></View>
      <View className="mt-4 p-4">
        {/* Profile Header */}
        <View className="items-center mb-6 mt-4 p-4">
          <View className="bg-white p-3 mb-4 rounded-full -mt-32">
            <View className="w-28 h-28 rounded-full bg-purple-500 justify-center items-center shadow-md">
              <AntDesign name="user" size={64} color="white" />
            </View>
          </View>
          <Text className="text-2xl font-bold text-gray-800">{name}</Text>
          <Text className="text-base text-gray-600 mt-1 mb-4">
            Computer Science Engineering
          </Text>
          <View className="flex-row justify-between w-full px-2">
            <View className="bg-white rounded-xl p-4 items-center flex-1 mx-1 shadow-md">
              <Text className="text-xl font-bold text-gray-800">8.0</Text>
              <Text className="text-xs text-gray-500 mt-1">CGPA</Text>
            </View>
            <View className="bg-white rounded-xl p-4 items-center flex-1 mx-1 shadow-md">
              <Text className="text-xl font-bold text-gray-800">4th Year</Text>
              <Text className="text-xs text-gray-500 mt-1">Current Year</Text>
            </View>
            <View className="bg-white rounded-xl p-4 items-center flex-1 mx-1 shadow-md">
              <Text className="text-xl font-bold text-gray-800">12</Text>
              <Text className="text-xs text-gray-500 mt-1">Applications</Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Contact Information
            </Text>
            <TouchableOpacity
              onPress={() => {
                setTempContact({ name, email, phone });
                setEditContactModalVisible(true);
              }}
            >
              <AntDesign name="edit" size={22} color="#6366F1" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mb-3">
            <AntDesign name="mail" size={18} color="#6B7280" />
            <Text className="ml-3 text-base text-gray-700">{email}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <AntDesign name="phone" size={18} color="#6B7280" />
            <Text className="ml-3 text-base text-gray-700">{phone}</Text>
          </View>
        </View>

        {/* Career Objective */}
        <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Career Objective</Text>
            <TouchableOpacity
              onPress={() => {
                setTempObjective(objective);
                setEditObjectiveModalVisible(true);
              }}
            >
              <AntDesign name="edit" size={22} color="#6366F1" />
            </TouchableOpacity>
          </View>
          <Text className="text-base text-gray-700">{objective}</Text>
        </View>

        {/* Skills */}
        <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Skills</Text>
            <TouchableOpacity
              onPress={() => {
                setTempSkills([...skills]);
                setEditSkillsModalVisible(true);
              }}
            >
              <AntDesign name="edit" size={22} color="#6366F1" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -4 }}>
            {skills.map((skill, index) => (
              <View
                key={index}
                style={{ margin: 4, backgroundColor: "#EDE9FE", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 }}
              >
                <Text style={{ color: "#7C3AED", fontSize: 12, fontWeight: "600" }}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Education</Text>
            <TouchableOpacity onPress={addEducation}>
              <AntDesign name="pluscircleo" size={22} color="#6366F1" />
            </TouchableOpacity>
          </View>
          {education.map((edu, index) => (
            <View
              key={index}
              className="bg-gray-50 p-4 rounded-xl mb-3 shadow-sm flex-row justify-between items-center"
            >
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{edu.level}</Text>
                <Text className="text-sm text-purple-600 mb-1">
                  {edu.institution} | {edu.year}
                </Text>
                <Text className="text-sm text-gray-600">{edu.score}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEditingEducationIndex(index);
                  setTempEducation([...education]);
                  setEditEducationModalVisible(true);
                }}
              >
                <AntDesign name="edit" size={22} color="#6366F1" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Projects</Text>
            <TouchableOpacity onPress={addProject}>
              <AntDesign name="pluscircleo" size={22} color="#6366F1" />
            </TouchableOpacity>
          </View>
          {projects.map((project, index) => (
            <View
              key={index}
              className="bg-gray-50 p-4 rounded-xl mb-3 shadow-sm flex-row justify-between items-center"
            >
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{project.title}</Text>
                <Text className="text-sm text-purple-600 mb-1">
                  {project.tech.join(", ")}
                </Text>
                <Text className="text-sm text-gray-600">{project.desc}</Text>
                <Text className="text-xs text-gray-400 mt-2">
                  {project.startDate} - {project.isOngoing ? "Present" : project.endDate}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEditingProjectIndex(index);
                  setTempProjects([...projects]);
                  setEditProjectsModalVisible(true);
                }}
              >
                <AntDesign name="edit" size={22} color="#6366F1" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Course Certifications */}
        <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Course Certifications
            </Text>
            <TouchableOpacity onPress={addCert}>
              <AntDesign name="pluscircleo" size={22} color="#6366F1" />
            </TouchableOpacity>
          </View>
          {certifications.map((cert, index) => (
            <View
              key={index}
              className="bg-gray-50 p-4 rounded-xl mb-3 shadow-sm flex-row justify-between items-center"
            >
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">
                  {cert.course}
                </Text>
                <Text className="text-sm text-purple-600 mb-1">
                  {cert.platform} | {cert.year}
                </Text>
                <Text className="text-xs text-gray-400 mt-2">
                  {cert.startDate} - {cert.isOngoing ? "Present" : cert.endDate}
                </Text>
                <Text className="text-sm text-gray-600 mt-2">
                  {cert.description}
                </Text>
                <View className="flex-row flex-wrap mt-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <Text
                      key={skillIndex}
                      className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold mr-1 mb-1"
                    >
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEditingCertIndex(index);
                  const temp = [...certifications];
                  setTempCertifications(temp);
                  setEditCertModalVisible(true);
                }}
              >
                <AntDesign name="edit" size={22} color="#6366F1" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Resume */}
        <View className="bg-white p-5 rounded-2xl mb-16 shadow-md">
          <Text className="text-xl font-bold text-gray-800 mb-4">Resume</Text>
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-100 p-4 rounded-xl mr-2">
              <AntDesign name="upload" size={20} color="#6B7280" />
              <Text className="ml-2 text-sm font-semibold text-gray-800">
                Upload Resume
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-purple-500 p-4 rounded-xl ml-2">
              <AntDesign name="download" size={20} color="white" />
              <Text className="ml-2 text-sm font-semibold text-white">
                Generate Resume
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-center mt-4 text-sm text-gray-500">
            Last updated: March 8, 2024
          </Text>
        </View>
      </View>

      {/* Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editContactModalVisible}
        onRequestClose={() => setEditContactModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Edit Contact Information
            </Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-3 text-base text-gray-700"
              placeholder="Name"
              value={tempContact.name}
              onChangeText={(text) =>
                setTempContact({ ...tempContact, name: text })
              }
            />
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-3 text-base text-gray-700"
              placeholder="Email"
              value={tempContact.email}
              onChangeText={(text) =>
                setTempContact({ ...tempContact, email: text })
              }
            />
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-4 text-base text-gray-700"
              placeholder="Phone"
              value={tempContact.phone}
              onChangeText={(text) =>
                setTempContact({ ...tempContact, phone: text })
              }
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="flex-1 bg-purple-500 p-3 rounded-lg mr-2"
                onPress={saveContact}
              >
                <Text className="text-white text-center font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-300 p-3 rounded-lg ml-2"
                onPress={() => setEditContactModalVisible(false)}
              >
                <Text className="text-gray-800 text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Career Objective Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editObjectiveModalVisible}
        onRequestClose={() => setEditObjectiveModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Edit Career Objective
            </Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-4 text-base text-gray-700"
              value={tempObjective}
              onChangeText={setTempObjective}
              multiline
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="flex-1 bg-purple-500 p-3 rounded-lg mr-2"
                onPress={saveObjective}
              >
                <Text className="text-white text-center font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-300 p-3 rounded-lg ml-2"
                onPress={() => setEditObjectiveModalVisible(false)}
              >
                <Text className="text-gray-800 text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Skills Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editSkillsModalVisible}
        onRequestClose={() => setEditSkillsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Edit Skills
            </Text>
            <View className="flex-row flex-wrap mb-4">
              {tempSkills.map((skill, index) => (
                <View
                  key={index}
                  className="bg-purple-100 flex-row items-center rounded-full px-3 py-1.5 mr-2 mb-2"
                >
                  <Text className="text-purple-700 text-sm font-semibold mr-1">
                    {skill}
                  </Text>
                  <TouchableOpacity onPress={() => removeSkill(skill)}>
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={16}
                      color="#6366F1"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
              placeholder="Search or add a skill..."
              value={searchTerm}
              onChangeText={handleSkillSearch}
            />
            {suggestions.length > 0 && (
              <ScrollView className="max-h-[150px] bg-gray-100 rounded-lg mb-4">
                {suggestions.map((skill, index) => (
                  <TouchableOpacity key={index} onPress={() => addSkill(skill)}>
                    <Text className="p-3 text-base text-gray-700 border-b border-gray-200">
                      {skill}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="flex-1 bg-purple-500 p-3 rounded-lg mr-2"
                onPress={saveSkills}
              >
                <Text className="text-white text-center font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-300 p-3 rounded-lg ml-2"
                onPress={() => setEditSkillsModalVisible(false)}
              >
                <Text className="text-gray-800 text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Education Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editEducationModalVisible}
        onRequestClose={() => setEditEducationModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                Edit Education
              </Text>
              <TouchableOpacity
                onPress={() => setEditEducationModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            {editingEducationIndex !== null && (
              <>
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  {tempEducation[editingEducationIndex]?.level || ""}
                </Text>

                <Text className="text-sm text-gray-500 mb-1">Institution</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Institution"
                  value={
                    tempEducation[editingEducationIndex]?.institution || ""
                  }
                  onChangeText={(text) => {
                    const updated = [...tempEducation];
                    updated[editingEducationIndex].institution = text;
                    setTempEducation(updated);
                  }}
                />

                <Text className="text-sm text-gray-500 mb-1">Year</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Year"
                  value={tempEducation[editingEducationIndex]?.year || ""}
                  onChangeText={(text) => {
                    const updated = [...tempEducation];
                    updated[editingEducationIndex].year = text;
                    setTempEducation(updated);
                  }}
                />

                <Text className="text-sm text-gray-500 mb-1">Score</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg text-base text-gray-700"
                  placeholder="Score"
                  value={tempEducation[editingEducationIndex]?.score || ""}
                  onChangeText={(text) => {
                    const updated = [...tempEducation];
                    updated[editingEducationIndex].score = text;
                    setTempEducation(updated);
                  }}
                />

                <View className="flex-row justify-between mt-6">
                  <TouchableOpacity
                    className="flex-1 bg-red-500 p-3 rounded-lg mr-2 items-center"
                    onPress={deleteEducation}
                  >
                    <Text className="text-white font-semibold">Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-purple-500 p-3 rounded-lg mr-2 items-center"
                    onPress={saveEducation}
                  >
                    <Text className="text-white font-semibold">
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 bg-gray-300 p-3 rounded-lg items-center"
                    onPress={() => setEditEducationModalVisible(false)}
                  >
                    <Text className="text-gray-800 font-semibold">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Projects Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editProjectsModalVisible}
        onRequestClose={() => setEditProjectsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                Edit Project
              </Text>
              <TouchableOpacity
                onPress={() => setEditProjectsModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            {editingProjectIndex !== null && (
              <ScrollView className="max-h-[80vh]">
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  {tempProjects[editingProjectIndex]?.title || ""}
                </Text>

                <Text className="text-sm text-gray-500 mb-1">Title</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Project Title"
                  value={tempProjects[editingProjectIndex]?.title || ""}
                  onChangeText={(text) => {
                    const updated = [...tempProjects];
                    updated[editingProjectIndex].title = text;
                    setTempProjects(updated);
                  }}
                />

                <Text className="text-sm text-gray-500 mb-1">Description</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg text-base text-gray-700"
                  placeholder="Description"
                  value={tempProjects[editingProjectIndex]?.desc || ""}
                  onChangeText={(text) => {
                    const updated = [...tempProjects];
                    updated[editingProjectIndex].desc = text;
                    setTempProjects(updated);
                  }}
                  multiline
                />

                <Text className="text-sm text-gray-500 mb-1 mt-2">
                  Technologies Used
                </Text>
                <View className="flex-row flex-wrap mb-4">
                  {(tempProjects[editingProjectIndex]?.tech || []).map(
                    (skill, index) => (
                      <View
                        key={index}
                        className="bg-purple-100 flex-row items-center rounded-full px-3 py-1.5 mr-2 mb-2"
                      >
                        <Text className="text-purple-700 text-sm font-semibold mr-1">
                          {skill}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeProjectSkill(skill)}
                        >
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={16}
                            color="#6366F1"
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  )}
                </View>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Search or add a technology..."
                  value={projectSearchTerm}
                  onChangeText={handleProjectSearch}
                />
                {projectSuggestions.length > 0 && (
                  <ScrollView className="max-h-[150px] bg-gray-100 rounded-lg mb-4">
                    {projectSuggestions.map((skill, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => addProjectSkill(skill)}
                      >
                        <Text className="p-3 text-base text-gray-700 border-b border-gray-200">
                          {skill}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                <Text className="text-sm text-gray-500 mb-1">Start Date</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="e.g., Jan 2023"
                  value={tempProjects[editingProjectIndex]?.startDate || ""}
                  onChangeText={(text) => {
                    const updated = [...tempProjects];
                    updated[editingProjectIndex].startDate = text;
                    setTempProjects(updated);
                  }}
                />

                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-sm text-gray-500">
                    Currently going on?
                  </Text>
                  <Switch
                    value={
                      tempProjects[editingProjectIndex]?.isOngoing || false
                    }
                    onValueChange={(value) => {
                      const updated = [...tempProjects];
                      updated[editingProjectIndex].isOngoing = value;
                      if (value) updated[editingProjectIndex].endDate = null;
                      setTempProjects(updated);
                    }}
                  />
                </View>

                {!tempProjects[editingProjectIndex]?.isOngoing && (
                  <>
                    <Text className="text-sm text-gray-500 mb-1">End Date</Text>
                    <TextInput
                      className="bg-gray-100 p-3 rounded-lg text-base text-gray-700"
                      placeholder="e.g., Mar 2023"
                      value={tempProjects[editingProjectIndex]?.endDate || ""}
                      onChangeText={(text) => {
                        const updated = [...tempProjects];
                        updated[editingProjectIndex].endDate = text;
                        setTempProjects(updated);
                      }}
                    />
                  </>
                )}
              </ScrollView>
            )}

            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="flex-1 bg-red-500 p-3 rounded-lg mr-2 items-center"
                onPress={deleteProject}
              >
                <Text className="text-white font-semibold">Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-purple-500 p-3 rounded-lg mr-2 items-center"
                onPress={saveProjects}
              >
                <Text className="text-white font-semibold">Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-300 p-3 rounded-lg items-center"
                onPress={() => setEditProjectsModalVisible(false)}
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Certifications Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editCertModalVisible}
        onRequestClose={() => setEditCertModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                Edit Certification
              </Text>
              <TouchableOpacity onPress={() => setEditCertModalVisible(false)}>
                <AntDesign name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            {editingCertIndex !== null && (
              <ScrollView className="max-h-[80vh]">
                <Text className="text-sm text-gray-500 mb-1">Title</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Certification Title"
                  value={tempCertifications[editingCertIndex]?.course || ""}
                  onChangeText={(text) => {
                    const updated = [...tempCertifications];
                    updated[editingCertIndex].course = text;
                    setTempCertifications(updated);
                  }}
                />

                <Text className="text-sm text-gray-500 mb-1">Organization</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="e.g., Coursera, Udemy"
                  value={tempCertifications[editingCertIndex]?.platform || ""}
                  onChangeText={(text) => {
                    const updated = [...tempCertifications];
                    updated[editingCertIndex].platform = text;
                    setTempCertifications(updated);
                  }}
                />

                <Text className="text-sm text-gray-500 mb-1">Location</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Location"
                  value={tempCertifications[editingCertIndex]?.location || ""}
                  onChangeText={(text) => {
                    const updated = [...tempCertifications];
                    updated[editingCertIndex].location = text;
                    setTempCertifications(updated);
                  }}
                />

                <Text className="text-sm text-gray-500 mb-1">Description</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Description"
                  value={
                    tempCertifications[editingCertIndex]?.description || ""
                  }
                  onChangeText={(text) => {
                    const updated = [...tempCertifications];
                    updated[editingCertIndex].description = text;
                    setTempCertifications(updated);
                  }}
                  multiline
                />

                <Text className="text-sm text-gray-500 mb-1 mt-2">Skills</Text>
                <View className="flex-row flex-wrap mb-4">
                  {(tempCertifications[editingCertIndex]?.skills || []).map(
                    (skill, index) => (
                      <View
                        key={index}
                        className="bg-purple-100 flex-row items-center rounded-full px-3 py-1.5 mr-2 mb-2"
                      >
                        <Text className="text-purple-700 text-sm font-semibold mr-1">
                          {skill}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeCertSkill(skill)}
                        >
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={16}
                            color="#6366F1"
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  )}
                </View>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="Search or add a skill..."
                  value={certSearchTerm}
                  onChangeText={handleCertSearch}
                />
                {certSuggestions.length > 0 && (
                  <ScrollView className="max-h-[150px] bg-gray-100 rounded-lg mb-4">
                    {certSuggestions.map((skill, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => addCertSkill(skill)}
                      >
                        <Text className="p-3 text-base text-gray-700 border-b border-gray-200">
                          {skill}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                <Text className="text-sm text-gray-500 mb-1">Start Date</Text>
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg mb-2 text-base text-gray-700"
                  placeholder="e.g., Jan 2023"
                  value={tempCertifications[editingCertIndex]?.startDate || ""}
                  onChangeText={(text) => {
                    const updated = [...tempCertifications];
                    updated[editingCertIndex].startDate = text;
                    setTempCertifications(updated);
                  }}
                />

                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-sm text-gray-500">
                    Currently ongoing?
                  </Text>
                  <Switch
                    value={
                      tempCertifications[editingCertIndex]?.isOngoing || false
                    }
                    onValueChange={(value) => {
                      const updated = [...tempCertifications];
                      updated[editingCertIndex].isOngoing = value;
                      if (value) updated[editingCertIndex].endDate = null;
                      setTempCertifications(updated);
                    }}
                  />
                </View>

                {!tempCertifications[editingCertIndex]?.isOngoing && (
                  <>
                    <Text className="text-sm text-gray-500 mb-1">End Date</Text>
                    <TextInput
                      className="bg-gray-100 p-3 rounded-lg text-base text-gray-700"
                      placeholder="e.g., Mar 2023"
                      value={
                        tempCertifications[editingCertIndex]?.endDate || ""
                      }
                      onChangeText={(text) => {
                        const updated = [...tempCertifications];
                        updated[editingCertIndex].endDate = text;
                        setTempCertifications(updated);
                      }}
                    />
                  </>
                )}
              </ScrollView>
            )}

            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="flex-1 bg-red-500 p-3 rounded-lg mr-2 items-center"
                onPress={deleteCert}
              >
                <Text className="text-white font-semibold">Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-purple-500 p-3 rounded-lg mr-2 items-center"
                onPress={saveCertifications}
              >
                <Text className="text-white font-semibold">Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-300 p-3 rounded-lg items-center"
                onPress={() => setEditCertModalVisible(false)}
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;
