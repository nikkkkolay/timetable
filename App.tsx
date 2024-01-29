import React from "react";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";

import { Timetable } from "./screens/Timetable";

export default () => (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Timetable />
    </ApplicationProvider>
);
