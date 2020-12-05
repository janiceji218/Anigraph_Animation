import AKeyframeInterpolation from "../../AniGraph/src/acomponent/atimeline/AKeyframeInterpolation";
import AObject from "../../AniGraph/src/aobject/AObject";

// Implement an interpolator for keyframes that uses 2D Bezier Spline in time-value space.
//
export default class ABezierInterpolator extends AKeyframeInterpolation {

    constructor(args) {
        super(args);
    }

    getValueAtTime(time) {
        //Switch which line is commented to use your interpolation method instead
        return this.getValueAtTimeLinear(time);
        // return this.getValueAtTimeBezier(time);
    }

    getControlPointArrays(){
        var controls = [];
        if(this.nValueDimensions!==undefined){
            // getEndKeyTime is a scalar
            var endKeyTime = this.getEndKeyTime();

            // These are all vectors
            var endKeyValues = this.getEndKeyValue();
            var startHandleTimes = this.getStartHandleTimeAbsolute();
            var endHandleTimes = this.getEndHandleTimeAbsolute();
            var startHandleValues = this.getStartHandleValueAbsolute();
            var endHandleValues = this.getEndHandleValueAbsolute();

            for(let d=0;d<this.nValueDimensions;d++){
                var dpoints = [];
                dpoints.push([this.startKey.time, this.startKey.value.elements[d]]);
                dpoints.push([startHandleTimes.elements[d], startHandleValues.elements[d]]);
                dpoints.push([endHandleTimes.elements[d], endHandleValues.elements[d]]);
                dpoints.push([endKeyTime, endKeyValues.elements[d]]);
                controls.push(dpoints);
            }
        }else{
            var dpoints = [];
            dpoints.push([this.startKey.time, this.startKey.value]);
            dpoints.push([this.getStartHandleTimeAbsolute(), this.getStartHandleValueAbsolute()]);
            dpoints.push([this.getEndHandleTimeAbsolute(), this.getEndHandleValueAbsolute()]);
            dpoints.push([this.getEndKeyTime(), this.getEndKeyValue()]);
            controls.push(dpoints);
        }
        return controls;
    }

    getValueAtTimeBezier(t) {
        var controlPointArrays = this.getControlPointArrays()
        if(this.nValueDimensions===undefined){
            return ABezierInterpolator.GetSplineYAtX(t, ...controlPointArrays[0]);
        }else{
            var returnarg = [];
            for(let d=0;d<controlPointArrays.length;d++){
                returnarg.push(ABezierInterpolator.GetSplineYAtX(t, ...controlPointArrays[d]));
            }
            return new this.ValueClass(returnarg);
        }
    }

    //##################//--You should implement the functions below--\\##################
    //<editor-fold desc="You should implement the functions below">

    // [NOTE: the parameter of a spline is ofter referred to as t. However, we are calling it alpha here so as not to confuse it
    // with time, which will in fact be the x dimension of our 2D interpolation splines.]

    // Below you will find three functions for you to implement.
    // AniGraph can keyframe any property that is either a scalar or a Vector (the parent class of Vec2, Vec3, and Point2D / P2D())
    // The basic process for interpolating all of these is the same: each dimension of the property is represented as a 2D Bezier spline
    // where the 2D coordinates represent (time, value). Therefore, scalars are represented as a single 2D spline, while Vec2's are
    // represented as 2 2D splines (one for x, and one for y). The functions below will be called on EACH dimension of whatever property
    // is being interpolated. So, from the perspecting of these functions, you can think of always interpolating a scalar value over time.

    // Recall that we can think of 2D splines as consisting of 1D splines for each coordinate that happen to share their alpha parameter.
    // In this case, we want to figure out the value corresponding to a particular time. To do this, we can first solve for the alpha parameter
    // corresponding to a particular time, and then use that alpha to figure out what the corresponding value is. We've split this task up into
    // the three functions below.

    // You can switch between spline and linear interpolation by changing the commented line of getValueAtTime above. When using Spline interpolation,
    // you can check your results in the app by looking at the current value indicator in the tween editor to see if it follows the rendered splines.
    // Of course, you should be sure to edit the rendered splines when checking this.

    /**
     * Get the value of the spline for specified alpha parameter.
     * @param alpha -- the parameter indicating progress along the spline
     * @param p0 -- first control point (scalar)
     * @param p1 -- second control point (scalar)
     * @param p2 -- third control point (scalar)
     * @param p3 -- fourse control point (scalar)
     * @constructor
     */
    static GetSplineValueForAlpha(alpha, p0, p1, p2, p3){
        // Your code here
    }

    /**
     * Given the four control points of a 2D spline (as arrays with two scalars) return the y coordinate of the spline at the provided x coordinate.
     * In this case, the second and third control points are limited to being in between the first and last control points.
     * This will ensure that the solution is unique. You will want to use the `GetSplineAlphaForValue` function below in your code here.
     * @param x the x coordinate
     * @param xy0 -- first control point ([x, y])
     * @param xy1 -- second control point ([x, y])
     * @param xy2 -- third control point ([x, y])
     * @param xy3 -- fourth control point ([x, y])
     * @constructor
     */
    static GetSplineYAtX(x, xy0,xy1,xy2,xy3){
        // Your code here
    }

    /**
     * Gets the alpha that maps to a specified value in a 1D spline.
     * Any alpha value within 0.001 of the exact answer will receive full credit.
     * HINT: One of the simplest ways to do this uses binary search.
     * @param value
     * @param p0
     * @param p1
     * @param p2
     * @param p3
     * @constructor
     */
    static GetSplineAlphaForValue(value, p0,p1,p2,p3){
        // Your code here
    }

    //</editor-fold>
    //##################\\--You should implement the functions in the section above--//##################


}

AObject.RegisterClass(ABezierInterpolator);


