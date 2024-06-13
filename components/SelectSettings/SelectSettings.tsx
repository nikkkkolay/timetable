import React, { ReactElement, useState } from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { ChoiceTypes } from "../../store/useStore.types";

interface IProps {
    placeholder: string;
    disabled?: boolean;
    options: [] | [ChoiceTypes];
}

export const SelectSettings = ({ placeholder, disabled, options }: IProps): ReactElement => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>();

    console.log(options);

    return (
        <Select placeholder={placeholder} disabled={disabled} selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
            {options && options.map((option) => <SelectItem key={option.id} title={option.name} />)}
        </Select>
    );
};
