 var timeZoneAbbreviations = [
			/* Hawaii-Aleutian Standard/Daylight Time */
			{abbr:"HAST", zone:"GMT-1000"},
			{abbr:"HADT", zone:"GMT-0900"},
			/* Alaska Standard/Daylight Time */
			{abbr:"AKST", zone:"GMT-0900"},
			{abbr:"ASDT", zone:"GMT-0800"},
			/* Pacific Standard/Daylight Time */
			{abbr:"PST", zone:"GMT-0800"},
			{abbr:"PDT", zone:"GMT-0700"},
			/* Mountain Standard/Daylight Time */
			{abbr:"MST", zone:"GMT-0700"},
			{abbr:"MDT", zone:"GMT-0600"},
			/* Central Standard/Daylight Time */
			{abbr:"CST", zone:"GMT-0600"},
			{abbr:"CDT", zone:"GMT-0500"},
			/* Eastern Standard/Daylight Time */
			{abbr:"EST", zone:"GMT-0500"},
			{abbr:"EDT", zone:"GMT-0400"},
			/* Atlantic Standard/Daylight Time */
			{abbr:"AST", zone:"GMT-0400"},
			{abbr:"ADT", zone:"GMT-0300"},
			/* Newfoundland Standard/Daylight Time */
			{abbr:"NST", zone:"GMT-0330"},
			{abbr:"NDT", zone:"GMT-0230"},
			/* London Standard/Daylight Time */
			{abbr:"BST", zone:"GMT+0100"},
			{abbr:"GMT", zone:"GMT+0000"}
		];
		
		/**
		 * Return local system timzezone abbreviation.
		 * */
		function getTimeZone()
		{
			var nowDate = new Date();
			var DST = isObservingDTS();
			var GMT = buildTimeZoneDesignation(nowDate, DST);
			
			return parseTimeZoneFromGMT(GMT);
		}
		
		/**
		 * Determines if local computer is observing daylight savings time for US and London.
		 * */
	    function isObservingDTS()
		{
			var winter = new Date(2011, 01, 01); // after daylight savings time ends
			var summer = new Date(2011, 07, 01); // during daylight savings time
			var now = new Date();
			
			var winterOffset = winter.getTimezoneOffset();
			var summerOffset = summer.getTimezoneOffset();
			var nowOffset = now.getTimezoneOffset();
			
			if((nowOffset == summerOffset) && (nowOffset != winterOffset)) {
				return true;
			} else {
				return false;
			}	
		}
		
		/**
		 * Goes through the timze zone abbreviations looking for matching GMT time.
		 * */
		function parseTimeZoneFromGMT(gmt) 
		{
			timeZoneAbbreviations.forEach(function(obj){
				if(obj['zone'] == gmt){
					return obj.abbr;
				}
			});
			/*angular.forEach(timeZoneAbbreviations,function(obj) {
				if(obj['zone'] == gmt){
					return obj.abbr;
				}
			})*/
			return gmt;
		}
		
		/**
		 * Method to build GMT from date and timezone offset and accounting for daylight savings.
		 * 
		 * Originally code befor modifications:
		 * http://flexoop.com/2008/12/flex-date-utils-date-and-time-format-part-i/
		 * */
		function buildTimeZoneDesignation( date, dts  ) 
		{
			if ( !date ) {
				return "";
			}
			
			var timeZoneAsString = "GMT";
			var timeZoneOffset;
			
			// timezoneoffset is the number that needs to be added to the local time to get to GMT, so
			// a positive number would actually be GMT -X hours
			if ( date.getTimezoneOffset() / 60 > 0 && date.getTimezoneOffset() / 60 < 10 ) {
				timeZoneOffset = (dts)? ( date.getTimezoneOffset() / 60 ):( date.getTimezoneOffset() / 60 - 1 );
				timeZoneAsString += "-0" + timeZoneOffset.toString();
			} else if ( date.getTimezoneOffset() < 0 && date.timezoneOffset / 60 > -10 ) {
				timeZoneOffset = (dts)? ( date.getTimezoneOffset() / 60 ):( date.getTimezoneOffset() / 60 + 1 );
				timeZoneAsString += "+0" + ( -1 * timeZoneOffset ).toString();
			} else {
				timeZoneAsString += "+00";
			}
			
			// add zeros to match standard format
			timeZoneAsString += "00";
			return timeZoneAsString;
        }
    function  getTimeZoneOffsetBasedOnDTS( date, dts) 
		{
			if ( !date ) {
				return -1;
			}
			
			var timeZoneOffset;
			
			// timezoneoffset is the number that needs to be added to the local time to get to GMT, so a positive number would actually be GMT -X hours
			// eg. India is utc+5:30 from utc and getTimezoneOffset returns offset from India to Utc i.e. - 5:30 
			timeZoneOffset = (dts)? (date.getTimezoneOffset() / 60 ):(date.getTimezoneOffset() / 60 + 1 );
			return timeZoneOffset *60;

        }

 function getTimezoneAbbreviation( date, dts) 
		{
			if ( !date ) {
				return "";
			}
			
			
			var timeZoneOffset;
			
			// timezoneoffset is the number that needs to be added to the local time to get to GMT, so
			// a positive number would actually be GMT -X hours
			
			timeZoneOffset = (dts)? ( date.getTimezoneOffset() / 60 ):(date.getTimezoneOffset() / 60 + 1 );
			var timeZoneOffsetWithSign = -(timeZoneOffset);
			
			var timeZoneAsString = timeZoneOffsetWithSign.toString();
			if (timeZoneAsString.charAt(0) == "-")
			{
				timeZoneAsString = "GMT" +timeZoneOffsetWithSign;
			}
			else
			{
				timeZoneAsString = "GMT+" +timeZoneOffsetWithSign;
			}
			
			var dtsTimezone = parseTimeZoneFromGMT(timeZoneAsString);
			
			return dtsTimezone;
		}