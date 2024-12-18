import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

function Index() {

    const logo = require("../../assets/images/logo.png");
    const router = useRouter();

    return (
        <LinearGradient
            colors={["#43116A", "#0A1832", "#1A1A1A"]}
            style={styles.container}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.titleSection}>
                <Text style={[styles.title, styles.carosBold]}>Connect friends easily & quickly</Text>
                <Text style={[styles.subtitle, styles.carosMedium]}>
                    Our chat app is the perfect way to stay connected with friends and family.
                </Text>
            </View>

            {/* Social Buttons Section */}
            <View style={styles.socialButtons}>
                <Pressable style={[styles.socialButton, styles.facebook]}>
                    <FontAwesome name="facebook" size={24} color="#fff" />
                </Pressable>
                <Pressable style={[styles.socialButton, styles.google]}>
                    <AntDesign name="google" size={24} color="#fff" />
                </Pressable>
                <Pressable style={[styles.socialButton, styles.apple]}>
                    <AntDesign name="apple1" size={24} color="#fff" />
                </Pressable>
            </View>
            <Text style={[styles.subtitle2, styles.carosMedium]}>
                or
            </Text>
            <Pressable style={styles.signupButton} onPress={() => {
                router.replace("/(tabs)/signup");
            }}>
                <Text style={[styles.signupText, styles.carosMedium]}>Sign up with mail</Text>
            </Pressable>

            <Pressable onPress={() => {
                router.replace("/(tabs)/login");
            }}>
                <Text style={styles.footer}>
                    Existing account? <Text style={[styles.loginLink, styles.carosBold]}>Log in</Text>
                </Text>
            </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
    },
    header: {
        alignItems: "center",
        marginTop: 50,
    },
    logo: {
        width: 160,
        height: 40,
    },
    titleSection: {
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        color: "#fff",
        textAlign: "left",
    },
    subtitle: {
        marginTop: 10,
        fontSize: 16,
        color: "#aaa",
        textAlign: "center",
        maxWidth: "80%",
    },
    socialButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 30,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    facebook: {
        backgroundColor: "#1877F2",
    },
    google: {
        backgroundColor: "#DB4437",
    },
    apple: {
        backgroundColor: "#000",
    },
    signupButton: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        borderRadius: 25,
        marginHorizontal: 30,
        alignItems: "center",
    },
    signupText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        textAlign: "center",
        fontSize: 14,
        color: "#fff",
        marginBottom: 20,
    },
    loginLink: {
        color: "#fff",
        textDecorationLine: "underline",
    },
    carosMedium: {
        fontFamily: "CarosMedium",
    },
    carosLight: {
        fontFamily: "CarosLight",
    },
    carosBold: {
        fontFamily: "CarosBold",
    },
    subtitle2: {
        marginTop: 10,
        fontSize: 16,
        color: "#aaa",
        textAlign: "center",
    },
});
