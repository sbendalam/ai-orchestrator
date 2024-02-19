import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import Lottie from "lottie-react";
import { toast } from "sonner";
import { TagInput } from "../ui/tag-input";
import animationData from "./AiAnimations.json";
import loadingAnimation from "./skillLoader.json";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { API } from "@/services/api";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function GettingStarted({
  skillBadges,
  dialogOpen,
  setDialogOpen,
  skillsLoading,
  employeesList,
  setGeneratingTasks,
  setTempTaskList,
  setIsTemp,
}) {
  const [tags, setTags] = useState([]);
  const [noOfEmployees, setNoOfEmployees] = useState([2]);

  const [startProcess, setStartProcess] = useState(false);
  const params = useParams();
  useState(() => {
    setDialogOpen(true);
    console.log(params);
  }, [params]);
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Dialog
        open={dialogOpen}
        onOpenChange={() => {
          setStartProcess(false);
          setDialogOpen(!dialogOpen);
        }}
      >
        <DialogTrigger>
          <Button>Get Started</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Getting Started</DialogTitle>
            <DialogDescription>Select Employees details</DialogDescription>
          </DialogHeader>
          {!skillsLoading && <div>Recomended skills</div>}
          <div className="flex gap-2 w-full overflow-auto">
            {skillsLoading ? (
              <div className="flex items-center justify-center">
                Getting Recomendations
                <div className="h-14 w-14 ">
                  <Lottie animationData={loadingAnimation} loop={true} />
                </div>
              </div>
            ) : (
              skillBadges?.map((skill) => {
                return (
                  <div className="flex items-center justify-center bg-black text-white px-1 text-sm rounded">
                    {skill}
                  </div>
                );
              })
            )}
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
              <div className="col-span-4 flex flex-col gap-2">
                <span>No of Employees :{noOfEmployees}</span>
                <Slider
                  value={noOfEmployees}
                  max={12}
                  min={1}
                  onValueChange={setNoOfEmployees}
                  step={1}
                />
              </div>
              <div className=" col-span-4">
                <TagInput
                  placeholder="Enter Employee"
                  tags={tags}
                  truncate={8}
                  enableAutocomplete
                  autocompleteOptions={employeesList?.map((eachEmployee) => {
                    return {
                      Id: eachEmployee.Id,
                      text: eachEmployee.Name,
                      SkillSet: eachEmployee?.SkillSet,
                    };
                  })}
                  setTags={(newTags) => {
                    if (newTags.length <= noOfEmployees) {
                      console.log(newTags);
                      setTags(newTags);
                    } else {
                      toast("Cannot exceed no of employees");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center !justify-between">
            <Button
              onClick={() => {
                if (!startProcess) {
                  toast("Getting recomended employees");
                }
                setStartProcess((p) => !p);
              }}
              type="button"
            >
              {startProcess ? (
                <div className="w-24 h-24">
                  <Lottie animationData={animationData} loop={true} />
                </div>
              ) : (
                "AI Assign"
              )}
            </Button>
            <Button
              onClick={() => {
                // setStartProcess((p) => !p);
                let description = " ";
                tags.map((eachTag, index) => {
                  description =
                    description + eachTag.text + `(employee id: ${eachTag.Id})`;
                  " - " + eachTag.SkillSet;
                  if (index != tags.length - 1)
                    description = description + " , ";
                });
                setGeneratingTasks(true);
                setDialogOpen(false);
                API.get
                  .getTasks(
                    localStorage.getItem("description") +
                      "\n\n Employee Details \n " +
                      `${description}` +
                      "\n \n " +
                      `project start 5th feb 2024 - end 15th feb 2024

                      you output should contain all the tasks in a  complete array of JSON in this format
                      { "tasks":[
                        {
                          "date": "12/01/2023",
                          "taskList": [
                            {
                              "employeeName": "employee name",
                              "employeeId":"employee Id",
                              "tasks": [
                                {
                                  "name": "task1",
                                  "duration": "8hrs"
                                },
                                {
                                  "name": "task2",
                                  "duration": "8hrs"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                      do not add any comments and dont skip JSON, Your response should contain only valid JSON
                      

                      for example user input
                        a analaytics web page for showing insigths of all user conversation where we are going to use react for fronend
                        and node for backend 
                        key features 
                          log every user event
                          log all failed events
                          log all rating
                          show graphs based on user reports

                          Employee details:
                          Kishore (employee id: 263519 ) - react developer
                          Ramesh (employee id: 732794 ) - node developer

                          Project start date -01/01/2027 end date 01/05/2024
                      Output response should be
                      { "tasks":[
                        {
                          "date": "01/01/2024",
                          "taskList": [
                            {
                              "employeeName": "Kishore",
                              "employeeId":"263519",
                              "tasks": [
                                {
                                  "name": "Setup client project",
                                  "duration": "4hrs"
                                },
                                {
                                  "name": "Add necessary component libraries",
                                  "duration": "2hrs"
                                }
                              ]
                            },
                            {
                              "employeeName": "Ramesh",
                              "employeeId":"732794",
                              "tasks": [
                                {
                                  "name": "Setup server folder structure",
                                  "duration": "4hrs"
                                },
                                {
                                  "name": "Add necessary utilities",
                                  "duration": "2hrs"
                                }
                              ]
                            },
                          ]
                        },
                        {
                          "date": "01/02/2024",
                          "taskList": [
                            {
                              "employeeName": "Kishore",
                              "employeeId":"263519",
                              "tasks": [
                                {
                                  "name": "Add login screen",
                                  "duration": "4hrs"
                                },
                                {
                                  "name": "Integrate authentication",
                                  "duration": "2hrs"
                                }
                              ]
                            },
                            {
                              "employeeName": "Ramesh",
                              "employeeId":"732794",
                              "tasks": [
                                {
                                  "name": "Develope Authentication API",
                                  "duration": "6hrs"
                                }
                              ]
                            },
                          ]
                        },
                        {
                          "date": "01/02/2024",
                          "taskList": [
                            {
                              "employeeName": "Kishore",
                              "employeeId":"263519",
                              "tasks": [
                                {
                                  "name": "Setup Analytics screen",
                                  "duration": "5hrs"
                                },
                                {
                                  "name": "Integrate Analytics screen",
                                  "duration": "2hrs"
                                }
                              ]
                            },
                            {
                              "employeeName": "Ramesh",
                              "employeeId":"732794",
                              "tasks": [
                                {
                                  "name": "Develope analytics API",
                                  "duration": "6hrs"
                                }
                              ]
                            },
                          ]
                        },
                        {
                          "date": "01/03/2024",
                          "taskList": [
                            {
                              "employeeName": "Kishore",
                              "employeeId":"263519",
                              "tasks": [
                                {
                                  "name": "add user logging with integration",
                                  "duration": "6hrs"
                                }
                              ]
                            },
                            {
                              "employeeName": "Ramesh",
                              "employeeId":"732794",
                              "tasks": [
                                {
                                  "name": "Develope loggin API",
                                  "duration": "5hrs"
                                }
                              ]
                            },
                          ]
                        },
                        {
                          "date": "01/04/2024",
                          "taskList": [
                            {
                              "employeeName": "Kishore",
                              "employeeId":"263519",
                              "tasks": [
                                {
                                  "name": "setup testing",
                                  "duration": "4hrs"
                                },
                                {
                                  "name": "Documentation",
                                  "duration": "2hrs"
                                }
                              ]
                            },
                            {
                              "employeeName": "Ramesh",
                              "employeeId":"732794",
                              "tasks": [
                                {
                                  "name": "Test and document",
                                  "duration": "6hrs"
                                }
                              ]
                            },
                          ]
                        },
                        {
                          "date": "01/05/2024",
                          "taskList": [
                            
                            {
                              "employeeName": "Ramesh",
                              "employeeId":"732794",
                              "tasks": [
                                {
                                  "name": "Project deployment and hand over",
                                  "duration": "6hrs"
                                }
                              ]
                            },
                          ]
                        }
                      ]
                    }
                      

                      `
                  )
                  .then((res) => {
                    console.log(res.data.response);

                    console.log(JSON.parse(res.data.response));
                    setTempTaskList(JSON.parse(res.data.response)?.tasks || []);
                    setIsTemp(true);
                    setGeneratingTasks(false);
                  })
                  .catch(() => {
                    toast("failed to generate");
                    setGeneratingTasks(false);
                  });
              }}
              type="submit"
            >
              Generate Tasks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GettingStarted;
