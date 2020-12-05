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

    static GetSplineValueForAlpha(alpha, p0, p1, p2, p3){
        // Your code here
    }

    static GetSplineYAtX(x, xy0,xy1,xy2,xy3){
        // Your code here
    }

    static GetSplineAlphaForValue(value, p0,p1,p2,p3){
        // Your code here
    }

    //</editor-fold>
    //##################\\--You should implement the functions in the section above--//##################


}

AObject.RegisterClass(ABezierInterpolator);


