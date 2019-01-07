// Commands for displaying & adding comments.

function displayComment(e) {
	e.preventDefault();
	let id = $(this).attr("value");
	$("#commentArea").fadeIn(300).css("display", "flex");
	$("#addComment").attr("value", id);
	$.get("/" + id, (data) => {
		$("#artTitle").text(data.title);
		$.get("/comment/" + id, (data) => {
			if (data) {
				$("#commTitle").val(data.commTitle);
				$("commTxt").val(data.commTxt);
			}
		});
	});

}

function closeComment(e) {
    e.preventDefault();
    $("#commentArea").fadeOut(300)
}

$(document).on("click", "#addComment", displayComment);
$(document).on("click", "#closeComm", closeComment)

function newComment(e) {
	e.preventDefault();
	let id = $(this).attr("value");
	var obj = {
		title: $("#commTitle").val().trim(),
		body: $("#commBody").val().trim()
	};
	$.post("/comment/" + id, obj, (data) => {
		window.location.href = "/saved";
	});
}


$(document).on("click", "#newComment", newComment);

