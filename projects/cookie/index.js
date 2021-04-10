/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

 import './cookie.html';

 /*
  app - это контейнер для всех ваших домашних заданий
  Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер
 
  Пример:
    const newDiv = document.createElement('div');
    homeworkContainer.appendChild(newDiv);
  */
 const homeworkContainer = document.querySelector('#app');
 // текстовое поле для фильтрации cookie
 const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
 // текстовое поле с именем cookie
 const addNameInput = homeworkContainer.querySelector('#add-name-input');
 // текстовое поле со значением cookie
 const addValueInput = homeworkContainer.querySelector('#add-value-input');
 // кнопка "добавить cookie"
 const addButton = homeworkContainer.querySelector('#add-button');
 // таблица со списком cookie
 const listTable = homeworkContainer.querySelector('#list-table tbody');
 const listBody = homeworkContainer.querySelector('#list-body')
 
 const cookieObj = getCookie()
 
 function getCookie(name) {
   var matches = document.cookie
   .match(new RegExp("(?:^|; )" + name
   .replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
   return matches ? decodeURIComponent(matches[1]) : undefined;
 }
 
 // const cookies = document.cookie.split('; ').reduce((prev, current) => {
 //   const [name, value] = current.split('=');
 //   prev[name] = value;
 //   return prev;
 // }, {});
 
 resultTable()
 
 filterNameInput.addEventListener('input', function () {});
 
 addButton.addEventListener('click', () => {
   document.cookie = `${addNameInput.value}=${addValueInput.value}`;
   addNameInput.value = '';
   addValueInput.value = '';
 });
 
 listTable.addEventListener('click', (e) => {});
 
 
 
 
 function resultTable(params) {
   const fragment = document.createDocumentFragment();
   let total = 0;
 
   listTable.innerHTML = '';
 
   for (const [name, value] of cookieObj) {
     if (
       filterValue &&
       !name.toLowerCase().includes(filterValue.toLowerCase()) &&
       !value.toLowerCase().includes(filterValue.toLowerCase())
     ) {
       continue;
     }
 
     total++;
 
     const tr = document.createElement('tr');
     const nameTD = document.createElement('td');
     const valueTD = document.createElement('td');
     const removeTD = document.createElement('td');
     const removeButton = document.createElement('button');
 
     removeButton.dataset.role = 'remove-cookie';
     removeButton.dataset.cookieName = name;
     removeButton.textContent = 'Удалить';
     nameTD.textContent = name;
     valueTD.textContent = value;
     valueTD.classList.add('value');
     tr.append(nameTD, valueTD, removeTD);
     removeTD.append(removeButton);
 
     fragment.append(tr);
   }
 
   if (total) {
     listTable.parentNode.classList.remove('hidden');
     listTable.append(fragment);
   } else {
     listTable.parentNode.classList.add('hidden');
   }
 }
 
 
 
 
 // {
 //   const fragment = document.createDocumentFragment()
 
 //  const newTr = document.createElement('tr')
 //  const nameTr = document.createElement('td')
 //  const valueTr = document.createElement('td')
 //  const deleteTr = document.createElement('td')
 //  const buttonDelete = document.createElement('button')
 
 //  nameTr.textContent = cookies.name
 //  valueTr.textContent = cookies.value
 //  deleteTr.textContent = "удалить"
 //  buttonDelete.append(deleteTr)
 
 //  newTr.append(nameTr, valueTr, buttonDelete)
 //  fragment.append(newTr)
 //  listTable.append(fragment)
 // }
 