import { useRef, useState } from "react";

import { useStyleSheet } from "@ui-kitten/components";
import {
    Layout,
    Select,
    SelectItem,
    StyleService,
} from "@ui-kitten/components";

const courseData = [
    {
        id: 1,
        course: "1 курс",
    },
    {
        id: 2,
        course: "2 курс",
    },
    {
        id: 3,
        course: "3 курс",
    },
];

const instData = [
    {
        id: 1,
        inst: "Юридический факультет",
    },
    {
        id: 2,
        inst: "Морская академия",
    },
    {
        id: 3,
        inst: "Институт прикладных арктических ...",
    },
];

const groupData = [
    {
        id: 1,
        inst: "ВБАб22о-1",
    },
    {
        id: 2,
        inst: "АБАб22о-2",
    },
    {
        id: 3,
        inst: "ВБб211-99",
    },
];

export const StudentLayout = () => {
    const styles = useStyleSheet(themedStyles);
    const [selectedIndexCourse, setSelectedIndexCourse] = useState();
    const [selectedIndexInst, setSelectedIndexInst] = useState();
    const [selectedIndexGroup, setSelectedIndexGroup] = useState();

    return (
        <Layout style={styles.tabContainer}>
            <Select
                selectedIndex={selectedIndexCourse}
                onSelect={(index) => setSelectedIndexCourse(index)}
                placeholder="Выберите курс"
                style={styles.select}
                value={courseData[selectedIndexCourse?.row]?.course}
            >
                <SelectItem title="1 курс" />
                <SelectItem title="2 курс" />
                <SelectItem title="3 курс" />
            </Select>
            <Select
                selectedIndex={selectedIndexInst}
                onSelect={(index) => setSelectedIndexInst(index)}
                placeholder="Выберите институт"
                style={styles.select}
                value={instData[selectedIndexInst?.row]?.inst}
            >
                <SelectItem title="Юридический факультет" />
                <SelectItem title="Морская академия" />
                <SelectItem title="Институт прикладных арктических..." />
            </Select>
            <Select
                selectedIndex={selectedIndexGroup}
                onSelect={(index) => setSelectedIndexGroup(index)}
                placeholder="Выберите группу"
                style={styles.select}
                value={groupData[selectedIndexGroup?.row]?.inst}
            >
                <SelectItem title="ВБАб22о-1" />
                <SelectItem title="АБАб22о-2" />
                <SelectItem title="ВБб211-99" />
            </Select>
        </Layout>
    );
};

const themedStyles = StyleService.create({
    tabContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "color-success-500",
        paddingBottom: 15,
        marginTop: 15,
        borderRadius: 4,
    },
    select: {
        width: "100%",
        marginBottom: 10,
        borderColor: "red",
    },
});

// БАГ С ЦВЕТОМ статусбар ПРИ ОТКРЫТИИ СЕЛЕКТА
