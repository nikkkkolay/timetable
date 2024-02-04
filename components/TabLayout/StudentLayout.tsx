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

export const StudentLayout = () => {
    const styles = useStyleSheet(themedStyles);
    const [selectedIndexCourse, setSelectedIndexCourse] = useState();
    const [selectedIndexInst, setSelectedIndexInst] = useState();

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
        borderColor: 'red'
    }
});

// БАГ С ЦВЕТОМ статусбар ПРИ ОТКРЫТИИ СЕЛЕКТА
