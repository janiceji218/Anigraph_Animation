import ASVGGroup from "./ASVGGroup";
import Matrix3x3 from "../../amath/Matrix3x3";
import Vec2 from "../../amath/Vec2";

export default class ASVGSubtreeInstanceElement extends ASVGGroup{
    /**
     * should take the view as an arg
     * @param args
     */
    constructor(args){
        super(args);
        this.view = (args && args.view!==undefined)? args.view : undefined;
        this.resetInstanceElements();
        this.matrix = (args && args.matrix!==undefined)? args.matrix : Matrix3x3.Identity();
    }

    /** Get set timeOffset */
    set timeOffset(value){this._timeOffset = value;}
    get timeOffset(){return this._timeOffset;}

    resetInstanceElements(){
        this.elements = [];
        var modelDescendants = this.view.getModel().getDescendantList();
        for(let d of modelDescendants){
            var nEl = this.view.createShapeElement(d);
            nEl.model = d;
            this.addInstanceElement(nEl);
        }
    }

    addInstanceElement(e){
        this.elements.push(e);
        this.add(e);
    }

    updateInstanceElements(t){
        var modelDescendants = this.view.getModel().getDescendantList();
        if(modelDescendants.length!==this.elements.length){
            this.resetInstanceElements();
        }

        var self = this;

        for(let m=0;m<modelDescendants.length;m++){
            if(this.elements[m].model.getUID()===modelDescendants[m].getUID()){
                this.view.updateInstanceSubElement(this, this.elements[m], t)
            }else{
                // this.resetGraphics();
                // this.updateViewElements();
                return false;
                // this.elements[m].release;
                // this.elements[m] = this.createShapeElement(modelDescendants[m]);
                // this.elements[m] = modelDescendants[m];
                // this.elements[m].setView(this);
                // this.elements[m].addToGroup(this.getGroup());
                // this.addGraphic(newshape);
            }

        }
        // super.updateViewElements();
        return true;
    }

}