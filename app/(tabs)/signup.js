import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import MyAlert from "../../component/MyAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {

    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);
    const [getName, setName] = useState("");
    const [getMobile, setMobile] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getConfirmPassword, setConfirmPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [getMsg, setMsg] = useState("");

    const router = useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.container, styles.main, styles.alignItemsCenter]}>
                        <Pressable style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.pressable2, styles.ph_20]} onPress={() => {
                            router.replace("/main");
                        }}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </Pressable>
                        <View style={[styles.titleView, styles.justifyContentCenter, styles.alignItemsCenter, styles.ph_20]}>
                            <Text style={[styles.title, styles.carosBold, styles.h1]}>Sign up with Mobile</Text>
                            <Text style={[styles.textAlignCenter, styles.subTitle, styles.carosLight]}>Get chatting with friends and family today by signing up for our chat app!</Text>
                        </View>

                        <View style={[styles.alignItemsCenter, styles.w_100, styles.gap10, styles.view, styles.ph_20]}>
                            <View style={[styles.w_100]}>
                                <Text style={[styles.carosMedium, styles.subTitle, styles.color]}>Your Name</Text>
                                <TextInput style={[styles.input, styles.carosMedium, styles.subTitle]} onChangeText={(text) => {
                                    setName(text);
                                }} />
                            </View>
                            <View style={[styles.w_100]}>
                                <Text style={[styles.carosMedium, styles.subTitle, styles.color]}>Your Mobile</Text>
                                <TextInput style={[styles.input, styles.carosMedium, styles.subTitle]} inputMode="tel" onChangeText={(text) => {
                                    setMobile(text);
                                }} />
                            </View>
                            <View style={[styles.w_100]}>
                                <Text style={[styles.carosMedium, styles.subTitle, styles.color]}>Password</Text>
                                <TextInput style={[styles.input, styles.carosMedium, styles.subTitle]} secureTextEntry={show} onChangeText={(text) => {
                                    setPassword(text);
                                }} />
                                <Pressable style={styles.eyeIcon} onPress={() => {
                                    setShow(!show);
                                }}>
                                    <FontAwesome name={show ? "eye-slash" : "eye"} size={24} color="#CDD1D3" />
                                </Pressable>
                            </View>
                            <View style={[styles.w_100]}>
                                <Text style={[styles.carosMedium, styles.subTitle, styles.color]}>Confirm Password</Text>
                                <TextInput style={[styles.input, styles.carosMedium, styles.subTitle]} secureTextEntry={show1} onChangeText={(text) => {
                                    setConfirmPassword(text);
                                }} />
                                <Pressable style={styles.eyeIcon} onPress={() => {
                                    setShow1(!show1);
                                }}>
                                    <FontAwesome name={show1 ? "eye-slash" : "eye"} size={24} color="#CDD1D3" />
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.gap10, styles.w_100, styles.pressableView, styles.ph_20]}>
                            <Pressable style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.w_100, styles.pressable1,]} onPress={async () => {

                                try {

                                    const response = await fetch(`${apiUrl}SignUp`, {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            name: getName,
                                            mobile: getMobile,
                                            password: getPassword,
                                            confirmPassword: getConfirmPassword,
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }
                                    });

                                    if (response.ok) {
                                        const json = await response.json();

                                        if (json.status) {
                                            console.log("ok");
                                            await AsyncStorage.setItem("user",JSON.stringify(json.content));
                                            router.replace("/(tabs)/home");
                                        } else {
                                            setMsg(json.content);
                                            setShowAlert(true);
                                        }

                                    } else {
                                        console.log(response.statusText);
                                        setMsg("Can't process your request at this time. Please try again later.");
                                        setShowAlert(true);
                                    }

                                } catch (error) {
                                    console.log(error);
                                    setMsg("Can't process your request at this time. Please try again later.");
                                    setShowAlert(true);
                                }
                            }}>
                                <Text style={[styles.carosMedium, styles.subTitle, styles.color2]}>Create an account</Text>
                            </Pressable>
                        </View>
                        {
                            showAlert && <MyAlert msg={getMsg} title={"Warning"} setShow={setShowAlert} type={"warning"} />
                        }

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        backgroundColor: "#ffffff",
    },
    alignItemsCenter: {
        alignItems: "center",
    },
    justifyContentCenter: {
        justifyContent: "center",
    },
    titleView: {
        gap: 10,
        marginTop: 20,
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
    h1: {
        fontSize: 24,
    },
    subTitle: {
        fontSize: 16,
    },
    textAlignCenter: {
        textAlign: "center",
    },
    text1: {
        fontSize: 14,
        marginTop: 25,
        marginBottom: 25,
    },
    w_100: {
        width: "100%",
    },
    color: {
        color: "#24786D",
    },
    input: {
        width: "100%",
        height: 50,
        borderStyle: 'solid',
        borderBottomColor: "#CDD1D0",
        borderBottomWidth: 2,
        paddingHorizontal: 30,
    },
    gap10: {
        gap: 40,
    },
    eyeIcon: {
        position: "absolute",
        right: 0,
        top: 30,
    },
    color2: {
        color: "#fff",
    },
    pressable1: {
        backgroundColor: "#24786D",
        height: 50,
        borderRadius: 20,
    },
    pressableView: {
        bottom: -70,
    },
    pressable2: {
        alignSelf: "flex-start",
        marginTop: 20,
    },
    view: {
        marginTop: 20,
    },
    ph_20: {
        paddingHorizontal: 20,
    },
});
