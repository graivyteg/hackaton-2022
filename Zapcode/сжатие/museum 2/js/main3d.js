var CurrentId = 2;
var Total3D = 5;
var objs3D = [];
var Sizes = [
	'0.5 0.5 0.5',
	'2 2 2',
	'0.7 0.7 0.7',
	'0.6 0.6 0.6',
	'0.5 0.5 0.5'
]
var AnimationTime = 400;
var RotateTime = 1000;
var IsPlaying = false;

var activeInterval = setInterval(() => {}, 1000);

d.addEventListener('DOMContentLoaded', function() {
	InitializeObjects();
});


function InitializeObjects() {
	for(var i = 0; i < Total3D; i++) {
		var obj = document.createElement('a-obj-model');
		obj.setAttribute('src', '#model' + (i + 1) + '_obj');
		obj.setAttribute('material', 'color: #80f6ff;');
		obj.setAttribute('visible', 'true');
		obj.setAttribute('id', 'model' + (i + 1));
		obj.setAttribute('rotation', '0 0 0');
		obj.setAttribute('scale', '0 0 0');
		obj.setAttribute('position', '0 0 0');

		if(i == CurrentId) {
			obj.setAttribute('scale', Sizes[i]);
			StartRotating();
		}
		d.getElementById('container').append(obj);
		objs3D.push(obj);
	}
}

function PlayOut(obj) {
	var t = 0;

	var timer = setInterval(() => {
		var scale = Lerp(Vector3.fromString(Sizes[objs3D.indexOf(obj)]), new Vector3(0, 0, 0), t / AnimationTime);
		obj.setAttribute('scale', scale.toString());

		if(t >= AnimationTime) {
			clearInterval(timer);
		}
		t += 20;
	}, 20);
}

function PlayIn(obj) {
	var t = 0;

	var timer = setInterval(() => {
		var scale = Lerp(new Vector3(0, 0, 0), Vector3.fromString(Sizes[objs3D.indexOf(obj)]), t / AnimationTime);
		obj.setAttribute('scale', scale.toString());

		if(t >= AnimationTime) {
			clearInterval(timer);
		}
		t += 20;
	}, 20);
	StartRotating();
}

function StartRotating() {
	var sr = new Vector3(0, 0, 0);
	clearInterval(activeInterval);
	activeInterval = setInterval(() => {
		sr.y += 0.2 * Math.PI;
		objs3D[CurrentId].setAttribute('rotation', sr);
	}, 20);
}

function OnNextClick() {
	if(IsPlaying || CurrentId + 1 >= Total3D) {
		return;
	}

	IsPlaying = true;
	setTimeout(() => { IsPlaying = false;}, AnimationTime);

	CurrentId++;
	if(CurrentId == Total3D - 1) {
		d.getElementById('next').setAttribute('visible', 'false');
	}
	d.getElementById('previous').setAttribute('visible', 'true');

	PlayOut(objs3D[CurrentId - 1]);
	PlayIn(objs3D[CurrentId]);
}


function OnPreviousClick() {
	if(IsPlaying || CurrentId == 0) {
		return;
	}

	IsPlaying = true;
	setTimeout(() => { IsPlaying = false;}, AnimationTime);

	CurrentId--;
	if(CurrentId == 0) {
		d.getElementById('previous').setAttribute('visible', 'false');
	}
	d.getElementById('next').setAttribute('visible', 'true');


	PlayOut(objs3D[CurrentId + 1]);
	PlayIn(objs3D[CurrentId]);
}
