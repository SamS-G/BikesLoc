class Canvas {
    constructor(divName, context) {
        this.divName = $(divName);
        this.context = this.divName.get(0).getContext(context + '');
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        this.context.lineWidth = 3;
        this.context.strokeStyle = '#222222';
        this.isDrawing = false;
        this.clickNumber = 0;

        $('#clear').on('click', () =>
            this.clearCanvas());
        $(divName).on('mousemove', this.onMouseMove);
        $(divName).on('mousedown', this.onMouseDown );
        $(divName).on('mouseup', this.onMouseUp);
        $(divName).on('mouseout', () => this.isDrawing = false);
    }

    onMouseUp = () => {
        this.isDrawing = false;
        return this.clickNumber;
    };

    onMouseMove = (e) => {
        if (this.isDrawing === true) {
            this.context.lineTo(e.offsetX, e.offsetY);
            this.context.stroke();
        }
    };

    onMouseDown = (e) => {
        this.isDrawing = true;
        this.clickNumber++;
        this.context.beginPath();
        this.context.moveTo(e.offsetX, e.offsetY);
    };

    clearCanvas() {
        this.context.clearRect(0, 0, this.divName.get(0).width, this.divName.get(0).height);
        this.clickNumber = 0;
    };
}






