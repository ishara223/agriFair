var app = angular.module('eLankapuraApp',['toaster','ui.router', 'ngMedia', 'ngMessages'])
  .directive('dragMe', dragMe)
  .directive('dropOnMe', dropOnMe)
  .directive('dropOnMeOutput',dropOnMeOutput)
  .directive('dropOnMeBoth',dropOnMeBoth)
  .directive('dropOnMicrophone',dropOnMicrophone)
  .directive('dropOnUsb',dropOnUsb)
  .directive('selectNgFiles',selectNgFiles)
  .directive('tooltip', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $(element).tooltipster({
          animation: attrs.animation
        });
      }
    };
  });
  
dragMe.$inject = [];

function dragMe() {
  var DDO = {
    restrict: 'EA',
    scope: true,
    link: function(scope, element, attrs) {
      element.prop('draggable', true);
      element.on('dragstart', function(event) {
        event.originalEvent.dataTransfer.setData("text", event.target.id);
        event.originalEvent.dataTransfer.effectAllowed = 'move';
        // var dragIcon = document.createElement('img');
        // dragIcon.src = '/e-lankapura/app/src/img/episodeTwo/activities/scanner.png';
        // // dragIcon.width = 100;
        // ev.dataTransfer.setDragImage(dragIcon, 0, 0);
        var datadragged = event.originalEvent.dataTransfer.getData("text");
        var deviceType = document.getElementById(datadragged).alt;
      });
    }
  };
  return DDO;
}
dropOnMe.$inject = [];
function dropOnMe() {
  var DDO = {
    restrict: 'EA',
    scope: true,
    link: function(scope, element, attrs) {
      element.on('dragover', function(event) {
        event.preventDefault();
      });
      element.on('drop', function(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text");
        var deviceType = document.getElementById(data).alt;

        var isCorrectInput =  scope.isInput(deviceType);
        if(isCorrectInput){
            event.originalEvent.target.appendChild(document.getElementById(data));
            document.getElementById('div1').style.backgroundColor = "green"; 
            document.getElementById('div2').style.backgroundColor = "deepskyblue";
            document.getElementById('div3').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "සාර්ථකයි. නිවැරදිව ආදාන මෙවලම හදුනා ගත්තා.";
            $('#demo').removeClass("alert alert-danger result-alert-box");
            $('#demo').addClass("alert alert-success result-alert-box");
            // droppedElements = droppedElements+1;
            scope.addElement();
            scope.getProgress();
            scope.endGame(droppedElements);
        }
        else{
            event.originalEvent.dataTransfer.clearData("text");
            document.getElementById('div1').style.backgroundColor = "red"; 
            document.getElementById('div2').style.backgroundColor = "deepskyblue"; 
            document.getElementById('div3').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "ආදාන මෙවලමක් නොවේ. නැවත උත්සහ කරන්න.";
            $('#demo').removeClass("alert alert-success result-alert-box");
            $('#demo').addClass("alert alert-danger result-alert-box");
            scope.deductMarks();
            return false;
        }
    });
    }
  };
  return DDO;
}

dropOnMeOutput.$inject = [];
function dropOnMeOutput() {
  var DDO = {
    restrict: 'EA',
    scope: true,
    link: function(scope, element, attrs) {
      element.on('dragover', function(event) {
        event.preventDefault();
      });
      element.on('drop', function(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text");
        var deviceType = document.getElementById(data).alt;
        var isCorrectInput =  scope.isOutput(deviceType);
        if(isCorrectInput){
            event.originalEvent.target.appendChild(document.getElementById(data));
            document.getElementById('div2').style.backgroundColor = "green"; 
            document.getElementById('div1').style.backgroundColor = "deepskyblue";
            document.getElementById('div3').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "සාර්ථකයි. නිවැරදිව ප්‍රතිදාන මෙවලම හදුනා ගත්තා.";
            $('#demo').removeClass("alert alert-danger result-alert-box");
            $('#demo').addClass("alert alert-success result-alert-box");
            // droppedElements = droppedElements+1;
            scope.addOutputElement();
            scope.getProgress();
            scope.endGame(droppedElements);
        }
        else{
            event.originalEvent.dataTransfer.clearData("text");
            document.getElementById('div2').style.backgroundColor = "red"; 
            document.getElementById('div1').style.backgroundColor = "deepskyblue"; 
            document.getElementById('div3').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "ප්‍රතිදාන මෙවලමක් නොවේ. නැවත උත්සහ කරන්න.";
            $('#demo').removeClass("alert alert-success result-alert-box");
            $('#demo').addClass("alert alert-danger result-alert-box");
            scope.deductMarks();
            return false;
        }
    });
    }
  };
  return DDO;
}

