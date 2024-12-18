import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    href: null,
                    tabBarStyle: {
                        height: 60,
                    },
                    tabBarStyle: {
                        display: "none",
                    }
                }}
            />

            <Tabs.Screen name="signup"
                options={{
                    headerShown: false,
                    href: null,
                    tabBarStyle: {
                        display: "none",
                    },
                }} />
            <Tabs.Screen name="login"
                options={{
                    headerShown: false,
                    href: null,
                    tabBarStyle: {
                        display: "none",
                    }
                }} />
            <Tabs.Screen name="home"
                options={{
                    headerShown: false,
                    title: "Message",
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name="chatbubble-ellipses-outline" size={28} color={focused ? "#24786D" : "#797C7B"} />
                    },
                    tabBarActiveTintColor: "#24786D",
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontFamily: "CarosBold",
                    },
                }} />
            <Tabs.Screen name="calls"
                options={{
                    headerShown: false,
                    title: "Calls",
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name="call-outline" size={28} color={focused ? "#24786D" : "#797C7B"} />
                    },
                    tabBarActiveTintColor: "#24786D",
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontFamily: "CarosBold",
                    },
                }} />
            <Tabs.Screen name="contacts"
                options={{
                    headerShown: false,
                    title: "Contacts",
                    tabBarIcon: ({ focused }) => {
                        return <FontAwesome5 name="user-circle" size={28} color={focused ? "#24786D" : "#797C7B"} />
                    },
                    tabBarActiveTintColor: "#24786D",
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontFamily: "CarosBold",
                    },
                }} />
            <Tabs.Screen name="settings"
                options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name="settings-outline" size={28} color={focused ? "#24786D" : "#797C7B"} />
                    },
                    tabBarActiveTintColor: "#24786D",
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontFamily: "CarosBold",
                    },
                }} />
            <Tabs.Screen name="chat" options={{
                headerShown: false,
                href: null,
                tabBarStyle: {
                    display: "none",
                }
            }} />
        </Tabs>
    );
}