import AddTask from "@/common/components/AddTask";
import TaskCard from "@/common/components/TaskCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GettingStarted from "./GettingStarted";
import { API } from "@/services/api";
import animationData from "./AiAnimations.json";
import Lottie from "lottie-react";
import LoadingDots from "@/common/components/LoadingDots";
import { Button } from "../ui/button";
import _ from "lodash";
import { parseJSON } from "date-fns";
import TaskListCard from "@/common/components/TasksListCard";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Input } from "../ui/input";
import { MessageSquareDotIcon, MessageSquareIcon } from "lucide-react";
import { toast } from "sonner";
function Home() {
  const params = useParams();
  const [taskList, setTaskList] = useState([]);
  const [tempTaskList, setTempTaskList] = useState([]);
  const [isTemp, setIsTemp] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [skillBadges, setSkillBadges] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [employeesList, setEmployeesList] = useState([]);
  const [mesgInput, setmesgInput] = useState("");

  const [MessageLoading, setMessageLoading] = useState(false);
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const [refresh, setIsRefresh] = useState(false);
  const [messages, setMessages] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const [openedKeys, setOpenKeys] = useState(
    taskList.map((eachTask) => eachTask.TaskDueDate + eachTask.TaskName)
  );
  //{params.projectId}

  useEffect(() => {
    setSkillsLoading(true);
    API.get.getSkillsByProjectId(params.projectId).then((res) => {
      setSkillsLoading(false);

      setSkillBadges(res?.data);
    });
    API.get.getEmployess().then((res) => {
      setEmployeesList(res.data);
    });
    setDialogOpen(true);
    setGeneratingTasks(false);
    API.get.createChat().then((res) => {
      localStorage.setItem("sessionId", res.data[0].sessionId);
    });
  }, [params.projectId]);
  useEffect(() => {
    API.get.getTasksById(params.projectId).then((res) => {
      let orderByDateResponse = _.sortBy(res.data.data, "TaskDueDate");
      console.log(orderByDateResponse);
      setIsTemp(false);
      setTaskList(orderByDateResponse);
    });
    setSkillsLoading(true);
    setDialogOpen(true);
    setGeneratingTasks(false);
  }, [refresh, params.projectId]);
  return (
    <div className="h-full w-full">
      {taskList.length == 0 && tempTaskList.length == 0 && !generatingTasks ? (
        <GettingStarted
          setTempTaskList={setTempTaskList}
          setIsTemp={setIsTemp}
          skillsLoading={skillsLoading}
          dialogOpen={dialogOpen}
          employeesList={employeesList}
          setDialogOpen={setDialogOpen}
          skillBadges={skillBadges}
          setGeneratingTasks={setGeneratingTasks}
        />
      ) : generatingTasks ? (
        <div className=" h-full flex-col w-full flex items-center justify-center">
          <Lottie animationData={animationData} />
          <div className="absolute bottom-40 text-3xl text-left ml-28 w-96">
            Generating Tasks
            <LoadingDots speed={600} />
          </div>
        </div>
      ) : isTemp ? (
        <div className=" h-full w-full">
          <div className="w-full flex justify-end ">
            <Button
              onClick={() => {
                let refObj = {
                  taskName: "",
                  taskDes: "",
                  taskAsignedByName: "",
                  taskAsignedById: "",
                  taskAsignedToName: "",
                  taskAsignedToId: "",
                  taskProjectId: "",
                };
                let apiBody = [];
                tempTaskList.map((eachTask) => {
                  eachTask?.taskList?.map((dayTasks) => {
                    dayTasks.tasks.map((eachIndTask) => {
                      apiBody.push({
                        taskName: eachIndTask.name,
                        taskDes: "",
                        taskAsignedByName: "Sampath Kumar Kemburu",
                        taskAsignedById: "5CEFA6F3-15E2-4425-966F-F70E8F27A927",
                        taskAsignedToName: dayTasks.employeeName,
                        taskAsignedToId: dayTasks.employeeId,
                        taskProjectId: params.projectId,
                        taskDueDate: eachTask.date,
                      });
                    });
                  });
                });
                let empIds = _.uniqBy(apiBody, "taskAsignedToId").map(
                  (task) => {
                    task.taskAsignedToId;
                  }
                );
                try {
                  API.get
                    .sendMails(empIds)
                    .then((res) => {
                      toast("Emails send successfully");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } catch (error) {
                  console.log(error);
                }
                console.log(apiBody);
                API.post.addTasks(apiBody).then((res) => {
                  if (res.data.status) {
                    setIsTemp(false);
                    setIsRefresh(!refresh);
                  }
                });
              }}
            >
              Confirm
            </Button>
          </div>
          <ul className="h-full w-full p-12 flex gap-2 flex-col ">
            <Accordion
              value={openedKeys}
              onValueChange={setOpenKeys}
              type="multiple"
              collapsible
              className="w-full overflow-y-auto"
            >
              {tempTaskList.map((eachTask) => {
                return (
                  <AccordionItem className="w-[99%]" value={eachTask.date}>
                    <AccordionTrigger>
                      <div>
                        Tasks for{" "}
                        <span className="text-bold underline">
                          {eachTask.date}
                        </span>
                      </div>
                    </AccordionTrigger>
                    {eachTask?.taskList?.map((dayTasks) => {
                      return (
                        <>
                          {dayTasks.tasks.map((eachTask) => {
                            return (
                              <AccordionContent className="pl-4">
                                <TaskListCard
                                  name={dayTasks.employeeName}
                                  task={eachTask}
                                />
                              </AccordionContent>
                            );
                          })}
                        </>
                      );
                    })}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ul>
        </div>
      ) : (
        <div className=" h-full w-full">
          <ul className="h-full w-full p-12 flex gap-2 flex-col ">
            <li className="w-full">
              <AddTask />
            </li>
            <Accordion
              value={openedKeys}
              onValueChange={setOpenKeys}
              type="multiple"
              collapsible
              className="w-full overflow-y-auto"
            >
              {taskList.map((eachTask) => {
                return (
                  <AccordionItem
                    className="w-[99%]"
                    value={eachTask.TaskDueDate + eachTask.TaskName}
                  >
                    <AccordionTrigger>
                      <div>
                        Tasks for{" "}
                        <span className="text-bold underline">
                          {`${eachTask.TaskDueDate}`}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pl-4">
                      <TaskCard
                        name={eachTask.AssignedToName}
                        task={eachTask}
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ul>
        </div>
      )}
      {openChat && (
        <div className="absolute h-[400px] flex w-[400px] bottom-10 right-10 bg-gray-300 rounded-xl flex-col p-4">
          <div
            className="flex w-full justify-end cursor-pointer"
            onClick={() => {
              setOpenChat(false);
            }}
          >
            X
          </div>
          <div className="flex-1 flex flex-col justify-end">
            {messages.map((eachMessage) => {
              return (
                <div
                  className={
                    eachMessage.from == "user"
                      ? "ml-auto text-md"
                      : "mr-auto text-md"
                  }
                >
                  {eachMessage.from + " :  " + eachMessage.message}
                </div>
              );
            })}
            {MessageLoading && (
              <div className={"mr-auto text-md"}>
                <LoadingDots speed={600} />
              </div>
            )}
            <Input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  setMessages((prev) => [
                    ...prev,
                    { from: "user", message: mesgInput },
                  ]);
                  setMessageLoading(true);
                  API.post.chat(mesgInput).then((res) => {
                    setMessages((prev) => [
                      ...prev,
                      { from: "system", message: res.data.data },
                    ]);
                    setMessageLoading(false);
                  });

                  setmesgInput("");
                }
              }}
              value={mesgInput}
              onChange={(e) => {
                setmesgInput(e.target.value);
              }}
              className="!ring-0 mt-2"
            />
          </div>
        </div>
      )}
      {!openChat && (
        <div className="absolute bottom-10 right-10">
          {
            <MessageSquareDotIcon
              onClick={() => {
                setOpenChat(true);
              }}
            />
          }
        </div>
      )}
      {/* <FloatingWhatsApp /> */}
    </div>
  );
}

export default Home;
