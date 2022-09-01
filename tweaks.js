// Edgenuity tweaks.
// About: Forked by haigou from (unknown) created originally by Gradyn Wursten (https://gradyn.com/)
//
// This code was made last year, i just realized i put this masterpiece on github.
// feel free to steal it or whatever. 
// i wish i used jquery when i made this shit



(function() {
    // Make the DIV element draggable:
var last_test_review = ""
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
    function ranstr(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    function new_font(name, url) {
        var newStyle = document.createElement('style');
        newStyle.appendChild(document.createTextNode("\
        @font-face {\
            font-family: " + name + ";\
            src: url('" + url + "');\
        }\
        "));

        document.head.appendChild(newStyle);
    }

    function add_style(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    }

    function panelStyle(styles){
        element = document.getElementById("tweaksmenu")
        for (var s in styles) {
            element.style[s] = styles[s];
        }
    }

    // BROKEN
    // iCustomStyle
    // code - string
    // add style to head of course iframe
    function iCustomStyle(code = null) {
        var ns = get_iframe().document.createElement("style")
        ns.appendChild(get_iframe().document.createTextNode(code))
        get_iframe().document.head.appendChild(ns)
    }

    // custom_style
    // code - string
    // add style to head of entire page
    function custom_style(code = null) {
        var ns = document.createElement("style")
        ns.appendChild(document.createTextNode(code))
        document.head.appendChild(ns)
    }

    // add font to webpage
    new_font("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap", "Varela Round")


    custom_style(`
/* Base for label styling */
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
    position: absolute;
    left: -9999px;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
    position: relative;
    padding-left: 36px;
    cursor: pointer;
    margin-bottom: 8px;
    display: inline-block;
    font-size: 16px;
}
/* checkbox aspect */
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
    content: '';
    position: absolute;
    left: 0px; top: 0px;
    width: 20px; height: 20px;
    border: 3px solid #000000;
    background: #686868;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,.1);
}
/* checked mark aspect */
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
    content: '■';
    position: absolute;
    top: 1px; left: 5px;
    font-size: 14px;
    line-height: 1.3;
    color: #00ff24;
    transition: all .2s;
}
/* checked mark aspect changes */
[type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
}
[type="checkbox"]:checked + label:after {
    opacity: 1;
    transform: scale(1);
}
/* disabled checkbox */
[type="checkbox"]:disabled:not(:checked) + label:before,
[type="checkbox"]:disabled:checked + label:before {
    box-shadow: none;
    border-color: #999999;
    background-color: #dddddd;
}
[type="checkbox"]:disabled:checked + label:after {
    color: #999999;
}
[type="checkbox"]:disabled + label {
    color: #aaaaaa;
}
/* accessibility */
[type="checkbox"]:checked:focus + label:before,
[type="checkbox"]:not(:checked):focus + label:before {
    border: 2px dotted #000000;
}
/* hover style just for information */
label:hover:before {
    border: 2px solid #484848!important;
    background: #ffffff
`)
    custom_style(`
html, body{
    font-family: "Varela Round"
}`)

    scrollbar_style = `
/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #4f4f4f #242424;
    scrollbar-border-radius: 9px;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 9px;
  }

  *::-webkit-scrollbar-track {
    background: #242424;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #4f4f4f;
    border-radius: 10px;
    border: 3px none #000000;
  }`



    custom_style(scrollbar_style)




    function enter_fake(elemt){
        var ev = new KeyboardEvent('keydown', {altKey:false,
            bubbles: true,
            cancelBubble: false, 
            cancelable: true,
            charCode: 0,
            code: "Enter",
            composed: true,
            ctrlKey: false,
            currentTarget: null,
            defaultPrevented: true,
            detail: 0,
            eventPhase: 0,
            isComposing: false,
            isTrusted: true,
            key: "Enter",
            keyCode: 13,
            location: 0,
            metaKey: false,
            repeat: false,
            returnValue: false,
            shiftKey: false,
            type: "keydown",
            which: 13
        });
        elemt.dispatchEvent(ev);

    }
    
    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }


    
    
    'use strict';
    window.configElements = []
        //==BEGIN UI BUILDING==
    window.overlay = document.createElement("div")
    window.overlay.style.width = "100vw"
    window.overlay.style.height = "100vh"
    window.overlay.style.zIndex = "1"
    window.overlay.style.position = "fixed"
    window.overlay.style.visibility = "hidden"
    window.overlay.id = "overlay"
    document.body.prepend(window.overlay)

    function createElementStyled(tag, innerHTML, id = null, style = null) {
        new_elem = document.createElement(tag)
        new_elem.innerHTML = innerHTML
        if (id != null) {
            new_elem.id = id
        }
        if (style != null) {
            new_elem.style.cssText = style
        }
        return new_elem
    }

    function BuildMenuEntry(name, info, id, configpane) {
        window.entry = document.createElement("div")
        window.tickbox = document.createElement("input")
        window.tickbox.type = "checkbox"
        window.tickbox.id = id
        window.configElements.push(id)
        window.entry.appendChild(window.tickbox)
        window.window.label = document.createElement("label")
        window.window.label.setAttribute("for", id)



        setStyles(window.window.label, {

            "font-weight": "500"
        })
        setStyles(window.entry, {
            "background-color": "rgb(60, 60, 60)",
            "border-radius": "9px",
            "margin": "1%",
            "padding": "2%"
        })

        //         -webkit-box-shadow: 0px 0px 27px 1px #0060FF; 
        //         box-shadow: 0px 0px 27px 1px #0060FF;
        window.label.innerText = name
        window.entry.appendChild(window.label)
        if (configpane != undefined) {

            // CONFIG BUTTON
            window.configbutton = document.createElement("button")
            setStyles(window.configbutton, {
                "margin-left": "7px",
                "border": "none",
                "box-shadow": "inset 0 0 5px rgba(0, 0, 0, 0.6)",
                "background-color": "rgb(39, 39, 39)",
                "color": "#f9a619",
                "border-radius": "3px",
                "width": "fit-content",
                "height": "fit-content"

            })

            // BUTTON ICON
            img = document.createElement("img")
            img.src = "https://img.icons8.com/fluency-systems-filled/344/ffffff/settings.png"
            img.style.width = "20px"
            img.style.height = "20px"
            window.configbutton.appendChild(img)

            window.configbutton.onclick = function() {
                if (document.getElementById(configpane).style.visibility == "unset") {
                    document.getElementById(configpane).style.visibility = "hidden"
                } else {
                    document.getElementById(configpane).style.visibility = "unset"
                }
            }
            window.entry.appendChild(window.configbutton)
        }

        // OPTION DESCRIPTION?? why not label
        window.desc = document.createElement("p")
        setStyles(window.desc, {
            "padding-left": "2%",
            "font-weight": "400"
        })

        window.desc.innerHTML = info;
        window.entry.appendChild(window.desc)
            // Show a toast when the user interacts with a tickbox
        $(`#${id}`).change(function() {
            if (this.checked == true) {
                log(`${name} enabled`)
            } else {
                log(`${name} disabled`)

            }
        });
        return window.entry
    }

    
    function setStyles(element, styles) {
        for (var s in styles) {
            element.style[s] = styles[s];
        }
    }
    var flag_first = false;

    function RenderPane(name, id) {
        // max-width: 800px;

        window.pane = document.createElement("div")
        window.pane.style.width = "500px"

        if (id != "tweaksmenu") {
            window.pane.style.height = 'fit-content'
        } else {

            window.pane.style.height = "500px"
        }

        setStyles(window.pane, {
            "position": "absolute",
            "border-radius": "8px",
            "background-color": "rgb(39, 39, 39)",
            "color": "white",
            "text-align": "left",
            "overflow-y": "scroll",
            "padding-bottom": "2%",
            "padding-left": "2%",
            "padding-right": "2%",
            'boxShadow': "0px 0px 15px 0px black",
            "font-family": "'Noto Sans', sans-serif"
        })

        // window.pane.style.position = "absolute"
        // window.pane.style.border = "1px solid rgb(95, 95, 95)"
        // window.pane.style.borderRadius = "3px"
        // window.pane.style.backgroundColor = "rgb(39, 39, 39)"
        // window.pane.style.overflow = "hidden"
        // window.pane.style.color = "rgb(249, 166, 25)"
        // window.pane.style.textAlign = "center"
        // window.pane.style.overflowY = "scroll"
        window.pane.id = id

        window.panetitle = document.createElement("h1")
        setStyles(window.panetitle, {
            "margin": "3%"
        })
        window.panetitle.innerText = name
        window.panetitle.style.textAlign = "center"
        window.pane.appendChild(window.panetitle)

        // HR ELEMENT
        // window.pane.appendChild(document.createElement("hr"))

        document.getElementById("overlay").appendChild(window.pane)
        dragElement(document.getElementById(id));
    }
    // Add the button
    window.tweaksbutton = createElementStyled("button", "Tweaks", id="tweaksbutton", style=`
        border: 1px solid #5f5f5f;
        boxShadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
        background-color: rgb(39, 39, 39);
        color: #f9a619;
        border-radius: 3px;
        z-index: 2;
        position: absolute
    `)    

    
    var name_thing = document.querySelector("body > div.mainhead > ul > li:nth-child(4)")

    html = name_thing.innerHTML
    clone = document.createElement("li")
    clone.innerHTML = html
    clone.id = "tweaksbutton"
    parent = name_thing.parentNode

    removeAllChildNodes(clone)
    parent.appendChild(clone)

    tb = document.getElementById("tweaksbutton")
    text = document.createElement("a")
    text.classList.add("nav")
    text.classList.add("dave")
    text.innerHTML = "Tweaks"
    tb.appendChild(text)

    
    // Build main menu
    RenderPane("Tweaks", "tweaksmenu")


    function add_tweak(element) {

        document.getElementById("tweaksmenu").appendChild(element)

    }
    // Menu Entrys

    // OPTIONS
    function new_option(name, description, id, config = null, window_name = null) {

        use_id = "tweaksmenu"
        if (window_name != null) {
            use_id = window_name
        }
        if (config != null) {
            document.getElementById(use_id).appendChild(BuildMenuEntry(name, description, id, config))
        } else {
            document.getElementById(use_id).appendChild(BuildMenuEntry(name, description, id))
        }


    }




    // Cleaned up code with functions
    // new_option("AnswerDB Contribute", "Contribute quiz and test answers to a database. <span style='color: grey; font-size: 12px;'> *You will remain anonymous if you choose to contribute answers. </span>", "AnswerDBCheck", "t_Options")
    new_option("Guess Assignments", "Gamble on your education.", "GuessPractice.tickbox", "practiceconfig")
    new_option("Auto Advance", "Advance to the next portion of the course automatically when it becomes available", "AutoAdvance.tickbox")
    new_option("Auto Complete Vocab", "Automatically completes vocab assignments", "AutoCompleteVocabTickbox")
    new_option("Auto Complete Online Content", "Automatically completes journal activities that make you write stuff", "AutoCompleteOC")
    
    new_option("Skip intro", "Lets you interact with practices while the intro audio is playing", "SkipIntro.tickbox")
    // new_option("Show Columns", "On practices where you have to write a text response to a prompt, there is an example response to the prompt. However, it is hidden until you submit your response. This forces it to show even if you haven't submitted a response yet", "ShowColumn.tickbox")
    new_option("Bypass Disabled Submit", "Automatically enable the submit button when it is deactivated", "AutoSubmitEnable")
    new_option("Restyling", "Restyle main activity theme *may be glitchy on some courses", "RestyleEnable")
    new_option("Hide Video", "Gets rid of the ugly ass teachers in the videos", "HideVideos")
    new_option("Auto Submit Labs", "Skips lab assignments", "SkipLabs")
    
    
        /* document.getElementById("tweaksmenu").appendChild(BuildMenuEntry("Skip Videos", "Skips videos. <span style='color: red'>THIS IS HIGHLY EXPERIMENTAL AND WILL BREAK THINGS</span>", "SkipVideosTickbox")) */

    // Config Menus
    RenderPane("Assignment Guesser Options", "practiceconfig")
    vis("practiceconfig", false)

    RenderPane("Options", "t_Options")
    vis("t_Options", false)

    // poor design, the user enables this when they click the first check mark
    // addTo("practiceconfig", BuildMenuEntry("Guess thru Assignments", "Guesses thru assignments.<br> <span style='color: red; font-weight: 600'> This is highly discouraged </span>", "guessassignments"))
    // instead, offer more customizability 


    //  EXAMPLE USAGE OF addTo()
    // addTo("practiceconfig", createElementStyled(
    //     tag = "h1",
    //     innerHTML = "Guesser Parameters",
    //     style = `text-align:center;color: white;font-weight: 600`
    // ))

    addTo("practiceconfig", BuildMenuEntry("Allow on practice", "Guesses answers on practice assignments. Teachers won't check these usually.", "allow_practice_guess"))
    addTo("practiceconfig", BuildMenuEntry("Allow on quiz", "Allow guessing on quiz <span style='color: red;font-weight: 600'> * Dangerous to your grades </span>", "allow_quiz_guess"))
    addTo("practiceconfig", BuildMenuEntry("Allow on quiz review", "Allow guessing on quiz reviews <span style='color: red;font-weight: 600'> * you should really study instead lmao </span>", "allow_quiz_review_guess"))


    // Activate the button
    document.getElementById("tweaksbutton").addEventListener("click", function() {
        if (document.getElementById("overlay").style.visibility == "hidden") {
            document.getElementById("overlay").style.visibility = "visible"
        } else {
            document.getElementById("overlay").style.visibility = "hidden"
        }
    })

function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}
    //==BEGIN TWEAKS==

    // Auto Fill Practice
    function AFP() {
        questions = iGetClassName("question-container")[0].childNodes
        for (i = 0; i < questions.length; i++) {
            q = questions[i]
            console.log(q)
            if (q.getElementsByTagName("textarea").length > 0) {
                tarea = q.getElementsByTagName("textarea")[0]
                tarea.value = q.getElementsByTagName("span")[0].innerHTML
            }
        }

    }

    // check if checkbox is true/false
    function check_cfg(id){
        return document.getElementById(id).checked
    }

    // add element to another element
    function addTo(id, element) {
        document.getElementById(id).appendChild(element)
    }

    a_flag = false
    function VideoHide(){
        if (idoc().getElementsByTagName("video").length > 0){
            setStyles(document.getElementsByTagName("iframe")[0], {
                "overflow": "none"
            })
            if (a_flag == false){
                h1 = idoc().createElement("h1")
                h1.innerText = "Video hidden"
                h1.id = "VID_BLOCK_TEXT"
                h1.style.margin = "2%"
                h1.style.display = "none"
                idoc().getElementsByTagName("video")[0].parentNode.appendChild(h1)
                a_flag = true
            }
            try{
                
                if (check_cfg("HideVideos")){
                    idoc().getElementById("VID_BLOCK_TEXT").style.display = "block"
                    idoc().getElementsByTagName("video")[0].style.display = "none"
                    
                }else{
                    // set display of video to block and h1 to none
                    idoc().getElementById("VID_BLOCK_TEXT").style.display = "none"
                    idoc().getElementsByTagName("video")[0].style.display = "block"
                }
            }catch(e){
                try{
                    h1 = idoc().createElement("h1")
                    h1.innerText = "Video hidden"
                    h1.id = "VID_BLOCK_TEXT"
                    h1.style.margin = "2%"
                    h1.style.display = "none"
                    idoc().getElementsByTagName("video")[0].parentNode.appendChild(h1)

                }catch(e){
                    
                }
            }
            
        }
    }
    
    // Auto Advance
    function autoadvance() {
        if (document.getElementById("AutoAdvance.tickbox").checked) {
            if (document.getElementById("activity-title").innerText == "Quiz") {} else {
                try {
                    document.getElementsByClassName("footnav goRight")[0].click()
                } catch (TypeError) {}
                try {
                    window.frames[0].API.FrameChain.nextFrame()
                } catch (TypeError) {}
            }
        }
    }

    function disableConfig(name){
        
    }
    
    // memorize test review
    function save_test_review(){
        if (check_activity("Unit Test")){
            
        }
    }
    
    // skip labs 
    function skip_labs(){
        if (check_activity("Explore Activity")){
            try{
                // submit button
                idoc().getElementsByClassName("uibtn uibtn-blue uibtn-alt uibtn-med")[0].click()
            }catch(FuckPiss){
                
            }
        }
    }
    
    // Skip intro
    function skipIntro() {
        if (document.getElementById("SkipIntro.tickbox").checked) {
            try {
                window.frames[0].document.getElementById("invis-o-div").remove()
            } catch (TypeError) {}
        }
    }

    // force submit buttons enabled
    function autosenabler() {
        if (document.getElementById("AutoSubmitEnable").checked) {
            try {
                get_iframe().document.getElementById("SubmitQuestionsButton").removeAttribute("disabled")
                get_iframe().document.getElementById("SubmitQuestionsButton").classList.remove("disabled");
            } catch (TypeError) {

            }
        }
    }
    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return ((style.display === 'none') || (style.visibility === 'hidden'))
    }
    function iGetVisible(tagname){
        o = []
        t = get_iframe().document.getElementsByTagName(tagname)
        for (var x in t){
            if (isHidden(x) == false){
                o.push(x)
            }
        }
        l// check if context of element is still valid using the checkValid() function
        if (checkValid(t)){
            
        }
        return o
    }

    function get_cfg(cfgKey){
        return document.getElementById(cfgKey).checked
    }
    
    function idoc(){
        return get_iframe().document
    }



    submit_stage = 0
    completed = 0
    // Guess Practice
    function GuessPractice()
    {
        if (document.getElementById("GuessPractice.tickbox").checked)
        {
            try
            { // document.getElementById("activity-title") may error
                if (document.getElementById("activity-title").innerText == "Assignment")
                {
                    if (!document.getElementById("guessassignments").checked)
                    {
                        return // End the method call so we dont guess
                    }
                }
                ca = document.getElementById("activity-title").innerText;
                if (["Instruction", "Assignment", "Warm-Up", "Practice", "Unit Test Review"].includes(document.getElementById("activity-title").innerText))
                {
                    try
                    {
                        if (ca == "Practice" && get_cfg("allow_practice_guess") || get_cfg("allow_quiz_review_guess") ){
                            //  get input type
                            // get current question
                            
                            var curq = null
                            // question class: Assessment_Main_Body_Content_Question
                            var nlist = idoc().querySelectorAll(".Assessment_Main_Body_Content_Question")
                            for (i = 0; i < nlist.length; i++){
                                if (nlist[i].style.display == "block"){
                                    curq = nlist[i]
                                    break
                                }
                            }
                            m_choice = false
                            if (curq.getElementsByClassName("answer-choice-button").length > 3){
                                m_choice = true
                            }

                            if (m_choice){
                                
                                console.log("Multiple choice detected on question")
                                options = get_iframe().document.getElementsByClassName("answer-choice-button");

                                setTimeout(function(){
                                    options[Math.floor(Math.random() * window.options.length)].click();
                                    options[Math.floor(Math.random() * window.options.length)].click();
                                    options[Math.floor(Math.random() * window.options.length)].click();
                                    options[Math.floor(Math.random() * window.options.length)].click();
                                    idoc().getElementById("nextQuestion").click()
                                }, 500)
                                completed++
                                
                            }else{
                                if (curq.getElementsByTagName("textarea").length > 0){
                                    console.log("Text area detected on question")
                                    bodies = curq.getElementsByClassName("Practice_Question_Body")
                                    out = ""
                                    for (i = 0; i < bodies.length; i++){
                                        out += bodies[i].innerText
                                    }
                                    setTimeout(function(){
                                        curq.getElementsByTagName("textarea")[0].value = out
                                        curq.getElementsByTagName("textarea")[0].value = out
                                        curq.getElementsByTagName("textarea")[0].value = out
                                        curq.getElementsByTagName("textarea")[0].value = out
                                        idoc().getElementById("nextQuestion").click()
                                    }, 500)
                                    completed++
                                }
                            }
                            console.log("COMPLETED -> " +completed)
                            if (completed > idoc().getElementsByClassName("question-container")[0].children.length){
                                // all things good
                                // submit
                                completed = 0
                                if (submit_stage == 0){    
                                    idoc().getElementById("submit").click()
                                    submit_stage = 1
                                }
                                if (submit_stage == 1){
                                    btns = idoc().getElementsByClassName("uibtn uibtn-blue uibtn-med submit")
                                    for (i = 0; i < btns.length; i++){
                                        if (btns[i].innerText == "OK"){
                                            btns[i].click()
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (TypeError)
                    {
                        console.log("[ASSIGNMENT GUESSER] Critical error occured when choosing an answer choice: " + TypeError)
                    }
                    try
                    {
                        get_iframe().API.Frame.check()
                    }
                    catch (TypeError)
                    {

                        
                    } // This has to be seporate from the option clicker in case it's a text only practice
                }
            }
            catch (TypeError)
            {}
        }
    }


    function vis(id, state, iframe = false) {
        if (iframe) {
            if (state == true) {
                get_iframe().document.getElementById(id).style.visibility = "visible"

            } else {
                get_iframe().document.getElementById(id).style.visibility = "hidden"

            }
        } else {
            if (state == true) {
                document.getElementById(id).style.visibility = "visible"

            } else {
                document.getElementById(id).style.visibility = "hidden"

            }
        }
    }


    // Skip videos (PATCHED)
    /* function skipVideo() {
        if (document.getElementById("SkipVideosTickbox").checked) {
            if (document.getElementById("activity-title").innerText != "Assignment") { // Appearantly this causes problems with assignments, disable it for now
                if (frames[0].document.getElementById("home_video_container").parentNode.style.opacity == 1) {
                    try {window.frames[0].API.FrameChain.framesStatus[window.frames[0].API.FrameChain.currentFrame - 1] = "complete"} catch(TypeError) {}
                }
            }
        }
    } */


    // Auto complete vocab
    function vocabCompleter() {
        if (document.getElementById("AutoCompleteVocabTickbox").checked) {
            if (document.getElementById("activity-title").innerText == "Vocabulary") {
                try {



                    //  this method will type the answers, but i think you can just change the CSS of the audio button, play and skip it.
                    ans = iGetClassName("word-background")[0].value.toString()
                    iGetClassName("word-textbox")[0].value = ans
                    text_box = idoc().getElementsByClassName("word-textbox word-normal")[0]
                    window.dispatchEvent(new KeyboardEvent('keydown', {
                      'key': 'enter'
                    }));
                    // unhide buttons
                    for (var x of iGetClassName("playbutton vocab-off")) {
                        x.classList.remove("vocab-off")
                        x.classList.add("vocab-play")
                    }

                    //  click buttons
                    for (var x of iGetClassName("playbutton vocab-play")) {
                        x.click()
                    }

                    // ans = iGetClassName("word-background")[0].value.toString()
                    // console.log(ans +" is the current vocab word")
                    // iGetClassName("word-textbox")[0].value = iGetClassName("word-background")[0].value
                    // iGetClassName("word-textbox")[0].click()
                    // try {
                    //     for (var x of iGetClassName("playbutton vocab-play")) {
                    //         x.click()
                    //     }
                    // } catch (TypeError) { }
                    // Setter open
                    // window.frames[0].document.getElementsByClassName("word-textbox")[0].value;
                } catch (err) {
                    console.log(err)
                    
                }
                try {
                    iGetClassName("uibtn uibtn-blue uibtn-arrow-next")[0].click()
                } catch (TypeError) {}
            }
        }
    }




    // // OLD TEMP CODE

    // // Auto complete vocab
    // function vocabCompleter() {
    //     if (document.getElementById("AutoCompleteVocabTickbox").checked) {
    //         if (document.getElementById("activity-title").innerText == "Vocabulary") {
    //             try {
    //                 window.frames[0].document.getElementsByClassName("word-textbox")[0].value = iGetClassName("word-background")[0].value 
    //             } catch (TypeError) { }
    //             try {
    //                 for (var x of iGetClassName("playbutton vocab-play")) {
    //                     x.click()
    //                 }
    //             } catch (TypeError) { }
    //             try { 
    //                 iGetClassName("uibtn uibtn-blue uibtn-arrow-next")[0].click() } catch (TypeError) { }
    //         }
    //     }
    // }



    // set styles from dictionary by xpath
    function styleX(path, styles) {
        elem = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        for (var s in styles) {
            elem.style[s] = styles[s];
        }
    }

    // get element by ID from within course iFrame
    function iGetID(id) {
        iframe = get_iframe()
        return iframe.contentWindow.document.getElementById(id)

    }


    function getX(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function iGetTags(tag) {
        var iframe = document.getElementById("stageFrame");
        var elmnt = iframe.contentWindow.document.getElementsByTagName(tag);
        return elmnt

    }

    function iGetClassName(name) {
        var iframe = document.getElementById("stageFrame");
        var elmnt = iframe.contentWindow.document.getElementsByClassName(name);
        return elmnt
    }

    function styleChanger() {
        // RESTYLE UPDATE:
        //   use rgb(25, 25, 25) for background whitespace
        //   use rgb(44, 44, 44) for top navbar
        //   9px border radius on buttons and player
        //   Varela Round font on body
        // ELEMENTS TO UPDATE
        //   background_1: /html/body/div[4]/div
        //   background_2: /html/body
        //   buttons: class="toolbar"
        //   player: /html/body/div[4]/div/div[2]/iframe

        // replace the scrollbar style in iframe
        // iCustomStyle(scrollbar_style)

        // setStyles(get_iframe(),{
        //     "overflow-x": "none"
        // })
        if (document.getElementById("RestyleEnable").checked == false){
            return
        }
        player = getX("/html/body/div[4]/div/div[2]/iframe")
            // I frame stuff
        styleX("/html/body/div[4]/div", {
            "background-color": "rgb(25, 25, 25)"
        })

        styleX("/html/body", {
            "background-color": "rgb(25, 25, 25)"
        })

        buttons_list = getX('/html/body/div[4]/div/div[2]/ul').childNodes
        for (let x of buttons_list) {
            // x 
            // 
            // 
            // 
            // 
            // 

        }
        toolbar_ = document.getElementsByClassName("toolbar").childNodes
        for (var e in toolbar_) {
            setStyles(e, {
                "border-radius": "9px",
                "margin-bottom": "3%"
            })
        }

        styleX("/html/body/div[4]/div/div[2]/iframe", {
            "border-radius": "9px",
        })

        setStyles(get_ctx_iframe(), {
            "max-height": "fit-content"  
        })

        setStyles(getX("/html/body/div[3]"), {
            "overflow": "none"
        })


        // Causes visibility issues on certain courses
        // //  IFRAME DARKMODE

        var elements = iGetTags("h5")
        for (let e of elements){
            setStyles(e, {
                "color": "white"
            })
        }
        var elements = iGetTags("span")
        for (let e of elements){
            setStyles(e, {
                "color": "white"
            })
        }

        bg1 = iGetTags("body")[0]
        setStyles(bg1, {
            "background-color": "rgb(40, 40, 40)"
        })

        divs = iGetTags("div")
        for (let d of divs){
            setStyles(d, {

                "background-color": "rgb(40, 40, 40)",
                "color": "white"
            })
        }       

    }
    function httpGet(theUrl) {
        // "https://r15.core.learn.edgenuity.com/ContentViewers/Emissary/OpenEmissaryLink?a=https%3A%2F%2Fmedia.edgenuity.com%2Fcontentengine%2Fcommon%2Fpassages%2F2028%2F2028-09-01%2F2028_09010115_GovernmentsBusiness_OC.html&t=111000110000&s=36d95416-eab4-ec11-8135-005056b5595c"
        // example url.
        // server address: r15.core.learn.edgenuity.com
        // path: address.split / [1]

        theUrl = "api.scrapingant.com/v1/general?url=" + encodeURIComponent(theUrl)

        var xhr = new XMLHttpRequest();
        xhr.open("GET", theUrl);
        
        xhr.setRequestHeader("x-api-key", "d0a6484ee50644fc8bee343fb0e94ded");
        
        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
              console.log(xhr.status);
              console.log(xhr.responseText);
           }};
        
        xhr.send();
        
    }

    var previous_answer = ""
    // check_activity("Journal Activity") for journal
    // AutoCompleteOC
    function ac_onlinecontent(){
        if (document.getElementById("AutoCompleteOC").checked == false){
            return;
        }
        if (check_activity("Online Content")){
           if (previous_answer == ""){
               links = idoc().getElementsByClassName("weblink")
               content_links = []
               if (links.length > 0){
                    for (i = 0; i < links.length; i++){
                        content_links.push(links[i].href)
                    }
                    
               }
               console.log(content_links)
               for (var link in content_links){
                   previous_answer += httpGet(link)
                   console.log(previous_answer)
               }
               window.frames[1].document.getElementsByTagName("p")[0].innerText = previous_answer
           } 
           console.log(window.frames[1].document.getElementsByTagName("p")[0])
            
        }
    }
    
    function get_iframe() {
        return window.frames[0]
    }

    function get_ctx_iframe(){
        return document.getElementsByTagName("iframe")[0]
    }


    function check_activity(activity){
        return [activity].includes(document.getElementById("activity-title").innerText)
    }
    
    //==BEGIN CONFIG==
    function loaditem(item, id) {
        if (localStorage.getItem(item) != null) {
            if (localStorage.getItem(item) == "true") { //Because LocalStorage only stores strings
                document.getElementById(id).checked = true
            } else {
                document.getElementById(id).checked = false
            }
        }
    }
    // Load config
    for (var x of configElements) {
        loaditem(x, x)
    }
    // Sync Config
    function syncConfig() {
        for (var x of configElements) {
            localStorage.setItem(x, document.getElementById(x).checked.toString())
        }
    }

    // Master loop on faster intervals for simpler functions
    function fast_loop(){
        autoadvance()
        VideoHide()
        skip_labs()
        syncConfig()
        autosenabler()
        
    }
    
    // Master loop
    function loop() {
        vocabCompleter()
        styleChanger()
        skipIntro()
        GuessPractice()
        ac_onlinecontent()
        // Auto fill practice
        // AFP()
        // skipVideo()
    }
    new_font("Noto Sans", "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap")
        panelStyle({
        "user-select": 'none'
    })
    window.masterloop = setInterval(loop, 1000);
    window.masterloop2 = setInterval(fast_loop, 250);
})();


$(document).ready(function() {
    elem = `<div id="snackbar"></div>`
        // insert ./snackbar.css into the head as an inline style
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
  
    /* The snackbar - position it at the bottom and in the middle of the screen */
    #snackbar {
       
        font-family: 'Varela Round', sans-serif;
        visibility: hidden; /* Hidden by default. Visible on click */
        min-width: 250px; /* Set a default minimum width */
        background-color: #333; /* Black background color */
        color: #fff; /* White text color */
        text-align: center; /* Centered text */
        border-radius: 2px; /* Rounded borders */
        padding: 16px; /* Padding */
        position: fixed; /* Sit on top of the screen */
        z-index: 9000; /* Add a z-index if needed */
        bottom: 30px; /* 30px from the bottom */
        left: 50%;
        transform: translateX(-50%);
  
      }
      

      #snackbar span{
        /* align with image */
        display: inline-block;
        vertical-align: middle;
        
      }

      /* Show the snackbar when clicking on a button (class added with JavaScript) */
      #snackbar.show {
        visibility: visible; /* Show the snackbar */
        /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
        However, delay the fade out process for 2.5 seconds */
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }
     
      /* Animations to fade the snackbar in and out */
      @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }
     
      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }
     
      @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }
     
      @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }`
        // add to head
        //  load fix.css and inject into website

    head.appendChild(style);
    // add snackbar to body
    document.body.insertAdjacentHTML('beforeend', elem);


    log("Tweaks script started");
})



function log(data) {
    document.getElementById("snackbar").innerHTML = data;
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
}
// answer search API
// text, true_false, or multiple_choice 
