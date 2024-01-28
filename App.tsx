import React, { useState } from "react";
import * as eva from "@eva-design/eva";
import {
    ApplicationProvider,
    Layout,
    Text,
    Datepicker,
} from "@ui-kitten/components";

const HomeScreen = () => {
    const [date, setDate] = useState(new Date());

    return (
        <Layout
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text category="h1">HOME</Text>
            <Datepicker
                date={date}
                onSelect={(nextDate) => setDate(nextDate)}
            />
        </Layout>
    );
};

export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
    </ApplicationProvider>
);
