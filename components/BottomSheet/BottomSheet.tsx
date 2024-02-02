import React, { ReactNode, useCallback, useMemo, useRef, PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const BottomSheetComponent = ({ children }: PropsWithChildren) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["83%", "38%"], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    handleStyle={styles.handleStyle}
                    handleIndicatorStyle={styles.handleIndicatorStyle}
                >
                    {children}
                </BottomSheet>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    handleStyle: {
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
    },
    handleIndicatorStyle: { backgroundColor: "#ffffff" },
});
