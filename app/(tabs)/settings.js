import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return(
        <SafeAreaView style={[styles.flex1]}>
            <View style={[styles.flex1,styles.main]}>
                <View style={[styles.w_100,styles.header]}>

                </View>
            </View>
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