function initGUIControllers(tracker) {
  // GUI Controllers

  var gui = new dat.GUI();

  var trackedColors = {
    custom: false
  };

  Object.keys(tracking.ColorTracker.knownColors_).forEach(function(color) {
    trackedColors[color] = true;
  });

  tracker.customColor = '#000000';

  function updateColors() {
    var colors = [];

    for (var color in trackedColors) {
      if (trackedColors[color]) {
        colors.push(color);
      }
    }

    tracker.setColors(colors);
  }

  var colorsFolder = gui.addFolder('Colors');

  Object.keys(trackedColors).forEach(function(color) {
    if (color !== 'custom') {
      colorsFolder.add(trackedColors, color).onFinishChange(updateColors);
    }
  });

  colorsFolder.add(trackedColors, 'custom').onFinishChange(function(value) {
    if (value) {
      this.customColorElement = colorsFolder.addColor(tracker, 'customColor').onChange(createCustomColor);
    } else {
      colorsFolder.remove(this.customColorElement);
    }
  });

  var parametersFolder = gui.addFolder('Parameters');

  parametersFolder.add(tracker, 'minDimension', 1, 100);
  parametersFolder.add(tracker, 'minGroupSize', 1, 100);

  colorsFolder.open();
  parametersFolder.open();

  updateColors();
}
