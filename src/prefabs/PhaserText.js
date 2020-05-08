

class PhaserText {

    constructor(ctx, x, y, string, style, origin) {
        this.text = string

        this.style = this.initStyle(style);
        this.origin = this.initOrigin(origin);

        this._x = x;
        this._y = y;
        this._string = string;
        this._origin = origin;
        this._ctx = ctx;
        this._style = style;
        this._obj = this.createText();
    }

    initStyle(key){
        let style = {
            fontFamily  : 'ClickPixel',
            fontsize    : 32,
            color       : '0xFFFFFF',
            align       : 'center'
        }

        switch (key.toLowerCase()) {

            case 'title':
                style.fontsize = 64;
                break
            case 'preload':
                style.fontsize = 48;
                break
        }
        return style
    }

    initOrigin(origin){
        if (typeof origin === 'number'){
            return{
                x : origin,
                y : origin
            }
        } else if (typeof origin === 'object'){
            return origin
        } else {
            return {
                x : 0.5,
                y: 0.5
            }
        }
    }

    createText(){
        let obj = this._ctx.add.bitmapText(
            this._x,
            this._y,
            this.style.fontFamily,
            this.text,
            this.style.fontsize,
            this.style.align
        );

        obj.setOrigin(this.origin.x, this.origin.y)
        return obj;
    }

    destroy(){
        this._obj.destroy()
        this._obj = false
    }


    setText(string) {
        this.text = string;
        this._obj.setText(string)
    }

    setX(x) {
        this.x = x;
        this._obj.setX(x);
    }

    setY(y) {
        this.y = y;
        this._obj.setY(y);
    }

    setOrigin(origin){
        this.origin = this.initOrigin(origin)
        this._obj.setOrigin(origin)
    }

    setDepth(depth){
        this._obj.setDepth(depth)
    }

    setScrollFactor(scrollX,scrollY){
        this._obj.setScrollFactor(scrollX,scrollY)
    }

    getCenter(){
        return this._obj.getCenter()
    }
    getTopLeft(){
        return this._obj.getTopLeft()
    }

    getTopRight(){
        return this._obj.getTopRight()
    }

    getBottomLeft(){
        return this._obj.getBottomLeft()
    }

    getBottomRight(){
        return this._obj.getBottomRight()
    }
}