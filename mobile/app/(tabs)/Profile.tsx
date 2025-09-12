// import {
//   ScrollView,
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   TextInput,
// } from "react-native";
// import React, { useState } from "react";
// import { AntDesign } from "@expo/vector-icons";

// const Profile: React.FC = () => {
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [name, setName] = useState("Yugitha B");
//   const [email, setEmail] = useState("yugithabalaji@college.edu");
//   const [phone, setPhone] = useState("+91 9876543210");

//   return (
//     <ScrollView
//       className="flex-1 bg-gray-100 p-6"
//       showsVerticalScrollIndicator={false}
//     >
//       <View className="items-center mb-8 mt-6">
//         <View className="w-28 h-28 rounded-full bg-blue-500 justify-center items-center mb-4 shadow-md">
//           <AntDesign name="user" size={64} color="white" />
//         </View>
//         <Text className="text-2xl font-bold text-gray-800">{name}</Text>
//         <Text className="text-lg text-gray-600 mb-4">
//           Computer Science Engineering
//         </Text>
//         <View className="flex-row justify-between w-full">
//           <View className="bg-white rounded-xl p-5 items-center flex-1 mx-2 shadow-lg">
//             <Text className="text-xl font-bold text-gray-800">8.0</Text>
//             <Text className="text-xs text-gray-500">CGPA</Text>
//           </View>
//           <View className="bg-white rounded-xl p-5 items-center flex-1 mx-2 shadow-lg">
//             <Text className="text-xl font-bold text-gray-800">4th Year</Text>
//             <Text className="text-xs text-gray-500">Current Year</Text>
//           </View>
//           <View className="bg-white rounded-xl p-5 items-center flex-1 mx-2 shadow-lg">
//             <Text className="text-xl font-bold text-gray-800">12</Text>
//             <Text className="text-xs text-gray-500">Applications</Text>
//           </View>
//         </View>
//       </View>

//       <View className="bg-white p-5 rounded-2xl mb-6 shadow-lg">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-2xl font-bold text-gray-800">
//             Contact Information
//           </Text>
//           <TouchableOpacity onPress={() => setEditModalVisible(true)}>
//             <AntDesign name="edit" size={24} color="#6366F1" />
//           </TouchableOpacity>
//         </View>
//         <View className="flex-row items-center mb-3">
//           <AntDesign name="mail" size={20} color="#6B7280" />
//           <Text className="ml-3 text-base text-gray-700">{email}</Text>
//         </View>
//         <View className="flex-row items-center mb-3">
//           <AntDesign name="phone" size={20} color="#6B7280" />
//           <Text className="ml-3 text-base text-gray-700">{phone}</Text>
//         </View>
//         <View className="flex-row items-center">
//           <AntDesign name="idcard" size={20} color="#6B7280" />
//           <Text className="ml-3 text-base text-gray-700">CSE/2021/001</Text>
//         </View>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={editModalVisible}
//         onRequestClose={() => setEditModalVisible(false)}
//       >
//         <View className="flex-1 justify-end bg-black/50">
//           <View className="bg-white p-6 rounded-t-3xl">
//             <Text className="text-xl font-bold text-gray-800 mb-4">
//               Edit Contact Information
//             </Text>
//             <TextInput
//               className="bg-gray-100 p-3 rounded-lg mb-3 text-base text-gray-700"
//               placeholder="Name"
//               value={name}
//               onChangeText={setName}
//             />
//             <TextInput
//               className="bg-gray-100 p-3 rounded-lg mb-3 text-base text-gray-700"
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//             />
//             <TextInput
//               className="bg-gray-100 p-3 rounded-lg mb-4 text-base text-gray-700"
//               placeholder="Phone"
//               value={phone}
//               onChangeText={setPhone}
//             />
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 className="flex-1 bg-blue-500 p-3 rounded-lg mr-2"
//                 onPress={() => setEditModalVisible(false)}
//               >
//                 <Text className="text-white text-center font-semibold">
//                   Save
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className="flex-1 bg-gray-300 p-3 rounded-lg ml-2"
//                 onPress={() => setEditModalVisible(false)}
//               >
//                 <Text className="text-gray-800 text-center font-semibold">
//                   Cancel
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <View className="bg-white p-5 rounded-2xl mb-6 shadow-lg">
//         <Text className="text-2xl font-bold text-gray-800 mb-4">Skills</Text>
//         <View className="flex-row flex-wrap">
//           {["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"].map(
//             (skill, index) => (
//               <Text
//                 key={index}
//                 className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full mr-2 mb-2 text-sm font-semibold"
//               >
//                 {skill}
//               </Text>
//             )
//           )}
//         </View>
//       </View>

