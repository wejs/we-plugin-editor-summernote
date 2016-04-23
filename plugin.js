/**
 * We.js summernote plugin main file
 *
 * see http://wejs.org/docs/we/plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  plugin.addJs('summernote', {
    weight: 5, pluginName: 'we-plugin-editor-summernote',
    path: 'files/public/summernote/dist/summernote.js'
  });
  plugin.addCss('summernote', {
    weight: 5, pluginName: 'we-plugin-editor-summernote',
    path: 'files/public/summernote/dist/summernote.css'
  });
  plugin.addJs('summernote-ext-video', {
    weight: 7, pluginName: 'we-plugin-editor-summernote',
    path: 'files/public/summernote/plugin/summernote-ext-video.js'
  });
  plugin.addCss('summernote-bs3', {
    weight: 6, pluginName: 'we-plugin-editor-summernote',
    path: 'files/public/summernote/dist/summernote-bs3.css'
  });
  plugin.addJs('we-plugin-editor-summernote', {
    weight: 11, pluginName: 'we-plugin-editor-summernote',
    path: 'files/public/we-plugin-editor-summernote.js'
  });

  plugin.events.on('render-javascript-tags:before:render', function (data) {
    // add locale file for non en-us locales
    if (data.location == 'footer' && data.context.locale && data.context.locale !== 'en-us') {
      data.files.push(
        '/public/plugin/we-plugin-editor-summernote/files/summernote/lang/summernote-'+
        data.context.locale + '.js'
      );
    }
  });

  return plugin;
};