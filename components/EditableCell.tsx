import React, { useState } from "react";
import { TextField, TableCell } from "@mui/material";

interface EditableCellProps {
    value: string;
    onSave: (newValue: string) => void;
}

export const EditableCell = ({ value, onSave }: EditableCellProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const handleBlur = () => {
        setIsEditing(false);
        onSave(localValue); // Push changes to global state when user clicks away
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            onSave(localValue); // Save on Enter key press
        }
    };

    return (
        <TableCell
            onClick={() => setIsEditing(true)}
            sx={{ cursor: "pointer", minWidth: 150 }}
        >
            {isEditing ? (
                <TextField
                    variant="standard"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    fullWidth
                />
            ) : (
                value || (
                    <span style={{ color: "#aaa", fontStyle: "italic" }}>
                        Empty
                    </span>
                )
            )}
        </TableCell>
    );
};
