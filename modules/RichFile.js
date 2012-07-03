﻿/*	RichFile.js		(c) 4D SAS, author: Thibaud Arguillere	License: MIT. See the license at the end of this source code	A CommonJS (http://www.commonjs.org/) encapsulating a File object		Usage:		var RichFile = require('RichFile').RichFile		. . . RichFile contains the APIs . . .				var rf = new RichFile( ds.getModelFolder(), "aaLog.txt");		rf.writeText("here, your log...");				Or in one shot		(new RichFile(ds.getModelFolder(), "aaLog.txt")).writeText("here, your log...");		--------------------------------------	Constructor:	--------------------------------------	Same as File:		new RichFile(fullPath);		new RichFile(aFolderObject, aFileName);			Specific:		new RichFile(aFile);		new RichFile(aRichFile);		Constructor can throw an error if a parameter is invalid		--------------------------------------	Class method:	--------------------------------------	getFile(inFileOrPath, inWantRichFile)		For generic coding, receives a File, a RichFile or a string, returns a File or a RichFile			writeText(inFileOrPath, inText, inAppend)		Write inText in inFileOrPath.		inFileOrPath can be a string (full path), a File or a RichFile.		Create the file if it did not exist. Replace the content if it		existed unless inAppend is true (which adds inText at the end		of the file)		--------------------------------------	Properties:	--------------------------------------	Same as File:		path			readonly		name			read-write		exists			read only		lastModifiedDate			read-write		--------------------------------------	Instance methods	--------------------------------------	toString()		Return thefile.path			getNativeFile(inClone)		Returns a File object. If inClone is passed and true, a new File object		is returned, else you get a reference to the encapsulated object.		This function is provided to avoid wrapping all the File functions. For example:			aRichFile.getNativeFile().exists		getText()		Return the content of the file as text		toTextArray(inCharset)		Return an array of strings, one item of the array == one line in the text		writeText(inText, inAppend)		Write inText in the file. Create the file is it did not exist. Replace the		content if it existed unless inAppend is true (which adds inText at the end		of the file)*/(function scope_RichFile() {		// Different parameters are allowed in the constructor, especially	// the first one, that can e a string, a Folder, a File, ...	function _RichFile(inP1, inP2) {		var _file;				if(inP1 instanceof Folder) {	// f = new RichFile(ds.getModelFolder(), "aFile.txt");			_file = File(inP1, inP2);		} else if(inP1 instanceof File) {	// f = new RichFile(aValidFileObject);			_file = File(inP1.path);		} else if(inP1 instanceof RichFile) {	// f = new RichFile(anotherRichfile);			_file = inP1.getNativeFile(true);		} else {								// f = new RichFile(filePathAsString);			_file = File(inP1);		}				//--------------------------------------		// Override and mimic some File properties often used, to avoid		// calling getNativeFile() everytime		//--------------------------------------		this.__defineGetter__('path', function() { return _file.path });		this.__defineSetter__('path', function(inValue) { throw new TypeError(); });				this.__defineGetter__('name', function() { return _file.name });		this.__defineSetter__('name', function(inValue) { _file.name = inValue; });				this.__defineGetter__('exists', function() { return _file.exists });		this.__defineSetter__('exists', function(inValue) { throw new TypeError(); });				this.__defineGetter__('lastModifiedDate', function() { return _file.lastModifiedDate });		this.__defineSetter__('lastModifiedDate', function(inValue) { _file.lastModifiedDate = lastModifiedDate; });						//--------------------------------------		//Instance methods		//--------------------------------------		this.toString = function() {			return _file.path;		};				// Easy access to File functions.		this.getNativeFile = function(inClone) {			if(inClone) {				return File(_file.path);			} else {				return _file;			}		};				this.getText = function() {			return loadText(_file);		};				this.toTextArray = function(inCharset) {			var allLines, fullText;				allLines = [];								if(typeof inCharset === 'string') {				fullText = loadText(_file, inCharset);			} else {				fullText = loadText(_file);			}						if(fullText.indexOf("\r\n") >= 0) {				allLines = fullText.split("\r\n");			} else if(fullText.indexOf("\r") >= 0) {				allLines = fullText.split("\r");			} else {				allLines = fullText.split("\n");			}						fullText = null;						return allLines;		};				this.writeText = function(inText, inAppend) {			if(inText) {				inAppend = inAppend ? true : false;								if(_file.exists) {					if(!inAppend) {						_file.remove();					}				} else {					_file.create();				}								theStream = TextStream(_file, 'write');				theStream.write(inText);				theStream.flush();				theStream.close();			}						return this;		};	};		//--------------------------------------	// Class methods	//--------------------------------------	_RichFile.writeText = function(inFileOrPath, inText, inAppend) {		var aRichFile = new _RichFile(inFileOrPath);		aRichFile.writeText(inText, inAppend);	}		_RichFile.getFile = function(inFileOrPath, inWantRichFile) {		var result = null;				inWantRichFile = inWantRichFile ? true : false;				if(inFileOrPath instanceof File) {						if(inWantRichFile) {				result = new _RichFile(inFileOrPath);			} else {				result = inFileOrPath;			}					} else if(inFileOrPath instanceof _RichFile) {						if(inWantRichFile) {				result = inFileOrPath;			} else {				result = inFileOrPath.getNativeFile();			}					} else if (typeof inFileOrPath === 'string' && inFileOrPath !== '') {			if(inWantRichFile) {				result = new _RichFile(inFileOrPath);			} else {				result = File(inFileOrPath);			}		}			return result;	};		//--------------------------------------	// Give the object to the CommonJS module	//--------------------------------------	exports.RichFile = _RichFile;	}());/*	License: MIT (http://www.opensource.org/licenses/MIT)	Permission is hereby granted, free of charge, to any person	obtaining a copy of this software and associated documentation	files (the "Software"), to deal in the Software without	restriction, including without limitation the rights to use,	copy, modify, merge, publish, distribute, sublicense, and/or sell	copies of the Software, and to permit persons to whom the	Software is furnished to do so, subject to the following	conditions:		The above copyright notice and this permission notice shall be	included in all copies or substantial portions of the Software.		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR	OTHER DEALINGS IN THE SOFTWARE.*/// --EOF