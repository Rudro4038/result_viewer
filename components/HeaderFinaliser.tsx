import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
} from "@mui/material";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";

import { ValidationResponseForTable } from "@/types/ValidationResponseForTable";
import { EditableCell } from "@/components/EditableCell";

export default function HeaderFinaliser({
    validationResult,
    setValidationResult,
}: {
    validationResult: ValidationResponseForTable | null;
    setValidationResult: React.Dispatch<
        React.SetStateAction<ValidationResponseForTable | null>
    >;
}) {
    console.log("HeaderFinaliser received validationResult:", validationResult);
    if (!validationResult) return null;
    console.log(
        "Rendering HeaderFinaliser with validationResult:",
        validationResult,
    );

    // Handles row reordering state update
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination || source.index === destination.index) return;

        setValidationResult((prev) => {
            if (!prev) return null;

            // Shallow clone the array of objects
            const updatedRows = [...prev];

            // Remove the dragged object from its old position
            const [removedRow] = updatedRows.splice(source.index, 1);

            // Insert it back at the new destination position
            updatedRows.splice(destination.index, 0, removedRow);

            return updatedRows;
        });
    };

    // Handles modifying an input cell inside an object row
    const updateCellState = (
        index: number,
        key: "attribute" | "header",
        newValue: string,
    ) => {
        setValidationResult((prev) => {
            if (!prev) return null;

            const updatedRows = [...prev];

            // Shallow clone the target row object to avoid mutation
            updatedRows[index] = {
                ...updatedRows[index],
                [key]: newValue,
            };

            return updatedRows;
        });
    };

    const toggleIsTaken = (index: number) => {
        setValidationResult((prev) => {
            if (!prev) return null;

            const updatedRows = [...prev];
            updatedRows[index] = {
                ...updatedRows[index],
                isTaken: !updatedRows[index].isTaken, // Flips between true and false
            };

            return updatedRows;
        });
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 50 }} />
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Attribute
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Header
                            </TableCell>
                            {/* Added Header Column for Actions */}
                            <TableCell sx={{ fontWeight: "bold", width: 120 }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <Droppable droppableId="table-body">
                        {(provided) => (
                            <TableBody
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {validationResult !== null &&
                                    validationResult.map((item, index) => (
                                        /* Use the stable item.id string for the Draggable key and id */
                                        <Draggable
                                            key={`row-${item.id}`}
                                            draggableId={`row-${item.id}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <TableRow
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    sx={{
                                                        backgroundColor:
                                                            snapshot.isDragging
                                                                ? "#3298ff4e"
                                                                : item.isTaken
                                                                  ? "#c7f4c9ad"
                                                                  : "#ffb7b7b7",

                                                        display:
                                                            snapshot.isDragging
                                                                ? "table"
                                                                : "table-row",
                                                        ...provided
                                                            .draggableProps
                                                            .style,
                                                    }}
                                                >
                                                    <TableCell
                                                        {...provided.dragHandleProps}
                                                        sx={{
                                                            cursor: "grab",
                                                            width: 50,
                                                        }}
                                                    >
                                                        <DragIndicatorIcon color="primary" />
                                                    </TableCell>

                                                    {/* Editable Attribute Column */}
                                                    <TableCell
                                                        key={`attribute-${item.id}-${item.attribute}`}
                                                    >
                                                        {item.attribute || (
                                                            <span
                                                                style={{
                                                                    color: "#aaa",
                                                                    fontStyle:
                                                                        "italic",
                                                                }}
                                                            >
                                                                Empty
                                                            </span>
                                                        )}
                                                    </TableCell>

                                                    {/* Editable Header Column */}
                                                    <EditableCell
                                                        key={`header-${item.id}-${item.header}`}
                                                        value={item.header}
                                                        onSave={(newValue) =>
                                                            updateCellState(
                                                                index,
                                                                "header",
                                                                newValue,
                                                            )
                                                        }
                                                    />

                                                    {/* Dynamic Action Button Cell */}
                                                    <TableCell>
                                                        {item.isTaken ? (
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                size="small"
                                                                startIcon={
                                                                    <DeleteIcon />
                                                                }
                                                                onClick={() =>
                                                                    toggleIsTaken(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        display:
                                                                            {
                                                                                xs: "none",
                                                                                sm: "inline",
                                                                            },
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Typography>
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                size="small"
                                                                startIcon={
                                                                    <UndoIcon />
                                                                }
                                                                onClick={() =>
                                                                    toggleIsTaken(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        display:
                                                                            {
                                                                                xs: "none",
                                                                                sm: "inline",
                                                                            },
                                                                    }}
                                                                >
                                                                    Undo
                                                                </Typography>
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </TableBody>
                        )}
                    </Droppable>
                </Table>
            </DragDropContext>
        </TableContainer>
    );
}
