//*****************************************
//----------variable declarations-----------
//*****************************************

//probe information
var num_probes = 5; //16
var probe_steps = num_trials / num_probes;

//experimental counters
var this_trial = 0;
var this_probe = 0;
var this_block = 0;

//experimental toggles
var probe_avail = true;
var motive_avail = true;
var captcha_avail = true;
var is_practice = true;
var getting_ready = true;
var is_probe = false;
var is_motive = false;
var is_captcha= false;

//default data values
var key_pressed = false;
var resp_at = '';
var rt = 'None';
var rt_to_metronome = '';
var omission = 1;
var trial_starttime = '';
var metronome_at = '';
var trial_endtime = '';

//default probe responses
var probe_1_resp = '';
var probe_2_resp = '';
var depth_probe_resp = '';

// default motive response
var motive_resp = '';

// default captcha response
var captcha_resp = '';

//containers
var timeout_list = [];
var the_stim_list = '';
var the_targ_list = '';

//setup modular task instructions
var inst_pg_list = new Array(inst_p1,inst_p2,inst_p3,inst_p4,inst_p5);
var this_inst_pg = 0;
var max_inst_pg = inst_pg_list.length;

//headers for data
var trial_headers = [
    'ss_code',
    'this_block',
    'this_trial',
    'is_practice',
    'is_probe',
    'is_motive',
    'is_captcha',
    'omission',
    'trial_start_time',
    'metronome_at',
    'trial_end_time',
    'resp_at',
    'rt',
    'rt_to_metronome',
    'this_probe',
    'depth_probe_resp',
    'motive_resp',
    'captcha_resp'
];

//data holders
var trial_data = '';

//write headers first
for (var i in trial_headers){
    if({}.hasOwnProperty.call(trial_headers,i)){
        trial_data+=trial_headers[i];
        if (i < trial_headers.length-1){trial_data+=',';}
        else{trial_data+='\n';}}
}


//*****************************************
//----------functions-----------
//*****************************************

//setup the keyboard test
function keyUpTextField(e) {
    if(test_keyboard==true){
        document.getElementById('spacebar').style.backgroundColor = 'white';
    }
}
function keyDownTextField(e) {
    if(test_keyboard==true){
        var keyCode = e.keyCode;
        if(keyCode==32) {
            document.getElementById('spacebar').style.backgroundColor = 'lightblue';
            showPage(next_test_btn);
            document.getElementById('next-test-btn').blur();
        }
    }
}

//generate probe list excluding motive list and captcha list
function generateProbes(num_probes,in_blocks_of){
    var min = 5;
    var max = in_blocks_of-1;
    var probe_list = [];
    for (var i=0;i<num_probes;){
        var thisValue = Math.round(Math.floor(Math.random()*(max-min+1))+min); //min max included
        if (motive_list.includes(thisValue)){
            generateProbes();
        }
        else if (captcha_list.includes(thisValue)){
            generateProbes();
        }
        else {probe_list.push(thisValue);
              min = min + in_blocks_of;
              max = max + in_blocks_of;
              i++;
             }
    }
    return probe_list;
}

//stop all tracked timeouts
function stopTrackedTimeouts(){
    for (var i = 0; i < timeout_list.length; i++){
        clearTimeout(timeout_list[i]);
    }
    timeout_list = [];
}

//stop all timeouts
function stopAllTimeouts(){
    var id = window.setTimeout(null,0);
    while (id--){
        window.clearTimeout(id);
    }
}

//hide all display elements (here, divs and btns)
function hideAllDivs(){
    var divs = document.getElementsByTagName('div');
    var btns = document.getElementsByTagName('button');
    for (var i = 0; i < divs.length; i++){
        hidePage(divs[i]);
    }
    for (var i = 0; i < btns.length;i++){
        hidePage(btns[i]);
    }
    hidePage(lab_header);
}


//reset default slider values
function resetInputValues(){
    ele = document.getElementsByTagName('input');
    for (var i = 0; i < ele.length; i++){
        ele[i].checked = false;
    }
}

//initial get ready message
function getReady(){
    hideAllDivs();
    stim.innerHTML = "<p style='font-size:14pt;'>Get Ready...</p>";
    showPage(stim);
    getting_ready = true;
    timeout_list.push(setTimeout(runTrial,trial_duration));
}

