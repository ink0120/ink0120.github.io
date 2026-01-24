//nav bar functions
function goTo(page){
    const gotopage = $("#"+ page)[0];
    gotopage.scrollIntoView({ behavior: 'smooth' });
}



//myproject functions
function openProject(projectID) {
  const projects = document.querySelectorAll(".project");
  const currentProject = document.getElementById(projectID);
  const isGrown = currentProject.classList.contains("grow");

  projects.forEach(div => {
    if (div !== currentProject && div.classList.contains("grow")) {
      div.classList.remove("grow");
      div.classList.add("shrink");
      deleteProjectInfo(div.id);
    } else {
      div.classList.remove("grow", "shrink", "section");
    }
  });

  if (!isGrown) {
    displayProject(projectID);
    currentProject.classList.remove("shrink");
    currentProject.classList.add("grow");
  } else {
    currentProject.classList.remove("grow");
    currentProject.classList.add("shrink");
    deleteProjectInfo(projectID);
  }
}

function displayProject(projectID){
    const currentprojectdiv = document.getElementById(projectID);

      const newDiv = document.createElement("section");
      newDiv.classList.add("project-animate");

      let [projectTitle, projectImage,projectDesc,gitHubLink] = getProjectInfo(projectID);
      newDiv.appendChild(projectTitle);
      newDiv.appendChild(projectImage);
      newDiv.appendChild(projectDesc);
      newDiv.appendChild(gitHubLink);

      currentprojectdiv.appendChild(newDiv);
   }
   
    function deleteProjectInfo(projectID) {
    const currentProjectDiv = document.getElementById(projectID);
    const sections = currentProjectDiv.querySelectorAll("section");

    sections.forEach(section => {
        section.classList.add("project-unanimate");

        setTimeout(() => {
        section.remove();
        }, 150); // match your animation duration
    });
    }


   function getProjectInfo(projectID){
         let projectTitle = document.createElement("h2");
         let projectImage = document.createElement("img");
         let projectDesc = document.createElement("p");
         let gitHubLink = document.createElement("a");
      if (projectID === "project1"){
         projectImage.src = "Chemistry-Uno.jpeg";
         projectTitle.innerHTML = "Chemistry card game";
         projectDesc.innerHTML = "Skills: Python, SQLlite";
         gitHubLink.title = "Link on github.";
         gitHubLink.href = "youtube.com";
         gitHubLink.textContent = "Link to gitHub page";

         return [projectTitle,projectImage,projectDesc,gitHubLink];
      } else if (projectID === "project2"){
         return true;
      } else if (projectID === "project3"){
         return true;
      }
   }

   function copyText(){
      navigator.clipboard.writeText("ines.sebaihi20@gmail.com");
      notification("Copied email to clipboard!");
   }

   function notification(text){
      const notif = document.createElement("div");
      notif.classList.add("notification");
      requestAnimationFrame(() => {
         notif.classList.add("fadein");
      });
      const notiftext = document.createElement("p");
      
      notiftext.innerHTML = text;
      notif.appendChild(notiftext);
      

      document.body.appendChild(notif);
      setTimeout(() => {
         notif.classList.remove("fadein")
         notif.classList.add("fadeout");

         notif.addEventListener("transitionend", () => notif.remove())
      }, 3000);

   }
