import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { BlurView } from 'expo-blur';
import { Image } from "expo-image";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MyAlert({ msg, title, setShow, type }) {

    const typeToImage = {
        info: require("../assets/images/info.gif"),
        warning: require("../assets/images/warning.gif"),
        success: require("../assets/images/success.gif"),
        error: require("../assets/images/error.gif"),
    };

    return (
        <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={[styles.h_100, styles.w_100, styles.positionAbsolute]}>
            <Pressable style={[styles.h_100, styles.w_100]} onPress={() => {
                setShow(false);
            }}>
                <BlurView tint="dark" style={[styles.flex1, styles.justifyContentCenter]}>
                    <View style={[styles.main]}>
                        <Text style={[styles.title, styles.carosBold]}>{title}</Text>
                        <Image source={typeToImage[type] || typeToImage.error} style={styles.img} />
                        <Text style={[styles.carosMedium, styles.msg]}>{msg}</Text>
                        <Pressable style={styles.closeBtn} onPress={() => {
                            setShow(false);
                        }}>
                            <AntDesign name="closecircleo" size={24} color="black" />
                        </Pressable>
                    </View>
                </BlurView>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    positionAbsolute: {
        position: "absolute",
    },
    flex1: {
        flex: 1,
    },
    w_100: {
        width: '100%',
    },
    h_100: {
        height: '100%',
    },
    main: {
        maxWidth: "80%",
        minHeight: 150,
        backgroundColor: "#fff",
        left: 35,
        padding: 10,
        borderRadius: 10,
        gap: 10
    },
    alignItemsCenter: {
        alignItems: "center",
    },
    justifyContentCenter: {
        justifyContent: "center",
    },
    carosMedium: {
        fontFamily: "CarosMedium",
    },
    carosBold: {
        fontFamily: "CarosBold",
    },
    title: {
        fontSize: 18,
        alignSelf: "flex-start",
    },
    img: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },
    msg: {
        fontSize: 14,
        textAlign: "center",
    },
    closeBtn: {
        position: 'absolute',
        left: 260,
        top: 5,
    },
});