//main trial loop
function runTrial(){
    //get rid of get ready message if just displayed
    if(getting_ready){hidePage(stim);getting_ready=false;}
    //practice over?
    if (is_practice && this_trial == num_practice){endPractice();}
    //experiment over?
    else if (!is_practice && this_trial == num_trials){submitData();}
    //else do trial
    else{doTrial();}
}

//actual trial component
function doTrial(){
    //reset relevant values
    key_pressed = false;
    resp_at = '';
    rt = 'None';
    omission = 1;
    probe_1_resp = '';
    probe_2_resp = '';
    depth_probe_resp = '';
    motive_resp = '';
    captcha_resp = '';

    //clear tracked timeouts, and check for/clear rogue timeouts
    stopTrackedTimeouts();
    stopTrackedTimeouts();

    //check if probe trial
    is_probe = isInArray(this_trial,probe_list);

    // check if motive trial
    is_motive = isInArray(this_trial,motive_list);
    
    //check if attn chk trial
    is_captcha = isInArray(this_trial,captcha_list);

    //get event time
    trial_starttime = new Date().getTime();

    //set timeouts for metronome and next trial
    timeout_list.push(setTimeout(playMetronome,time_to_metronome));
    timeout_list.push(setTimeout(nextTrial,trial_duration));
    console.log("trial "+this_trial+" start");
}

//play metronome sound
function playMetronome(){
    metronome_at = new Date().getTime();
    the_metronome.play();
    console.log('metronome!');
}

//end of trial loop
function nextTrial(){
    //get event time
    trial_endtime = new Date().getTime();
    console.log("trial "+ this_trial+" end");

    if ((probe_avail && is_probe) || (motive_avail && is_motive) || (captcha_avail && is_captcha)){
        //should we draw a probe?
        if (probe_avail && is_probe){doDepthProbe();}
        //should we draw a motive probe?
        if (motive_avail && is_motive){doMotive();}
        if (captcha_avail && is_captcha){doCaptcha();}
    }
    //otherwise, run the next trial
    else{    
        logData();
        this_trial++;

        //only false if probe just presented -->getReady --> fixation -->runTrial
        if(!probe_avail || !motive_avail || !captcha_avail) {
            if(!probe_avail){
                probe_avail = true;
                this_probe++;
                probe_1_resp = '';
                probe_2_resp = '';
                // if there is a motive at the same trial number
                // do not getReady, instead loop to runTrial --> doMotive
                if(!motive_avail) {
                    runTrial();
                } 
                else {
                    getReady();
                }
            }
            if(!motive_avail){
                motive_avail = true;
                motive_resp = '';
                getReady();
            }
            if(!captcha_avail){
                captcha_avail = true;
                captcha_chk_resp = '';
                getReady();
            }
        }
        else{runTrial();}
  }
}

//grab spacebar press
window.onkeydown = function(e){
  var key = e.keyCode ? e.keyCode: e.which;
  if(!key_pressed && key == 32 && (probe_avail)){
    resp_at = new Date().getTime();
    //rt = new Date().getTime() - prestim_time;
    omission = 0;
    key_pressed = true;
    if((is_practice==true)&&(omission==0)){
        practice_rating++;
    }
  }
};

//get time
function checkMinTime(event_running, event_start_time, min_duration){
    while (event_running){
        if (new Date().getTime() - event_start_time >= min_duration){
            event_running = false;
        }
    }
    return event_running;
}

//draw motive probe
function doMotive() {
    resetInputValues();
    hideAllDivs();
    motive_avail = false;
    stopTrackedTimeouts();
    stopTrackedTimeouts();
    showPage(mot_probe);
    showPage(save_mot_resp_btn);
    document.getElementById('save-mot-resp-btn').blur();
}

//draw mw probe
function doProbe(){
    resetInputValues();
    //hide everything
    hideAllDivs();

    //need to turn probe availability off until next trial is updated
    probe_avail = false;

    //clear tracked timeouts, and check for/clear rogue timeouts
    stopTrackedTimeouts();
    stopTrackedTimeouts();

    //show sliders
    showPage(thought_probe_1);
    showPage(thought_probe_2);
    showPage(save_resp_btn);
}

