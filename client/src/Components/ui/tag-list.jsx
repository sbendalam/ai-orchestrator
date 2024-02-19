import React, { useState } from "react";
import { Tag } from "./tag";
import { cn } from "@/lib/utils";
import SortableList, { SortableItem } from "react-easy-sort";

const DropTarget = () => {
  return <div className={cn("h-full rounded-md bg-secondary/50")} />;
};

export const TagList = ({
  tags,
  customTagRenderer,
  direction,
  draggable,
  onSortEnd,
  ...tagListProps
}) => {
  const [draggedTagId, setDraggedTagId] = useState();

  const handleMouseDown = (id) => {
    setDraggedTagId(id);
  };

  const handleMouseUp = () => {
    setDraggedTagId(null);
  };

  return (
    <div
      className={cn("rounded-md max-w-[450px]", {
        "flex flex-wrap gap-2": direction === "row",
        "flex flex-col gap-2": direction === "column",
      })}
    >
      {draggable ? (
        <SortableList
          onSortEnd={onSortEnd}
          className="flex flex-wrap gap-2 list"
          dropTarget={<DropTarget />}
        >
          {tags.map((tagObj) => (
            <SortableItem key={tagObj.id}>
              <div
                onMouseDown={() => handleMouseDown(tagObj.id)}
                onMouseLeave={handleMouseUp}
                className={cn(
                  {
                    "border border-solid border-primary rounded-md":
                      draggedTagId === tagObj.id,
                  },
                  "transition-all duration-200 ease-in-out"
                )}
              >
                {customTagRenderer ? (
                  customTagRenderer(tagObj)
                ) : (
                  <Tag tagObj={tagObj} {...tagListProps} />
                )}
              </div>
            </SortableItem>
          ))}
        </SortableList>
      ) : (
        tags.map((tagObj) =>
          customTagRenderer ? (
            customTagRenderer(tagObj)
          ) : (
            <Tag key={tagObj.id} tagObj={tagObj} {...tagListProps} />
          )
        )
      )}
    </div>
  );
};
