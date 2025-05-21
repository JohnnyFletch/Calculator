let recipe = [] //Все ингредиенты, массив с объектами

//Кнопка "добавить"
document.querySelector('.add_btn').addEventListener('click', function() {
  let name = document.querySelector('.item_name')
  let count = document.querySelector('.item_count')
  let type = document.querySelector('.item_type')
  if(!name.value) {
    alert('Введите название ингредиента')
    return false
  }
  recipe.push({
    'name': name.value,
    'count': +count.value,
    'type': type.value
  })
  let result
  if(+count.value === 0) {
    result = `${name.value} - по вкусу`
  } else {
    result = `${name.value} - ${count.value} ${type.value}`
  }
  let div = document.createElement('div')
  div.innerHTML = `
  <div class="d-flex space_between">
    <div>${result}</div>
    <button class="remove_btn" data-name="${name.value}">&times;</button>
  </div>
  `
  document.querySelector('.recipe').append(div)
  name.value = ''
  count.value = ''
})

//Кнопка "вычислить"
document.querySelector('.result_btn').addEventListener('click', function() {
  document.querySelector('.result_new_recipe').innerHTML = ''
  let ratio_type = +document.querySelector('.item_ratio_type').value
  let ratio = +document.querySelector('.item_ratio').value
  if(!ratio) {
    alert('Введите число кроме нуля')
    return false
  }
  let new_recipe = []
  if(ratio_type === 1) {
    for(let i = 0; i < recipe.length; i++) {
      new_recipe.push({
        "name": recipe[i]['name'],
        "count": (+recipe[i]['count'] / ratio).toFixed(2),
        "type": recipe[i]['type']
      })
    }
  } else if(ratio_type === 2) {
    for(let i = 0; i < recipe.length; i++) {
      new_recipe.push({
        "name": recipe[i]['name'],
        "count": +recipe[i]['count'] * ratio,
        "type": recipe[i]['type']
      })
    }
  }
  for(let i = 0; i < new_recipe.length; i++) {
    let result
    if(+new_recipe[i]['count'] == 0) {
      result = 'по вкусу'
    } else {
      result = `${new_recipe[i]["count"]} ${new_recipe[i]["type"]}`
    }
    let div = document.createElement('div')
    div.innerHTML = `
    <div class="d-flex">
      <div>${new_recipe[i]["name"]} - ${result}</div>
    </div>
    `
    document.querySelector('.result_new_recipe').append(div) 
  }
})

//Изменение названия рецепта
document.querySelector('.recipe_name').addEventListener('click', function(){
  let name = prompt('Введите название рецепта')
  if(name) {
    document.querySelector('.recipe_name').textContent = name
  }
})

//Удаление конкретного ингредиента
document.querySelector('.recipe').addEventListener('click', function(e) {
  if(!e.target.dataset.name) {
    return false
  }
  e.target.closest('.d-flex').remove()
  for(let i = 0; i < recipe.length; i++) {
    if(recipe[i]["name"] == e.target.dataset.name) {
      recipe.splice(i, 1)
    }
  }
  
})

//Копирование текста
//Получаем элемент кнопки
const copyBtn = document.getElementById('copy_btn')

//Обработчик события нажатия на кнопку
copyBtn.addEventListener('click', function() {
  //Получаем текст из блока "copy"
  const textToCopy = document.querySelector('.copy').innerText

  //Копируем текст в буфер обмена
  navigator.clipboard.writeText(textToCopy)
  .then(() => {
    alert('Рецепт успешно скопирован!')
  })
  .catch(error => {
    console.error('Не удалось скопировать рецепт:', error)
  })
})


//Кнопки увеличения/уменьшения размера шрифта
//Получаем элементы кнопок
const minus = document.getElementById('minus')
const plus = document.getElementById('plus')

//Функция для уменьшения шрифта
function decreaseFontSize() {
  let currentSize = parseInt(window.getComputedStyle(document.body).fontSize)
  if(currentSize > 8) {
    document.body.style.fontSize = `${currentSize - 1}px`
  }
}

//Функция для увеличения шрифта
function encreaseFontSize() {
  let currentSize = parseInt(window.getComputedStyle(document.body).fontSize)
  if(currentSize < 22) {
    document.body.style.fontSize = `${currentSize + 1}px`
  }
}
//Добавляем обработчики события для кнопок
minus.addEventListener('click', decreaseFontSize)
plus.addEventListener('click', encreaseFontSize)

//Темная тема
const themeToggle = document.getElementById('theme_toggle');

//Проверяем сохраненную тему
const currentTheme = localStorage.getItem('theme')
if(currentTheme === 'dark') {
  document.body.classList.add('dark')
  themeToggle.innerHTML = `<i class="fa fa-sun-o" aria-hidden="true"></i>`
  themeToggle.style.backgroundColor = 'white'
  themeToggle.style.color = 'black'
}
//Обработчик клика
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  if(document.body.classList.contains('dark')) {
    themeToggle.innerHTML = `<i class="fa fa-sun-o" aria-hidden="true"></i>`
    themeToggle.style.backgroundColor = 'white'
    themeToggle.style.color = 'black'
  } else {
    themeToggle.innerHTML = `<i class="fa fa-moon-o" aria-hidden="true"></i>`
    themeToggle.style.backgroundColor = 'black'
    themeToggle.style.color = 'white'
  }
  //Сохраняем выбор в localStorage
  const isDark = document.body.classList.contains('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
})

