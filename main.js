htmlChart();
canvasChart();

function canvasChart() {

  var rangeInput = $(".canvas_chart .choose_angles input[type='range']");
  var numberInput = $(".canvas_chart .choose_angles input[type='number']");
  var canvas = $('#canvas_pie')[0];
  var ctx = canvas.getContext('2d');
  ctx.font = "20px Arial";

  ctx.fillStyle = 'rgba(0,0,200,0.5)';
  ctx.beginPath();
  ctx.arc(150, 75, 75, 0, Math.PI * 2, true);
  ctx.fill();

  rangeInput.on("change", function () {
    var newValue = $(rangeInput)[0].value;
    numberInput.val(newValue);

    var convertedToDegress =  Math.floor( newValue * 3.6 );
    renderPie(convertedToDegress);
    renderLegend(newValue);
  });

  numberInput.on("change", function () {
    var newValue = $(numberInput)[0].value;
    rangeInput.val(newValue);

    var convertedToDegress =  Math.floor( newValue * 3.6 );
    renderPie(convertedToDegress);
    renderLegend(newValue);
  });

  function renderPie(degrees) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,200,0.5)';
    ctx.beginPath();
    ctx.arc(150, 75, 75, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.fillText("B", 120, 70);

    var convertedDeg = degrees - 90;
    var endRadians = (convertedDeg * Math.PI) / 180;

    ctx.fillStyle = 'rgba(0,200,0,0.5)';
    ctx.beginPath();
    ctx.moveTo(150, 75);
    ctx.lineTo(150, 25);
    ctx.arc(150, 75, 75, -1 * Math.PI / 2, endRadians, false);
    ctx.fill();

    ctx.fillText("A", 150, 90);
  }

  function renderLegend(range) {
    var first = $(".canvas_chart .legend .first");
    var second = $(".canvas_chart .legend .second");
    first.text(range);
    second.text(100 - range);
  }



}


function htmlChart() {
  var rangeInput = $(".html_chart .choose_angles input[type='range']");
  var numberInput = $(".html_chart .choose_angles input[type='number']");
  var pie = $(".pie");

  rangeInput.on("change", function () {
    var newValue = $(rangeInput)[0].value;
    numberInput.val(newValue);
    renderSlice(newValue);
    renderLegend(newValue);
  });

  numberInput.on("change", function () {
    var newValue = $(numberInput)[0].value;
    rangeInput.val(newValue);
    renderSlice(newValue);
    renderLegend(newValue);
  });

  function renderLegend(range) {
    var first = $(".html_chart .legend .first");
    var second = $(".html_chart .legend .second");
    first.text(range);
    second.text(100 - range);
  }

  function renderSlice(rangeInput) {

    var rangeInput = parseInt(rangeInput);
    $(".quadrant", pie).remove();
    $("[class^='hover_legend']", pie).remove();

    var quadrant1 = $('<div class="quadrant top right"></div>').appendTo(pie);
    var slice1 = $('<div class="slice slice1"></div>').appendTo(quadrant1);
    var quadrant2 = $('<div class="quadrant bottom right"></div>').appendTo(pie);
    var slice2 = $('<div class="slice slice1"></div>').appendTo(quadrant2);
    var quadrant3 = $('<div class="quadrant bottom left"></div>').appendTo(pie);
    var slice3 = $('<div class="slice slice1"></div>').appendTo(quadrant3);
    var quadrant4 = $('<div class="quadrant top left"></div>').appendTo(pie);
    var slice4 = $('<div class="slice slice1"></div>').appendTo(quadrant4);

    var hoverLegendA = $('<div class="hover_legend_A">A</div>').appendTo(pie);
    var hoverLegendB = $('<div class="hover_legend_B">B</div>').appendTo(pie);
    var hoverLegendATop = 0;
    var hoverLegendALeft = 100;
    var hoverLegendBTop = 0;
    var hoverLegendBLeft = 100;

    if (rangeInput > 0 && rangeInput < 26) {
      var rangeInputToAngle1 = rangeInput * 3.6;
      var newCSSAngle1 = 90 - rangeInputToAngle1;

      hoverLegendATop = parseInt(rangeInput);
      hoverLegendALeft = parseInt(50 + rangeInput);
      hoverLegendBTop = parseInt(50 + rangeInput);
      hoverLegendBLeft = parseInt(25 + rangeInput);
    }

    if (rangeInput > 25 && rangeInput < 51) {
      newCSSAngle1 = 0;
      var rangeInputToAngle2 = rangeInput * 3.6 - 90;
      var newCSSAngle2 = 90 - rangeInputToAngle2;

      hoverLegendATop = parseInt(rangeInput);
      hoverLegendALeft = parseInt(50 + rangeInput / 2);
      hoverLegendBTop = parseInt(100 - rangeInput);
      hoverLegendBLeft = parseInt(50 - rangeInput / 2);

    }

    if (rangeInput > 50 && rangeInput < 76) {
      newCSSAngle1 = 0;
      newCSSAngle2 = 0;

      var rangeInputToAngle3 = rangeInput * 3.6 - 180;
      var newCSSAngle3 = 90 - rangeInputToAngle3;

      hoverLegendATop = parseInt(rangeInput);
      hoverLegendALeft = parseInt(100 - rangeInput / 2);
      hoverLegendBTop = parseInt(100 - rangeInput);
      hoverLegendBLeft = parseInt(50 - rangeInput / 2);

    }

    if (rangeInput > 75 && rangeInput < 101) {
      newCSSAngle1 = 0;
      newCSSAngle2 = 0;
      newCSSAngle3 = 0;

      var rangeInputToAngle4 = rangeInput * 3.6 - 270;
      var newCSSAngle4 = 90 - rangeInputToAngle4;

      hoverLegendATop = parseInt(rangeInput - 25);
      hoverLegendALeft = parseInt(100 - rangeInput / 2);
      hoverLegendBTop = parseInt(95 - rangeInput);
      hoverLegendBLeft = parseInt(rangeInput / 2);

    }

    slice1.css({
      transform: "rotate(-" + newCSSAngle1 + "deg)"
    });

    slice2.css({
      transform: "rotate(-" + newCSSAngle2 + "deg)"
    });

    slice3.css({
      transform: "rotate(-" + newCSSAngle3 + "deg)"
    });

    slice4.css({
      transform: "rotate(-" + newCSSAngle4 + "deg)"
    });

    hoverLegendA.css({
      top: hoverLegendATop + "%",
      left: hoverLegendALeft + "%"
    });

    hoverLegendB.css({
      top: hoverLegendBTop + "%",
      left: hoverLegendBLeft + "%"
    });

  }

}