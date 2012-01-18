CKEDITOR.dialog.add( 'esp_video', function ( editor )
{
  var lang = editor.lang.esp_video;

  function commitValue( videoNode, extraStyles )
  {
    var value=this.getValue();

    if ( !value && this.id=='id' )
      value = generateId();

    videoNode.setAttribute( this.id, value);

    if ( !value )
      return;
    switch( this.id )
    {
      case 'poster':
        extraStyles.backgroundImage = 'url(' + value + ')';
        break;
      case 'width':
        extraStyles.width = value + 'px';
        break;
      case 'height':
        extraStyles.height = value + 'px';
        break;
    }
  }

  function commitSrc( videoNode, extraStyles, videos )
  {
    var match = this.id.match(/(\w+)(\d)/),
      id = match[1],
      number = parseInt(match[2], 10);

    var video = videos[number] || (videos[number]={});
    video[id] = this.getValue();
  }

  function loadValue( videoNode )
  {
    if ( videoNode )
      this.setValue( videoNode.getAttribute( this.id ) );
    else
    {
      if ( this.id == 'id')
        this.setValue( generateId() );
    }
  }

  function loadSrc( videoNode, videos )
  {
    var match = this.id.match(/(\w+)(\d)/),
      id = match[1],
      number = parseInt(match[2], 10);

    var video = videos[number];
    if (!video)
      return;
    this.setValue( video[ id ] );
  }

  function generateId()
  {
    var now = new Date();
    return 'video' + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
  }

  // To automatically get the dimensions of the poster image
  var onImgLoadEvent = function()
  {
    // Image is ready.
    var preview = this.previewImage;
    preview.removeListener( 'load', onImgLoadEvent );
    preview.removeListener( 'error', onImgLoadErrorEvent );
    preview.removeListener( 'abort', onImgLoadErrorEvent );

    this.setValueOf( 'info', 'width', preview.$.width );
    this.setValueOf( 'info', 'height', preview.$.height );
  };

  var onImgLoadErrorEvent = function()
  {
    // Error. Image is not loaded.
    var preview = this.previewImage;
    preview.removeListener( 'load', onImgLoadEvent );
    preview.removeListener( 'error', onImgLoadErrorEvent );
    preview.removeListener( 'abort', onImgLoadErrorEvent );
  };

  return {
    title : lang.dialogTitle,
    minWidth : 400,
    minHeight : 140,

    onShow : function()
    {
      // Clear previously saved elements.
      this.fakeImage = this.videoNode = null;
      // To get dimensions of poster image
      this.previewImage = editor.document.createElement( 'img' );

      var fakeImage = this.getSelectedElement();
      if ( fakeImage && fakeImage.data( 'cke-real-element-type' ) && fakeImage.data( 'cke-real-element-type' ) == 'video' )
      {
        this.fakeImage = fakeImage;

        var videoNode = editor.restoreRealElement( fakeImage ),
          videos = [];

        videos.push( {src : videoNode.getAttribute( 'src' )} );

        this.videoNode = videoNode;

        this.setupContent( videoNode, videos );
      }
      else
        this.setupContent( null, [] );
    },

    onOk : function()
    {
      // If there's no selected element create one. Otherwise, reuse it
      var videoNode = null;
      if ( !this.fakeImage )
      {
        videoNode = CKEDITOR.dom.element.createFromHtml( '<cke:video></cke:video>', editor.document );
        videoNode.setAttributes(
          {
            controls : 'controls',
            src:  this.getValueOf( 'info', 'src0')
          } );
      }
      else
      {
        videoNode = this.videoNode;
      }

      var extraStyles = {}, videos = [];
      this.commitContent( videoNode, extraStyles, videos );

      var innerHtml = '', links = '',
        link = lang.linkTemplate || '',
        fallbackTemplate = lang.fallbackTemplate || '';

      links = link.replace('%src%', this.getValueOf('info', 'src0')).replace('%type%', this.getValueOf('info', 'src0').split('/').pop());
      videoNode.setHtml( innerHtml + fallbackTemplate.replace( '%links%', links ) );

      // Refresh the fake image.
      var newFakeImage = editor.createFakeElement( videoNode, 'cke_video', 'video', false );
      newFakeImage.setStyles( extraStyles );
      if ( this.fakeImage )
      {
        newFakeImage.replace( this.fakeImage );
        editor.getSelection().selectElement( newFakeImage );
      }
      else
        editor.insertElement( newFakeImage );
    },
    onHide : function()
    {
      if ( this.previewImage )
      {
        this.previewImage.removeListener( 'load', onImgLoadEvent );
        this.previewImage.removeListener( 'error', onImgLoadErrorEvent );
        this.previewImage.removeListener( 'abort', onImgLoadErrorEvent );
        this.previewImage.remove();
        this.previewImage = null;    // Dialog is closed.
      }
    },

    contents :
    [
      {
        id : 'info',
        elements :
        [
          {
            type : 'hbox',
            widths: [ '320px', '80px'],
            children : [
              {
                type : 'text',
                id : 'src0',
                label : lang.sourceVideo,
                commit : commitSrc,
                setup : loadSrc
              },
              {
                type : 'button',
                id : 'browse',
                hidden : 'true',
                style : 'display:inline-block;margin-top:10px;',
                filebrowser :
                {
                  action : 'Browse',
                  target: 'info:src0',
                  url: editor.config.filebrowserVideoBrowseUrl || editor.config.filebrowserBrowseUrl
                },
                label : editor.lang.esp_video.browseServer
              }
            ]
          },
          {
            type : 'hbox',
            widths: [ '50%', '50%'],
            children : [
              {
                type : 'text',
                id : 'width',
                label : editor.lang.common.width,
                'default' : 512,
                validate : CKEDITOR.dialog.validate.notEmpty( lang.widthRequired ),
                commit : commitValue,
                setup : loadValue
              },
              {
                type : 'text',
                id : 'height',
                label : editor.lang.common.height,
                'default' : 410,
                validate : CKEDITOR.dialog.validate.notEmpty(lang.heightRequired ),
                commit : commitValue,
                setup : loadValue
              }
            ]
          },
          {
            type : 'hbox',
            widths: [ '320px', '80px'],
            children : [
              {
                type : 'text',
                id : 'poster',
                label : lang.poster,
                commit : commitValue,
                setup : loadValue,
                onChange : function()
                {
                  var dialog = this.getDialog(),
                    newUrl = this.getValue();

                  //Update preview image
                  if ( newUrl.length > 0 )  //Prevent from load before onShow
                  {
                    dialog = this.getDialog();
                    var preview = dialog.previewImage;

                    preview.on( 'load', onImgLoadEvent, dialog );
                    preview.on( 'error', onImgLoadErrorEvent, dialog );
                    preview.on( 'abort', onImgLoadErrorEvent, dialog );
                    preview.setAttribute( 'src', newUrl );
                  }
                }
              },
              {
                type : 'button',
                id : 'browse',
                hidden : 'true',
                style : 'display:inline-block;margin-top:10px;',
                filebrowser :
                {
                  action : 'Browse',
                  target: 'info:poster',
                  url: editor.config.filebrowserImageBrowseUrl || editor.config.filebrowserBrowseUrl
                },
                label : editor.lang.esp_video.browseServer
              }
            ]
          }
        ]
      }

    ]
  };
} );
