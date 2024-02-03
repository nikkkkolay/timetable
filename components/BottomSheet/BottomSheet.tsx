import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    PropsWithChildren,
} from "react";
import { useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export const BottomSheetComponent = ({ children }: PropsWithChildren) => {
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
                
                // enableHandlePanningGesture={false}
                // enableContentPanningGesture={false}

                // Enable pan down gesture to close the sheet.
                // enablePanDownToClose
                handleStyle={{
                    backgroundColor: "#008cfa",
                    borderColor: "#008cfa",
                    borderTopStartRadius: openSheet <= 0 ? 4 : 0,
                    borderTopEndRadius: openSheet <= 0 ? 4 : 0,
                }}
                handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
            >
                {children}
            </BottomSheet>
        </BottomSheetModalProvider>
    );
};

//если height - heightVisibleArea = отрицательно число то ошибка
