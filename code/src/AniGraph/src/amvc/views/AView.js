import AObjectNode from "../../aobject/AObjectNode";

export default class AView extends AObjectNode{
    constructor(args){
        super(args);
        if(args!==undefined){
            this.controller = args.controller;
        }
    }

    initTempState(args) {
        super.initTempState(args);
        this.controller = undefined;
    }

    getComponentAppState(name) {
        return this.getController().getComponent().getAppState(name);
    }

    setComponentAppState(name, value, update=true, setReactState=true){
        return this.getController().getComponent().setAppState(name, value, update, setReactState);
    }

    getComponentAppStateObject() {
        return this.getController().getComponent().getAppStateObject();
    }

    _initAppVariable(name, val){
        if(this.getComponentAppState(name)===undefined){
            this.getController().getComponent().setAppState(name, val);
        }
        this._sliderVariableTypes[name]='app';
    }
    _initModelVariable(name, val){
        if(this.getModel().getProperty(name)===undefined){
            this.getModel().setProperty(name, val);
        }
        this._sliderVariableTypes[name]='model';
    }

    initSliderVariablesApp(){
        if(this._sliderVariableTypes===undefined) {
            this._sliderVariableTypes = {};
        }
    }

    initSliderVariablesModel(){
        if(this._sliderVariableTypes===undefined) {
            this._sliderVariableTypes = {};
        }
    }

    getSliderVariable(name){
        if(this._sliderVariableTypes[name]==='app'){
            return this.getComponentAppState(name);
        }else{
            return this.getModel().getProperty(name);
        }
    }

    clearGraphicsElements(){
        if(this.getGraphics()) {
            for (let g of this.getGraphics()) {
                g.release();
            }
            this.setGraphics([]);
        }
    }

    releaseGraphics(args){
        this.clearGraphicsElements();
    }

    release(args){
        this.releaseGraphics();
        this.updateGraphicsContext(); // TODO: this is only defined in child class, I think
        if(this.getGroup()) {
            this.getGroup().removeFromParentGroup();
        }
        super.release();
    }

    _removeFromParent(){
        //    views arent in hierarchy right now so do nothing
    }

    _attachToNewParent(newParent){
        //    views arent in hierarchy right now so do nothing
    }


    /**
    * [graphics] setter
    * @param graphics Value to set graphics
    * @param update Whether or not to update listeners
    */
    setGraphics(graphics){this._graphics = graphics;}
    getGraphics(){return this._graphics;}
    addGraphic(graphic){
        this.getGraphics().push(graphic);
        graphic.setView(this);
    }

    /** Getter and setter that map [controller] to tempState, which means it wont be serialized.*/
    get controller(){return this._tempState.controller;}
    set controller(value){this._tempState.controller = value;}

    setController(controller){this.controller = controller;}
    getController(){return this.controller;}
    getModel(){return this.getController().getModel();}
    getComponent(){return this.getController().getComponent();}
    getGraphicsContext(){return this.getComponent().getGraphicsContext();}

    getComponentController(){
        return this.getController().getComponent().componentController;
    }
    get componentController(){return this.getComponentController();}

    initGraphics(){
        this.setGraphics([]);
    }

    hideGraphics(){

    }
    showGraphics(){

    }

    getModel(){
        return this.getController().getModel();
    }

    onModelUpdate(){
        this.updateGraphics();
        return true;
    }

    updateGraphics(){
        this.updateViewElements();
        this.updateGraphicsContext();
    }

}