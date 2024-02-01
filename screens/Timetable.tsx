import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Header, Calendar, Container } from "../components";

export const Timetable = () => {
    // ref
    const bottomSheetRef = useRef(null);
    const refView = useRef();
    // variables
    const snapPoints = useMemo(() => ["83%", "38%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    return (
        <Container>
            <View>
                <Header />
                <Calendar />
            </View>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        handleStyle={{
                            backgroundColor: "#008cfa",
                            borderTopStartRadius: 4,
                            borderTopEndRadius: 4,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: -4,
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 3,
                        }}
                        handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
                    >
                        <View style={styles.contentContainer}>
                            <Text>Awesome 🎉</Text>
                        </View>
                    </BottomSheet>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#008cfa",
    },
});
