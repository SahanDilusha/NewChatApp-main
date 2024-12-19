import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { FontAwesome5, AntDesign, Ionicons, Feather, EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useLocalSearchParams } from 'expo-router';


export default function Chat() {

    const [getData, setData] = useState([]);
    const [getText, setText] = useState("");
    const [showShare, setShowShare] = useState(false);
    const { fromUser, toUser, name } = useLocalSearchParams();
 
    const logo = require("../../assets/images/dp.png");

    const router = useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    async function Get() {

        try {

            const response = await fetch(`${apiUrl}GetChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "fromUser": fromUser,
                        "toUser": toUser,
                    }
                ),
            });

            if (response.ok) {

                const json = await response.json();

                console.log(json);

                if (json.status) {

                    setData((prevData) => {
                        const dataMap = new Map(prevData.map(chat => [chat.id, chat]));
    
                        json.content.forEach(chat => {
                            dataMap.set(chat.id, chat);
                        });
    
                        return Array.from(dataMap.values()).filter(chat => 
                            json.content.some(newChat => newChat.id === chat.id)
                        );
                    });


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

        Get();

    }, [fromUser, toUser]);

    useFocusEffect(
        useCallback(() => {
            const interval = setInterval(() => {
                Get();
            }, 5000);

            return () => clearInterval(interval);
        }, [fromUser, toUser])
    );

    return (
        <SafeAreaView style={[styles.flex1]}>
            <StatusBar style="dark" />
            <View style={[styles.flexRow, styles.w_100, styles.gap10, styles.alignItemsCenter, styles.p_20]}>
                <View style={[styles.flexRow, styles.gap10, styles.justifyContentCenter, styles.alignItemsCenter,]}>
                    <Pressable onPress={() => {
                        router.replace("/(tabs)/home");
                    }} style={[styles.justifyContentCenter, styles.alignItemsCenter]}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </Pressable>
                    <Pressable>
                        <Image source={logo} style={styles.img1} />
                        <View style={[styles.absolute, styles.view1]}></View>
                    </Pressable>
                </View>
                <View style={[styles.gap10, styles.flex1]}>
                    <Text style={[styles.carosMedium, styles.subTitle]} numberOfLines={1}>{name}</Text>
                    <Text style={styles.carosLight}>Online</Text>
                </View>
                <View style={[styles.flexRow, styles.justifyContentCenter, styles.alignItemsCenter, styles.gap15]}>
                    <Pressable>
                        <Ionicons name="call-outline" size={24} color="black" />
                    </Pressable>
                    <Pressable>
                        <AntDesign name="videocamera" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
            <View style={[styles.flex1, styles.p_10]}>
                <FlashList showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.p_10} estimatedItemSize={200} data={getData} renderItem={({ item }) =>
                    <Pressable style={[styles.mb10, styles.gap10, item.fromUser === parseInt(fromUser) ? styles.alignSelfEnd : styles.alignSelfStart]}>
                        <View style={[styles.justifyContentCenter, styles.alignItemsCenter, item.fromUser === 5 ? styles.view2 : styles.view3]}>
                            <Text style={[styles.carosMedium, styles.color1]}>{item.msg}</Text>
                        </View>
                        <Text style={[styles.text1, styles.carosLight]}>{item.time} {item.fromUser === parseInt(fromUser) ? <FontAwesome5 name={item.status === 2 ? "check" : "check-double"} size={12} color={item.status === 2 ? "#919190" : "#23db9e"} /> : null}</Text>
                    </Pressable>} />
            </View>
            <View style={[styles.flexRow, styles.w_100, styles.justifyContentCenter, styles.alignItemsCenter, styles.gap15, styles.p_10]}>
                <Pressable onPress={() => {
                    setShowShare(!showShare);
                }}>
                    <Feather name="paperclip" size={24} color="black" />
                </Pressable>
                <TextInput style={[styles.input, styles.flex1]} value={getText} onChangeText={(text) => {
                    setText(text);
                }} />
                <Pressable style={[styles.btn, styles.justifyContentCenter, styles.alignItemsCenter]}>
                    <Feather name="mic" size={24} color="black" />
                </Pressable>
                <Pressable style={[styles.justifyContentCenter, styles.absolute, styles.alignItemsCenter, styles.sendBtn, styles.btn]} onPress={async () => {

                    try {

                        const response = await fetch(`${apiUrl}Save`, {
                            method: 'POST',
                            body: JSON.stringify({
                                "fromUser": fromUser,
                                "toUser": toUser,
                                "text": getText,
                            }),
                        });

                        if (response.ok) {
                            const json = await response.json();

                            if (json.status) {
                                console.log("true");
                                setText("");
                            } else {
                                console.log("error1");
                            }

                        } else {
                            console.log("error");
                        }

                    } catch (error) {
                        console.log("error");
                    }
                }}>
                    <Ionicons name="send" size={24} color="#fff" />
                </Pressable>
            </View>

            {
                showShare && <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={[styles.w_100, styles.h_100, styles.absolute, { bottom: 0 }]}>
                    <BlurView style={[styles.w_100, styles.h_100,]} tint={"dark"}>
                        <Pressable style={[styles.flex1]} onPress={() => {
                            setShowShare(!showShare);
                        }}></Pressable>
                        <View style={[styles.w_100, styles.view4, styles.p_20, styles.gap30]}>
                            <View style={[styles.w_100, styles.justifyContentCenter, styles.alignItemsCenter]}>
                                <Pressable style={[styles.alignSelfStart, styles.flexRow, styles.absolute,]} onPress={() => {
                                    setShowShare(!showShare);
                                }}>
                                    <AntDesign name="close" size={24} color="black" />
                                </Pressable>
                                <Text style={[styles.carosBold, styles.subTitle]}>Share Content</Text>
                            </View>
                            <View style={[styles.p_10, styles.gap30]}>
                                <Pressable style={[styles.flexRow, styles.gap15]}>
                                    <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.view5]}>
                                        <AntDesign name="camerao" size={30} color="#797C7B" />
                                    </View>
                                    <View style={[styles.flex1, styles.gap10, styles.justifyContentCenter,]}>
                                        <Text style={[styles.carosBold]}>Camera</Text>
                                    </View>
                                </Pressable>
                                <Pressable style={[styles.flexRow, styles.gap15, styles.alignItemsCenter]}>
                                    <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.view5]}>
                                        <AntDesign name="file1" size={30} color="#797C7B" />
                                    </View>
                                    <View style={[styles.flex1, styles.gap10, styles.justifyContentCenter,]}>
                                        <Text style={[styles.carosBold]}>Documents</Text>
                                        <Text>Share your files</Text>
                                    </View>
                                </Pressable>
                                <Pressable style={[styles.flexRow, styles.gap15, styles.alignItemsCenter]}>
                                    <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.view5]}>
                                        <Feather name="bar-chart" size={30} color="#797C7B" />
                                    </View>
                                    <View style={[styles.flex1, styles.gap10, styles.justifyContentCenter,]}>
                                        <Text style={[styles.carosBold]}>Create a poll</Text>
                                        <Text>Create a poll for any querry</Text>
                                    </View>
                                </Pressable>
                                <Pressable style={[styles.flexRow, styles.gap15, styles.alignItemsCenter]}>
                                    <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.view5]}>
                                        <EvilIcons name="location" size={30} color="#797C7B" />
                                    </View>
                                    <View style={[styles.flex1, styles.gap10, styles.justifyContentCenter,]}>
                                        <Text style={[styles.carosBold]}>Location</Text>
                                        <Text>Share your location</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </BlurView>
                </Animated.View>
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
        fontSize: 18,
    },
    w_100: {
        width: "100%",
    },
    header: {
        height: "30%",
    },
    p_20: {
        padding: 20,
    },
    logo: {
        width: 100,
        height: 25,
    },
    flexRow: {
        flexDirection: 'row',
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
    gap15: {
        gap: 15,
    },
    absolute: {
        position: "absolute",
    },
    ml20: {
        marginLeft: 20,
    },
    img1: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    view1: {
        backgroundColor: "#3fd47d",
        width: 15,
        height: 15,
        borderRadius: 15,
    },
    input: {
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#cacbcc",
        paddingRight: 50,
    },
    btn: {
        width: 48,
        height: 48,
        borderRadius: 45,
    },
    sendBtn: {
        backgroundColor: "#20A090",
        right: 70,
    },
    view2: {
        backgroundColor: "#20A090",
        padding: 15,
        borderStartStartRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    view3: {
        backgroundColor: "#7d7d7c",
        padding: 15,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        borderTopEndRadius: 20,
    },
    alignSelfEnd: {
        alignSelf: "flex-end",
    },
    alignSelfStart: {
        alignSelf: "flex-start",
    },
    mb10: {
        marginBottom: 15,
    },
    text1: {
        alignSelf: "flex-end",
    },
    h_100: {
        height: "100%",
    },
    view4: {
        backgroundColor: "#fff",
        height: "75%",
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    p_10: {
        padding: 10,
    },
    view5: {
        backgroundColor: "#F2F8F7",
        width: 60,
        height: 60,
        borderRadius: 60,
    },
});