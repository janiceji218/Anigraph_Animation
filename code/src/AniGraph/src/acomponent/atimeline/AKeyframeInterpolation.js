import AObject from "../../aobject/AObject";
import Vector from "../../amath/Vector";


function _repeatarray(value, len){
    var r = [];
    for(var i=0;i<len;i++){
        r.push(value);
    }
    return r;
}

export default class AKeyframeInterpolation extends AObject{
    constructor(args) {
        super(args);
        this.startKey = (args && args.startKey!==undefined)? args.startKey : undefined;
    }
    /** Get set startKey */
    set startKey(value){this._tempState.startKey = value;}
    get startKey(){return this._tempState.startKey;}
    get endKey(){return this.startKey? this.startKey.nextKey: undefined;}

    get ValueClass(){
        return this.startKey.value.constructor;
    }

    getEndKeyValue(){
        return this.endKey? this.endKey.value : this.startKey.value;
    }
    getEndKeyTime(){
        return this.endKey? this.endKey.time : this.startKey.time;
    }
    get nValueDimensions(){
        if(this.startKey.value instanceof Vector){
            return this.startKey.value.elements.length;
        }else{
            return undefined;
        }
    }

    getTimeRange(){
        return [this.startKey.time, this.getEndKeyTime()];
    }

    _getEndKeyTimeVec(){
        var endkeytime = this.getEndKeyTime();
        var nkeydims = this.nValueDimensions;
        if(nkeydims<2){
            return endkeytime;
        }
        return new this.startKey.value.constructor(_repeatarray(endkeytime, nkeydims));
    }
    _getStartKeyTimeVec(){
        var nkeydims = this.nValueDimensions;
        if(nkeydims<2){
            return this.startKey.time;
        }
        return new this.startKey.value.constructor(_repeatarray(this.startKey.time, nkeydims));
    }

    setStartHandleAbsoluteTimeAndValueDimension(time, value, dimension){
        if(dimension!==undefined){
            if(!this.startHandle){
                var starthandletimeabs = this.getStartHandleTimeAbsolute();
                var startHandleInitTime = starthandletimeabs.minus(new this.startKey.value.constructor(_repeatarray(this.startKey.time, this.nValueDimensions)));
                this.startHandle = {
                    time:startHandleInitTime,
                    value: this.getStartHandleValueAbsolute().minus(this.startKey.value)
                }
            }
            this.startHandle.time.elements[dimension]=time-this.startKey.time;
            this.startHandle.value.elements[dimension]=value-this.startKey.value.elements[dimension];
        }else{
            if(!this.startHandle){
                this.startHandle = {
                    time:this.getStartHandleTimeAbsolute()-this.startKey.time,
                    value:this.getStartHandleValueAbsolute()-this.startKey.value
                }
            }
            this.startHandle.time = time-this.startKey.time;
            this.startHandle.value = value-this.startKey.value;
        }
    }
    setEndHandleAbsoluteTimeAndValueDimension(time, value, dimension){
        if(dimension!==undefined){
            if(!this.endHandle){
                var endhandletimeabs = this.getEndHandleTimeAbsolute();
                var endHandleInitTime = endhandletimeabs.minus(new this.startKey.value.constructor(_repeatarray(this.endKey.time, this.nValueDimensions)));
                // new this.startKey.value.constructor(_repeatarray(this.getEndHandleTimeAbsolute()-time, this.nValueDimensions)),
                this.endHandle = {
                    time:endHandleInitTime,
                    value: this.getEndHandleValueAbsolute().minus(this.getEndKeyValue())
                }
            }
            this.endHandle.time.elements[dimension]=time-this.getEndKeyTime();
            this.endHandle.value.elements[dimension]=value-this.getEndKeyValue().elements[dimension];
        }else{
            if(!this.endHandle){
                this.endHandle = {
                    time:this.getEndHandleTimeAbsolute()-this.getEndKeyTime(),
                    value:this.getEndHandleValueAbsolute()-this.getEndKeyValue()
                }
            }
            this.endHandle.time = time-this.getEndKeyTime();
            this.endHandle.value = value-this.getEndKeyValue();
        }
    }

    /** Get set startHandle */
    set startHandle(value){this._startHandle = value;}
    get startHandle(){return this._startHandle;}

    /** Get set endHandle */
    set endHandle(value){this._endHandle = value;}
    get endHandle(){return this._endHandle;}

    getValueAtTime(t){
        return this.getValueAtTimeLinear(t);
    }

    getValueAtTimeLinear(t){
        var duration = this.endKey.time-this.startKey.time;
        var offset = t-this.startKey.time;
        var alpha = offset/duration;
        var beta = 1.0-alpha;
        const self = this;
        if(typeof this.startKey.value==="number") {
            return alpha * this.getEndKeyValue() + beta * self.startKey.value;
        }
        if(this.startKey.value instanceof Vector){
            return this.endKey.value.times(alpha).plus(this.startKey.value.times(beta));
        }
    }

    getStartHandleValueAbsolute(){
        if(this.startKey.value instanceof Vector){
            if(!this.startHandle){
                var endkeyval = this.getEndKeyValue();
                return endkeyval.times(0.333333333).plus(this.startKey.value.times(0.666666666));
            }else{
                return this.startKey.value.plus(this.startHandle.value);
            }
        }else{
            if(!this.startHandle){
                var endkeyval = this.getEndKeyValue();
                return (endkeyval*0.333333333)+(this.startKey.value*0.666666666);
            }else{
                return this.startKey.value+this.startHandle.value;
            }
        }
    }

    getEndHandleValueAbsolute(){
        if(this.startKey.value instanceof Vector){
            if(!this.endHandle){
                var endkeyval = this.getEndKeyValue();
                return this.startKey.value.times(0.333333333).plus(endkeyval.times(0.666666666));
            }else{
                return this.endHandle.value.plus(this.getEndKeyValue());
            }
        }else{
            if(!this.endHandle){
                var endkeyval = this.getEndKeyValue();
                return (this.startKey.value*0.333333333)+(endkeyval*0.666666666);
            }else{
                return this.endHandle.value+this.getEndKeyValue();
            }
        }
    }
    getStartHandleTimeAbsolute(){
        if(this.startKey.value instanceof Vector){
            if(!this.startHandle){
                var endkeycontrib = this._getEndKeyTimeVec().times(0.333333333);
                var startkeycontrib =this._getStartKeyTimeVec().times(0.666666666);
                return endkeycontrib.plus(startkeycontrib);
            }else{
                return this._getStartKeyTimeVec().plus(this.startHandle.time);
            }
        }else{
            if(!this.startHandle){
                var endkeytime = this.getEndKeyTime();
                return (endkeytime*0.333333333)+(this.startKey.time*0.666666666);
            }else{
                return this.startKey.time+this.startHandle.time;
            }
        }
    }

    getEndHandleTimeAbsolute(){
        if(this.startKey.value instanceof Vector){
            if(!this.endHandle){
                return this._getStartKeyTimeVec().times(0.333333333).plus(this._getEndKeyTimeVec().times(0.666666666));
            }else{
                return this.endHandle.time.plus(this._getEndKeyTimeVec());
            }
        }else{
            if(!this.endHandle){
                var endkeytime = this.getEndKeyTime();
                return (this.startKey.time*0.333333333)+(endkeytime*0.666666666);
            }else{
                return this.endHandle.time+this.getEndKeyTime();
            }
        }
    }
}

AObject.RegisterClass(AKeyframeInterpolation);