
// 创建地图实例
var map = new BMap.Map("map");
// 创建点坐标
var point = new BMap.Point(112.515496, 37.866566);
// 初始化地图，设置中心点坐标和地图级别
map.centerAndZoom(point, 8);
//禁止移到
map.disableDragging();
map.disableScrollWheelZoom();
map.disableDoubleClickZoom();
//个性化地图
map.setMapStyleV2({
    styleId: 'f43e0eb5af2eacc09dff0574e1043ed1'
});
//只显示山西省的地图
function getBoundary() {
    //map.clearOverlays(); // 清除地图的其余覆盖物
    const bdary = new BMap.Boundary();
    bdary.get('山西省', (rs) => {
        const count = rs.boundaries.length;
        if (count === 0) {
            return;
        }
        const EN_JW = '180, 90;';
        const NW_JW = '-180,  90;';
        const WS_JW = '-180, -90;';
        const SE_JW = '180, -90;';
        // 东南西北四个角添加一个覆盖物
        const ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,
            { strokeColor: 'none', fillColor: '#000', fillOpacity: 1, strokeOpacity: 1 });
        map.addOverlay(ply1);
        // 绘制‘山西省’整体的外轮廓
        for (let i = 0; i < count; i++) {
            const ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 0.5, strokeColor: 'transparent', fillColor: 'transparent' });
            map.addOverlay(ply);
        }
        getRegion();
    });
}
getBoundary();
//各个市的坐标
var dataArr = [{
    "name": "太原市",
    "cp": [112.550864, 37.890277]
},
{
    "name": "大同市",
    "cp": [113.290509, 40.113744]
},
{
    "name": "阳泉市",
    "cp": [113.580519, 37.856972]
},
{
    "name": "长治市",
    "cp": [113.120292, 36.201664]
},
{
    "name": "晋城市",
    "cp": [112.851831, 35.490701]
},
{
    "name": "朔州市",
    "cp": [112.433387, 39.331261]
},
{
    "name": "晋中市",
    "cp": [112.736465, 37.696495]
},
{
    "name": "运城市",
    "cp": [111.006854, 35.038859]
},
{
    "name": "忻州市",
    "cp": [112.734174, 38.416663]
},
{
    "name": "临汾市",
    "cp": [111.517973, 36.08415]
},
{
    "name": "吕梁市",
    "cp": [111.134335, 37.524366]
}
];
//晋城市的Polygon
var polygon = new BMap.Polygon([
    new BMap.Point(112.007023, 35.819271),
    new BMap.Point(112.017023, 35.371809),
    new BMap.Point(112.998548, 35.291809),
    new BMap.Point(113.408548, 35.819271)
], { strokeWeight: '#a9dbf7', strokeColor: 0, fillOpacity: 0.1 });
map.addOverlay(polygon);
//运城市的
var polygon1 = new BMap.Polygon([
    new BMap.Point(110.607023, 35.759271),
    new BMap.Point(110.307023, 34.571809),
    new BMap.Point(111.008548, 34.791809),
    new BMap.Point(111.808548, 35.319271)
], { strokeWeight: '#a9dbf7', strokeColor: 0, fillOpacity: 0.1 });
map.addOverlay(polygon1);
//临汾市的
var polygon2 = new BMap.Polygon([
    new BMap.Point(110.507023, 36.859271),
    new BMap.Point(110.607023, 35.771809),
    new BMap.Point(111.908548, 35.791809),
    new BMap.Point(112.008548, 36.619271)
], { strokeWeight: '#a9dbf7', strokeColor: 0, fillOpacity: 0.1  });
map.addOverlay(polygon2);
//长治市的
var polygon3 = new BMap.Polygon([
    new BMap.Point(112.107023, 36.959271),
    new BMap.Point(112.607023, 36.071809),
    new BMap.Point(113.608548, 35.891809),
    new BMap.Point(113.508548, 36.919271)
], { strokeWeight: '#a9dbf7', strokeColor: 0, fillOpacity: 0.1 });
map.addOverlay(polygon3);
//绘制各个市的轮廓
function getRegion() {
    dataArr.forEach(element => {
        var bdary = new BMap.Boundary();
        bdary.get(element['name'], rs => {
            var count = rs.boundaries.length;
            for (let i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], {
                    strokeWeight: 0.5, strokeColor: '#333', fillOpacity: 0.6, fillColor: '#a9dbf7'
                });

                this.map.addOverlay(ply);
            }

            citySetLabel(new BMap.Point(element['cp'][0], element['cp'][1]), element['name']);

        });

    });
}

getRegion();
//监听事件
document.getElementById("canvas").style.display = "none";
polygon.addEventListener('mouseout', function () {
    // 改变地图样式
    document.getElementById("canvas").style.display = "none";
});
polygon.addEventListener('mouseover', function () {
    // 改变地图样式
    document.getElementById("canvas").style.display = "";
})
//运城市
document.getElementById("canvas1").style.display = "none";
polygon1.addEventListener('mouseout', function () {
    // 改变地图样式
    document.getElementById("canvas1").style.display = "none";
});
polygon1.addEventListener('mouseover', function () {
    // 改变地图样式
    document.getElementById("canvas1").style.display = "";
})
//临汾市
document.getElementById("canvas2").style.display = "none";
polygon2.addEventListener('mouseout', function () {
    // 改变地图样式
    document.getElementById("canvas2").style.display = "none";
});
polygon2.addEventListener('mouseover', function () {
    // 改变地图样式
    document.getElementById("canvas2").style.display = "";
})


//长治市
document.getElementById("canvas3").style.display = "none";
polygon3.addEventListener('mouseout', function () {
    // 改变地图样式
    document.getElementById("canvas3").style.display = "none";
});
polygon3.addEventListener('mouseover', function () {
    // 改变地图样式
    document.getElementById("canvas3").style.display = "";
})

//显示城市坐标

function citySetLabel(cityCenter, cityName) {
    var label = new BMap.Label(cityName, {
        offset: new BMap.Size(-20, -10),
        position: cityCenter
    });
    label.setStyle({
        border: 'none',
        background: 'transparent',
        'font-size': '15px',
        color: '#fff',
    });
    map.addOverlay(label);
}
// 监听地图鼠标移动事件
map.addEventListener("mousemove", function (e) {
    // 将鼠标指针位置的像素坐标转换为地图坐标
    var point = map.pixelToPoint(new BMap.Pixel(e.clientX, e.clientY));

    // 判断鼠标指针是否在多边形上
    if (BMapLib.GeoUtils.isPointInPolygon(point, polygon)) {
        // 显示 canvas 图像
        // ..
        document.getElementById("canvas").style.display = "none";
        console.log("1")
    } else {
        // 隐藏 canvas 图像
        // ...
    }
});



//添加标注
var marker = new BMap.Marker(point);
map.addOverlay(marker);

