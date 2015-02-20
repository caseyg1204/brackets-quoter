/*global define, brackets, $ */

define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        StringUtils         = brackets.getModule("utils/StringUtils");

    // Constants
    var wrapInSingleQuotes        = "Wrap selection in single quotes",
        wrapInDoubleQuotes        = "Wrap selection in double quotes",
        CMD_WRAP_IN_SINGLE_QUOTES = "brackets-quoter.single",
        CMD_WRAP_IN_DOUBLE_QUOTES = "brackets-quoter.double";

    // currently active editor
    var editor;
    
    /**
     * Get active editor after changes in document / focus
     */
    EditorManager.on('activeEditorChange', function(e, newEditor) {
        editor = newEditor; 
    });
    
    /**
     * Returns currently active editor
     * 
     * @returns Editor  editor
     */
    function getEditor() {
        if(!editor) editor = EditorManager.getActiveEditor();
        return editor;
    }
    
    
    /**
     * If text is selected add quote to beginning and end of text selection 
     */
    function wrapText(quote) {
            
        var editor = getEditor(),
            selection,
            text,
            doc = editor.document;
        
        selection = editor.getSelection();
        text = editor.getSelectedText();
        if (text.length > 0) {
            text = quote + text + quote;
        } else {
            text = quote;
        }
        
        doc.replaceRange(text, {line: selection.start.line, ch: selection.start.ch}, {line: selection.end.line, ch: selection.end.ch});
    }

    function wrapTextInSingleQuotes() {
        wrapText("'");   
    }
    
    function wrapTextInDoubleQuotes() {
        wrapText('"');   
    }
    
    
    // Register the commands and keybindings
    CommandManager.register(
        wrapInSingleQuotes,
        CMD_WRAP_IN_SINGLE_QUOTES,
        wrapTextInSingleQuotes
    );
    
    CommandManager.register(
        wrapInDoubleQuotes,
        CMD_WRAP_IN_DOUBLE_QUOTES,
        wrapTextInDoubleQuotes
    );
    
    KeyBindingManager.addBinding(CMD_WRAP_IN_DOUBLE_QUOTES, "Shift-'", "mac");
    KeyBindingManager.addBinding(CMD_WRAP_IN_SINGLE_QUOTES, "'", "mac");
    KeyBindingManager.addBinding(CMD_WRAP_IN_DOUBLE_QUOTES, "Shift-'", "linux");
    KeyBindingManager.addBinding(CMD_WRAP_IN_SINGLE_QUOTES, "'", "linux");
    KeyBindingManager.addBinding(CMD_WRAP_IN_DOUBLE_QUOTES, "Shift-'", "win");
    KeyBindingManager.addBinding(CMD_WRAP_IN_SINGLE_QUOTES, "'", "win");
    
});