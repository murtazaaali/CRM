const Activity = require("../models/Activity");


const idCreator = async ({ model, idStr }) => {
  if (!model || !model.findOne) {
    throw new Error("Invalid model provided");
  }

  const lastItem = await model.findOne().sort({ ID: -1 }).exec();

  if (lastItem && lastItem.ID) {
    const lastID = parseInt(lastItem.ID.split("-")[1], 10);
    const newID = (lastID + 1).toString().padStart(4, "0");
    return `${idStr}-${newID}`;
  } else {
    return `${idStr}-001`;
  }
};

// const getTaskByType = (type) => {
//   const allTasks = [
//     { type: "Deal", link: "/deals" },
//     { type: "Task", link: "/tasks" },
//     { type: "Contact", link: "/contacts" },
//     { type: "Lead", link: "/leads" },
//     { type: "Employees", link: "/employees" },
//   ];

//   return allTasks.find((task) => task.type === type);
// };

const getTaskByType = (type) => {
  const allTasks = [
    { type: "Deal", link: "/deals" },
    { type: "Task", link: "/tasks" },
    { type: "Contact", link: "/contacts" },
    { type: "Lead", link: "/leads" },
    { type: "Employees", link: "/employees" },
     { type: "Category", link: "/categories" },
  ];

  return allTasks.find((task) => task.type === type);
};

const createActivity = async ({
  createdBy,
  action,
  userName,
  task,
  taskname,
  customTitle,
  customDetail,
  customLink,
}) => {
  const result = getTaskByType(task);

  if (!result && (!customTitle || !customLink)) {
    throw new Error("Invalid task type and no custom values provided");
  }

  const title = customTitle || `${task} ${action}`;
  const type = result?.type || task;
  const detail =
    customDetail ||
    `${userName} ${action.toLowerCase()} ${taskname?.toLowerCase() || ""} ${task.toLowerCase()}`;
  const link = customLink || result?.link || "#";

  await new Activity({
    title,
    type,
    detail,
    link,
    createdBy,
  }).save();
};

module.exports = { idCreator, createActivity };
