# CommonJS-modules-Wakanda

_(c) 4D SAS. Thibaud Arguillere_
_License: MIT, "Do whatever You Want With the Source Code"_

_Last update: 2012-07-03_

A set of files to be used as [CommonJS](http://www.commonjs.org/) module with [Wakanda](http://www.wakanda.org).

As of today, most of the modules also work with any CommonJS compliant application, some as juste pure utilities (RichDate.js for example).

Each file has its own documentation and description in its header, functions are just listed below.

This is "Work in progress". _But_, still, these modules have been written to solve real problems, and every function is used in different applications. It explains why some modules have only one function: I usually add function only when I need it. And it's a good coding practice actually: Don't put in an object (a module or whatever) any variable, function, property you don't really need. For example, don't always add a getter for every setter: You need a setter? Write it. 2 months later, yiou need a getter, well, just code it.

As of today, the modules don't extend existing classes. There are two reasons for this choice. First, it is recognized as not-the-best practice to extend _native_ JS objects. Here, the RichDate module does not extend the Date object, it encapsulates a private Date variable. Second, for internal reasons in the C++ of Wakanda Server, some SSJS objects can't be extended as of today. It is the case of the Folder and the File classes. The RichFolder and RichFile utilies also (as RichDate) encapsulates the natibve object.


# Documentation

Each file has its own documentation and description in its header.

## RichDate
	
Written using, basically, [date.js](http://www.datejs.com), so 1,000 thanks for this super set of Date routines.

####Usage

    var RichDate = require('RichDate').RichDate;
    var rd = new RichDate();
    rd.addMonths(5);
    if(rd.isLeapYear()) {
        //. . . do something
    }

####Constructor
    // Same as Date
        new RichDate()
        new RichDate(milliseconds)
        new RichDate(dateString)
        new RichDate(dateObject)
        new RichDate(year, month, day[, hour, minutes, seconds, milliseconds])
    
    //Specific
        new RichDate(aRichDate object)

####Class methods
        RichDate.createFromJSONDate()inJSONDate)
        RichDate.isLeapYear(inYear)
        RichDate.getDaysInMonth(inYear, inMonth)
        RichDate.getISOWeekNumber(inYearOrDate, inM, inD)
        RichDate.toStringYYYYMMDD(inParam, inIgnoreMinus)

####Instance methods
    // Date-like
        getFullYear()
        getFullYear()
        getMonth()
        toString()
    
    // Specific
        addDays(inHowMany)
        addHours(inHowMany)
        addMonths(inHowMany)
        addSeconds(inHowMany)
        changeTime([inH, inM, inS, inMS])
        clearTime()
        clone()
        compareTo(inOther)
        equalsTo(inOther)
        getDaysInMonth()
        getMonthName(inAbbr)
        getNativeDate(inClone)
        getISOWeekNumber()
        isLeapYear()
        moveToDayOfWeek(inDayNum, inOrient)
        moveToFirstDayOfMonth()
        moveToLastDayOfMonth()
        toStringHHMMSS(inSeparator)
        toStringYYYYMMDD(inIgnoreMinus)

## RichFile

Handling File object(s)

####Usage

    var RichFile = require('RichFile').RichFile;
    var rf = new RichFile( ds.getModelFolder(), "aaLog.txt");
    rf.writeText("here, your log...");

####Constructor
    // Same as File
        new RichFile(fullPath);
        new RichFile(aFolderObject, aFileName);

    // Specific
        new RichFile(aFile);
        new RichFile(aRichFile);

###Properties
        path
            read-only
        name
            read-write
        exists
            read-only
        lastModifiedDate
            read-write

###Class methods
        getFile(inFileOrPath, inWantRichFile)
        writeText(inFileOrPath, inText, inAppend)

###Instance methods

        getNativeFile(inClone)
        getText()
        toString()
        toTextArray(inCharset)
        writeText(inText, inAppend)

## RichFolder

####Usage

    var RichFolder = require('RichFolder').RichFolder;
    var rf = new RichFolder( ds.getModelFolder().path + 'MyFolder');
    if(rf.countFile() > 0) {
        // . . .
    }

####Constructor
    // Same as Folder
        new RichFolder(fullPath)

    // Specific
        new RichFolder(aFolder);
        new RichFolder(aRichFolder);

####Properties
        path
            read-only
        exists
            read-only

####Class methods
        getFolder(inFolderOrPath, inWantRichFolder)

####Instance methods

        countFiles(inCallback)
        getFiles(inCallback, inGetRichFile)
        getNativeFolder()
        toString()
        

## utilsCollection

Handling a collection of entities.

####Functions

    reduce(inCollection, inHowMany)
    some(inCollection, inCallback)

## utilsEntity

Handling a the current entity.

####Functions
(As for utilsCollection, we have just one function here)

    save(inEntity)

## utilsMisc
As usual. You know. Things you can't put in other modules.

####Functions

    equalStrings(inStr1, inStr2)
    isInteger(inString)
    randomForIntegers(inMin, inMax)

## License

Release under the MIT license.

July 3, 2012.