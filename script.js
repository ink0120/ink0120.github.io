class ballz {
  constructor(ctx,canvas) {
    this.y = 200;
    this.size = 2;
    this.color = "white";
    this.ctx = ctx; 
    this.canvas = canvas;

    this.x = Math.random() * (this.canvas.width);

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  movement(){
    if(this.x>this.canvas.width){
        this.x=0;
    }
    this.x+=0.004;
    this.y = 380*Math.sin(this.x)+(this.canvas.height/2)

  }
}

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

function displayProject(projectID) {
    const $currentProjectDiv = $("#" + projectID);

    const $newDiv = $("<section>")
        .addClass("project-animate");

    const [$projectTitle, $projectImage, $projectDesc, $gitHubLink] =
        getProjectInfo(projectID);

    $newDiv.append(
        $projectTitle,
        $projectImage,
        $projectDesc,
        $gitHubLink
    );

    $currentProjectDiv.append($newDiv);
}
   
    function deleteProjectInfo(projectID) {
    const currentProjectDiv = document.getElementById(projectID);
    const sections = currentProjectDiv.querySelectorAll("section");

    sections.forEach(section => {
        section.classList.add("project-unanimate");

        setTimeout(() => {
        section.remove();
        }, 300); 
    });
    }


   function getProjectInfo(projectID){
        const $projectTitle = $("<h2>");
        const $projectImage = $("<img>");
        const $projectDesc = $("<p>");
        const $gitHubLink  = $("<a>");
      if (projectID === "project1"){
        $projectImage.attr("src", "Chemistry-Uno.jpeg");
        $projectTitle.text("Chemistry card game");
        $projectDesc.text("Skills: Python, SQLite");
        $gitHubLink
            .attr("href", "https://youtube.com")
            .attr("title", "Link on github.")
            .text("Link to GitHub page");

      } else if (projectID === "project2"){
         return true;
      } else if (projectID === "project3"){
         return true;
      }
        return [$projectTitle, $projectImage, $projectDesc, $gitHubLink];
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

//graph function tingy real time shi
$(document).ready(function() {
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const ball of balls) {
            ball.draw();
            ball.movement();
        }

        requestAnimationFrame(loop);
    }

    const canvas = document.getElementById("graph");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const balls= [];


    const ctx = canvas.getContext("2d");

    while (balls.length < 80) {
        const ball = new ballz(ctx,canvas);
        balls.push(ball);
    }
    loop();
    $("#mii_icon").hover(function() {
        $(this).attr("src", "mii_icon2.png");
    }, function() {
        $(this).attr("src", "mii_icon.png"); // reset when mouse leaves
    });

        

  });