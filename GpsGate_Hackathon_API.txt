/** 
 * API for the GpsGate Hackathon web service.
 *
 * Notes: 
 *
 * - All methods are asynchronous and return s.c. Deferreds (Promises) (using the MochiKit library)
 * @see http://mochi.github.io/mochikit/doc/html/MochiKit/Async.html#fn-deferred 
 * Same concept as for example jQuery's Promise. 
 * Think: jQuery.done() == Deferred.addCallback(). jQuery.fail() == Deferred.addErrback(). jQuery.always() == Deferred.addBoth().
 *
 * - the returned data is (pre-evaluated) JSON. See description below.
 * tips: use http://jsbeautifier.org/ to help readability when debugging
 * 
 * Annotation:
 * - A "!" prefix means the object can/will not be null.
 * - "Date" is the JavaScript date object.
 * - "integer" indicates that the number is assumed to have no fractional part (even though only "number" exist in JavaScript)
 * 
 */

 
// --- JSON data specification ---

/** 
 * JSON specification for User object
 * @see GetUpdatedUsers()
 */
var User = {
	id: integer,
	username: string,
	name: string,
	surname: string,
	description: string,
	deviceActivity: !Date, // timestamp (not necessarily with valid position)
	
	trackPoint: {
		pos: {
			lat: number, // latitude, degrees
			lng: number, // longitude, degrees			
			alt: number  // altitude, meters
		},
		vel: {
			speed: number,	// meters per second
			heading: number // direction. degrees, 0 == north, 90 == east, 180 == south
		},
		utc: !Date, // timestamp
		valid: boolean // is position valid?
	}
	
	// (... also some more properties but not essential)
};

/** 
 * JSON specification for Location object
 * @see GetNearbyLocations()
 */
var Location = {
	name: string, 	
	distance: number, // meters	
	heading: number // relative _your_ position. degrees, 0 == north, 90 == east, 180 == south
};


// --- methods ---

/** 
 * Get list of nearby locations.
 * (takes no arguments)
 * @return {!Deferred.<!Array.<!Location>>}
 */
GpsGate.Server.Hackathon.GetNearbyLocations();

/** 
 * Get most recently updated users.
 * (takes no arguments)
 * @return {!Deferred.<!{users: !Array.<!User>, queryTimeStamp: !Date}>}
 */
GpsGate.Server.Hackathon.GetUpdatedUsers();

/**
 *  
 * @param {number} latitude north-south. degrees, from Equator (-90 -> 90)
 * @param {number} longitude west-east. degrees, from Greenwich (-180 -> 180)
 * @param {number} velocity  meters per second
 * @param {number} heading direction. degrees, clockwise 0 == north, 90 == east, 180 == south 
 * @return {!Deferred.<void>} 
 */
GpsGate.Server.Hackathon.UpdatePosition(latitude, longitude, velocity, heading);

