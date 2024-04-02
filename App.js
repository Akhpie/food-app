import { View, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/NewPostScreen";
import SignedInStack from "./navigation";
import LoginForm from "./loginScreen/LoginForm";
import SignupForm from "./signupScreen/SignupForm";

export default function App() {
  return (
    // <HomeScreen />
    // <NewPostScreen />

    <SignedInStack />
    // <LoginForm />
    // <SignupForm />
  );
}
