var d = document; //сокращение для удобства работы

class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  static fromString(text) {
    var array = text.split(' ');
    var x = parseFloat(array[0]);
    var y = parseFloat(array[1]);
    var z = parseFloat(array[2]);
    return new Vector3(x, y, z)
  }

  add(vector3) {
    this.x += vector3.x;
    this.y += vector3.y;
    this.z += vector3.z;
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  toString() {
    return this.x.toString() + ' ' + this.y.toString() + ' ' + this.z.toString();
  }
}

class Tea {
  constructor(name, ingredients) {
    this.name = name;
    this.ingredients = ingredients;
  }
}

class Ingredient {
  constructor(name, src) {
    this.name = name;
    this.src = src;
  }
}

/*
black_tea_png
caramel_png
chocolate_png
strawberry_png
blueberry_png
vanilla_png
carnation_png
cinnamon_png
orange_png
lemon_png
cranberry_png
thyme_png 
mint_png
currant_png
hibiscus_png
barberry_png

*/

var Teas = [
  new Tea(
    'Chocolate Toffee',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Карамель', 'caramel_png'),
      new Ingredient('Шоколад', 'chocolate_png')
    ]
  ),
  new Tea(
    'Strawberry Gourmet',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Клубника', 'strawberry_png')
    ]
  ),
  new Tea(
    'Blueberry Nights',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Черника', 'blueberry_png')
    ]
  ),
  new Tea(
    'Easter Cheer',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Ваниль', 'vanilla_png')
    ]
  ),
  new Tea(
    'Christmas Mystery',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Гвоздика', 'carnation_png'),
      new Ingredient('Корица', 'cinnamon_png'),
      new Ingredient('Апельсин', 'orange_png'),
      new Ingredient('Лимон', 'lemon_png')
    ]
  ),
  new Tea(
    'Vanilla Cranberry',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Ваниль', 'vanilla_png'),
      new Ingredient('Клюква', 'cranberry_png')
    ]
  ),
  new Tea(
    'Honey Linden',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Липовый мёд', 'honey_png')
    ]
  ),
  new Tea(
    'Spring Melody',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Чабрец', 'thyme_png'),
      new Ingredient('Листья смородины', 'currant_png'),
      new Ingredient('Мята', 'mint_png')
    ]
  ),
  new Tea(
    'Lemon Spark',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Лимон', 'lemon_png')
    ]
  ),
  new Tea(
    'Barberry Garden',
    [
      new Ingredient('Черный байховый чай', 'black_tea_png'),
      new Ingredient('Гибискус', 'hibiscus_png'),
      new Ingredient('Барбарис', 'barberry_png')
    ]
  )
];

//Дополнительные функции

function Lerp(from, to, t) {
  var result = new Vector3(
    from.x + (to.x - from.x) * t,
    from.y + (to.y - from.y) * t,
    from.z + (to.z - from.z) * t
  );
  return result;
}

function Random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
