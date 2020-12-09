import AController from "./AController";

export default class AController2D extends AController{
    createChildWithArgs(args){
        const child = super.createChildWithArgs(args);
        child.getViewGroup().addToGroup(this.getViewGroup());
        if(this.isActive) {
            child.activate();
        }
        this.getComponent().onGraphChange({type: 'newNode', model: child});
    }

    onViewUpdate() {
        super.onViewUpdate();
        // this.getComponent().updateGraphics();
    }

    onModelRelease(){
        super.onModelRelease();
        this.release();
    }

    onModelUpdate(args){
        const self = this;
        // function defaultResponse(){
        //     if(self.getView()){
        //         self.getView().onModelUpdate(args);
        //         // self.updateGraphicsContext();
        //         self.onViewUpdate();
        //     }
        //     return true;
        // }

        switch (args.type){
            case "_attachToNewParent":
                self.onModelAttachedToNewParent(args.parent);
                return self.getParent().getModel()===args.parent;
                break;
            case "_removeFromParent":
                self._removeFromParent();
                return self.getParent()===undefined;
                break;
            case "release":
                return self.onModelRelease();
                break;
            default:
                return super.onModelUpdate(args);
        }

    }


    //##################//--Critical Graph Ops for Scene Graph Manipulation--\\##################
    //<editor-fold desc="Critical Graph Ops for Scene Graph Manipulation">
    onModelAttachedToNewParent(modelParent){
        // if(this.getComponent()===this.getComponentAppState('mainComponent')) {

        console.assert(this.getComponent()!==undefined, "Couldnt find component for controller");
        const newParent = this.getComponent()._getMainControllerForModel(modelParent);
        // this.getConnectedControllerForModel(modelParent);
        // const newParent = this.getConnectedControllerForModel(modelParent);
        this._attachToNewParent(newParent);
        // }
    }

    _removeFromParent(){
        super._removeFromParent();
        this.getView()._removeFromParent();
    }

    _attachToNewParent(newParent){
        super._attachToNewParent(newParent);
        if(newParent.getView()) {
            this.getView()._attachToNewParent(newParent.getView());
        }else{
            this.getView()._attachToNewParent(newParent.getViewGroup());
        }
    }
    //</editor-fold>
    //##################\\--Critical Graph Ops for Scene Graph Manipulation--//##################

}