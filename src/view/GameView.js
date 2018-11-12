import Mole from '../sprite/Mole'
export default class GameView extends Laya.View {
    constructor() {
        super()
        //加载场景文件
        this.loadScene("GameView.scene")
    }
    onEnable() {
        this.mole=new Mole(this.normal, this.hit, 21)
        this.mole.init()
        Laya.timer.loop(1000,this,this.isShow);
    }
    isShow(){
        this.mole.show()
    }
}