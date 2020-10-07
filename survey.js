//*****************************************
//----------variable declarations-----------
//*****************************************

const studyid = '9999-9999';
const demographics = document.getElementById('demographics');
const demo_age = document.getElementById('demo-age');
const demo_gender = document.getElementById('demo-gender');
const demo_brows = document.getElementById('demo-brows');
const save_demo_btn = document.getElementById('save-demo-btn');
const do_not_refresh = document.getElementById('do-not-refresh');

var user_agent = navigator.userAgent;
            
var demo_data = '';
            
var age,
    gender,
    browser = '';
            
var demo_headers = [
    'ss_code',
    'age',
    'gender',
    'browser',
    'user_agent'
];

//*****************************************
//----------functions-----------
//*****************************************

//show an element
function showPage(doc_ele) {
    doc_ele.style.visibility = 'visible';
    doc_ele.style.display = 'inline';
}
            
//write headers first
for (var i in demo_headers){
    if({}.hasOwnProperty.call(demo_headers,i)){
        demo_data+=demo_headers[i];
        if (i < demo_headers.length-1){demo_data+=',';}
        else{demo_data+='\n';}}
}

//submit data
function submitData(){
    document.getElementById('put-study-id-here').value = studyid;
    document.getElementById('put-ss-code-here').value = ss_code;
    document.getElementById('put-demo-data-here').value = demo_data;
    document.getElementById('demo-form').submit();
}

//validate data
function validateAge() {
    var x = document.querySelector('input[name="age"]').value;
    if (x == null || x == "") {
        return false;
    }
}
function validateGender() {
    if (document.querySelectorAll('input[name="gender"]:checked').length==1?true:false){
        return true;
    }
    else {
        return false;
    }
}
function validateBrowser() {
    if (document.querySelectorAll('input[name="browser"]:checked').length==1?true:false){
        return true;
    }
    else {
        return false;
    }
}

//*****************************************
//----------button event listeners-----------
//*****************************************

save_demo_btn.addEventListener('click',function(event){           
    if(validateAge()==false){
        alert("Please answer all questions");
        demo_age.scrollIntoView();
        document.getElementById('age').focus();
    }
    else if(validateGender()==false){
        alert("Please answer all questions");
        demo_gender.scrollIntoView();
        document.getElementById('demo-gender').focus();
    }
    else if(validateBrowser()==false){
        alert("Please answer all questions");
        demo_brows.scrollIntoView();
        document.getElementById('demo-brows').focus();
    }
    else{
        age = document.querySelector('input[name="age"]').value;
        gender = document.querySelector('input[name="gender"]:checked').value;
        browser = document.querySelector('input[name="browser"]:checked').value;
        var output = [
            age,
            gender,
            browser
        ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                demo_data+=output[i];
                if(i<output.length){demo_data+=',';}
            }
        }
        demo_data+=user_agent;
        submitData();
    }                
});

//*****************************************
//-----------starting experiment-----------
//*****************************************

//log some testing / utility stuff
var ss_code = sessionStorage.getItem("sscode");
console.log("the ss code is " + ss_code);
demo_data+=ss_code + ',';
console.log(user_agent);
var form_submit = 0;
sessionStorage.setItem("form_submit", form_submit);

//show starting page / buttons
showPage(demographics);
showPage(demo_age);
showPage(demo_gender);
showPage(demo_brows);
showPage(save_demo_btn);
showPage(do_not_refresh);