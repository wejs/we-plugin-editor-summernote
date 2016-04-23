window.we.components.editor = {
  styles: {
    small: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['help', ['help']]
    ],
    medium: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', [ 'ul','ol', 'paragraph' ]], ['style', ['style']],
      ['insert', ['link', 'picture', 'video']],
      ['misc', ['fullscreen','codeview', 'help']],
      ['help', ['help']]
    ]
  },
  init: function(selector, style) {
    var element = $(selector);
    var cfg = {
      lang: window.WE_BOOTSTRAP_CONFIG.locale,
      styleWithSpan: false,
      shortcuts: false,
      height: element.attr('we-editor-height'),
      minHeight: element.attr('we-editor-minheight') || 50,
      maxHeight: element.attr('we-editor-maxheight'),
      focus: element.attr('we-editor-focus'),

      onImageUpload: function onImageUpload(files) {
        var data = new FormData();
        data.append('image', files[0]);
        $.ajax({
          data: data,
          type: 'POST',
          url: '/api/v1/image',
          cache: false,
          contentType: false,
          processData: false,
          success: function(r) {
            var img =  $('<img>');
            img.attr('src', r.image.urls.large);
            img.attr('alt', r.image.description);
            element.summernote('insertNode', img[0]);
          }
        });
      }
    };
    // - set we-editor flag to use in form submit
    element.attr('we-editor', 'true');
    // get style config from we-editor-style atribute
    if (!style) style = (element.attr('we-editor-style') || 'medium');
    // add editor toobar config if style not is full
    cfg.toolbar = window.we.components.editor.styles[style];
    element.summernote(cfg);
  }
};