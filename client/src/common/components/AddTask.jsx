import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/Components/ui/input";
import { DatePickerShad } from "./DatePicker";
function AddTask({ onAdd }) {
  const [date, setDate] = useState();
  const [task, setTask] = useState({});
  const [employeeList, getEmployeeList] = useState([
    { id: "5017", name: "krishna" },
    { id: "5018", name: "sk" },
    { id: "5019", name: "saki" },
  ]);
  return (
    <div className=" w-full h-full rounded-md p-4 flex gap-2  border-solid border-2">
      <Input placeholder="Task details" />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assign To" />
        </SelectTrigger>
        <SelectContent>
          {employeeList.map((eachEmployee) => {
            return (
              <SelectItem value={eachEmployee.id}>
                {eachEmployee.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <DatePickerShad date={date} setDate={setDate} />
      <Button onClick={() => onAdd(task)}>ADD</Button>
    </div>
  );
}

export default AddTask;
