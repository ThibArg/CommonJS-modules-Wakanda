﻿/*	RichDate.js	A CommonJS (http://www.commonjs.org/) module handling Dates.	With ***a lot of thanks*** to date.js, http://www.datejs.com/ The code used here	comes for 90% from this awesome utility.		(c) 4D SAS, author: Thibaud Arguillere	License: MIT. See the license at the end of this source code		Version		1.0, 2012-07-14		Usage:		var RichDate = require('RichDate').RichDate;		//. . . you can now use the extended dates . . .				var rd = new RichDate();		rd.addMonths(3);		rd.addDays(-6);		switch( rd.getNativeDate().getDay() ) {			case RichDate.MONDAY:			case RichDate.TUESDAY:			case RichDate.WEDNESDAY:				// . . . do somthing . . .				break;						default:				// . . . do somthing else. . .				break;		}		NOTE: the line...			var RichDate = require('RichDate').RichDate;		...may looks strange. But it is not. You can actually write...			var whateverNameYouWant = require('RichDate').RichDate;		...and then:			var rd = new whateverNameYouWant();				But you can't use RichDate without the context of the module. For example,		just calling...			require('RichDate');		... and then ...			var rd = new RichDate();		... doesn't work.		This is done for namespacing, making sure a development does not already	has a RichDate object. That's also why I usually, in this context, use	a variable that has the same name as the class in the module...		var RichDate = require('RichDate').RichDate;	...it makes it easier to read later, when I just use RichDate.		Months and days are used as in the Date object (month range is 0-11, day range is  1-31).		--------------------------------------	Constructor:	--------------------------------------	Same as Date:		new RichDate()		new RichDate(milliseconds)		new RichDate(dateString)		new RichDate(dateObject)		new RichDate(year, month, day[, hour, minutes, seconds, milliseconds])		Specific:		new RichDate(aRichDate);		Can throw an error if the parameter is invalid (dateString unknown format)		--------------------------------------	Class methods	--------------------------------------	RichDate.isLeapYear(inYear)	RichDate.getDaysInMonth(inYear, inMonth)	RichDate.getISOWeekNumber(inYearOrDate[, inMonth, inDay])		RichDate.toStringYYYYMMDD(inDateOrRichDate[, inIgnoreMinusSign])		inDateOrRichDate is a Date or a RichDate (throws a TypeError if needed)		Returns a string formatting the date (not the time). For example, for		May 15, 2012:				"2012-05-15"			or	"20120515" if inIgnoreMinusSign is true		--------------------------------------	Properties	--------------------------------------	year		Read-only. Wrapper for getFullYear();	month		Read-only. Wrapper for getMonth();	date		Read-only. Wrapper for getDate();					--------------------------------------	Instance methods	--------------------------------------	Date-like methods		toString()		getFullYear()		getMonth()		Specific		toStringYYYYMMDD(inIgnoreMinusSign)			return the string date as"YYYY-MM-DD". ie "2012-06-01"			(months are from "01" to "12", days from "01" to "31")			If inIgnoreMinusSign is true, returns "20120601"		toStringHHMMSS([inSeparator])			return the string time. If inSeparator is undefined or null, the			separator used is ":".			theRD.toStringHHMMSS() => "12:03:27"			theRD.toStringHHMMSS('') => "120327"			theRD.toStringHHMMSS('*') => "12*03*27"				getNativeDate()			Returns the Date object encapsulated in the RichDate.			This function is provided to avoid wrapping all the Date function. For example:				aRichDate.getNativeDate().getTime();			or				aRichDate.getNativeDate().getYear();						WARNING: It returns a reference to the Date object, not a clone.						NOTE: There are some exceptions. For example, because getMonth(), to String() and				  getFullYear() were often used in our developments, they became wrappers in				  the RichDate object, to avoid calling getNativeDate() everytime, or to avoid				  holding a temp. Date variable.				compareTo(inOther)			inOther can be a Date or a RichDate (throw TypeError if its not a Date or a RichDate)			returns 1 if inOther is lower, -1 if inOther is greater, 0 if they are the same				equalsTo(inOther)			inOther can be a Date or a RichDate (throw TypeError if its not a Date or a RichDate)			returns true/false				isLeapYear()		getDaysInMonth()				addSeconds(inHowMany)		addHours(inHowMany)		addDays(inHowMany)		addMonths(inHowMany)			Adds inHowMany days/months/hours to the date. inHowMany can be < 0			Returns the new value (not cloned, it's a reference)				changeTime([inH, inMn, inSec, inMs])		clearTime()				moveToFirstDayOfMonth()		moveToLastDayOfMonth()				getMonthName(inAbbr)*/(function scope_RichDate() {	//--------------------------------------	//Constants (used internally	//--------------------------------------	const _DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];	const _MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];	const _MONTH_NAMES_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];		function _isValidDayOfWeek(inDayOfWeek) {		return !isNaN(inDayOfWeek) && inDayOfWeek >= 0 && inDayOfWeek < 7;	}		// Different parameters are allowed in the constructor, especially	// the first one, that can e a Date, a string, a RichDate or a number (the year)	/*_RichDate = */function _RichDate(inP1, inM, inD, inH, inMn, inS, inMS) {		var _date;				if (typeof inP1 === 'undefined') {			_date = new Date();		} else if(inP1 instanceof _RichDate) {			_date = new Date(inP1.getNativeDate());		} else if(inP1 instanceof Date) {			_date = new Date(inP1);		} else {			inM = inM ? inM : 0;			inD = inD ? inD : 0;			inH = inH ? inH : 0;			inMn = inMn ? inMn : 0;			inS = inS ? inS : 0;			inMS = inMS ? inMS : 0;			_date = new Date(inP1, inM, inD, inH, inMn, inS, inMS);		}				//--------------------------------------		// Properties		//--------------------------------------		this.__defineGetter__('year', function() { return _date.getFullYear(); });		this.__defineSetter__('year', function(inValue) { throw new TypeError(); });		this.__defineGetter__('month', function() { return _date.getMonth(); });		this.__defineSetter__('month', function(inValue) { throw new TypeError(); });		this.__defineGetter__('date', function() { return _date.getDate(); });		this.__defineSetter__('date', function(inValue) { throw new TypeError(); });				//--------------------------------------		//Instance methods		//--------------------------------------		this.clone = function() {			return new _RichDate(_date);		}				this.toString = function() {			return _date.toString();		}				this.toStringYYYYMMDD = function(inIgnoreMinus) {			var m = _date.getMonth() + 1,				d = _date.getDate();				if(inIgnoreMinus) {				return '' + _date.getFullYear() + (m < 10 ? '0' + m : m) + (d < 10 ? '0' + d : d);			} else {				return '' + _date.getFullYear() + "-" + (m < 10 ? '0' + m : m) + "-" + (d < 10 ? '0' + d : d);			}		}				this.toStringHHMMSS = function (inSeperator) {			var h = _date.getHours(),				m = _date.getMinutes(),				s = _date.getSeconds();						if(typeof inSeperator !== 'string') {				inSeperator = ':';			}						return '' + (h < 10 ? '0' + h : h) + inSeperator + (m < 10 ? '0' + m : m) + inSeperator + (s < 10 ? '0' + s : s);					}				// We don't want to use getDate(), which is a Date method		this.getNativeDate = function(inClone) {			if(inClone) {				return new Date(_date);			} else {				return _date;			}		}				this.compareTo = function(inOther) {			var d = inOther instanceof _RichDate ? inOther.getNativeDate() : inOther;						if (isNaN(d)) {				throw new Error(this);			}						if(!(d instanceof Date)) {				throw new TypeError(d);			}						return (_date > d) ? 1 : (_date < d) ? -1 : 0;		}				this.equalsTo = function(inOther) {			return this.compareTo(inOther) === 0;		}				this.isLeapYear = function() {			return _RichDate.isLeapYear(_date.getFullYear());		}				this.getDaysInMonth = function() {			return _RichDate.getDaysInMonth(_date.getFullYear(), _date.getMonth())		}				this.addDays = function(inHowMany) {			_date.setMilliseconds( _date.getMilliseconds() + (inHowMany * 86400000) );			return this;		}				this.addMonths = function(inHowMany) {			var n = _date.getDate();						_date.setDate(1);			_date.setMonth(_date.getMonth() + inHowMany);			_date.setDate(Math.min(n, this.getDaysInMonth()));						return this;		}				this.addHours = function(inHowMany) {			_date.setMilliseconds( _date.getMilliseconds() + (inHowMany * 3600000) );			return this;		}				this.addSeconds = function(inHowMany) {			_date.setMilliseconds( _date.getMilliseconds() + (inHowMany * 1000) );			return this;		}				this.getFullYear = function() {			return _date.getFullYear();		}				this.getMonth = function() {			return _date.getMonth();		}				this.getMonthName = function(inAbbr) {			if(inAbbr) {				return _MONTH_NAMES_ABBR[_date.getMonth()];			} else {				return _MONTH_NAMES[_date.getMonth()];			}		}				this.getISOWeekNumber = function() {			return _RichDate.getISOWeekNumber(_date);		}				// "changeTime" because setTime() is Date instance method.		this.changeTime = function(inH, inM, inS, inMS) {			inH = inH ? inH : 0;			inM = inM ? inM : 0;			inS = inS ? inS : 0;			inMS = inMS ? inMS : 0;						_date.setHours(inH);			_date.setMinutes(inM);			_date.setSeconds(inS);			_date.setMilliseconds(inMS);						return this;		}				this.clearTime = function() {			_date.setHours(0);			_date.setMinutes(0);			_date.setSeconds(0);			_date.setMilliseconds(0);						return this;		}				this.moveToFirstDayOfMonth = function() {			_date.setDate(1);			return this;		}				this.moveToLastDayOfMonth = function() {			_date.setDate( this.getDaysInMonth() );			return this;		}				this.moveToDayOfWeek = function(inDayNum, inOrient) {			var diff;						inOrient = inOrient ? inOrient : 1;			if(inOrient < 0) {				inOrient = -1;			} else {				inOrient = 1;			}						diff = (inDayNum - _date.getDay() + 7 * inOrient) % 7;			return this.addDays((diff === 0) ? diff += 7 * inOrient : diff);		}	}		//--------------------------------------	//Class methods	//--------------------------------------	_RichDate.createFromJSONDate = function(inJsonDate) {		var y, m, d, h, mn;				y = parseInt(inJsonDate.substr(0, 4));		m = parseInt(inJsonDate.substr(5, 2)) - 1;		d = parseInt(inJsonDate.substr(8, 2));		h = parseInt(inJsonDate.substr(11, 2));		mn = parseInt(inJsonDate.substr(14, 2));		s = parseInt(inJsonDate.substr(17, 2));				return new _RichDate(y, m, d, h, mn, s);	}		_RichDate.isLeapYear = function(inYear) {		return (((inYear % 4 === 0) && (inYear % 100 !== 0)) || (inYear % 400 === 0));	}	_RichDate.getDaysInMonth = function(inYear, inMonth) {		if(inMonth === 1) {			return _RichDate.isLeapYear(inYear) ? 29 : 28;		} else {			return _DAYS_IN_MONTHS[inMonth];		}	}	_RichDate.getISOWeekNumber = function(inYearOrDate, inM, inD) {		// ISO => week starts monday		var weekNum,			theDate = inYearOrDate instanceof Date ? new Date(inYearOrDate) : new Date(inYearOrDate, inM, inD),			fullYear = theDate.getFullYear(),			newYear = new Date(fullYear, 0, 1),			modDay = newYear.getDay(),			daynum, prevNewYear, prevmodDay;				if (modDay == 0) {			modDay=6;		} else {			modDay -= 1;		}				daynum = ((Date.UTC(fullYear, theDate.getMonth(), theDate.getDate(), 0, 0, 0) - Date.UTC(fullYear,0 ,1 ,0 ,0 , 0)) /1000/60/60/24) + 1;		if (modDay < 4 ) {			weekNum = Math.floor((daynum + modDay - 1) / 7) + 1;		} else {			weekNum = Math.floor((daynum + modDay - 1) / 7);			if (weekNum == 0) {				fullYear -= 1;				prevNewYear = new Date(fullYear, 0, 1);				prevmodDay = prevNewYear.getDay();				if (prevmodDay == 0) {					prevmodDay = 6;				} else {					prevmodDay--;				}				if (prevmodDay < 4) {					weekNum = 53;				} else {					weekNum = 52;				}			}		}				return weekNum;	}	_RichDate.toStringYYYYMMDD = function(inParam, inIgnoreMinus) {		inIgnoreMinus = inIgnoreMinus ? true : false;		if(inParam instanceof Date){			return (new _RichDate(inParam)).toStringYYYYMMDD(inIgnoreMinus);		} else if(inParam instanceof _RichDate) {			return inParam.toStringYYYYMMDD(inIgnoreMinus);		} else if(typeof inParam === 'string') {			return (new _RichDate(inParam)).toStringYYYYMMDD(inIgnoreMinus);		} else {			throw new TypeError(inParam);		}		return "00000000";	}		//--------------------------------------	// Constants. Defined via getter/setter (the setter throw an error)	//--------------------------------------	_RichDate.__defineGetter__( 'SUNDAY', function() { return 0; } );	_RichDate.__defineSetter__( 'SUNDAY', function(inIgnore) { throw new TypeError(); } );	_RichDate.__defineGetter__( 'MONDAY', function() { return 1; } );	_RichDate.__defineSetter__( 'MONDAY', function(inIgnore) { throw new TypeError(); } );	_RichDate.__defineGetter__( 'TUESDAY', function() { return 2; } );	_RichDate.__defineSetter__( 'TUESDAY', function(inIgnore) { throw new TypeError(); } );	_RichDate.__defineGetter__( 'WEDNESDAY', function() { return 3; } );	_RichDate.__defineSetter__( 'WEDNESDAY', function(inIgnore) { throw new TypeError(); } );	_RichDate.__defineGetter__( 'THURSDAY', function() { return 4; } );	_RichDate.__defineSetter__( 'THURSDAY', function(inIgnore) { throw new TypeError(); } );	_RichDate.__defineGetter__( 'FRIDAY', function() { return 5; } );	_RichDate.__defineSetter__( 'FRIDAY', function(inIgnore) { throw new TypeError(); } );	_RichDate.__defineGetter__( 'SATURDAY', function() { return 6; } );	_RichDate.__defineSetter__( 'SATURDAY', function(inIgnore) { throw new TypeError(); } );			//--------------------------------------	// Give the object to the CommonJS module	//--------------------------------------	exports.RichDate = _RichDate;	}());/*	License: MIT (http://www.opensource.org/licenses/MIT)	Permission is hereby granted, free of charge, to any person	obtaining a copy of this software and associated documentation	files (the "Software"), to deal in the Software without	restriction, including without limitation the rights to use,	copy, modify, merge, publish, distribute, sublicense, and/or sell	copies of the Software, and to permit persons to whom the	Software is furnished to do so, subject to the following	conditions:		The above copyright notice and this permission notice shall be	included in all copies or substantial portions of the Software.		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR	OTHER DEALINGS IN THE SOFTWARE.*/// --EOF