#!/usr/local/bin/node
'use strict';
/**
* @file re-extract.js
* @brief A simple package to extract multiple named-matches from a larger text via regular expressions.
* @author Anadian
* @copyright 	Copyright 2019 Canosw
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//Dependencies
	//Internal
	//Standard
	const Utility = require('util');
	//External

//Constants
const FILENAME = 're-extract.js';
const MODULE_NAME = 'REExtract';
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 're-extract';
} else{
	PROCESS_NAME = process.argv0;
}

//Global Variables
var Logger = { 
	log: () => {
		return null;
	}
};
//Functions
function Logger_Set( logger ){
	var _return = [1,null];
	const FUNCTION_NAME = 'Logger_Set';
	//Variables
	var function_return = [1,null];

	//Parametre checks
	if( typeof(logger) === 'object' ){
		if( logger === null ){
			logger = { 
				log: () => {
					return null;
				}
			};
		}
	} else{
		_return = [-2,'Error: param "logger" is not an object.'];
	}

	//Function
	if( _return[0] === 1 ){
		Logger = logger;
		_return = [0,null];
	}

	//Return
	return _return;
}
/**
* @fn REExtract_ObjectFromRegexSpecAndData
* @brief Takes a regex-spec object and a string and returns and object containing each key from the regex-spec object with the first subpattern of the match.
* @param regex_spec
*	@type 
*	@brief An object with each property being a string denoting a regex pattern. Each of these named patterns will be matched against the `data` string with the first subpattern result being returned in the object.
* @param data
*	@type 
*	@brief The string to search for matches in.
* @return <ARRAY>
*	@entry 0 
*		@retval 1 premature return.
*		@retval 0 on success.
*		@retval <0 on failure.
*	@entry 1
*		@retval <object> on success
*		@retval <error_message> on failure.
*/
function REExtract_ObjectFromRegexSpecAndData( regex_spec, data ){
	var _return = [1,null];
	const FUNCTION_NAME = 'REExtract_ObjectFromRegexSpecAndData';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: Utility.format('received: ', arguments)});
	//Variables
	var output_object = {};
	var regex_spec_keys = null;
	var match_result = null;
	var regex = null;
	//Parametre checks
	if( regex_spec == null || typeof(regex_spec) !== 'object' ){
		 _return = [-2, 'Error: param "regex_spec" is either null or not an object.'];
	}
	if( data == null || typeof(data) !== 'string' ){
		_return = [-3, 'Error: param "data" is either null or not a string.'];
	}
	
	//Function
	if( _return[0] === 1 ){
		regex_spec_keys = Object.keys(regex_spec);
		for( var i = 0; i < regex_spec_keys.length; i++ ){
			regex = new RegExp(regex_spec[regex_spec_keys[i]]);
			match_result = data.match(regex);
			//Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: Utility.format('match_result: %o', match_result)});
			if( match_result != null ){
				output_object[regex_spec_keys[i]] = match_result[1];
			}
		}
		_return = [0,output_object];
	}

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: Utility.format('returned: ', _return)});
	return _return;
}

//Exports and Execution
if(require.main === module){
} else{
	exports.SetLogger = Logger_Set;
	exports.ExtractObjectFromRegexSpecAndData = REExtract_ObjectFromRegexSpecAndData;
}

