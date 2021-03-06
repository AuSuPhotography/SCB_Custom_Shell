define([], function () {

	function MMcqTemplate() {
		this.xml = null;
		this.totalOptions = 4;
		this.correctOption;
		this.selectedOption = 0;
		this.container = null;
		this.attempts = 0;
		this.totalAttempts;
		this.xmlName;
		this.XMLAnswer=[];
		this.selectedOptionArray=[];
		this.partialAnswer = [];
	}

	MMcqTemplate.prototype = new Util();
	MMcqTemplate.prototype.constructor = MMcqTemplate;
	MMcqTemplate.prototype.init = function (xmlName) {
		//alert("init working")
		var ref = this;
		this.xmlName = xmlName; 
		ref.container = this.getPageContainer();

		if(isLocalfileOrServer==true){
			setTimeout(function() {
				landingPageContent=function(data){
					
					var parser = new DOMParser(); 
					xml = parser.parseFromString(data, 'text/xml')
					ref.xml = xml;
					ref.correctOption = parseInt($(ref.xml).find('options').attr('answer'));
					ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
					//alert(ref.attempts)
					//alert("type of " + typeof ref.correctOption + " ---- " + ref.correctOption)
					//alert(ref.xml)
					ref.createOptions();
					ref.createFeedbacks();
					ref.populateAnswer();
				}
				var topicscript = document.createElement('script');
				topicscript.src = "data/" + xmlName + "/" + xmlName + ".js",
				document.getElementsByTagName('head')[0].appendChild(topicscript)
				}, 10);
			
			}
		else{
			setTimeout(function() {
				ref.LoadXml(xmlName);
			}, 300);
		}
		
		$(ref.container).find(".close-btn").click(function(){
			
			if($(ref.container).find(".popup-bg .feedback-body").find(".feedback-option .continueBtn").hasClass("inCorrect")){
                ref.creatRetry()
			}
			else{
				$(ref.container).find(".popup-bg").hide();
				$("#shellHeader").show()
			}			
			
		});
		
		
		//ref.LoadXml(xmlName);
		
		//alert(this.container)
		
		$(".btnNext").css("pointer-events","none");
		$(".btnNext").css("opacity","0.5");		
		//this.pageLoaded();
	}
	
	/// Function To Load XML file and get data into XML
	MMcqTemplate.prototype.LoadXml = function (xmlNameRef) {
		
			//alert("pfa")
			var ref= this;
			$.ajax({
			type: "GET",
			url: "data/" + xmlNameRef + "/" + xmlNameRef + ".xml",
			dataType: "xml",
			success: function(xml) {
			//alert(xml)
				ref.xml = xml;
				ref.correctOption = parseInt($(ref.xml).find('options').attr('answer'));
				ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
				//alert(ref.attempts)
				//alert("type of " + typeof ref.correctOption + " ---- " + ref.correctOption)
				//alert(ref.xml)
				ref.createOptions();
				ref.createFeedbacks();
				ref.populateAnswer();
				if($(ref.xml).find('transcript').length > 0){
					var transcriptText = $(ref.xml).find('transcript').text();
						$('#contentTab_2').html(transcriptText)
					}
					
					if($(ref.xml).find('resources').length > 0){
						var resourcesText = $(ref.xml).find('resources').text();
						$('#contentTab_1').html(resourcesText)
					}
			
				
			}
			
			});
	
	}
	
	// Function create feedback 
	MMcqTemplate.prototype.createFeedbacks = function () {
		
		var ref = this;
	var feedbackLength = $(ref.xml).find('feedbacks').find('feedback').length;
	//alert("feedback length is " + feedbackLength)
	var str = '';
	
	for(var i=0; i<feedbackLength; i++){

		str+='<div id="'+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type')+'" style="display:none">'		
		str+='<div class="rightDiv">';
		str+='<h2>'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('headerText') + '</h2>';
		str+='<div class="leftDiv">';
	    str+='<img src='+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('icon')+ '>';
    	str+='</div>';
		str+='<p>'+ $(ref.xml).find('feedbacks').find('feedback').eq(i).text() +'</p>';
		
			str+='<div class="continueBtn '+$(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type')+'" >' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('btnText') +'</div>';
		
		
	    str+='</div>';
	    str+='</div>';

		
	}
	
	$(ref.container).find(".popup-bg").find('.feedback-body').html(str);
 
	}
	
	// collect option answer and add into a variable
	MMcqTemplate.prototype.populateAnswer = function() {
		var ref = this;
		var optionLength = $(ref.xml).find('options').find('option');
		for(var i=0;i<optionLength.length;i++){
			
			if($(ref.xml).find('options').find('option').eq(i).attr("answer")){
							ref.XMLAnswer.push(i);
							console.log(ref.XMLAnswer);
						}
				 
		}
	}
	
		// create option and bind into html
	MMcqTemplate.prototype.createOptions = function () {
		
				var ref = this;
				var optionLength = $(ref.xml).find('options').find('option').length;
				var questionText = $(ref.xml).find('questionText').text();

				var backgroundImage = $(ref.xml).find('backgroundImage').text();
				$(ref.container).find("#mmcq2 .wrapper-container-mmcq").css('background-image', 'url(' + backgroundImage + ')');

				var questionNo = $(ref.xml).find('questionNo').text();
				var instructionText = $(ref.xml).find('instructionText').text();
				
				$('#page8 .mmcq_attempt_one').find('#qText').html(questionText);
				$('#page8 .mmcq_attempt_one').find('#instruction_text').html(instructionText);
				$('#page8 .mmcq_attempt_one').find('.sectionHeader').html(questionNo);
				var str = '';
				str += '<ul class="cyu-options list-unstyled  cyu-options">';
				
				for(var i=0; i<optionLength; i++){
					str += '<li id="opt_' + (i+1) +'" class="_item p-3 cyu-option" data-index="' + (i) +'">'
					str +=	'<div class="row">';
					//str += '<div class="circle_contianer">';
					str += '<label class="lab_container">'+ $(ref.xml).find('options').find('option').eq(i).text();
					str += '<input type="checkbox" id="chkBox">'
					str += '<span class="checkmark"></span>'
					str += '</label>'
					//str += '<div class="option_contianer">' + $(ref.xml).find('options').find('option').eq(i).text(); + '</div>';
					str += '</div>';
					str += '</li>';
					//ref.selectedOptionArray[i] = -1;
				}
				str += '<div class="clearfix"></div>';
				str +=	'<li class="mt-3 text-left">';
				str += '<div class="btn btn-info cyu-submit-btn2 disabled">Submit</div>';
				str += '</li>';
				str += '</ul>';
				
				$(ref.container).find('#mmcq_cyu_block').html(str);
			ref.addFunctionality();
	
	
	}

	// Function to when the attempt more then one
	 MMcqTemplate.prototype.creatRetry=function(){
		
		var ref=this;
		$(ref.container).find(".popup-bg").hide()
		$("#shellHeader").show()
		$(ref.container).find(".cyu-submit-btn2").addClass("disabled");		
		ref.selectedOptionArray=[];
		$(ref.container).find(".cyu-options .cyu-option").find('#chkBox').prop('checked', false);

		$('.cyu-option').each(function(k,v){
		
		$(this).removeClass('cyuDisabled');
		});
		$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect, #partialCorrect").hide()		
	}
	
	//option select the button enble and disable functionality
	MMcqTemplate.prototype.addFunctionality = function () {
	var ref = this;
		
		$(ref.container).find(".cyu-options .cyu-option").find('#chkBox').on("change",function(){
			if($(this).hasClass('cyuDisabled')){
			return;
			}
			//$(this).off('click');
			var isCheckboxChecked = $(this).is(":checked");
			//alert(isCheckboxChecked);

			
			$(ref.container).find(".cyu-submit-btn2").removeClass("disabled");

			
			ref.selectedOption = parseInt($(this).parents('li').attr("data-index"),10);
			
			 if(isCheckboxChecked){
				
				ref.selectedOptionArray.push(ref.selectedOption);
				//console.log(ref.selectedOptionArray);
				 
			}
			else{
				 
				 ref.selectedOptionArray.splice( ref.selectedOptionArray.indexOf(ref.selectedOption) ,1);
				// $(ref.container).find(".cyu-submit-btn2").addClass("disabled");
				//console.log(ref.selectedOptionArray);
			}
			
			if(ref.selectedOptionArray.length == 0){
				$(ref.container).find(".cyu-submit-btn2").addClass("disabled");
			}
			else{
				$(ref.container).find(".cyu-submit-btn2").removeClass("disabled");
			}
			
			
		});
		
 
		$(ref.container).find(".mcqBackBtn").click(function(){
			
		$(ref.container).html('');
		$(ref.container).hide();

			$('.fixed_block').show();
			$('#shellContainer_content_box').removeClass('changingPadding');
		});
		
	
// submit functionality
		$(ref.container).find(".cyu-submit-btn2").on('click', function(){
			
			if($(this).hasClass('disabled')){
				return;
				}
				
				if (isLocalfileOrServer!=true) {
					window.shell.checkhostReachable()    
					if(onLineFlag=="offline"){
						return;
					}
				}
			
			//var incorrectFeedbackLength = $(ref.xml).find('mmcq').find('FeedbackContentBlocks').find('incorrectOptionFeedback').length;
			
			//for(var i=0;i<incorrectFeedbackLength;i++){
				var incorrectFeedback = $(ref.xml).find('mmcq').find('FeedbackContentBlocks').find('incorrectOptionFeedback').eq(ref.attempts).text();
			//}	
			
			//var attemptOverFeedback = $(ref.xml).find('mmcq').find('feedbacks').find('OptionFeedback').eq(ref.selectedOption-1).text();
			
			ref.selectedOptionArray.sort();	

			for (var i = 0; i < ref.selectedOptionArray.length; i++) {
				var sel_value = ref.selectedOptionArray[i];
				for (var j = 0; j < ref.XMLAnswer.length; j++) {
					if (sel_value == ref.XMLAnswer[j]) {
						ref.partialAnswer.push(1);
					} else {
					}
				}
			}
			
			if(encodeURI(ref.selectedOptionArray) == encodeURI(ref.XMLAnswer)){
				
				// $('.cyu-option:nth("'+(ref.correctOption - 1)+'")').find(".circle").hide()
				// $('.cyu-option:nth("'+(ref.correctOption  - 1)+'")').find(".circle_contianer").append("<img src='assests/images/icons/right_3.png' style='height:21px; width:21px;' />")
				

				$('.cyu-option').each(function(){
				$(this).addClass('cyuDisabled');
				});
						
		
				$(this).addClass('disabled');
				$(ref.container).find(".popup-bg .feedback-body").find("#correct").show().addClass("feedback-option")		
				$(ref.container).find(".popup-bg").show()
				$("#shellHeader").hide()

				window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
				
				// $(".btnNext").css("pointer-events","all");
				// 	$(".btnNext").css("opacity","1");
				$(".btnNext").removeAttr("style")
					$(ref.container).find(".popup-bg .feedback-body").find('.correct').on('click', function(){
						if (isLocalfileOrServer!=true) {
							window.shell.checkhostReachable()    
							if(onLineFlag=="offline"){
								return;
							}
						}
						$(ref.container).find(".popup-bg").hide()
						$("#shellHeader").show()
					});
	
			}

			else if (ref.partialAnswer.length > 0 && ref.totalAttempts==0) {
				$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
					});
							
			
					$(this).addClass('disabled');
					//var selectOpt=ref.selectedOption-1					
					$(ref.container).find(".popup-bg .feedback-body").find("#partialCorrect").show().addClass("feedback-option")	
				    $(ref.container).find(".popup-bg").show()
					
					$("#shellHeader").hide()
	
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					
					// $(".btnNext").css("pointer-events","all");

					// 	$(".btnNext").css("opacity","1");
					$(".btnNext").removeAttr("style")
						$(ref.container).find(".popup-bg .feedback-body").find('.partialCorrect').on('click', function(){
							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							$(ref.container).find(".popup-bg").hide()	
							$("#shellHeader").show()				
						});
				ref.partialAnswer.length = 0;
			}

			else if (ref.partialAnswer.length > 0 && ref.totalAttempts>0) {
				
			


            if(ref.attempts == ref.totalAttempts){

				$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
					});
			
					$(this).addClass('disabled');

					//var selectOpt=ref.selectedOption-1
					
					$(ref.container).find(".popup-bg .feedback-body").find("#AttemptOver").show().addClass("feedback-option")	
				    $(ref.container).find(".popup-bg").show()
					
					$("#shellHeader").hide()
	
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					
					// $(".btnNext").css("pointer-events","all");
					// 	$(".btnNext").css("opacity","1");
					$(".btnNext").removeAttr("style")
						$(ref.container).find(".popup-bg .feedback-body").find('.AttemptOver').on('click', function(){
							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							$(ref.container).find(".popup-bg").hide()	
							$("#shellHeader").show()				
						});
			}
			else{
				$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
					});
							
			
					$(this).addClass('disabled');
					//var selectOpt=ref.selectedOption-1					
					$(ref.container).find(".popup-bg .feedback-body").find("#partialCorrect").show().addClass("feedback-option")	
				    $(ref.container).find(".popup-bg").show()
					
					$("#shellHeader").hide()
					$(ref.container).find(".popup-bg .feedback-body").find('.partialCorrect').on('click', function(){
						if (isLocalfileOrServer!=true) {
							window.shell.checkhostReachable()    
							if(onLineFlag=="offline"){
								return;
							}
						}
						ref.creatRetry()					
					});
				ref.partialAnswer.length = 0;

			  }

			  ref.attempts++;
			}


			else if(ref.attempts == ref.totalAttempts){

				$('.cyu-option').each(function(){
					$(this).addClass('cyuDisabled');
					});
			
					$(this).addClass('disabled');

					//var selectOpt=ref.selectedOption-1
					
					$(ref.container).find(".popup-bg .feedback-body").find("#AttemptOver").show().addClass("feedback-option")	
				    $(ref.container).find(".popup-bg").show()
					
					$("#shellHeader").hide()
	
					window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
					
					// $(".btnNext").css("pointer-events","all");
					// 	$(".btnNext").css("opacity","1");
					$(".btnNext").removeAttr("style")
						$(ref.container).find(".popup-bg .feedback-body").find('.AttemptOver').on('click', function(){
							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}
							$(ref.container).find(".popup-bg").hide()	
							$("#shellHeader").show()				
						});
			}
				else{
				
					ref.attempts++;
					
					$('.cyu-option').each(function(){
						$(this).addClass('cyuDisabled');
					});
						$(this).addClass('disabled');
						$(ref.container).find(".popup-bg .feedback-body").find("#inCorrect").show().addClass("feedback-option")
						$(ref.container).find(".popup-bg").show()	

						$(ref.container).find(".popup-bg .feedback-body").find('.inCorrect').on('click', function(){
							if (isLocalfileOrServer!=true) {
								window.shell.checkhostReachable()    
								if(onLineFlag=="offline"){
									return;
								}
							}						
						ref.creatRetry()					
					});
				}

		});
	
	}
	
	
	return MMcqTemplate;
});