//draw mw depth probe
function doDepthProbe(){
    resetInputValues();
    //hide everything
    hideAllDivs();

    //need to turn probe availability off until next trial is updated
    probe_avail = false;

    //clear tracked timeouts, and check for/clear rogue timeouts
    stopTrackedTimeouts();
    stopTrackedTimeouts();

    //show sliders
    showPage(mw_slider_probe);
    showPage(save_range_resp_btn);
    document.getElementById('save-range-resp-btn').blur();
}

//draw captcha probe
function doCaptcha() {
    resetInputValues();
    hideAllDivs();
    captcha_avail = false;
    stopTrackedTimeouts();
    stopTrackedTimeouts();
    showPage(captcha_ctn);
    showPage(save_captcha_resp_btn);
    document.getElementById('save-captcha-resp-btn').blur();
}

//end motive probe
function endMotive(){
    hideAllDivs();
    motive_resp = document.querySelector('input[name="motive-rad"]:checked').value;
    console.log(motive_resp);
    resetInputValues();
    nextTrial();
}

//end mw probe
function endProbe(){
    hideAllDivs();
    probe_1_resp = document.querySelector('input[name="mw-probe-rad"]:checked').value;
    probe_2_resp = document.querySelector('input[name="guidance-probe-rad"]:checked').value;
    console.log(probe_1_resp);
    console.log(probe_2_resp);
    resetInputValues();
    nextTrial();
}

//end mw depth probe
function endDepthProbe(){
    hideAllDivs();
    depth_probe_resp = document.querySelector('input[id="mwRange"]').value;
    console.log(depth_probe_resp);
    document.getElementById("mwRange").value = "50";
    resetInputValues();
    nextTrial();
}

//end captcha probe
function endCaptcha(){
    hideAllDivs();
    x = document.querySelector('input[name="captcha"]').value;
    captcha_resp = x.toLowerCase();
    console.log(captcha_resp);
    resetInputValues();
    nextTrial();
}

//display practice over and update values
function endPractice(){
    is_practice = false;
    updateBlockCounters();
    inst_next_btn.innerHTML = 'Begin Task';

    showPage(lab_header);
    showPage(show_rating);
    show_rating.innerHTML = '<p>Your score was ' + practice_rating + ' out of ' + num_practice +'.</p>';
    
    showPage(practice_over);
    showPage(mot_probe);
    showPage(begin_task);
    showPage(inst_next_btn);
    showPage(do_not_refresh);

    //should be global
    probe_list = generateProbes(num_probes,probe_steps);
    console.log(probe_list);
}

//reset block counters
function updateBlockCounters(){
    this_trial = 0;
    this_probe = 0;
    this_block++;
}

//log trial data
function logData(){
    //if a response was made
    if(omission==0){
        //resp at should occur after stim_time, otherwise early/negative response
        rt = resp_at-trial_starttime;
        rt_to_metronome = resp_at - metronome_at;
    }
    var output = [
        ss_code,
        this_block,
        this_trial,
        is_practice,
        is_probe,
        is_motive,
        is_captcha,
        omission,
        trial_starttime,
        metronome_at,
        trial_endtime,
        resp_at,
        rt,
        rt_to_metronome,
        this_probe,
        depth_probe_resp,
        motive_resp,
        captcha_resp,
    ];

    for (var i in output){
        if({}.hasOwnProperty.call(output,i)){
            trial_data+=output[i];
            if (i < output.length-1){trial_data+=',';}
            else{trial_data+='\n';}
        }
    }
    console.log('trial '+this_trial+ 'rt '+rt);
}

//submit data via PHP
function submitData(){
    document.getElementById('put-studyid-here').value = studyid;
    document.getElementById('put-sscode-here').value = ss_code;
    document.getElementById('put-data-here').value = trial_data;
    document.getElementById('sendtoPHP').submit();
}

//validate captcha input
function validateForm() {
    var x = document.querySelector('input[name="captcha"]').value;
    if (x == null || x == "") {
        return false;
    }
}


//*****************************************
//----------button event listeners-----------
//*****************************************

//consent to participate
yes_consent_btn.addEventListener('click',function(event){
    hidePage(info_consent_letter);
    hidePage(yes_consent_btn);
    hidePage(no_consent_btn);
    test_sound = true;
    showPage(test_sound_btn);
    showPage(test_sound_screen);
    showPage(do_not_refresh);
    showPage(back_test_btn);

});

