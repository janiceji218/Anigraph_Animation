import AView2D from "./AView2D";
import AObject from "../../aobject/AObject";
import ASVGSubtreeInstanceElement from "../../aweb/svg/ASVGSubtreeInstanceElement";

//##################//--Creating Custom Animated Views--\\##################
/***
 * This file demonstrates how to create a custom view class with animatable
 * properties, which you can use as parameters in procedural graphics.
 *
 */
//##################\\----------------------------------//##################



export default class AInstancerView2D extends AView2D{
    static GUISpecs = [];

    addNewInstance(args){
        var passArgs = Object.assign({
            view: this,
        }, args);
        if(passArgs.twoJSObject===undefined){
            passArgs.twoJSObject = this.getGraphicsContext().two.makeGroup()
        }
        if(passArgs.context===undefined){
            passArgs.context = this.getGraphicsContext();
        }
        var newInstance = new ASVGSubtreeInstanceElement(passArgs);
        // this.instances.push(newInstance);
        this.instances.push(newInstance);
        this.addGraphic(newInstance);
        return newInstance;
    }


    getVerticesForInstanceSubElement(instance, element, time){
        var elementModel = element.model;
        var instanceMatrix = instance.matrix;
        var instanceTimeOffset = (instance.timeOffset!==undefined)?instance.timeOffset : 0;
        var elementTime = time+instanceTimeOffset;
        var elementVertices = elementModel.getVerticesAtTime(elementTime);
        return instanceMatrix.applyToPoints(elementVertices);
    }

    updateInstanceSubElement(instance, element, time){
        // First we set the vertices..
        var verts = this.getVerticesForInstanceSubElement(instance, element, time);
        element.setVertices(verts);

        // Next, we can optionally set attributes...
        // element.setAttributes(elementModel.getAttributes());
    }

    initGeometry() {
        // We will add our shadow first so it goes in the back
        this.instances = [];
        super.initGeometry();
    }

    resetGraphics(){
        // for(let i of this.instances){
        //     i.release();
        // }
        super.clearGraphicsElements();
        this.initGeometry();
    }

    updateViewElements() {
        for(let i of this.instances) {
            if (!i.updateInstanceElements(this.getModel().currentDisplayTime)) {
                this.resetGraphics();
                this.updateViewElements();
                return;
            }
        }
        super.updateViewElements();
    }
}
AObject.RegisterClass(AInstancerView2D);