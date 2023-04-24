# Eye tracking via a webcam, version 2
This experiment demonstrates how to conduct eye tracking via a webcam using the [webgazer](https://webgazer.cs.brown.edu/) library. Try it out over [here](https://run.pavlovia.org/tpronk/demo_eye_tracking2/). *This experiment only works online (PsychoJS) and not offline (PsychoPy)*

# General structure
The experiment consists of the following phases:
- `loading`, which downloads the required library (webgazer) and waits until it is ready
- `webcam`, which asks the participant for permission to use their webcan and starts the eye tracking
- `calibration`, which calibrates the eye tracker by mapping the paritipant's gaze to points on the screen that they you need to click
- `tracking`, which shows a square that follows the participant's gaze

# Configuration options
The `loading_trial` has a code component named `configuration_code`. This component contains two variables for configuring the eye tracker:
- `averagingWindow` A single gaze measurement can be jittery and inaccurate. Recorded gazes are averaged over the last X measurements, where X is averagingWindow. Longer windows give more fluent but slower eye-tracking.
- `window.eyesReturnedDelay` If the eyes are inside of the validation square, the webcam thumbnail disappears after a delay of Y milliseconds, where Y is window.eyesReturnedDelay.

The file `calibration_trials.xlsx` contains the X and Y positions of the calibration square in the calibration trials.

# How good is it?
Disclaimer: I built this experiment to learn more about integrating complicated software libraries into PsychoJS. I picked eye tracking because it is a popular method and to showcase how flexible PsychoJS is. On the route, I learned some basic things about eye tracking, but I never actually conducted a study with it. Having said this, here are some things I noticed:
- To yield accurate results your participant needs to keep their head still
- The eye tracking can require quite a lot of processing power, so it could be tough on older computers
- Good calibration is very important. Accuracy seems lower at the edges of the screen than at the center. I think a lot can be gained by tweaking  `calibration_trials.xlsx`.
- In the tracking phase, accuracy seems to drop off over time. Recalibrating occassionally could address this issue. To keep on calibrating, have the participant click things on the screen and remove the statement `window.webgazer.removeMouseEventListeners();` in the `tracking_square` code component.
- This experiment loads version 2.0.1 of the webgazer library, with some modifications by me for checking whether the eyes are inside of the calibration square. My modified version can be found [here](https://github.com/tpronk/WebGazer)

# Relevant threads and tutorials
- A [tutorial](https://twitter.com/HirstRj/status/1309597324591628290) on how to detect whether a participant looks left or right in five tweets.
- Discussion about demo_eye_tracking and demo_eye_tracking2 on the [PsychoPy Forum](https://discourse.psychopy.org/t/eye-tracking-development-for-pavlovia/14667). 
- General discussion on eye tracking via webgazer on [Twitter](https://twitter.com/ThomasPronk123/status/1291985040168177664) and the [PsychMaps Facebook Group](https://www.facebook.com/groups/psychmap/?post_id=1163457340697853).

# What can do with your experiment?
Whatever you'd like! I delivered a bare-bones version to show that it's possible to eye track with PsychoJS, but as listed above, a lot of improvements could be made. Feel free to clone this experiment, improve it, and adapt it to your needs. Please share your improvements with our community. You can do so by posting about it on the [PsychoPy forum](https://discourse.psychopy.org) or by making a pull request for this Gitlab repo.

# Citing this experiment
To cite this demo, please use: 

Pronk, T. (2020). Demo of Eye-Tracking via Webcam in PsychoJS (Version 2) [Computer software]. Retrieved from https://gitlab.pavlovia.org/tpronk/demo_eye_tracking2/

To cite the webgazer eye-tracking library, please use: 

Papoutsaki, A., Sangkloy, P., Laskey, J., Daskalova, N., Huang, J., & Hays, J. (2016). Webgazer: Scalable webcam eye tracking using user interactions. In *Proceedings of the Twenty-Fifth International Joint Conference on Artificial Intelligence-IJCAI 2016*.



# WARNING
The webgazer library downloads JS files from servers hosted by an external party. In an actual experiment, this could be a threat to privacy. On the upside, since webgazer is maintained by an academic institution, I deem the risks lower than with libraries that are maintained by commercial parties.
Alternatively, you could get in touch with the webgazer team to discuss ways to have the JS files downloaded from Pavlovia. If you do so, I'd love to be in the loop!

# More demos
See [psychojs_experiments](https://github.com/tpronk/psychojs_experiments) for a list of all the demos that I built for PsychoJS.
