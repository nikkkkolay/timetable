import React, { useMemo, useState, PropsWithChildren } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { useTheme } from "@ui-kitten/components";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

export const BottomSheetComponent = ({ children }: PropsWithChildren) => {
    const theme = useTheme();
    const [openSheet, setOpenSheet] = useState(0);

    const { height } = useWindowDimensions();
    const headerHeight = 130;
    const heightVisibleArea = 453;

    const snapPoints = useMemo(() => {
        const open = height - heightVisibleArea;
        const close = height - headerHeight;
        return [open, close];
    }, []);

    const handleSheetChanges = (index: number) => {
        setOpenSheet(index);
    };

    return (
        <BottomSheetModalProvider>
            <BottomSheet
                index={openSheet}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                handleStyle={{
                    backgroundColor:
                        openSheet === 1
                            ? theme["color-success-500"]
                            : "#008cfa",
                    borderTopStartRadius: openSheet === 1 ? 0 : 4,
                    borderTopEndRadius: openSheet === 1 ? 0 : 4,
                    paddingVertical: 15,
                }}
                handleIndicatorStyle={{
                    backgroundColor: theme["text-secondary-color"],
                    height: 2,
                }}
            >
                {/* <BottomSheetScrollView> */}

                {children}
                {openSheet != 1 && (
                    <LinearGradient
                        colors={["rgba(0,140,250, 1)", "rgba(0,140,250, 0.1)"]}
                        style={styles.overlay}
                    ></LinearGradient>
                )}

                {/* </BottomSheetScrollView> */}
            </BottomSheet>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
    },
});

//если height - heightVisibleArea = отрицательно число то ошибка
//добавить анимацию на затемнение при скрытии
