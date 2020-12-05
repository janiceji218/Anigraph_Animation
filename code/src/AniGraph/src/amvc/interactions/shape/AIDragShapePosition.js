import ADragValueInteraction from "../ADragValueInteraction";

export default class AIDragShapePosition extends ADragValueInteraction{
    static Create(args){
        return super.Create(args);
    }

    // To set the anchor point in world coordinates
    getValueFunction(){
        return this.controller.getModel().getWorldPosition();
    }

    setValueFunction(value){
        this.controller.getModel().setWorldPosition(value);
    }
}











