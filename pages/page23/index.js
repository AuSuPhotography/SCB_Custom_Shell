PageContent('\
<div class="cyu-with-context" id="assessment">\
  <div id="contentWrapper" class="mcqContentWrapper">\
    <section class="hero-section height-xs-auto cyu_with_context">\
      <div class="containerclass">\
        <!-- Start Screen -->\
        <div class="startscreen" id="start_screen">\
          <div class="start-container">\
            <div class="right_panel bg-darkblue">\
              <div class="screen_containt">\
                <div class="screen_inner_containt">\
                  <p class="subhead"></p>\
                  <div class="header-container"><h2 class="heading"></h2></div>\
                  <div class="teraf-body-container"></div>\
                  <div class="button-container">\
                    <button type="button" id="start-test" class="start another start-test-btn" id="submitLanguage">\
                      <span class="startButton_icon">&nbsp;›</span>\
                    </button>\
                  </div>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <!-- Start Screen End -->\
        <!-- MCQ -->\
        <div class="cyu-container" style="display: none !important" id="mainMCQ">\
          <div class="cyuScroll">\
            <div class="cyu-title">\
              <div class="ques-count">\
                <b>\
                  <span>Question</span>\
                  <span class="curr-ques"></span>\
                </b>\
              </div>\
              <h1 id="qText"></h1>\
              <p id="instruction_text"></p>\
            </div>\
            <div id="cyu_block" class="cyuBlock_class"></div>\
          </div>\
        </div>\
        <!-- MCQ ENDS -->\
        <!-- score screen starts -->\
        <div class="score-screen score-screen-pass" style="display: none">\
          <div class="body-container">\
            <div class="text-container">\
              <div class="heading"><h4></h4></div>\
              <div class="paragraph"></div>\
            </div>\
            <div class="result-backgorund">\
              <div class="rectangles">\
                <div class="right_rectangle">\
                  <div class="card">\
                    <div class="percent">\
                      <svg>\
                        <circle cx="70" cy="70" r="70"></circle>\
                        <circle cx="70" cy="70" r="70"></circle>\
                      </svg>\
                      <div class="number">\
                        <span class="inCircle">\
                          <p id="percentage"></p>\
                          <p id="totalQuestion">5/10</p>\
                        </span>\
                      </div>\
                    </div>\
                  </div>\
                </div>\
              </div>\
              <div class="bottom-container">\
                <div class="bottom-text-first bottomtxt"></div>\
                <span class="seaparator"></span><span class="icon"></span>\
                <span class="icon"><img src="./click-and-collect.png" alt=""/></span>\
                <div class="bottom-text-second bottomtxt"></div>\
                <button class="retake-assesment" id="certificate">Retake Assessment</button>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class="score-screen score-screen-fail" style="display: none">\
          <div class="body-container">\
            <div class="text-container">\
              <div class="heading"><h4></h4></div>\
              <div class="paragraph"></div>\
            </div>\
            <div class="result-backgorund">\
              <div class="rectangles">\
                <!-- <div class="left-rectagle">\
								<div class="topic">\
								<span class="topic-text">Topic1</span\
								><span class="bar-container">\
									<div class="progress">\
									<div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15"aria-valuemin="0" aria-valuemax="100">50%</div>\
									</div> </span><span class="fraction">2/4</span>\
								</div>\
							</div> -->\
                <div class="right_rectangle">\
                  <div class="card">\
                    <div class="percent">\
                      <svg>\
                        <circle cx="70" cy="70" r="70"></circle>\
                        <circle cx="70" cy="70" r="70"></circle>\
                      </svg>\
                      <div class="number">\
                        <span class="inCircle">\
                          <p id="percentage"></p>\
                          <p id="totalQuestion">5/10</p>\
                        </span>\
                      </div>\
                    </div>\
                  </div>\
                </div>\
              </div>\
              <div class="bottom-container">\
                <div class="bottom-text-first bottomtxt"></div>\
                <span class="seaparator"></span><span class="icon"></span>\
                <span class="icon"><img src="./images/click-and-collect.png" alt=""/></span>\
                <div class="bottom-text-second bottomtxt"></div>\
                <button class="retake-assesment" id="retry">Retake Assessment</button>\
              </div>\
            </div>\
          </div>\
        </div>\
        <!-- score screen ends -->\
         <!--Certificate Screen Start--->\
         <div class="score-screen-certificate" id="certificate-screen" style="display: none">\
         <div id="container" class="container">\
           <div class="inner-container">\
             <img class="logo" src="" alt="" />\
             <h1 class="heading"></h1>\
             <h2 class="pera"></h2>\
             <p class="pera"></p>\
             <h2 class="name">Nabirajan, Yuvraj</h2>\
             <h1 class="roll-no">153489</h1>\
             <p class="pera"></p>\
             <h2 class="pera"></h2>\
             <p>on <b>Date</b> <span class="current_date"></span></p>\
             <button class="view-certificate" id="printBtn">\
               <b>View Certificate</b>\
             </button>\
           </div>\
         </div>\
       </div>\
       <!--Certificate Screen Start--->\
      </div>\
    </section>\
  </div>\
</div>')
