//Основные настройки
var InitialPosition = new Vector3(0, 0.7, 0.8);
var IngredientScale = '0.3 0.3 0.3';
var Radius = 0.92;
var TeaId = 0;

//Настройки анимаций
var FadingTime = 0;
var ButtonAnimationTime = 300;
var RotatePeriod = 2000;

var textattrs = `
  font: fonts/PTSans-Bold-msdf.json; 
  font-image: fonts/PTSans-Bold.png; 
  negate: false; 
  align: center;`;

//Функции взаимодействия

function SetText(text) {
  var b_value = textattrs + 'color: black; z-offset: 0; value: ' + text + '; opacity: 0.5;';
  var w_value = textattrs + 'color: white; z-offset: 0.05; value: ' + text + '; opacity: 1;';
  d.getElementById("maintextblack").setAttribute("text", b_value);
  d.getElementById("maintextwhite").setAttribute("text", w_value);
}

function SwitchPlayButton(active) {
  var btn = d.getElementById('play_button');
  if(active) {
    btn.setAttribute('scale', '0.3 0.3 0.3');
  }
  else {
    var t = 0;
    var scale = new Vector3(0, 0, 0);
    var timer = setInterval(() => {
      scale.x = (1 - (t  / ButtonAnimationTime)) * 0.3;
      scale.y = (1 - (t  / ButtonAnimationTime)) * 0.3;
      scale.z = (1 - (t  / ButtonAnimationTime)) * 0.3;
      btn.setAttribute('scale', scale.toString())
      if(t >= ButtonAnimationTime) {
        clearInterval(timer);
      }
      t += 20;
    }, 20);
  }
}

function SwitchFinishButtons(active, animated) {
  var refresh_btn =  d.getElementById('refresh_button');
  var save_btn = d.getElementById('save_button');
  var list_btn =  d.getElementById('list_button');

  if(active) {
    if(animated) {
      var t = 0;
      var scale1 = new Vector3(0, 0, 0);
      var scale2 = new Vector3(0, 0, 0);
      var timer = setInterval(() => {
        scale1.x = t * 0.3 / ButtonAnimationTime;
        scale1.y = t * 0.3 / ButtonAnimationTime;
        scale1.z = t * 0.3 / ButtonAnimationTime;

        scale2.x = t * 0.2 / ButtonAnimationTime;
        scale2.y = t * 0.2 / ButtonAnimationTime;
        scale2.z = t * 0.2 / ButtonAnimationTime;

        refresh_btn.setAttribute('scale', scale1.toString());
        save_btn.setAttribute('scale', scale2.toString());
        list_btn.setAttribute('scale', scale2.toString());
        if(t >= ButtonAnimationTime) {
          clearInterval(timer);
        }
        t += 20;
      }, 20);
    }
    else {
      refresh_btn.setAttribute('scale', '0.3 0.3 0.3');
      save_btn.setAttribute('scale', '0.2 0.2 0.2');
      list_btn.setAttribute('scale', '0.2 0.2 0.2');
    }
  }
  else {
    if(animated) {
      var t = 0;
      var scale = new Vector3(0, 0, 0);
      refresh_btn.setAttribute('scale', '0 0 0');

      var timer = setInterval(() => {
        scale.x = (1 - (t / ButtonAnimationTime)) * 0.2;
        scale.y = (1 - (t / ButtonAnimationTime)) * 0.2;
        scale.z = (1 - (t / ButtonAnimationTime)) * 0.2;

        save_btn.setAttribute('scale', scale.toString());
        list_btn.setAttribute('scale', scale.toString());
        if(t >= ButtonAnimationTime) {
          clearInterval(timer);
        }
        t += 20;
      }, 20);


    }
    else {
      refresh_btn.setAttribute('scale', '0 0 0');
      save_btn.setAttribute('scale', '0 0 0');
      list_btn.setAttribute('scale', '0 0 0');
    }
  }
}

function CreateIngredient(ingredient) {
  let obj = document.createElement('a-entity');
  
  document.getElementById('face-track').append(obj);

  obj.setAttribute('visible', 'false');
  obj.setAttribute('id', 'ingredient' + Teas.indexOf(ingredient));
  obj.setAttribute('class', 'ingredient');
  obj.setAttribute('geometry', 'primitive: plane;');
  obj.setAttribute('rotation', '0 0 0');
  obj.setAttribute('scale', IngredientScale);

  var material = 'src:#' + ingredient.src + '; transparent: true;';
  obj.setAttribute('material', material);

  var position = InitialPosition.clone();
  position.x += Radius;
  obj.setAttribute('position', position.toString());

  PlayIngredientAnimation(obj, material);
}

function PlayIngredientAnimation(obj, material) {
  var ft = 0;
  var rt = 0;

  obj.setAttribute('material', material + ' opacity: 0;');
  obj.setAttribute('visible', 'true');

  var fading = setInterval(() => {
    if(ft >= FadingTime) {
      clearInterval(fading);
    }
    else {
      obj.setAttribute('material', material + ' opacity: ' + (ft / FadingTime) + ';');
    }
    ft += 20;
  }, 20);

  var corner = 0;
  var h = 0;
  var w = 0;

  var rotating = setInterval(() => {
    if(rt >= RotatePeriod) {
      rt = 0;
    }

    corner = Math.PI * 2 * (rt / RotatePeriod);
    y = Math.sin(corner) * Radius;
    x = Math.cos(corner) * Radius;

    var newPosition = InitialPosition.clone();
    newPosition.x += x;
    newPosition.y += y;

    obj.setAttribute('position', newPosition.toString());

    rt += 20;
  }, 20);
}

/*
          visible="true"
          id="play_button"
          geometry="primitive: plane;"
          material="src:#play_button_png; transparent: true;"
          rotation="0 0 0"
          scale="0.3 0.3 0.3"
          position="0 0.4 1"
          data-clickable
          onclick="OnClickPlay()"

*/

//Контроллеры кнопок

function OnClickPlay() {
  SwitchPlayButton(false);
  TeaId = Random(0, Teas.length);
  var timer = setInterval(() => {
    var rand = Random(0, Teas.length);
    SetText(Teas[rand].name);
  }, 100);

  FadingTime = RotatePeriod / Teas[TeaId].ingredients.length;

  setTimeout(() => {
    clearInterval(timer);
    SwitchFinishButtons(true, true);
    SetText(Teas[TeaId].name);
    
    var func = (id) => {
      CreateIngredient(Teas[TeaId].ingredients[id]);
    };

    for(var i = 0; i < Teas[TeaId].ingredients.length; i++) {
      setTimeout(func, FadingTime * i, i);
    }
  }, 2999);
}

function OnClickSaveScreenshot() {
  SwitchFinishButtons(false, false);

  var screenshot = d.querySelector('a-scene').components.screenshot;
  screenshot.width = window.screen.width;
  screenshot.height = window.screen.height;
  screenshot.capture('perspective');

  SwitchFinishButtons(true, false);
}

function OnClickReceipt() {
  var address = "https://game-dev.website/hackaton/receipts.html?teaid=";
  address += TeaId.toString();

  window.open(address);
}

function OnClickRefresh() {
  var elements = d.getElementsByClassName('ingredient');
  while (elements.length > 0) {
    elements[0].remove();
  }

  SetText('Какой ты чай?');
  SwitchPlayButton(true);
  SwitchFinishButtons(false, true);

  //d.getElementById("refresh_button").setAttribute("scale", '0 0 0');
  //d.getElementById("play_button").setAttribute("scale", '0.3 0.3 0.3');
}