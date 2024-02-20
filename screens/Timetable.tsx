import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
    Header,
    Calendar,
    Container,
    BottomSheetComponent,
    TabViewComponent,
} from "../components";

export const Timetable = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1}}>
            <Container>
                <Header />
                <Calendar />
            </Container>
            <BottomSheetComponent>
                <TabViewComponent />
            </BottomSheetComponent>
        </GestureHandlerRootView>
    );
};
