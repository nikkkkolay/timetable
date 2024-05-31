import React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";

export const SelectSettings = (): React.ReactElement => {
    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

    return (
        <Select selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
            <SelectItem title="Option 1" />
            <SelectItem title="Option 2" />
            <SelectItem title="Option 3" />
        </Select>
    );
};
