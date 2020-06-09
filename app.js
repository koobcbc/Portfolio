$(()=>{
  /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger icon*/
  function myFunction() {
      let $collapsingList = document.getElementById("collapse");
      $collapsingList.className = $collapsingList.className !== 'show' ? 'show' : 'hide';
      //reference: https://stackoverflow.com/questions/40446658/javascript-add-transition-between-displaynone-and-displayblock
      if ($collapsingList.className === 'show') {
          window.setTimeout(function(){
              $collapsingList.style.display = 'block';
              $collapsingList.style.opacity = 1;
              $collapsingList.style.transform = 'scale(1)';
          },600); //duration for showing
        }
        if ($collapsingList.className === 'hide') {
          window.setTimeout(function(){
              $collapsingList.style.opacity = 0;
              $collapsingList.style.transform = 'scale(0)';
              $collapsingList.style.display = 'none';
          },0); // duration for hiding
        }

      let $collapseContainer = document.getElementById("collapse-container");
      $collapseContainer.className = $collapseContainer.className !== 'show' ? 'show' : 'hide';
      if ($collapseContainer.className === 'show') {
      $collapseContainer.style.display = 'block';
          window.setTimeout(function(){
            $collapseContainer.style.opacity = 1;
            $collapseContainer.style.transform = 'scale(1)';
          },600); //duration for showing
        }
        if ($collapseContainer.className === 'hide') {
          $collapseContainer.style.opacity = 0;
          $collapseContainer.style.transform = 'scale(0)';
          window.setTimeout(function(){
            $collapseContainer.style.display = 'none';
          },0); // duration for hiding
        }
    }

  //reference: https://stackoverflow.com/questions/14804725/twitter-bootstrap-navbar-shadow-on-scroll
  //showing a box-shadow below navbar when scrolled down
    $(document).ready(function(){
      $(window).scroll(function(){
      let $shadowScroll= $(window).scrollTop();
      if( $shadowScroll > 0 ){
      $("#shadowOnScroll").css({'display':'block', 'opacity':y/20});
      } else {
      $("#shadowOnScroll").css({'display':'block', 'opacity':y/20});
      }
      });
    })

  // PROJECTS PAGE PORTION (using google sheet as json via ajax)
  // sheetUrl is the shared url of google sheet (project files)
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/1DVsYouq2bljhJaC5GVWesAj1GZoAT1sTI-1inopSn3o/edit?usp=sharing'
  const sheetAsJSON = 'https://spreadsheets.google.com/feeds/list/1DVsYouq2bljhJaC5GVWesAj1GZoAT1sTI-1inopSn3o/od6/public/values?alt=json'

  $.ajax({
      url: sheetAsJSON,
    }).then((data) => {
        const projects = data.feed.entry.map( project => {
            return {
                title: project.gsx$title.$t,
                image: project.gsx$image.$t,
                description: project.gsx$description.$t,
                url: project.gsx$url.$t
            }
        }) // map ends
        app(projects)
    })

  function app(projectsArr) {
      console.log('inside app - projects', projectsArr)
      projectsArr.forEach( project => {
          //create div of individual project
          let individualProject = $('<div>')
          individualProject
              .addClass('individualProject')
          $(".project-container").append(individualProject)

          //create a div for img inside "individual project div"
          let projectImgDiv = $('<div>')
          let projectImg = $('<img>')
          projectImgDiv.addClass('projectImageDiv')
          projectImg.addClass('projectImage')
          projectImg
              .attr('src', project.image)
              .attr('alt', 'image of project')
          projectImgDiv.append(projectImg)
          individualProject.append(projectImgDiv)

          //create div for description box
          let descriptionBox = $('<div>')
          descriptionBox.addClass('descriptionBox')
          individualProject.append(descriptionBox)
          //create title in "project description div"
          let title = $('<h3>')
          title.text(project.title)
          title.addClass('projectTitle')
          title.css('text-align', 'center')
          descriptionBox.append(title)

          //create description in "project description div"
          let description = $('<h4>')
          description.text(project.description)
          description.css('text-align', 'center')
          description.addClass('projectDescription')
          descriptionBox.append(description)
          

      })
  }


})
