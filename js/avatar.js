'use strict';

(function () {
  var fileChooser = window.domElement.setup.uploadFile;
  var preview = window.domElement.setup.uploadPreview;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Была выбрана картинка
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    // Если файл существует
    if (file) {
      // Имя файла в нижнем регистре
      var fileName = file.name.toLowerCase();

      // Проверяем расширение файла
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      // Если расширение имеется
      if (matches) {
        // Создаем объект
        var reader = new FileReader();

        // Если файл прочитан
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        // Читаем файл
        reader.readAsDataURL(file);
      }
    }
  });


  window.avatar = {
    preview: preview,
    fileChooser: fileChooser
  };
})();
