/*************************** 
 * Demo_Eye_Tracking2 Test *
 ***************************/

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0, 0, 0]),
  units: 'height',
  waitBlanking: true
});

// store info about the experiment session:
let expName = 'demo_eye_tracking2';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(loading_trialRoutineBegin());
flowScheduler.add(loading_trialRoutineEachFrame());
flowScheduler.add(loading_trialRoutineEnd());
flowScheduler.add(webcam_trialRoutineBegin());
flowScheduler.add(webcam_trialRoutineEachFrame());
flowScheduler.add(webcam_trialRoutineEnd());
flowScheduler.add(intro_calibatrion_trialRoutineBegin());
flowScheduler.add(intro_calibatrion_trialRoutineEachFrame());
flowScheduler.add(intro_calibatrion_trialRoutineEnd());
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin, trialsLoopScheduler);
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);
flowScheduler.add(tracking_trialRoutineBegin());
flowScheduler.add(tracking_trialRoutineEachFrame());
flowScheduler.add(tracking_trialRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'calibration_trials.xlsx', 'path': 'calibration_trials.xlsx'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.1.4';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var loading_trialClock;
var loading_text;
var webcam_trialClock;
var intro_text;
var intro_calibatrion_trialClock;
var calibration_text;
var mouse_2;
var calibration_trialClock;
var calibration_square;
var mouse_3;
var tracking_trialClock;
var tracking_square;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "loading_trial"
  loading_trialClock = new util.Clock();
  // Download the webgazer library and re-download seedrandom.js (since webgazer
  // overrides it with a version that conflicts with PsychoJS)
  psychoJS.downloadResources([
    { name: 'webgazer.js', path: 'js/webgazer-2.0.1.tp.js' },
    { name: 'seedrandom.js', path: 'https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.1/seedrandom.min.js' }
  ]);
  // Initialize x and y arrays; we use these to calculate running averages of 
  // current gaze position; the longer the window, the slower, but more fluent
  // the updates
  let averagingWindow = 10;
  window.xGazes = new Array(averagingWindow ).fill(0);
  window.yGazes = new Array(averagingWindow ).fill(0);
  // Timestamp for last time eyes exited validation box
  window.eyesExitedTimestamp= (new Date).getTime();
  // No. of ms to keep webcam thumbnail visible after eyes returned into validation box
  window.eyesReturnedDelay = 3000;
  // DEBUG
  window.psychoJS = psychoJS;
  loading_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'loading_text',
    text: 'Downloading additional resources. \n\nOne moment please...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "webcam_trial"
  webcam_trialClock = new util.Clock();
  intro_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intro_text',
    text: 'demo_eye_tracking: starting webcam\n\nThis experiment demonstrates eye tracking via the webgazer library. \n\nYou should see your web-browser request access to your webcam. You might need to click on this text to make that happen. Please permit access, and wait a little while. Your webcam video should appear in the top-left of the screen.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "intro_calibatrion_trial"
  intro_calibatrion_trialClock = new util.Clock();
  calibration_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'calibration_text',
    text: "demo_eye_tracking: calibration\n\nNow we'll calibrate the eye tracker. Please try to keep your head still and within the rectangle you see in your webcam video. When you do so, the rectangle turns green.\n\nIn the next part of this experiment, the webcam video disappears. It will reappear when your head is too from the rectangle. If this happens, please move back into view. White squares appears at different locations on the screen. Please click each square with your mouse.\n\nClick anywhere to continue...",
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  // Initialize components for Routine "calibration_trial"
  calibration_trialClock = new util.Clock();
  calibration_square = new visual.Rect ({
    win: psychoJS.window, name: 'calibration_square', 
    width: [0.02, 0.02][0], height: [0.02, 0.02][1],
    ori: 0, pos: [0, 0],
    lineWidth: 0, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([1, 1, 1]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  mouse_3 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_3.mouseClock = new util.Clock();
  // Initialize components for Routine "tracking_trial"
  tracking_trialClock = new util.Clock();
  tracking_square = new visual.Rect ({
    win: psychoJS.window, name: 'tracking_square', 
    width: [0.02, 0.02][0], height: [0.02, 0.02][1],
    ori: 0, pos: [0, 0],
    lineWidth: undefined, lineColor: new util.Color([1, 1, 1]),
    fillColor: new util.Color([(- 1), (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var loading_trialComponents;
function loading_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'loading_trial'-------
    t = 0;
    loading_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    loading_trialComponents = [];
    loading_trialComponents.push(loading_text);
    
    loading_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function loading_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'loading_trial'-------
    // get current time
    t = loading_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Continue once the webgazer global is available
    continueRoutine = !window.hasOwnProperty('webgazer');
    
    // *loading_text* updates
    if (t >= 0.0 && loading_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      loading_text.tStart = t;  // (not accounting for frame time here)
      loading_text.frameNStart = frameN;  // exact frame index
      
      loading_text.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    loading_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function loading_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'loading_trial'-------
    loading_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "loading_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var webcam_trialComponents;
function webcam_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'webcam_trial'-------
    t = 0;
    webcam_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Show webcam thumbnail and face feedback box, but not face overlay and gaze dot
    window.webgazer.params.showVideoPreview = true;
    window.webgazer.params.showFaceFeedbackBox = true;
    window.webgazer.params.showFaceOverlay = false;
    window.webgazer.params.showGazeDot = false
    // Start eye tracking
    window.webgazer
        // Called on each eye tracking update
        .setGazeListener(function(data, clock) {
          if (data !== null) {
            // Remove first element from gazes array, add current gaze at the end
            window.xGazes.shift();
            window.xGazes.push(data.x);
            window.yGazes.shift();
            window.yGazes.push(data.y);
           }
        })
        .begin();
        //.showPredictionPoints(true); 
    
    // keep track of which components have finished
    webcam_trialComponents = [];
    webcam_trialComponents.push(intro_text);
    
    webcam_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function webcam_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'webcam_trial'-------
    // get current time
    t = webcam_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *intro_text* updates
    if (t >= 0.0 && intro_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intro_text.tStart = t;  // (not accounting for frame time here)
      intro_text.frameNStart = frameN;  // exact frame index
      
      intro_text.setAutoDraw(true);
    }

    // Finish routine once everything is ready
    continueRoutine = 
      !window.webgazer.isReady() || 
      document.getElementById('webgazerFaceFeedbackBox') === null ||
      document.getElementById('webgazerVideoFeed') === null;
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    webcam_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function webcam_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'webcam_trial'-------
    webcam_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "webcam_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var gotValidClick;
var intro_calibatrion_trialComponents;
function intro_calibatrion_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'intro_calibatrion_trial'-------
    t = 0;
    intro_calibatrion_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_2
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    intro_calibatrion_trialComponents = [];
    intro_calibatrion_trialComponents.push(calibration_text);
    intro_calibatrion_trialComponents.push(mouse_2);
    
    intro_calibatrion_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function intro_calibatrion_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'intro_calibatrion_trial'-------
    // get current time
    t = intro_calibatrion_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *calibration_text* updates
    if (t >= 0.0 && calibration_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      calibration_text.tStart = t;  // (not accounting for frame time here)
      calibration_text.frameNStart = frameN;  // exact frame index
      
      calibration_text.setAutoDraw(true);
    }

    // *mouse_2* updates
    if (t >= 0.0 && mouse_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_2.tStart = t;  // (not accounting for frame time here)
      mouse_2.frameNStart = frameN;  // exact frame index
      
      mouse_2.status = PsychoJS.Status.STARTED;
      mouse_2.mouseClock.reset();
      prevButtonState = mouse_2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // abort routine on response
          continueRoutine = false;
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    intro_calibatrion_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var _mouseXYs;
function intro_calibatrion_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'intro_calibatrion_trial'-------
    intro_calibatrion_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_2.getPos();
    _mouseButtons = mouse_2.getPressed();
    psychoJS.experiment.addData('mouse_2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_2.rightButton', _mouseButtons[2]);
    // the Routine "intro_calibatrion_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var trials;
var currentLoop;
function trialsLoopBegin(trialsLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  trials = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'calibration_trials.xlsx',
    seed: undefined, name: 'trials'
  });
  psychoJS.experiment.addLoop(trials); // add the loop to the experiment
  currentLoop = trials;  // we're now the current loop

  // Schedule all the trials in the trialList:
  trials.forEach(function() {
    const snapshot = trials.getSnapshot();

    trialsLoopScheduler.add(importConditions(snapshot));
    trialsLoopScheduler.add(calibration_trialRoutineBegin(snapshot));
    trialsLoopScheduler.add(calibration_trialRoutineEachFrame(snapshot));
    trialsLoopScheduler.add(calibration_trialRoutineEnd(snapshot));
    trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot));
  });

  return Scheduler.Event.NEXT;
}


function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(trials);

  return Scheduler.Event.NEXT;
}


var calibration_trialComponents;
function calibration_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'calibration_trial'-------
    t = 0;
    calibration_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_3
    mouse_3.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Position calibration_square using width and height of window
    var canvas = psychoJS.window.size;
    var scaling = [
      canvas[0] <= canvas[1]? 1: canvas[0] / canvas[1],
      canvas[1] <= canvas[0]? 1: canvas[1] / canvas[0]
    ];
    var newPos = [
        calibration_x * scaling[0],
        calibration_y * scaling[1]
    ];
    console.log(newPos);
    calibration_square.setPos(newPos);
    // keep track of which components have finished
    calibration_trialComponents = [];
    calibration_trialComponents.push(calibration_square);
    calibration_trialComponents.push(mouse_3);
    
    calibration_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function calibration_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'calibration_trial'-------
    // get current time
    t = calibration_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *calibration_square* updates
    if (t >= 0.0 && calibration_square.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      calibration_square.tStart = t;  // (not accounting for frame time here)
      calibration_square.frameNStart = frameN;  // exact frame index
      
      calibration_square.setAutoDraw(true);
    }

    // *mouse_3* updates
    if (t >= 0.0 && mouse_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_3.tStart = t;  // (not accounting for frame time here)
      mouse_3.frameNStart = frameN;  // exact frame index
      
      mouse_3.status = PsychoJS.Status.STARTED;
      mouse_3.mouseClock.reset();
      prevButtonState = mouse_3.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_3.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_3.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [calibration_square]) {
            if (obj.contains(mouse_3)) {
              gotValidClick = true;
              mouse_3.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // Hide webcam thumbnail if eyes are in validation box
    if (webgazer.checkEyesInValidationBox() === true) {
      // If last time that eyes were outside of validation box was longer than 
      // window.eyesReturnedDelay ago, hide thumbnail
      if (
        document.getElementById('webgazerFaceFeedbackBox').style.display != 'none' &&
        (new Date).getTime() > window.eyesExitedTimestamp + window.eyesReturnedDelay
      ) {   
        document.getElementById('webgazerFaceFeedbackBox').style.display = 'none';
        document.getElementById('webgazerVideoFeed').style.display = 'none';
      }
    } else {
        // Eyes outside of validation box; show thumbnail
        window.eyesExitedTimestamp = (new Date).getTime();
        document.getElementById('webgazerFaceFeedbackBox').style.display = 'block';
        document.getElementById('webgazerVideoFeed').style.display = 'block';
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    calibration_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function calibration_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'calibration_trial'-------
    calibration_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // store data for thisExp (ExperimentHandler)
    _mouseXYs = mouse_3.getPos();
    _mouseButtons = mouse_3.getPressed();
    psychoJS.experiment.addData('mouse_3.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_3.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_3.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_3.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_3.rightButton', _mouseButtons[2]);
    if (mouse_3.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_3.clicked_name', mouse_3.clicked_name[0]);}
    // the Routine "calibration_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var tracking_trialComponents;
function tracking_trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'tracking_trial'-------
    t = 0;
    tracking_trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Remove the click tracker used for calibration
    window.webgazer.removeMouseEventListeners();
    // keep track of which components have finished
    tracking_trialComponents = [];
    tracking_trialComponents.push(tracking_square);
    
    tracking_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function tracking_trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'tracking_trial'-------
    // get current time
    t = tracking_trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *tracking_square* updates
    if (t >= 0.0 && tracking_square.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      tracking_square.tStart = t;  // (not accounting for frame time here)
      tracking_square.frameNStart = frameN;  // exact frame index
      
      tracking_square.setAutoDraw(true);
    }

    // Hide webcam thumbnail if eyes are in validation box
    if (webgazer.checkEyesInValidationBox() === true) {
      // If last time that eyes were outside of validation box was longer than 
      // window.eyesReturnedDelay ago, hide thumbnail
      if (
        document.getElementById('webgazerFaceFeedbackBox').style.display != 'none' &&
        (new Date).getTime() > window.eyesExitedTimestamp + window.eyesReturnedDelay
      ) {   
        document.getElementById('webgazerFaceFeedbackBox').style.display = 'none';
        document.getElementById('webgazerVideoFeed').style.display = 'none';
      }
    } else {
        // Eyes outside of validation box; show thumbnail
        window.eyesExitedTimestamp = (new Date).getTime();
        document.getElementById('webgazerFaceFeedbackBox').style.display = 'block';
        document.getElementById('webgazerVideoFeed').style.display = 'block';
    }
    // Update tracking square to the average of last n gazes
    let x = util.sum(window.xGazes) / window.xGazes.length;
    let y = util.sum(window.yGazes) / window.yGazes.length;
    // Set tracking square to x and y, transformed to height units
    tracking_square.setPos(
      util.to_height(
        [
          x - psychoJS.window.size[0] / 2,
          -1 * (y - psychoJS.window.size[1] / 2)
        ], 
        'pix', 
        psychoJS.window
      )
    );
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    tracking_trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function tracking_trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'tracking_trial'-------
    tracking_trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "tracking_trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
