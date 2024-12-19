import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from "@shopify/flash-list";
import ContactItem from "../../component/ContactItem";
import { useFocusEffect } from "@react-navigation/native";
import Animated, { FadeInLeft, FadeInUp, FadeOut, FadeOutRight, FadeOutUp } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {

    const [getData, setData] = useState([]);
    const [getShow, setShow] = useState(false);
    const [getText, setText] = useState('');
    const [getUser, setUser] = useState({});



    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const logo = require("../../assets/images/logo.png");
    const logo2 = require("../../assets/images/dp_default.png");

    const router = useRouter();

    async function Status() {

        const user = JSON.parse(await AsyncStorage.getItem("user"));

        console.log(user);

        setUser(user);

        try {

            const response = await fetch(`${apiUrl}UserStatusChenge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "id": user.id,
                        "status": 1,
                    }
                ),
            });

            if (response.ok) {

                const json = await response.json();

                console.log(json);

                if (json.status) {


                    console.log("Status Done");

                } else {
                    console.log("system error");
                }

            } else {
                console.log("error 1");
            }

        } catch (error) {
            console.log("e", error);
        }

    }

    async function Get() {

        try {

            const response = await fetch(`${apiUrl}GetMainData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "id": 5,
                        "text": getText,
                    }
                ),
            });

            if (response.ok) {

                const json = await response.json();

                console.log(json);

                if (json.status) {

                    setData(json.content);


                } else {
                    console.log("system error");
                }

            } else {
                console.log("error 1");
            }

        } catch (error) {
            console.log("e", error);
        }

    }


    useEffect(() => {

        Status();
        Get();

    }, [getText]);


    useFocusEffect(useCallback(() => {
        const interval = setInterval(() => {

            Get();

        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [getText]));


    return (
        <SafeAreaView style={styles.flex1}>
            <StatusBar style="dark" />
            <View style={[styles.main, styles.flex1]}>
                <View style={[styles.header, styles.w_100, styles.p_20, styles.gap30]}>
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween, styles.w_100]}>
                        <Pressable style={[styles.pressable1, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={() => {
                            setShow(!getShow);
                        }}>
                            <AntDesign name="search1" size={20} color="#fff" />
                        </Pressable>
                        <Image source={logo} style={styles.logo} />
                        <Pressable style={[styles.justifyContentCenter, styles.alignItemsCenter]}>
                            <Image source={logo2} style={styles.pressable1} />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.flex1, styles.view1, styles.p_20]}>

                    <FlashList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.flex1} data={getData}
                        estimatedItemSize={200} renderItem={({ item }) =>
                            <ContactItem
                                lastChat={item.lastChat}
                                name={item.name}
                                image={item.image}
                                status={item.status}
                                count={item.count}
                                onPress={() => {
                                    router.push({
                                        pathname: "/(tabs)/chat", 
                                        params: { fromUser:getUser.id ,toUser:item.toUser, name: item.name },
                                      });
                                }} />}
                    />
                </View>

                {
                    getShow && <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={[styles.w_100, styles.justifyContentCenter, , styles.alignItemsCenter, , styles.flexRow, styles.absolute, styles.header, styles.textView, styles.main]}>
                        <TextInput style={[styles.flex1, styles.input]} placeholder="Search..." placeholderTextColor={"#fff"} value={getText}
                            onChangeText={(text) => {
                                setText(text);
                                Get();
                            }}
                        />
                        <Pressable style={[styles.p_10]} onPress={() => {
                            setShow(!getShow);
                        }}>
                            <AntDesign name="close" size={30} color="#fff" />
                        </Pressable>
                    </Animated.View>
                }

            </View>



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    main: {
        backgroundColor: "#000",
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
    w_100: {
        width: "100%",
    },
    header: {
        height: "10%",
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
        width: 100,
        height: 25,
    },
    flexRow: {
        flexDirection: 'row',
    },
    pressable1: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#fff",
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    pressable2: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#fff",
        width: 60,
        height: 60,
        borderRadius: 60,
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

    }
});
