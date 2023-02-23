var LineChart = function (ctx) {
    /*获取绘图工具*/
    //this.ctx = ctx || document.querySelector('canvas').getContext('2d');
    const canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    /*画布的大小*/
    this.canvasWidth = this.ctx.canvas.width;
    this.canvasHeight = this.ctx.canvas.height;
    /*网格的大小*/
    this.gridSize = 10;
    /*坐标系的间距*/
    this.space = 25;
    /*坐标原点*/
    this.x0 = this.space;
    this.y0 = this.canvasHeight - this.space;
    /*箭头的大小*/
    this.arrowSize = 10;
    /*绘制点*/
    this.dotSize = 5;
    /*点的坐标 和数据有关系  数据可视化*/
};

// 2. 定义LineChart对象的初始化方法
LineChart.prototype.init = function (data) {
    this.drawGrid(); // 绘制网格
    this.drawCoordinates(); // 绘制坐标系
    this.drawPoints(data); // 绘制点
    this.drawLinePath(data); // 绘制点与点之间折线的轨迹
};

// 2. 定义绘制网格的对象方法 drawGrid
LineChart.prototype.drawGrid = function () {

    this.ctx.strokeStyle = "#ccc"; // 设置每个线条的颜色

    // 采用遍历的方式，绘画x轴的线条
    var xLineTotals = Math.floor(this.canvasHeight / this.gridSize); // 计算需要绘画的x轴条数
    for (var i = 0; i < xLineTotals; i = i + 10) {
        // console.log(this.gridSize * i - 0.5);
        // console.log(this.girdSize * i - 0.5);
        this.ctx.beginPath(); // 开启路径，设置不同的样式
        this.ctx.moveTo(0, this.gridSize * i - 0.5); // -0.5是为了解决像素模糊问题
        this.ctx.lineTo(this.canvasWidth, this.gridSize * i - 0.5);
        this.ctx.stroke();
    }

    // 采用遍历的方式，绘画y轴的线条
    // var yLineTotals = Math.floor(this.canvasWidth / this.gridSize); // 计算需要绘画y轴的条数
    // for (var j = 0; j < yLineTotals; j++) {
    //     this.ctx.beginPath(); // 开启路径，设置不同的样式
    //     this.ctx.moveTo(this.gridSize * j, 0);
    //     this.ctx.lineTo(this.gridSize * j, this.canvasHeight);
    //     this.ctx.stroke();
    // }
};

// 3. 定义绘制坐标系方法
LineChart.prototype.drawCoordinates = function () {

    // 计算坐标系y轴的最远坐标点(x1,y1)以及对应三角形的坐标点左边(x2,y2)\右边(x3,y3)
    var x1 = this.space;
    var y1 = this.space;

    var x2 = Math.floor(x1 - this.arrowSize / 2);
    var y2 = Math.floor(y1 + this.arrowSize);

    var x3 = Math.floor(x1 + this.arrowSize / 2);
    var y3 = Math.floor(y1 + this.arrowSize);

    // 绘画y轴的线条
    this.ctx.beginPath();
    this.ctx.beginPath();
    this.ctx.moveTo(this.x0, this.y0); // 原点
    this.ctx.lineTo(x1, y1); // y轴最远点

    // 绘画y轴三角形
    this.ctx.lineTo(x2, y2); // 三角形左边点
    this.ctx.lineTo(x3, y3); // 三角形右边点
    this.ctx.lineTo(x1, y1); // 回到y轴最远点

    // 填充以及描边y轴
    this.ctx.strokeStyle = "#000";
    this.ctx.fill();
    this.ctx.stroke();

    // 计算坐标系x轴的最远坐标点(x4,y4)以及对应三角形的坐标点上边(x5,y5)\下边(x6,y6)
    var x4 = this.canvasWidth - this.space;
    var y4 = this.canvasHeight - this.space;

    var x5 = Math.floor(x4 - this.arrowSize);
    var y5 = Math.floor(y4 - this.arrowSize / 2);

    var x6 = Math.floor(x4 - this.arrowSize);
    var y6 = Math.floor(y4 + this.arrowSize / 2);

    // 9.绘制x轴线条
    this.ctx.beginPath();
    this.ctx.moveTo(this.x0, this.y0); // 原点
    this.ctx.lineTo(x4, y4); // x轴最远点

    // 10.绘制三角形
    this.ctx.lineTo(x5, y5); // 三角形的上边
    this.ctx.lineTo(x6, y6); // 三角形的下边
    this.ctx.lineTo(x4, y4); // 回到x轴最远点

    // 11.填充以及描边
    this.ctx.strokeStyle = "#000";
    this.ctx.fill();
    this.ctx.stroke();
};

