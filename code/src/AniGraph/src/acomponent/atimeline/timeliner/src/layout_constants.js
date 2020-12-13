// var DEFAULT_TIME_SCALE = 60
var DEFAULT_TIME_SCALE = 120;

// Dimensions
// var LayoutConstants = {
// 	LINE_HEIGHT: 26,
// 	DIAMOND_SIZE: 10,
// 	MARKER_TRACK_HEIGHT: 60,
// 	width: 600,
// 	height: 200,
// 	TIMELINE_SCROLL_HEIGHT: 0,
// 	LEFT_PANE_WIDTH: 250,
// 	time_scale: DEFAULT_TIME_SCALE, // number of pixels to 1 second
// 	default_length: 20, // seconds
// 	DEFAULT_TIME_SCALE
// };

var LayoutConstants = {
	LINE_HEIGHT: 26,
	DIAMOND_SIZE: 10,
	MARKER_TRACK_HEIGHT: 60,
	width: 600,
	height: 200,
	TIMELINE_SCROLL_HEIGHT: 0,
	LEFT_PANE_WIDTH: 350,
	time_scale: DEFAULT_TIME_SCALE, // number of pixels to 1 second
	default_length: 10, // seconds,
	TIMESCALE_RANGE_MIN: -1.5,//confusing because min is actually negative power... just left it that way
	TIMESCALE_RANGE_MAX: 0.1,
	DEFAULT_TIME_SCALE
};

export { LayoutConstants }