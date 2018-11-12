export default class Mole {
    constructor(normalState, hitState, downY) {
        this.normalState = normalState
        this.hitState = hitState
        this.downY = downY
    }
    //初始化
    init() {
        this.upY = this.normalState.y
        this.reset();
        this.normalState.on(Laya.Event.CLICK, this, this.hit);
    }
    //重置
    reset() {
        this.normalState.visible = false
        this.hitState.visible = false
        this.isActive = false
        this.isShow = false
        this.isHit = false
    }
    //显示
    show() {
        if (this.isActive) return
        this.isActive = true
        this.isShow = true
        this.normalState.y = this.downY
        this.normalState.visible = true
        //缓动效果
        Laya.Tween.to(this.normalState, { y: this.upY }, 500, Laya.Ease.backOut, Laya.Handler.create(this, this.showComplete))
    }
    //停留
    showComplete() {
        if (this.isShow && !this.isHit) {
            //定时执行一次函数(停留1.5秒消失)
            Laya.timer.once(1000, this, this.hide)
        }
    }
    //受击
    hit() {
        if (this.isShow && !this.isHit) {
            this.isShow = false
            this.isHit = true
            this.normalState.visible = false
            this.hitState.visible = true
            Laya.timer.clear(this, this.hide);
            //定时500毫秒后调用重置按钮
            Laya.timer.once(500, this, this.reset)
            //显示飘分
            // this.showScore()
        }
    }
    //消失
    hide() {
        if (this.isShow && !this.isHit) {
            this.isShow = false
            Laya.Tween.to(this.normalState, { y: this.downY }, 300, Laya.Ease.backIn, Laya.Handler.create(this, this.reset))
        }
    }
    //显示飘分效果
    // showScore() {
    //     this.scoreImg.y = this.scoreY + 30
    //     this.scoreImg.scale(0, 0)
    //     this.scoreImg.visible = true
    //     Laya.Tween.to(this.scoreImg, { y: this.scoreY, scaleX: 1, scaleY: 1 }, 300, Laya.Ease.backOut)
    // }

}