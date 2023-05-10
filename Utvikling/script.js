// Lager HTML elementene for endring av bakgrunnsfargen
var colorOptionsDiv = document.createElement("div");
colorOptionsDiv.className = "color-options";
document.body.appendChild(colorOptionsDiv);

var overskrift = document.createElement("h1");
var text = document.createTextNode("Choose a background color: ");
overskrift.appendChild(text);
document.body.appendChild(overskrift);

var FargeInput = document.createElement("input");
FargeInput.type = "text";
FargeInput.id = "FargeInput";
document.body.appendChild(FargeInput);

var ColorButton = document.createElement("button");
ColorButton.innerHTML = "Change color";
document.body.appendChild(ColorButton);

var lineBreak = document.createElement("br");
document.body.appendChild(lineBreak);

colorOptionsDiv.appendChild(overskrift);
colorOptionsDiv.appendChild(FargeInput);
colorOptionsDiv.appendChild(ColorButton);
colorOptionsDiv.appendChild(lineBreak);
//


// kode for valg av HTML-elementer. 
var htmlOptionsDiv = document.createElement("div");
htmlOptionsDiv.className = "html-options";
document.body.appendChild(htmlOptionsDiv);

var LagElementOverskrift = document.createElement("h1");
var text = document.createTextNode("Choose HTML-Element:");
LagElementOverskrift.appendChild(text);
document.body.appendChild(LagElementOverskrift);

var select = document.createElement("select");
select.id = "HtmlElements";
document.body.appendChild(select);
var selectDrop = document.getElementById("HtmlElements");

var placeholderOption = document.createElement("option");
placeholderOption.disabled = true;
placeholderOption.selected = true;
placeholderOption.text = "Choose HTML-Element";
select.appendChild(placeholderOption);

var options = [
  { value: "h4", text: "<h4>" },
  { value: "p", text: "<p>" },
  { value: "h2", text: "<h2>" },
];

for (let i = 0; i < options.length; i++) { // For loop som returnerer alt fra array options.
  var option = document.createElement("option");
  option.value = options[i].value;
  option.text = options[i].text;
  select.appendChild(option);
}

var elementText = document.createElement("input");
elementText.placeholder = "Write your text here";
document.body.appendChild(elementText);

var textColorInput = document.createElement("input");
textColorInput.type = "text";
textColorInput.id = "TextColorInput";
textColorInput.placeholder = "Text-color";
document.body.appendChild(textColorInput);

var fontInput = document.createElement("input");
fontInput.type = "text";
fontInput.id = "FontInput";
fontInput.placeholder = "Font family";
document.body.appendChild(fontInput);

var textSize = document.createElement("input");
textSize.type = "number";
textSize.id = "textSize";
textSize.placeholder = "Font Size";
document.body.appendChild(textSize);

var positionButton = document.createElement("button");
positionButton.innerHTML = "Choose position";
document.body.appendChild(positionButton);

var SubmitButton = document.createElement("button");
SubmitButton.innerHTML = "Submit";
document.body.appendChild(SubmitButton);

htmlOptionsDiv.appendChild(LagElementOverskrift);
htmlOptionsDiv.appendChild(select);
htmlOptionsDiv.appendChild(elementText);
htmlOptionsDiv.appendChild(textColorInput);
htmlOptionsDiv.appendChild(fontInput);
htmlOptionsDiv.appendChild(textSize);
htmlOptionsDiv.appendChild(positionButton);
htmlOptionsDiv.appendChild(SubmitButton);
//

// Event listeners for alle buttons
ColorButton.addEventListener("click", EndringFarge)
SubmitButton.addEventListener('click', placeText);
positionButton.addEventListener('click', positionSet);
textColorInput.addEventListener("input", function() {
  const selectedElements = document.querySelectorAll(selectDrop.value); // Returns all element descendants of node that match selectors
  selectedElements.forEach(element => {
    element.style.color = textColorInput.value;
  });
});


//Endrer bakgrunnsfargen du velger på input-feltet
function EndringFarge(e) {
    var color = FargeInput.value;
    if(!isValidColor(color)) {
      alert("Invalid color entered!");
      return;
    }
    document.body.style.backgroundColor = color;
  }
  
  function isValidColor(color) {
    var style = new Option().style;
    style.color = color;
    return style.color !== '';
  }



// Funksjon som velger koordinatene til hvor teksten skal være plassert.
var position = [];
function positionSet() {
    position = [];
    positionButton.innerHTML = "Click on the screen";
    var pressed = true;
    document.addEventListener("click", function positionSet(e) { // Lager en midlertidig funksjon som sjekker om pressed er true eller false.
        if (pressed) {
            return pressed = false;
        } else {
            var x = e.pageX;
            var y = e.pageY;
            position.push(x, y); //Pusher koordinatene til position array.
            positionButton.innerHTML = "Position is (" + position + ")";
            console.log(position);
            document.removeEventListener("click", positionSet);
        }
    });
}


function placeText(e) {
  if(selectDrop.value === "Choose HTML-Element") { // Hvis en HTML-element ikke er valgt, skal det dukke opp en feilmelding.
    alert("Please select an HTML element");
    return;
  } else { // Ellers skal HTML-elementen lages.
    const newElement = document.createElement(selectDrop.value);
    newElement.innerHTML = elementText.value;
    newElement.style.position = "absolute";
    newElement.style.left = position[0] + "px";
    newElement.style.top = position[1] + "px";
    newElement.style.color = textColorInput.value;
    const font = fontInput.value;
    newElement.style.fontFamily = font;
    var fontSize = textSize.value;
    newElement.style.fontSize = fontSize + "px";
    newElement.style.margin= 0;
    document.body.appendChild(newElement);
  }
  
}
  