import AView2D from "../../AniGraph/src/amvc/views/AView2D";
import AAnimatedColorPickerSpec from "../../AniGraph/src/acomponent/gui/specs/AAnimatedColorPickerSpec";
import Matrix3x3 from "../../AniGraph/src/amath/Matrix3x3";
import ASliderSpec from "../../AniGraph/src/acomponent/gui/specs/ASliderSpec";
import Vector from "../../AniGraph/src/amath/Vector";
import AObject from "../../AniGraph/src/aobject/AObject";
import ASelectionControlSpec from "../../AniGraph/src/acomponent/gui/specs/ASelectionControlSpec";
import ACheckboxSpec from "../../AniGraph/src/acomponent/gui/specs/ACheckboxSpec";
import AButtonSpec from "../../AniGraph/src/acomponent/gui/specs/AButtonSpec";
import Color,{RGBA} from "../../AniGraph/src/amath/Color";
import Vec2 from "../../AniGraph/src/amath/Vec2";
import AInstancerView2D from "../../AniGraph/src/amvc/views/AInstancerView2D";

//##################//--Creating Custom Animated Views--\\##################
/***
 * This file demonstrates how to create a custom view class with animatable
 * properties, which you can use as parameters in procedural graphics.
 *
 */
//##################\\----------------------------------//##################

export default class Exploding extends AView2D{

    /**
     * Here we will specify a static list `GUISpecs` of AGUIElementSpec subclasses.
     * You don't need to worry about how exactly the parent classes work---what's
     * important is that each class corresponds to a different type of GUI element
     * that you can use to control a parameter, which will be assigned as a property
     * to this view's model.
     *
     * Below you will find an example of each type of control.
     * @type {[AAnimatedColorPickerSpec, ASliderSpec]}
     */
    static GUISpecs = [
        new ASliderSpec({
            name: 'ExplosionSize',
            defaultValue: 1.5,
            minVal: 0,
            maxVal: 5,
            canAnimate: true
        }),
        new AAnimatedColorPickerSpec({
            name: 'Color',
            defaultValue: RGBA(0.1, 0.1, 0.1, 0.5),
            canAnimate: true
        }),
        new AAnimatedColorPickerSpec({
            name: 'AnimateFillColor',
            defaultValue: RGBA(0.5, 0.5, 0.5, 1),
            canAnimate: true
        }),
        new ACheckboxSpec({
            name: "ShowExplosion",
            defaultValue: true
        }),
    ];

    initGUISpecVars(){
        // the parent method will set any defaults we specified in GUISpecs...
        super.initGUISpecVars();
    }

    //</editor-fold>
    //##################\\--Button And Selection Box--//##################



    initGeometry() {

        // We will add our shadow first so it goes in the back
        this.shadow = this.createShapeElement(this.getModel());
        this.addGraphic(this.shadow);
        this.shadow.setAttribute('fill', 'rgba(0,0,0,0.8)');

        this.shadow2 = this.createShapeElement(this.getModel());
        this.addGraphic(this.shadow2);
        this.shadow2.setAttribute('fill', 'rgba(0,0,0,0.8)');

        this.shadow3 = this.createShapeElement(this.getModel());
        this.addGraphic(this.shadow3);
        this.shadow3.setAttribute('fill', 'rgba(0,0,0,0.8)');

        this.shadow4 = this.createShapeElement(this.getModel());
        this.addGraphic(this.shadow4);
        this.shadow4.setAttribute('fill', 'rgba(0,0,0,0.8)');

        super.initGeometry();

    }

    updateViewElements() {
        //We'll use the ShowShadow checkbox to determine whether we should show or hide the shadows

        if(this.getGUIVar('ShowExplosion')){
            const scale1= this.getModel().getProperty('ExplosionSize');
            const scale2= 1.15*scale1;
            const scale3= 1.15*scale2;
            const scale4= 1.15*scale3;
            const OtoW = this.getModel().getObjectToWorldMatrix();
            const WtoO = this.getModel().getWorldToObjectMatrix();
            const s1Mtx = Matrix3x3.Multiply(OtoW, Matrix3x3.Multiply(Matrix3x3.Scale(scale1), WtoO));
            const s2Mtx = Matrix3x3.Multiply(OtoW, Matrix3x3.Multiply(Matrix3x3.Scale(scale2), WtoO));
            const s3Mtx = Matrix3x3.Multiply(OtoW, Matrix3x3.Multiply(Matrix3x3.Scale(scale3), WtoO));
            const s4Mtx = Matrix3x3.Multiply(OtoW, Matrix3x3.Multiply(Matrix3x3.Scale(scale4), WtoO));
            let col = this.getAnimatedColorString('AnimateFillColor');

            this.shadow.show();
            this.shadow.setVertices(s1Mtx.applyToPoints(this.getModel().getVertices()));
            this.shadow.timeOffset= -10

            //We can get our color here, which will be of type `Color`. To convert it to a css-compatible string, we can use .toRGBAString()
            this.shadow.setAttribute('fill', col);
            this.shadow.setAttribute('stroke', col);

            this.shadow2.show();
            this.shadow2.setVertices(s2Mtx.applyToPoints(this.getModel().getVertices()));
            this.shadow2.timeOffset= -20

            //We can get our color here, which will be of type `Color`. To convert it to a css-compatible string, we can use .toRGBAString()
            this.shadow2.setAttribute('fill', col);
            this.shadow2.setAttribute('stroke', col);

            this.shadow3.show();
            this.shadow3.setVertices(s3Mtx.applyToPoints(this.getModel().getVertices()));
            this.shadow3.timeOffset= -30

            //We can get our color here, which will be of type `Color`. To convert it to a css-compatible string, we can use .toRGBAString()
            this.shadow3.setAttribute('fill', col);
            this.shadow3.setAttribute('stroke', col);

            this.shadow4.show();
            this.shadow4.setVertices(s4Mtx.applyToPoints(this.getModel().getVertices()));
            this.shadow4.timeOffset= -40

            //We can get our color here, which will be of type `Color`. To convert it to a css-compatible string, we can use .toRGBAString()
            this.shadow4.setAttribute('fill', col);
            this.shadow4.setAttribute('stroke', col);

        }else{
            //If the ShowShadow box isn't checked, we'll hide the shadow
            this.shadow.hide();
            this.shadow2.hide();
            this.shadow3.hide();
            this.shadow4.hide();
        }

        super.updateViewElements();
        this.shape.setAttribute('fill', this.getAnimatedColorString('AnimateFillColor'));
        this.shape.setAttribute('stroke', this.getAnimatedColorString('AnimateFillColor'));

    }
}
AObject.RegisterClass(Exploding);

