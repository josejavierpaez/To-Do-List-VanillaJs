//!Global Variables
const formActivity = document.querySelector("#formActivity");
const activityList = document.querySelector("#activityList");
let arrayActivities = [];

//!Functions
const createItem = (activity) => {
  let item = {
    activity: activity,
    status: false
  };

  arrayActivities.push(item);
  return item;
};

const SaveDB = () => {
  localStorage.setItem("activityList", JSON.stringify(arrayActivities));
  showActivitiesDB();
};

const showActivitiesDB = () => {
  activityList.innerHTML = "";
  arrayActivities = JSON.parse(localStorage.getItem("activityList"));
  let alertClass;
  if (arrayActivities === null) {
    arrayActivities = [];
  } else {
    arrayActivities.forEach((currentActivity) => {
      alertClass =
        currentActivity.status === true ? "alert-success" : "alert-danger";
      activityList.innerHTML += ` <div class="alert ${alertClass}" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${currentActivity.activity}</b> - ${currentActivity.status}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
    });
  }
};

const DeleteDB = (activity) => {
  let indexArray;

  indexArray = arrayActivities.findIndex((CurrentElement) => {
    return CurrentElement.activity === activity;
  });

  arrayActivities.splice(indexArray, 1);
  SaveDB();
};

const EditDB = (activity) => {
  let indexArray = arrayActivities.findIndex(
    (CurrentElement) => CurrentElement.activity === activity
  );
  arrayActivities[indexArray].status = true;
  SaveDB();
};

//!Events
formActivity.addEventListener("submit", (event) => {
  event.preventDefault();
  let txtActivity = document.querySelector("#txtActivity").value;
  formActivity.reset();
  createItem(txtActivity);
  SaveDB();
});

document.addEventListener("DOMContentLoaded", showActivitiesDB);

activityList.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    event.target.innerHTML === "done" ||
    event.target.innerHTML === "delete"
  ) {
    let activityContent = event.path[2].childNodes[1].innerHTML;
    if (event.target.innerHTML === "delete") {
      //*delete action
      DeleteDB(activityContent);
    } else if (event.target.innerHTML === "done") {
      EditDB(activityContent);
    }
  }
});
