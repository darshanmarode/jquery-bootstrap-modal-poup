var modalConfig = null;
var isModalOkBtnPressed = false;

function okBtnCallBack(event){
	isModalOkBtnPressed = true;
	$("#myModal").modal('hide');
	if(modalConfig.okBtnCallBack){
		modalConfig.okBtnCallBack();
	}
	$("#myModal").remove();
	$(".modal-backdrop.fade.in").remove();
	$("body").removeClass('modal-open');
	$("body").css({
		'padding-right' : '0px'
	});
}
	
function closeBtnCallBack(){
	$("#myModal").modal('hide');
	if(modalConfig.closeBtnCallBack){
		modalConfig.closeBtnCallBack();
	}
	$("#myModal").remove();
	$(".modal-backdrop.fade.in").remove();
	$("body").removeClass('modal-open');
	$("body").css({
		'padding-right' : '0px'
	});
}

function hidePopup(){
	$("#myModal").modal('hide');
}
	
function openPopup(config){
	modalConfig = config;
	isModalOkBtnPressed = false;
	if(!config.popupType){
		config.popupType = 'primary';
	}
	
	var okBtn = '';
	if(modalConfig.okBtnText || modalConfig.okBtnCallBack){
		var okBtnText = 'Ok';
		if(modalConfig.okBtnText){
			okBtnText = modalConfig.okBtnText;
		}
		okBtn = '<button type="button" class="btn pull-left" onclick="okBtnCallBack(event)">'+okBtnText+'</button>';
	}
	
	var closeBtn = '';
	if(modalConfig.closeBtnText || modalConfig.closeBtnCallBack){
		var closeBtnText = 'Close';
		if(modalConfig.closeBtnText){
			closeBtnText = modalConfig.closeBtnText;
		}
		closeBtn = '<button type="button" class="btn pull-right" onclick="closeBtnCallBack()">'+closeBtnText+'</button>';
	}
	
	if(okBtn == '' && closeBtn ==''){
		closeBtn = '<button type="button" class="btn pull-right" onclick="closeBtnCallBack()">Close</button>';
	}
	
	var modalContent = '<div id="myModal" class="modal fade" role="dialog">'
		+ '<div class="modal-dialog">'
		+    '<div class="modal-content">'
		+      '<div class="modal-header">'
		+        '<button type="button" class="close" data-dismiss="modal">&times;</button>'
		+        '<h4 class="modal-title">'+config.hearderText+'</h4>'
		+      '</div>'
		+      '<div class="modal-body">'
		+        ''+ config.bodyText + ''
		+      '</div>'
		+      '<div class="modal-footer">'
		+		 okBtn
		+        closeBtn
		+      '</div>'
		+    '</div>'
		+	'</div>'
		+'</div>';
	
	$("body").append(modalContent);
	
	$('#myModal').on('hide.bs.modal', function(){
		if(!isModalOkBtnPressed && modalConfig.closeBtnCallBack){
			modalConfig.closeBtnCallBack();
		}
		$("#myModal").remove();
		$(".modal-backdrop.fade.in").remove();
		$("body").removeClass('modal-open');
		$("body").css({
			'padding-right' : '0px'
		});
	});
	
	if(modalConfig.autoCloseable){
		setTimeout(function(){
			if(modalConfig.autoCloseBtn){
				switch(modalConfig.autoCloseBtn){
				case 'Ok':
					okBtnCallBack();
					break;
				case 'Close':
					closeBtnCallBack();
					break;
				}
			}
		}, modalConfig.closeAfterInterval);
	}
	
	$("#myModal").modal('show');
}