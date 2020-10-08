# mrt-2019
This is a metronome response task program created in summer 2019. It has been edited from its original form to remove study-specific details.

This program was created using HTML, CSS, Javascript, and PHP to meet the following specifications: 
-Exclude and redirect participants using mobile phones
-Exclude and redirect participants using the browsers other than Google Chrome, Mozilla Firefox, Microsoft Edge, or Opera
-Obtain participant consent or redirect
-Test participant equipment to verify that the metronome sound plays and keyboard presses are recorded
-Present detailed task instructions and show probe question examples
-Run participants through a number of practice MRT trials and give feedback
-Run participants through a number of test MRT trials
-Ask participant mind wandering level a number of times, randomly presented and evenly distributed among the trials
-Ask participant motivation level a number of times, presented during predetermined trials
-Present one captcha meant to filter out the use of bots
-Obtain participant demographic information
-Save individual participant data as .txt files and add participant ids to a running participant list
-Return assigned verification code and present debriefing information
-Provide a feedback form and save these responses separately to ensure anonymity if desired

The MRT itself was programmed as follows: 
-Each trial lasted 1300 milliseconds, with an mp3 file of a metronome sound playing halfway through each trial, or every 1300 milliseconds 
-Participants were tasked with pressing the spacebar on their keyboard each time the sound played, aiming to press the key as soon after the sound as possible
-Response time was recorded as well as trial number, omission rate, and start and end times, among other variables of interest
