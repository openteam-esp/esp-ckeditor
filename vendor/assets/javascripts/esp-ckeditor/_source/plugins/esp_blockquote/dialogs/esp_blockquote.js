(function () {
  CKEDITOR.dialog.add('esp_blockquote', function (editor) {

    function commitKlass()
    {
    };

    function loadKlass()
    {
    };

    return {
      title : 'Class for Blockquote',
      minWidth : 200,
      minHeight : 50,

      onShow : function()
      {
      },

      onOk : function()
      {
        var selection = editor.getSelection(),
            range = selection && selection.getRanges( true )[0],
            iterator = range.createIterator();

        var paragraphs = [];
        while ( ( block = iterator.getNextParagraph() ) )
          paragraphs.push( block );

        // If no paragraphs, create one from the current selection position.
        if ( paragraphs.length < 1 )
        {
          var para = editor.document.createElement( editor.config.enterMode == CKEDITOR.ENTER_P ? 'p' : 'div' ),
            firstBookmark = bookmarks.shift();
          range.insertNode( para );
          para.append( new CKEDITOR.dom.text( '\ufeff', editor.document ) );
          range.moveToBookmark( firstBookmark );
          range.selectNodeContents( para );
          range.collapse( true );
          firstBookmark = range.createBookmark();
          paragraphs.push( para );
          bookmarks.unshift( firstBookmark );
        }

        // Make sure all paragraphs have the same parent.
        var commonParent = paragraphs[0].getParent(),
          tmp = [];
        for ( var i = 0 ; i < paragraphs.length ; i++ )
        {
          block = paragraphs[i];
          commonParent = commonParent.getCommonAncestor( block.getParent() );
        }

        // The common parent must not be the following tags: table, tbody, tr, ol, ul.
        var denyTags = { table : 1, tbody : 1, tr : 1, ol : 1, ul : 1 };
        while ( denyTags[ commonParent.getName() ] )
          commonParent = commonParent.getParent();

        // Reconstruct the block list to be processed such that all resulting blocks
        // satisfy parentNode.equals( commonParent ).
        var lastBlock = null;
        while ( paragraphs.length > 0 )
        {
          block = paragraphs.shift();
          while ( !block.getParent().equals( commonParent ) )
            block = block.getParent();
          if ( !block.equals( lastBlock ) )
            tmp.push( block );
          lastBlock = block;
        }

        // If any of the selected blocks is a blockquote, remove it to prevent
        // nested blockquotes.
        while ( tmp.length > 0 )
        {
          block = tmp.shift();
          if ( block.getName() == 'blockquote' )
          {
            var docFrag = new CKEDITOR.dom.documentFragment( editor.document );
            while ( block.getFirst() )
            {
              docFrag.append( block.getFirst().remove() );
              paragraphs.push( docFrag.getLast() );
            }

            docFrag.replace( block );
          }
          else
            paragraphs.push( block );
        }

        // Now we have all the blocks to be included in a new blockquote node.
        var bqBlock = editor.document.createElement( 'blockquote' );
        var newKlass = this.getValueOf( 'info', 'klass0');
        if ( newKlass ) {
          bqBlock.setAttribute("class", newKlass); //For Most Browsers
          if ( CKEDITOR.env.ie ) {
            bqBlock.setAttribute("className", newKlass); //For IE; harmless to other browsers.
          };
        };
        bqBlock.insertBefore( paragraphs[0] );
        while ( paragraphs.length > 0 )
        {
          block = paragraphs.shift();
          bqBlock.append( block );
        }
      },

      onHide : function()
      {
      },

      contents :
      [
        {
          id : 'info',
          elements :
          [
            {
              type : 'text',
              id : 'klass0',
              label : 'Class',
              commit : commitKlass,
              setup : loadKlass
            }
          ]
        }
      ]
    };
  })
})();