//decline to participate
no_consent_btn.addEventListener('click',function(event){
    hidePage(info_consent_letter);
    hidePage(yes_consent_btn);
    hidePage(no_consent_btn);
    showPage(decline_to_participate);
});

//next button for two test pages
next_test_btn.addEventListener('click',function(event){
    if(test_sound==true){
        hidePage(test_sound_btn);
        hidePage(test_sound_screen);
        hidePage(next_test_btn);
        test_sound = false;
        test_keyboard = true;
        showPage(spacebar);
        showPage(test_keyboard_screen);
        document.addEventListener("keydown", keyDownTextField, false);
        document.addEventListener("keyup",keyUpTextField,false);
    }
    else{
        hidePage(spacebar);
        hidePage(test_keyboard_screen);
        hidePage(next_test_btn);
        hidePage(back_test_btn);
        test_keyboard = false;
        showPage(task_inst);
        showPage(inst_next_btn);
        showPage(inst_back_btn);
        task_inst.innerHTML = inst_pg_list[this_inst_pg]; 
    }
});

//back button for two test pages
back_test_btn.addEventListener('click',function(event){
    if(test_sound==true){
        hidePage(test_sound_btn);
        hidePage(test_sound_screen);
        hidePage(next_test_btn);
        hidePage(back_test_btn);
        hidePage(do_not_refresh);
        test_sound = false;
        test_keyboard = true;
        showPage(info_consent_letter);
        showPage(yes_consent_btn);
        showPage(no_consent_btn);    
    }
    else{
        hidePage(spacebar);
        hidePage(test_keyboard_screen);
        test_keyboard = false;
        test_sound = true; 
        showPage(test_sound_btn);
        showPage(test_sound_screen);
    }
});

//next button for modular instruction pages
inst_next_btn.addEventListener('click',function(event){
    if(this_inst_pg<inst_pg_list.length-1){
        this_inst_pg++;
        task_inst.innerHTML = inst_pg_list[this_inst_pg];
        if(this_inst_pg==inst_pg_list.length-1){
            inst_next_btn.innerHTML = 'Begin Practice Trials';
        }
    }
    else{
        practice_rating = 0;
        getReady();
    }
});

//back button for modular instruction pages
inst_back_btn.addEventListener('click',function(event){
    if(this_inst_pg>0){
        this_inst_pg-=1;
        task_inst.innerHTML = inst_pg_list[this_inst_pg];
        if(this_inst_pg!=inst_pg_list.length-1){
            inst_next_btn.innerHTML = 'Next';
        }
    }
    else{
        hidePage(task_inst);
        hidePage(inst_next_btn);
        hidePage(inst_back_btn);
        showPage(spacebar);
        showPage(test_keyboard_screen);
        showPage(back_test_btn);
        test_keyboard = true;
    }
});

//save motive response button
save_mot_resp_btn.addEventListener('click',function(){
    if(document.querySelectorAll('input[type="radio"]:checked').length==1?true:false){
	endMotive();
    }
    else{
        alert("Please select your response to the motivation probe");
        document.getElementById('mot-probe').focus();
    }
});

//save mw probe response button
save_resp_btn.addEventListener('click',function(){
    if(document.querySelectorAll('input[type="radio"]:checked').length==2?true:false){
	endProbe();
    }
    else{
        alert("Please select your responses to the thought probes");
        document.getElementById('mw-probe-rad').focus();
        document.getElementById('guidance-probe-rad').focus(); 
    }
});

//save mw range probe response button
save_range_resp_btn.addEventListener('click',function(){
    endDepthProbe();
});

//save captcha response button
save_captcha_resp_btn.addEventListener('click',function(){
    if(validateForm()==false){
        alert("Please answer all questions");
        document.getElementById('captcha').focus();
    }
    else{
        endCaptcha();
    }
});

//test sound button
test_sound_btn.addEventListener('click',function(){
    the_metronome.play();
    showPage(next_test_btn);
});




//*****************************************
//-----------starting experiment-----------
//*****************************************
var probe_list = [Math.round(num_practice/2)];

sessionStorage.setItem("sscode", ss_code);

//--log some testing stuff
console.log(ss_code);
console.log(probe_list);

//--show starting page and buttons
showPage(info_consent_letter);
showPage(yes_consent_btn);
showPage(no_consent_btn);