// 4. 定义绘制坐标系多点的方法
LineChart.prototype.drawPoints = function (data) {

    /*
    1. 设置坐标点的中心圆点位置（x0，y0）
    2. 设置坐标点的大小  dotSize
    3. 计算坐标点的上下左右四角的点坐标
    */

    // 获取画笔ctx
    ctx = this.ctx;

    // 设置坐标点的大小  dotSize
    var dotSize = this.dotSize;

    // 4.遍历点的坐标,以及绘画点
    data.forEach(function (item, i) {
        console.log("i = " + i + ", x = " + item.x + ", y = " + item.y);

        // 1. 设置坐标点的中心圆点位置（x0，y0）
        var x0 = item.x;
        var y0 = item.y;
        console.log("坐标点的重点原点位置 x0 = " + x0 + ", y0 = " + y0);

        // 2.计算坐标点的上下左右四角的点坐标: 左上(x1,y1) 左下(x2,y2) 右上(x3,y3) 右下(x4,y4)

        var x1 = Math.floor(x0 - dotSize / 2);
        var y1 = Math.floor(y0 - dotSize / 2);

        var x2 = Math.floor(x0 - dotSize / 2);
        var y2 = Math.floor(y0 + dotSize / 2);

        var x3 = Math.floor(x0 + dotSize / 2);
        var y3 = Math.floor(y0 - dotSize / 2);

        var x4 = Math.floor(x0 + dotSize / 2);
        var y4 = Math.floor(y0 + dotSize / 2);

        console.log("左上 x1 = " + x1 + ", y1 = " + y1);
        console.log("左下 x2 = " + x2 + ", y2 = " + y2);
        console.log("右上 x3 = " + x3 + ", y3 = " + y3);
        console.log("右下 x4 = " + x4 + ", y4 = " + y4);

        // 3.绘画坐标点

        ctx.beginPath();
        ctx.beginPath();
        ctx.moveTo(x1, y1); // 左上点
        ctx.lineTo(x2, y2); // 左下点
        ctx.lineTo(x4, y4); // 右下点
        ctx.lineTo(x3, y3); // 右上点
        ctx.closePath();

        // 4.填充以及描边y轴
        ctx.fill();
    });
};

// 5. 定义绘制坐标系多点的折现
LineChart.prototype.drawLinePath = function (data) {

    /*获取绘图工具*/
    var ctx = this.ctx;

    // 设置坐标系与边界的间隙大小
    var space = this.space;

    // 2. 获取Canvas的width、height
    var canvasWidth = this.canvasWidth;
    var canvasHeight = this.canvasHeight;

    // 3.计算坐标系的原点坐标(x0,y0)
    var x0 = this.space;
    var y0 = canvasHeight - space;

    /*
    遍历绘画多点连接的折线
    1. 第一个点与坐标系原点连成一条线
    2. 从第二个点开始与上一个点连成一条线，所以需要记录上一个点的坐标
    */

    // 记录上一个点坐标
    var prev_point_x = null;
    var prev_point_y = null;

    data.forEach(function (item, i) {
        console.log("绘制折线: i = " + i + ", x = " + item.x + ", y = " + item.y);

        if (i === 0) {
            console.log("坐标系的原点坐标：x0 = " + x0 + ", y0 = " + y0);
            console.log("第一个点的坐标: x = " + item.x + ", y = " + item.y);

            // 第一个点与坐标系原点连成一条线
            // ctx.beginPath();
            // ctx.moveTo(x0, y0); // 坐标系原点
            // ctx.lineTo(item.x, item.y); // 第一个点
            // ctx.stroke();

            // 记录当前的点为下一个点的坐标的出发点坐标
            prev_point_x = item.x;
            prev_point_y = item.y;

        } else { // 从第二个点开始与上一个点连成一条线，所以需要记录上一个点的坐标

            ctx.beginPath();
            ctx.moveTo(prev_point_x, prev_point_y); // 设置上一个点的坐标为出发点
            ctx.lineTo(item.x, item.y); // 设置当前点为终点
            ctx.stroke();

            // 记录当前的点为下一个点的坐标的出发点坐标
            prev_point_x = item.x;
            prev_point_y = item.y;

        }

    })

};

// 定义需要绘制的点坐标
var points = [
    {
        x: 125,
        y: 400 - 201.3011,
    },
    {
        x: 225,
        y: 400 - 145.2546,
    },
    {
        x: 325,
        y: 400 - 138.212200,
    },
    {
        x: 425,
        y: 400 - 125.302800,
    },
    {
        x: 525,
        y: 400 - 101.365500,
    },
];

// 创建绘制折线图
var linechart = new LineChart();
linechart.init(points);
ctx.fillText("2021", 100, 390);
ctx.fillText("2020", 200, 390);
ctx.fillText("2019", 300, 390);
ctx.fillText("2018", 400, 390);
ctx.fillText("2017", 500, 390);