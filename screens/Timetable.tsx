import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Header, Calendar, Container } from "../components";

export const Timetable = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["20%", "80%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    return (
        <Container>
            <Header />
            <Calendar />

            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enableOverDrag
                enablePanDownToClose
                handleStyle={{
                    backgroundColor: "#0064BE",
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                }}
                handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
            >
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        </Container>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#0064BE",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowColor: "#000000",
        elevation: 4,
    },
});
