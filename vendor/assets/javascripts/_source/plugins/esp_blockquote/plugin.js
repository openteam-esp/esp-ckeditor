/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @file Blockquote.
 */

(function()
{
  function getState( editor, path )
  {
    var firstBlock = path.block || path.blockLimit;

    if ( !firstBlock || firstBlock.getName() == 'body' )
      return CKEDITOR.TRISTATE_OFF;

    // See if the first block has a blockquote parent.
    if ( firstBlock.getAscendant( 'blockquote', true ) )
      return CKEDITOR.TRISTATE_ON;

    return CKEDITOR.TRISTATE_OFF;
  }

  function onSelectionChange( evt )
  {
    var editor = evt.editor;
    if ( editor.readOnly )
      return;

    var command = editor.getCommand( 'esp_blockquote' );
    command.state = getState( editor, evt.data.path );
    command.fire( 'state' );
  }

  function noBlockLeft( bqBlock )
  {
    for ( var i = 0, length = bqBlock.getChildCount(), child ; i < length && ( child = bqBlock.getChild( i ) ) ; i++ )
    {
      if ( child.type == CKEDITOR.NODE_ELEMENT && child.isBlockBoundary() )
        return false;
    }
    return true;
  }

  var commandObject =
  {
    exec : function( editor )
    {
      var state = editor.getCommand( 'esp_blockquote' ).state,
        selection = editor.getSelection(),
        range = selection && selection.getRanges( true )[0];

      if ( !range )
        return;

      var bookmarks = selection.createBookmarks();

      // Kludge for #1592: if the bookmark nodes are in the beginning of
      // blockquote, then move them to the nearest block element in the
      // blockquote.
      if ( CKEDITOR.env.ie )
      {
        var bookmarkStart = bookmarks[0].startNode,
          bookmarkEnd = bookmarks[0].endNode,
          cursor;

        if ( bookmarkStart && bookmarkStart.getParent().getName() == 'blockquote' )
        {
          cursor = bookmarkStart;
          while ( ( cursor = cursor.getNext() ) )
          {
            if ( cursor.type == CKEDITOR.NODE_ELEMENT &&
                cursor.isBlockBoundary() )
            {
              bookmarkStart.move( cursor, true );
              break;
            }
          }
        }

        if ( bookmarkEnd
            && bookmarkEnd.getParent().getName() == 'blockquote' )
        {
          cursor = bookmarkEnd;
          while ( ( cursor = cursor.getPrevious() ) )
          {
            if ( cursor.type == CKEDITOR.NODE_ELEMENT &&
                cursor.isBlockBoundary() )
            {
              bookmarkEnd.move( cursor );
              break;
            }
          }
        }
      }

      var iterator = range.createIterator(),
        block;

      iterator.enlargeBr = editor.config.enterMode != CKEDITOR.ENTER_BR;

      if ( state == CKEDITOR.TRISTATE_OFF )
      {
        editor.openDialog('esp_blockquote');
      }
      else if ( state == CKEDITOR.TRISTATE_ON )
      {
        var moveOutNodes = [],
          database = {};

        while ( ( block = iterator.getNextParagraph() ) )
        {
          var bqParent = null,
            bqChild = null;
          while ( block.getParent() )
          {
            if ( block.getParent().getName() == 'blockquote' )
            {
              bqParent = block.getParent();
              bqChild = block;
              break;
            }
            block = block.getParent();
          }

          // Remember the blocks that were recorded down in the moveOutNodes array
          // to prevent duplicates.
          if ( bqParent && bqChild && !bqChild.getCustomData( 'blockquote_moveout' ) )
          {
            moveOutNodes.push( bqChild );
            CKEDITOR.dom.element.setMarker( database, bqChild, 'blockquote_moveout', true );
          }
        }

        CKEDITOR.dom.element.clearAllMarkers( database );

        var movedNodes = [],
          processedBlockquoteBlocks = [];

        database = {};
        while ( moveOutNodes.length > 0 )
        {
          var node = moveOutNodes.shift();
          bqBlock = node.getParent();

          // If the node is located at the beginning or the end, just take it out
          // without splitting. Otherwise, split the blockquote node and move the
          // paragraph in between the two blockquote nodes.
          if ( !node.getPrevious() )
            node.remove().insertBefore( bqBlock );
          else if ( !node.getNext() )
            node.remove().insertAfter( bqBlock );
          else
          {
            node.breakParent( node.getParent() );
            processedBlockquoteBlocks.push( node.getNext() );
          }

          // Remember the blockquote node so we can clear it later (if it becomes empty).
          if ( !bqBlock.getCustomData( 'blockquote_processed' ) )
          {
            processedBlockquoteBlocks.push( bqBlock );
            CKEDITOR.dom.element.setMarker( database, bqBlock, 'blockquote_processed', true );
          }

          movedNodes.push( node );
        }

        CKEDITOR.dom.element.clearAllMarkers( database );

        // Clear blockquote nodes that have become empty.
        for ( i = processedBlockquoteBlocks.length - 1 ; i >= 0 ; i-- )
        {
          bqBlock = processedBlockquoteBlocks[i];
          if ( noBlockLeft( bqBlock ) )
            bqBlock.remove();
        }

        if ( editor.config.enterMode == CKEDITOR.ENTER_BR )
        {
          var firstTime = true;
          while ( movedNodes.length )
          {
            node = movedNodes.shift();

            if ( node.getName() == 'div' )
            {
              docFrag = new CKEDITOR.dom.documentFragment( editor.document );
              var needBeginBr = firstTime && node.getPrevious() &&
                  !( node.getPrevious().type == CKEDITOR.NODE_ELEMENT && node.getPrevious().isBlockBoundary() );
              if ( needBeginBr )
                docFrag.append( editor.document.createElement( 'br' ) );

              var needEndBr = node.getNext() &&
                !( node.getNext().type == CKEDITOR.NODE_ELEMENT && node.getNext().isBlockBoundary() );
              while ( node.getFirst() )
                node.getFirst().remove().appendTo( docFrag );

              if ( needEndBr )
                docFrag.append( editor.document.createElement( 'br' ) );

              docFrag.replace( node );
              firstTime = false;
            }
          }
        }
      }

      selection.selectBookmarks( bookmarks );
      editor.focus();
    }
  };

  CKEDITOR.plugins.add( 'esp_blockquote',
  {
    init : function( editor )
    {
      var commandName = 'esp_blockquote';
      editor.addCommand( commandName, commandObject );

      editor.ui.addButton( 'Esp_Blockquote',
        {
          label : editor.lang.blockquote,
          command : commandName
        } );

      editor.on( 'selectionChange', onSelectionChange );
      CKEDITOR.dialog.add(commandName, CKEDITOR.getUrl(this.path + 'dialogs/esp_blockquote.js'))
    },

    requires : [ 'domiterator' ]
  } );
})();
