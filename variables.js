
//*****************************************
//----------variable declaration-----------
//*****************************************

//get references to btns
const yes_consent_btn = document.getElementById('yes-consent-btn');
const no_consent_btn = document.getElementById('no-consent-btn');
const inst_next_btn = document.getElementById('inst-next-btn');
const inst_back_btn = document.getElementById('inst-back-btn');
const save_resp_btn = document.getElementById('save-resp-btn');
const save_mot_resp_btn = document.getElementById('save-mot-resp-btn');
const save_range_resp_btn = document.getElementById('save-range-resp-btn');
const save_captcha_resp_btn = document.getElementById('save-captcha-resp-btn');

//set up keyboard / sound tests
const test_sound_btn = document.getElementById('test-sound-btn');
const next_test_btn = document.getElementById('next-test-btn');
const back_test_btn = document.getElementById('back-test-btn');
const test_sound_screen = document.getElementById('test-sound-screen');
const test_keyboard_screen = document.getElementById('test-keyboard-screen');
const spacebar = document.getElementById('spacebar');

var test_keyboard = false;
var test_sound = false;
var practice_rating = 0;

//get references to sliders
const mw_probe_rad_checked = document.querySelector('input[name="mw-probe-rad"]:checked');
const guidance_probe_rad_checked = document.querySelector('input[name="guidance-probe-rad"]:checked');
const mot_probe_rad_checked = document.getElementById('input[name="mot-probe-rad"]:checked');

//get references to slider outputs

//get references to pages
const lab_header = document.getElementById('lab-header');
const lab_logo = document.getElementById('lab-logo');
const recruitment_text = document.getElementById('recruitment-text');
const info_consent_letter = document.getElementById('info-consent-letter');
const task_inst = document.getElementById('task-inst');
const thought_probe_1 = document.getElementById('thought-probe-1');
const thought_probe_2 = document.getElementById('thought-probe-2');
const mw_slider_probe = document.getElementById('mw-slider-probe');
const begin_task = document.getElementById('begin-task');
const mot_probe = document.getElementById('mot-probe');
const captcha_ctn = document.getElementById('captcha-ctn');
const decline_to_participate = document.getElementById('decline-to-participate');
const show_rating = document.getElementById('show-rating');
const practice_over = document.getElementById('practice-over');
const do_not_refresh = document.getElementById('do-not-refresh');

//get references to stim
const stim = document.getElementById('stim-container');
const the_metronome = document.getElementById('metronome');

//set participant values		
const studyid = '9999-9999';		
const ss_code = getRandomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


//experimental constants
const num_trials = 50; // 800
const num_practice = 5; // 18
const trial_duration = 1300; // 1300
const time_to_metronome = trial_duration/2;
const motive_list = [25]; //[90,182,290,382,490,582,690,782]
const captcha_list = [45]; //[600]

var inst_p1 =
  "<p>For this experiment, you will hear a metronome sound presented at a constant rate.</p>"
  +"<p>Your task is to press the SPACEBAR in synchrony with the onset of the metronome, so that you press the SPACEBAR exactly when each metronome sound is presented.</p>"
  +"<p>Please keep your eyes fixated on the monitor while you complete this task.</p>";

var inst_p2 =
  "<p>While you are completing this task, you may find yourself thinking about things other than the task. These thoughts are referred to as 'task-unrelated thoughts.' Having task-unrelated thoughts is perfectly normal, especially when one has to do the same thing for a long period of time.</p>" 
  +"<p>Over the course of this task, we would like to determine how frequently you are focused on the task and how frequently you are thinking about thoughts that are unrelated to the task. To do this, every once in a while, the task will temporarily stop and you will be presented with a thought-sampling screen that will ask you to indicate whether, just before seeing the thought-sampling screen, you were focused on the task or focused on task-unrelated thoughts.</p>";

var inst_p3 =
  "<p>Being <b>focused on the task</b> means that, just before the thought-sampling screen appeared, you were focused on some aspect of the task at hand. For example, if you were thinking about your performance on the task, or if you were thinking about when you should make a button press, these thoughts would count as being on-task.</p>" 
  +"<p>On the other hand, experiencing <b>task-unrelated thoughts</b> means that you were thinking about something completely unrelated to the task. Some examples of task-unrelated thoughts include thoughts about what to eat for dinner, thoughts about an upcoming event, or thoughts about something that happened to you earlier in the day. Any thoughts that you have that are not related to the task you are completing count as task-unrelated.</p>"; 

var inst_p4 =
  "<p>When the thought-sampling screen is presented, we will ask you to indicate the extent to which you were engaged in 'task-unrelated thoughts', commonly referred to as mind wandering.</p>" 
  +"<p>To do this, we will present you with a thought-sampling screen that looks like this:</p>"
  +mw_slider_probe.innerHTML;

var inst_p5 =
  "<p>We will now begin a few practice trials to help you become familiar with the task.</p>";