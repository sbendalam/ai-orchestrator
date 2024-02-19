import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { LaptopOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { DatePickerShad } from "@/common/components/DatePicker";
import { API } from "@/services/api";
const { Sider } = Layout;
function AppSidebar() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);
  const locale = useSelector((state) => state.locale.value);
  //getListOfProjects

  useEffect(() => {
    API.get.getProject().then((res) => {
      let responseData = res?.data?.data;
      let tempItems = [
        {
          key: "projects",
          icon: React.createElement(UserOutlined),
          label: "Projects",
          children: [],
        },
      ];
      responseData.map((eachProject) => {
        tempItems?.[0]?.children?.push({
          key: eachProject.Id,
          icon: React.createElement(LaptopOutlined),
          label: eachProject.ProjectName,
          children: null,
          onClick: () => {
            localStorage.setItem("description", eachProject.ProjectDescription);
            navigate(`/project/${eachProject.Id}`);
          },
        });
      });
      tempItems?.[0]?.children.push({
        key: `CreateProject`,
        icon: React.createElement(PlusOutlined),
        label: "Create Project",
        children: null,
        onClick: () => {
          setShowCreateModal(true);
        },
      });
      setItems(tempItems);
    });
  }, [refresh]);
  return (
    <Sider width={200} className="h-full overflow-y-auto !bg-black">
      <Menu
        mode="inline"
        defaultSelectedKeys={["pid#1"]}
        defaultOpenKeys={["Projects"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
      <Dialog
        open={showCreateModal}
        onOpenChange={(e) => {
          setShowCreateModal(e);
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add your new project details and Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Project Name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <div className="col-span-3">
                <DatePickerShad
                  id="startDate"
                  className="w-full"
                  width=" w-full"
                  date={startDate}
                  setDate={setStartDate}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="EndDate" className="text-right">
                End Date
              </Label>
              <div className="col-span-3">
                <DatePickerShad
                  id="EndDate"
                  className="w-full"
                  width=" w-full"
                  date={endDate}
                  setDate={setEndDate}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectDesciption" className="text-right">
                Description
              </Label>
              <Textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
                id="projectDesciption"
                placeholder="Description goes here"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                console.log("added");
                API.post
                  .addProject({
                    projectName: name,
                    projectDescription: description,
                    startDate: startDate,
                    endDate: endDate,
                    createdByName: "Sampath Kumar Kemburu",
                    createdById: "5CEFA6F3-15E2-4425-966F-F70E8F27A927",
                  })
                  .then(() => {
                    setRefresh((p) => !p);
                  });
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sider>
  );
}

export default AppSidebar;
