import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, BackHandler } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Index() {

    const logo = require("../../assets/images/logo.png");
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            async function Check() {
                const json = await AsyncStorage.getItem("user");

                if (!json || json.length === 0) {
                    router.replace("/(tabs)/main");
                } else {
                    router.replace("/(tabs)/home");
                }
            }
            Check();
        }, [])
    );

    return (
        <SafeAreaView style={[styles.container]}>
            <Image source={logo} style={[styles.logo]} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
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
