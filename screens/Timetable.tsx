import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
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

    useEffect(() => {
        const height = refView.current.getBoundingClientRect().height;
        console.log(height, "height");
    }, [refView]);

    return (
        <Container>
            <View ref={refView}>
                <Header />
                <Calendar />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                detached
                enableContentPanningGesture
                handleStyle={{
                    backgroundColor: "#0064BE",
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
        </Container>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#0064BE",
    },
});
