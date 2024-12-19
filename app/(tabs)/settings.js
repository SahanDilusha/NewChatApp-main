import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, AntDesign, Ionicons, Feather, EvilIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import Animated, { FadeInLeft, FadeInUp, FadeOut, FadeOutRight, FadeOutUp } from "react-native-reanimated";
import MyAlert from "../../component/MyAlert";


export default function Settings() {

    const [getUser, setUser] = useState({});
    const [getName, setName] = useState('');
    const [getShow, setShow] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [getMsg, setMsg] = useState("");

    const router = useRouter();
    const logo2 = require("../../assets/images/dp_default.png");
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    useFocusEffect(
        useCallback(() => {
            async function Get() {
                const user = JSON.parse(await AsyncStorage.getItem("user"));

                console.log(user);

                setUser(user);
            }
            Get();
        }, [])
    );

    return (
        <SafeAreaView style={[styles.flex1]}>
            <View style={[styles.flex1, styles.main, styles.p_20, styles.alignItemsCenter, styles.gap30]}>
                <View style={[styles.w_100, styles.header, styles.flexRow, styles.gap30, styles.alignItemsCenter, styles.justifyContentStart]}>
                    <Pressable onPress={() => {
                        setName("");
                        setShow(true);
                        router.replace("/(tabs)/home");
                    }} style={[styles.justifyContentCenter, styles.alignItemsCenter]}>
                        <AntDesign name="arrowleft" size={28} color="black" />
                    </Pressable>
                    <Text style={[styles.carosBold, styles.h1]}>Settings</Text>
                </View>
                <View style={[styles.flex1, styles.w_100, styles.alignItemsCenter, styles.gap30]}>
                    <Pressable style={[styles.justifyContentCenter, styles.alignItemsCenter]}>
                        <Image style={[styles.logo]} source={logo2} />
                    </Pressable>
                    <View style={[styles.alignItemsCenter, styles.gap10, styles.justifyContentBetween, styles.flexRow, styles.item, styles.w_100]}>

                        {getShow ? <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.gap10, styles.flexRow]}>
                            <AntDesign name="user" size={24} color="black" />
                            <Text style={[styles.carosRegular, styles.subTitle, styles.carosMedium]}>{getUser.name}</Text>
                        </View> : <View style={[styles.flex1]}  >
                            <TextInput style={[styles.flex1, styles.subTitle, styles.input]} placeholder="Your Name" onChangeText={(text) => {
                                setName(text);
                            }} />
                        </View>}


                        {getShow ? <Pressable style={[styles.p_10, styles.alignItemsCenter, styles.justifyContentCenter]}
                            onPress={() => {
                                setShow(!getShow);
                            }}>
                            <Feather name="edit-2" size={20} color="black" />
                        </Pressable> : <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.flexRow]}>
                            <Pressable
                                style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.p_10, styles.pressable1]}
                                onPress={async () => {
                                    try {
                                        if (getName.length !== 0) {
                                            const response = await fetch(`${apiUrl}UpdateName`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    id: getUser.id,
                                                    name: getName,
                                                }),
                                            });

                                            if (response.ok) {
                                                const json = await response.json();

                                                if (json.status) {
                                                    
                                                    const user = JSON.parse(await AsyncStorage.getItem("user"));
                                                    user.name = getName;
                                                    console.log(user);

                                            
                                                    await AsyncStorage.setItem("user", JSON.stringify(user));
                                                    setUser(user); 
                                                    setShow(true);
                                                    console.log("ok");
                                                } else {
                                                    setMsg(json.content);
                                                    setShowAlert(true);
                                                }

                                            } else {
                                                console.log(response.statusText);
                                                setMsg("Can't process your request at this time. Please try again later.");
                                                setShowAlert(true);
                                            }

                                        } else {
                                            setMsg("Please enter your name!");
                                            setShowAlert(true);
                                        }

                                    } catch (error) {
                                        console.log("erro01", error);
                                        setMsg("Can't process your request at this time. Please try again later.");
                                        setShowAlert(true);
                                    }
                                }}
                            >
                                <Text>Update</Text>
                            </Pressable>

                            <Pressable style={[styles.p_10, styles.alignItemsCenter, styles.justifyContentCenter, styles.p_10]}
                                onPress={() => {
                                    setShow(!getShow);
                                }}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>}

                    </View>
                    <Pressable style={[styles.alignItemsCenter, styles.justifyContentBetween, styles.flexRow, styles.item, styles.w_100]}
                        onPress={() => {
                            setShow(!getShow);
                        }}>
                        <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.gap10, styles.flexRow]}>
                            <AntDesign name="mobile1" size={24} color="black" />
                            <Text style={[styles.carosRegular, styles.subTitle, styles.carosMedium]}>{getUser.mobile}</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles.alignItemsCenter, styles.justifyContentBetween, styles.flexRow, styles.item, styles.w_100, styles.p_10]}
                        onPress={async () => {
                            await AsyncStorage.setItem("user", "");
                            router.replace("/");
                        }}>
                        <Text style={[styles.carosRegular, styles.subTitle, styles.carosMedium, styles.colorRed]}>Log Out</Text>
                        <AntDesign name="logout" size={24} color="red" />
                    </Pressable>
                </View>
            </View>
            {
                showAlert && <MyAlert msg={getMsg} title={"Warning"} setShow={setShowAlert} type={"warning"} />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    main: {
        backgroundColor: "#fff",
    },
    alignItemsCenter: {
        alignItems: "center",
    },
    justifyContentCenter: {
        justifyContent: "center",
    },
    justifyContentBetween: {
        justifyContent: "space-between",
    },
    justifyContentStart: {
        justifyContent: "flex-start",
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
        fontSize: 20,
    },
    w_100: {
        width: "100%",
    },
    header: {
        height: "5%",
    },
    view1: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 40,
        borderTopEndRadius: 40,
    },
    p_20: {
        padding: 20,
    },
    p_10: {
        padding: 10,
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderStyle: "solid",
        borderWidth: 2,
    },
    flexRow: {
        flexDirection: 'row',
    },
    pressable1: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 40,
    },
    gap30: {
        gap: 30,
    },
    color1: {
        color: "#fff",
    },
    gap10: {
        gap: 10,
    },
    absolute: {
        position: "absolute",
    },
    icon1: {
        top: 0,
        left: 0,
    },
    ml20: {
        marginLeft: 20,
    },
    input: {
        color: "#fff",
        backgroundColor: "#000",
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    textView: {
        top: 0,
        paddingHorizontal: 10,

    },
    flexStart: {
        alignSelf: "flex-start",
    },
    item: {
        height: 50,
    },
    colorRed: {
        color: "red",
    },
});