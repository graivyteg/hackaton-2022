var d = document;

var CurrentId = 1;
var Total2D = 10;
var objs2D = [];

var BigScale = new Vector3(3, 2, 1);
var SmallScale = new Vector3(1.5, 1, 1);

var PosFarLeft = new Vector3(-4, 0, -0.01);
var PosLeft = new Vector3(-2.5, 0, -0.01);
var PosCenter = new Vector3(0, 0, -0.01);
var PosRight = new Vector3(2.5, 0, -0.01);
var PosFarRight = new Vector3(4, 0, -0.01);

var AnimationTime = 500;
var IsPlaying = false;

d.addEventListener('DOMContentLoaded', function() {
	InitializePlanes();
});

function MovePlane(obj, startPos, finishPos, time) {
	var t = 0;
	var timer = setInterval(() => {
		console.log(Lerp(startPos, finishPos, t / time).toString());
		obj.setAttribute('position', Lerp(startPos, finishPos, t / time).toString());

		if(t >= time) {
			clearInterval(timer);
		}
		t += 20;
	}, 20);
}

function ScalePlane(obj, startScale, finishScale, time) {
	var t = 0;
	var timer = setInterval(() => {
		SetScale(obj, Lerp(startScale, finishScale, t / time));

		if(t >= time) {
			clearInterval(timer);
		}
		t += 20;
	}, 20);
}

function GetPosition(id) {
	var pos = PosCenter;
	if(CurrentId - id == 1) {
		pos = PosLeft;
	}
	else if(CurrentId - id == -1) {
		pos = PosRight;
	}
	else if(CurrentId - id > 0) {
		pos = PosFarLeft;
	}
	else if(CurrentId - id < 0){
		pos = PosFarRight;
	}

	return pos;
}

function GetScale(id) {
	var scale = new Vector3(0, 0, 0);
	if(id == CurrentId) {
		scale = BigScale;
	}
	else if(Math.abs(id - CurrentId) == 1) {
		scale = SmallScale;
	}
	return scale;
}

function SetScale(obj, scale) {
	obj.setAttribute('width', scale.x);
	obj.setAttribute('height', scale.y);
}

function InitializePlanes() {
	for(var i = 0; i < Total2D; i++) {
		var obj = d.createElement("a-plane");
		obj.setAttribute('id', 'pic' + i);
		obj.setAttribute('visible', 'true');
		obj.setAttribute('src', '#picture' + (i + 1));
		SetScale(obj, GetScale(i));
		obj.setAttribute('position', GetPosition(i));

		objs2D.push(obj);

		d.getElementById('container').append(obj);
	}
}

function OnNextClick() {
	if(IsPlaying || CurrentId == Total2D - 1) return;

	IsPlaying = true;
	setTimeout(() => { IsPlaying = false;}, AnimationTime);

	if(CurrentId < Total2D - 1) {
		CurrentId ++;
	}
	if(CurrentId == Total2D - 1) {
		d.getElementById('next').setAttribute('visible', 'false');
	}
	d.getElementById('previous').setAttribute('visible', 'true');

	for(var i = 0; i < Total2D; i++) {
		var obj = objs2D[i];
		MovePlane(obj, GetPosition(i+1), GetPosition(i), AnimationTime);
		ScalePlane(obj, GetScale(i+1), GetScale(i), AnimationTime);
	}
}

function OnOpenImage() {
	window.open(document.location + "/src/images/" + (CurrentId + 1) + ".jpg");
}

function OnPreviousClick() {
	if(IsPlaying || CurrentId == 0) return;

	IsPlaying = true;
	setTimeout(() => { IsPlaying = false;}, AnimationTime);

	if(CurrentId > 0) {
		CurrentId--;
	}
	if(CurrentId == 0) {
		d.getElementById('previous').setAttribute('visible', 'false');
	}
	d.getElementById('next').setAttribute('visible', 'true');

	for(var i = 0; i < Total2D; i++) {
		var obj = objs2D[i];
		MovePlane(obj, GetPosition(i-1), GetPosition(i), AnimationTime);
		ScalePlane(obj, GetScale(i-1), GetScale(i), AnimationTime);
	}
}