//       <View className="bg-white p-5 rounded-2xl mb-6 shadow-lg">
//         <Text className="text-2xl font-bold text-gray-800 mb-4">Projects</Text>
//         <View className="bg-gray-50 p-4 rounded-xl mb-3">
//           <Text className="text-lg font-bold text-gray-800">
//             E-commerce Platform
//           </Text>
//           <Text className="text-sm text-blue-600 mb-1">
//             React, Node.js, MongoDB
//           </Text>
//           <Text className="text-sm text-gray-600">
//             Full-stack web application with payment integration
//           </Text>
//         </View>
//         <View className="bg-gray-50 p-4 rounded-xl">
//           <Text className="text-lg font-bold text-gray-800">
//             Task Management App
//           </Text>
//           <Text className="text-sm text-blue-600 mb-1">
//             React Native, Firebase
//           </Text>
//           <Text className="text-sm text-gray-600">
//             Cross-platform mobile app for project management
//           </Text>
//         </View>
//       </View>

//       <View className="bg-white p-5 rounded-2xl mb-[8rem] shadow-lg">
//         <Text className="text-2xl font-bold text-gray-800 mb-4">Resume</Text>
//         <View className="flex-row justify-between mt-2">
//           <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-100 p-4 rounded-xl mr-2">
//             <AntDesign name="upload" size={20} color="#6B7280" />
//             <Text className="ml-2 text-sm font-semibold text-gray-800">
//               Upload Resume
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-blue-500 p-4 rounded-xl ml-2">
//             <AntDesign name="download" size={20} color="white" />
//             <Text className="ml-2 text-sm font-semibold text-white">
//               Generate Resume
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <Text className="text-center mt-4 text-sm text-gray-500">
//           Last updated: March 8, 2024
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default Profile;
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const Profile: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState("Yugitha B");
  const [email, setEmail] = useState("yugithabalaji@college.edu");
  const [phone, setPhone] = useState("+91 9876543210");

  return (
    <ScrollView
      className="flex-1 bg-gray-100 p-4"
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View className="items-center mb-6 mt-4">
        <View className="w-28 h-28 rounded-full bg-purple-500 justify-center items-center mb-4 shadow-md">
          <AntDesign name="user" size={64} color="white" />
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

      {/* Contact Information */}
      <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">
            Contact Information
          </Text>
          <TouchableOpacity onPress={() => setEditModalVisible(true)}>
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
        <View className="flex-row items-center">
          <AntDesign name="idcard" size={18} color="#6B7280" />
          <Text className="ml-3 text-base text-gray-700">CSE/2021/001</Text>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white p-6 rounded-t-3xl">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Edit Contact Information
            </Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-3 text-base text-gray-700"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-3 text-base text-gray-700"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-4 text-base text-gray-700"
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="flex-1 bg-purple-500 p-3 rounded-lg mr-2"
                onPress={() => setEditModalVisible(false)}
              >
                <Text className="text-white text-center font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-300 p-3 rounded-lg ml-2"
                onPress={() => setEditModalVisible(false)}
              >
                <Text className="text-gray-800 text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Skills */}
      <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
        <Text className="text-xl font-bold text-gray-800 mb-4">Skills</Text>
        <View className="flex-row flex-wrap items-center gap-x-2 gap-y-2">
          {["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"].map(
            (skill, index) => (
              <View
                key={index}
                className="bg-purple-100 flex items-center justify-center"
              >
                <Text className=" text-purple-700 px-3 py-1.5 rounded-full mr-2 mb-2 text-sm font-semibold">
                  {skill}
                </Text>
              </View>
            )
          )}
        </View>
      </View>

      {/* Projects */}
      <View className="bg-white p-5 rounded-2xl mb-5 shadow-md">
        <Text className="text-xl font-bold text-gray-800 mb-4">Projects</Text>
        {[
          {
            title: "E-commerce Platform",
            tech: "React, Node.js, MongoDB",
            desc: "Full-stack web application with payment integration",
          },
          {
            title: "Task Management App",
            tech: "React Native, Firebase",
            desc: "Cross-platform mobile app for project management",
          },
        ].map((project, index) => (
          <View
            key={index}
            className="bg-gray-50 p-4 rounded-xl mb-3 shadow-sm"
          >
            <Text className="text-lg font-bold text-gray-800">
              {project.title}
            </Text>
            <Text className="text-sm text-purple-600 mb-1">{project.tech}</Text>
            <Text className="text-sm text-gray-600">{project.desc}</Text>
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
    </ScrollView>
  );
};

export default Profile;
