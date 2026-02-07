class Balls {
  constructor(ctx,canvas) {
    
    this.size = 1.7;
    this.color = "white";
    this.ctx = ctx; 
    this.canvas = canvas;

    this.x = Math.random() * (this.canvas.width);
    this.y = 200;

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  movement(){
    if(this.x>this.canvas.width){this.x=0;}

    if (this.y < (360 + this.canvas.height / 2) && 
        this.y > (-360 + this.canvas.height / 2))
    {
        this.x+=0.004;
        this.y = 380*Math.sin(this.x)+(this.canvas.height/2);

    } else{
    this.x+=0.0026;
    this.y = 380*Math.sin(this.x)+(this.canvas.height/2)
    }
  }
}


//nav bar functions
function goTo(page){
    $("#"+ page)[0].scrollIntoView({ behavior: 'smooth' });
}
function hovernavbutton(){
    $("#nav1").addClass("hover-home");
    $("#nav2").addClass("hover-projects");
    $("#nav3").addClass("hover-contacts");
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
        }, 500); 
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
        $projectDesc.text("Skills: Python, SQL, Data structures, OOP");
        $gitHubLink
            .attr("href", "https://github.com/ink0120/Chemistry-Uno")
            .attr("title", "Link to github page.")
            .text("Read more on GitHub!");

      } else if (projectID === "project2"){
         return true;
      } else if (projectID === "project3"){
         return true;
      }
        return [$projectTitle, $projectImage, $projectDesc, $gitHubLink];
   }

   function copyText(){
        navigator.clipboard.writeText("ines.sebaihi20@gmail.com");
        const $notification = $('<div class="notification">Copied to clipboard!</div>');
        $('body').append($notification);
        $notification.fadeIn();
        setTimeout(() => {
            $notification.fadeOut(400, function() {
            $(this).remove();
            });
        }, 2000);
   }


//graph function tingy real time shi

$(document).ready(function() {
    hovernavbutton()
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const ball of balls) {
            ball.draw();
            ball.movement();
        }

        requestAnimationFrame(loop);
    }


    function skillboxanimate(skills){ 
        for (let i = 0;i<skills.length;i++){
            
            setTimeout(() => {
            skills.removeClass("animate");
            $(skills[i]).addClass("animate");
            }, i * 1500);

        }
    }

    const canvas = document.getElementById("graph");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const balls = [];

    const ctx = canvas.getContext("2d");

    while (balls.length < 80) {
        const ball = new Balls(ctx, canvas);
        balls.push(ball);
    }
    loop();
    let aboutOpen = true;

    $("#aboutBtn").on("click", function () {
        $(".Textbox .left").addClass("animate");
    

    if (aboutOpen) {
        $("#headertext").text("Skills");
        $("#title").text("Intermediate in:");
        $("#infotext").text("Other relevant skills:");
              
        $("#mii_icon").attr("src", "mii_icon3.png");
        $("#aboutBtn").text("Back");
        $("#skillbox").html("<i class='fa-brands fa-html5'></i> <i class='fa-brands fa-css3-alt'></i> <i class='fa-brands fa-js'></i> <i class='fa-brands fa-python'></i> <i class='fa-solid fa-database'></i>");
        $("#infotext2").text("Discrete math, working on algorithms and logical reasoning");

        const skills = $("#skillbox i");
        skillboxanimate(skills);

    } else {
        $("#headertext").text("Ines Sebaihi");
        $("#title").text("First year BSc Mathematics with Computing student @ QMUL");
        $("#mii_icon").attr("src", "mii_icon.png");
        $("#aboutBtn").text("Read more");
        $("#skillbox").html(" ");
        $("#infotext").text("");
        $("#infotext2").text("Seeking experience in software development roles.");
    }
    setTimeout(() => {
        $(".Textbox .left").removeClass("animate");
    }, 500);

    aboutOpen = !aboutOpen;
});

    $("#mii_icon").hover(function() {
        $(this).attr("src", "mii_icon2.png");
    }, function() {
        if (aboutOpen){
            $(this).attr("src", "mii_icon.png");  
        }else{
          $(this).attr("src", "mii_icon3.png");  
        }
        
    });


});
