import React, { useState, useEffect, useRef } from 'react';
import {
    BoldIcon, ItalicIcon, StrikethroughIcon, ListOrderedIcon, ListIcon,
    LinkIcon, ImageIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon
} from '../icons/Icons';

const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const imageInputRef = useRef(null);
    const savedRange = useRef(null);

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const handleClick = (e) => {
            if (e.target.classList.contains('remove-image-btn')) {
                e.target.closest('.image-container').remove();
                handleInput({ currentTarget: editor });
            }
        };

        editor.addEventListener('click', handleClick);
        return () => {
            editor.removeEventListener('click', handleClick);
        };
    }, []);

    const handleInput = (e) => {
        const currentContent = e.currentTarget.innerHTML;
        if (value !== currentContent) {
            onChange({ target: { value: currentContent } });
        }
    };

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            savedRange.current = selection.getRangeAt(0);
        }
    };

    const restoreSelection = () => {
        if (savedRange.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(savedRange.current);
        }
    };

    const executeCommand = (command, commandValue = null) => {
        editorRef.current.focus();
        restoreSelection();
        document.execCommand(command, false, commandValue);
        handleInput({ currentTarget: editorRef.current });
    };

    const handleLink = () => {
        saveSelection();
        const url = prompt('Enter the URL:');
        if (url) {
            executeCommand('createLink', url);
        }
    };

    const handleImageClick = () => {
        saveSelection();
        imageInputRef.current.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                const imageHtml = `
                    <span class="image-container" contenteditable="false" style="position: relative; display: inline-block; line-height: 0;">
                        <img src="${imageUrl}" style="max-width: 100%; height: auto; border-radius: 4px;" />
                        <button class="remove-image-btn" title="Remove Image" style="position: absolute; top: 4px; right: 4px; background: rgba(15, 23, 42, 0.7); color: white; border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 16px; line-height: 24px; text-align: center; padding: 0;">&times;</button>
                    </span>`;
                
                editorRef.current.focus();
                restoreSelection();
                document.execCommand('insertHTML', false, imageHtml);
                handleInput({ currentTarget: editorRef.current });
            };
            reader.readAsDataURL(file);
        }
        e.target.value = null;
    };

    return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg">
            <div className="flex flex-wrap items-center p-2 border-b border-gray-600 gap-1">
                <button type="button" title="Bold" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('bold')} className="p-2 rounded hover:bg-gray-700"><BoldIcon /></button>
                <button type="button" title="Italic" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('italic')} className="p-2 rounded hover:bg-gray-700"><ItalicIcon /></button>
                <button type="button" title="Strikethrough" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('strikeThrough')} className="p-2 rounded hover:bg-gray-700"><StrikethroughIcon /></button>
                <div className="w-px h-6 bg-gray-600 mx-1"></div>
                <button type="button" title="Ordered List" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('insertOrderedList')} className="p-2 rounded hover:bg-gray-700"><ListOrderedIcon /></button>
                <button type="button" title="Bulleted List" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('insertUnorderedList')} className="p-2 rounded hover:bg-gray-700"><ListIcon /></button>
                <div className="w-px h-6 bg-gray-600 mx-1"></div>
                <button type="button" title="Insert Link" onMouseDown={e => e.preventDefault()} onClick={handleLink} className="p-2 rounded hover:bg-gray-700"><LinkIcon /></button>
                <button type="button" title="Upload Image" onMouseDown={e => e.preventDefault()} onClick={handleImageClick} className="p-2 rounded hover:bg-gray-700"><ImageIcon /></button>
                <div className="w-px h-6 bg-gray-600 mx-1"></div>
                <button type="button" title="Align Left" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('justifyLeft')} className="p-2 rounded hover:bg-gray-700"><AlignLeftIcon /></button>
                <button type="button" title="Align Center" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('justifyCenter')} className="p-2 rounded hover:bg-gray-700"><AlignCenterIcon /></button>
                <button type="button" title="Align Right" onMouseDown={e => e.preventDefault()} onClick={() => executeCommand('justifyRight')} className="p-2 rounded hover:bg-gray-700"><AlignRightIcon /></button>
            </div>
            <input 
                type="file" 
                ref={imageInputRef} 
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden" 
            />
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onBlur={saveSelection}
                className="prose prose-invert max-w-none p-4 min-h-[150px] focus:outline-none"
            />
        </div>
    );
};

export default RichTextEditor;