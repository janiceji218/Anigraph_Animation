import {ASVGLabRenderGraphicsComponent} from "../../AniGraph/src/acomponent/apps/svglab"
import PathView from "../../AniGraph/src/acomponent/apps/svglab/exampleviews/PathView";
import AView2D from "../../AniGraph/src/amvc/views/AView2D";
import AExampleAnimatedView from "../views/AExampleAnimatedView";
import AExampleInstanceView from "../views/AExampleInstanceView";
import AAnimateColorView from "../views/AAnimateColorView";
import Exploding from "../views/Exploding";

export default class CustomViewsComponent extends ASVGLabRenderGraphicsComponent{
    initViewClasses(){
        super.initViewClasses();
        this.addViewClass(PathView);
        this.addViewClass(AView2D);
        this.addViewClass(Exploding);
        this.addViewClass(AExampleAnimatedView);
        this.addViewClass(AExampleInstanceView);
        this.addViewClass(AAnimateColorView);
    }
}