import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// Import the eye icon images
import eyeIcon from "../../assets/images/view.png";
import eyeSlashIcon from "../../assets/images/hide.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://10.135.54.64:8000/auth/signup", data);
      if (response.data.success) {
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>TripMate</Text>
          <Text style={styles.subtitle}>Get Started With MAKER</Text>
          <Text style={styles.description}>Getting started is easy</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="fullName"
              rules={{ required: "Full name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Full Name"
                  style={[styles.input, errors.fullName && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter Email"
                  style={[styles.input, errors.email && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    style={[styles.input, errors.password && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Image
                  source={showPassword ? eyeSlashIcon : eyeIcon}
                  style={styles.eyeImage}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Image
                  source={showConfirmPassword ? eyeSlashIcon : eyeIcon}
                  style={styles.eyeImage}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signInText}>
            Have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signInLink}>Sign in!</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "", // Background color for the entire screen
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6200EE",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  eyeImage: {
    width: 20,
    height: 20,
  },
  submitButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signInText: {
    marginTop: 20,
    color: "#333",
    fontSize: 14,
  },
  signInLink: {
    color: "#6200EE",
    fontWeight: "600",
  },
});

export default Signup;