dropOnMeBoth.$inject = [];
function dropOnMeBoth() {
  var DDO = {
    restrict: 'EA',
    scope: true,
    link: function(scope, element, attrs) {
      element.on('dragover', function(event) {
        event.preventDefault();
      });
      element.on('drop', function(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text");
        var deviceType = document.getElementById(data).alt;
        var isCorrectInput =  scope.isBoth(deviceType);
        if(isCorrectInput){
            event.originalEvent.target.appendChild(document.getElementById(data));
            document.getElementById('div3').style.backgroundColor = "green"; 
            document.getElementById('div1').style.backgroundColor = "deepskyblue"; 
            document.getElementById('div2').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "සාර්ථකයි. නිවැරදිව ආදාන සහ ප්‍රතිදාන දෙයාකාරයටම අයත් මෙවලම හදුනාගත්තා.";
            $('#demo').removeClass("alert alert-danger result-alert-box");
            $('#demo').addClass("alert alert-success result-alert-box");
            // droppedElements = droppedElements+1;
            scope.addBothElement();
            scope.getProgress();
            scope.endGame(droppedElements);
        }
        else{
            event.originalEvent.dataTransfer.clearData("text");
            document.getElementById('div3').style.backgroundColor = "red"; 
            document.getElementById('div1').style.backgroundColor = "deepskyblue"; 
            document.getElementById('div2').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "ආදාන හෝ ප්‍රතිදාන ආකාරයකට අයත් මෙවලමක් වේ. නැවත උත්සහ කරන්න.";
            $('#demo').removeClass("alert alert-success result-alert-box");
            $('#demo').addClass("alert alert-danger result-alert-box");
            scope.deductMarks();
            return false;
        }
    });
    }
  };
  return DDO;
}

dropOnMicrophone.$inject = [];
function dropOnMicrophone() {
  var DDO = {
    restrict: 'EA',
    scope: true,
    link: function(scope, element, attrs) {
      element.on('dragover', function(event) {
        event.preventDefault();
      });
      element.on('drop', function(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text");
        var deviceType = document.getElementById(data).alt;
        var isCorrectInput =  scope.isMicrophone(deviceType);
        if(isCorrectInput){
            //event.originalEvent.target.appendChild(document.getElementById(data)); 
            document.getElementById('demo').innerHTML = "සාර්ථකයි.";
            $('#demo').removeClass("alert alert-danger result-alert-box");
            $('#demo').addClass("alert alert-success result-alert-box");
            // droppedElements = droppedElements+1;
            //scope.addBothElement();
            //scope.endGame(droppedElements);
            //scope.getProgress();
        }
        else{
            event.originalEvent.dataTransfer.clearData("text");
            // document.getElementById('div3').style.backgroundColor = "red"; 
            // document.getElementById('div1').style.backgroundColor = "deepskyblue"; 
            // document.getElementById('div2').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "නැවත උත්සහ කරන්න.";
            $('#demo').removeClass("alert alert-success result-alert-box");
            $('#demo').addClass("alert alert-danger result-alert-box");
            //scope.deductMarks();
            return false;
        }
    });
    }
  };
  return DDO;
}

dropOnUsb.$inject = [];
function dropOnUsb() {
  var DDO = {
    restrict: 'EA',
    scope: true,
    link: function(scope, element, attrs) {
      element.on('dragover', function(event) {
        event.preventDefault();
      });
      element.on('drop', function(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text");
        var deviceType = document.getElementById(data).alt;
        var isCorrectInput =  scope.isUsb(deviceType);
        if(isCorrectInput){
          alert('correct');
            //event.originalEvent.target.appendChild(document.getElementById(data)); 
            document.getElementById('demo').innerHTML = "සාර්ථකයි.";
            $('#demo').removeClass("alert alert-danger result-alert-box");
            $('#demo').addClass("alert alert-success result-alert-box");
            // droppedElements = droppedElements+1;
            //scope.addBothElement();
            //scope.endGame(droppedElements);
            //scope.getProgress();
        }
        else{
            event.originalEvent.dataTransfer.clearData("text");
            // document.getElementById('div3').style.backgroundColor = "red"; 
            // document.getElementById('div1').style.backgroundColor = "deepskyblue"; 
            // document.getElementById('div2').style.backgroundColor = "deepskyblue"; 
            document.getElementById('demo').innerHTML = "නැවත උත්සහ කරන්න.";
            $('#demo').removeClass("alert alert-success result-alert-box");
            $('#demo').addClass("alert alert-danger result-alert-box");
            //scope.deductMarks();
            return false;
        }
    });
    }
  };
  return DDO;
}

function selectNgFiles(){
  var DDO = {
    restrict: 'EA',
    scope: true,
    require: "ngModel",
    link: function postLink(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      })
    }
  };
  return DDO;
}