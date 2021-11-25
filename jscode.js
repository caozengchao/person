var cubeFather = document.getElementById("cubeFather");
var cube = document.getElementById("cube");
var imgsArr = document.getElementsByTagName("img");
cubeFather.onmouseover = function() {
    var temp = "-webkit-transform";
    cube.style[temp] = "rotateX(180deg)";
    var imgArr = cube.children;
    for(var i = 0; i < imgArr.length; i++){
        var str2 = imgArr[i].getAttribute("value");
        imgArr[i].style[temp] = str2;
    }
    for(var i = 0; i < imgsArr.length; i++){
        imgsArr[i].style.width = "300px";
        imgsArr[i].style.height = "300px";
    }
}//setInterval
cubeFather.onmouseout = function() {
    cube.style = "";
    var imgArr = cube.children;
    for(var i = 0; i < imgArr.length; i++){
        imgArr[i].style = "";
    }
    for(var i = 0; i < imgsArr.length; i++){
        imgsArr[i].style.width = "200px";
        imgsArr[i].style.height = "200px";
    }
}




var selectInput = document.getElementById('selectInput')
var btnSendfile = document.getElementById('btnSendfile')
var select0 = document.getElementById('select')
async function sendOK(){
    var select0 = document.getElementById('select')
    var index = select0.selectedIndex;
    if (select0.options[index].value == "25"){
        client.sendData('near')
        console.log('1')
    }
    else if(select0.options[index].value == "25"){
        client.sendData('far')
        console.log('2')
    }
    else{
        client.sendData('class')
        console.log('3')
    }
    select0.disabled = true
    selectInput.disabled = true
    btnSendfile.disabled = false
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var client = new SocketClient("49.233.100.241",8181,"chat");
client.connect();
var change = false
var change2 = false
var change_sum = false
var img_data = []
var img_data2 = []
var img_sum = 0
client.onData  = function(text) {
    if(text=='end'){
        console.log('end');
        console.log('data',img_data)
        change = false;
        var canvas2 = document.getElementById('canvas2');
        var ctx2 = canvas2.getContext('2d');
        imageData = ctx2.createImageData(400, 400);
        for(var i=0;i<imageData.data.length;i++){
            imageData.data[i] = img_data[i]
        }
        // imageData.data.set(data);
        // let result = et.target.result
        // img.src = result
        // imageData.onload = function(){
        console.log('end1');
        ctx2.putImageData(imageData,0,0);
        // ctx2.drawImage(imageData, 0,0,400,400);
        console.log('end1');
        // };
        img_data=[]
    };
    if(change){
        var xlist = text.split(',')
        // console.log('xlist',xlist)
        // console.log('data:::',img_data)
        for(var i = 0;i<xlist.length;i++){
            img_data[img_data.length]= parseInt(xlist[i])
            // console.log('datalen',data.length)
            // console.log(img_data)
            // console.log(xlist)
        }
    }
    if(text=='start'){
        console.log('start')
        change = true
        img_data = []
    }
    if(text=='end2'){
        console.log('end2');
        console.log('data',img_data2)
        change2 = false;
        var canvas2 = document.getElementById('canvas2');
        var ctx2 = canvas2.getContext('2d');
        // '''//默认创建出来的rgba(0,0,0,0)
        // var image =	ctx2.createImageData(100,100)		
        // for(var i=0;i<image.data.length;i++){
        //     image.data[4*i+3] = 255
        // }
        // //将像素数据写入画布
        // ctx2.putImageData(image,0,0)'''
        // var img2 = new Image();
        imageData = ctx2.createImageData(400, 400);
        for(var i=0;i<imageData.data.length;i++){
            imageData.data[i] = img_data2[i]
        }
        // imageData.data.set(data);
        // let result = et.target.result
        // img.src = result
        // imageData.onload = function(){
        console.log('end1');
        ctx2.putImageData(imageData,0,0);
        // ctx2.drawImage(imageData, 0,0,400,400);
        console.log('end1');
        // };
        img_data=[]
    };
    if(change2){
        var xlist = text.split(',')
        // console.log('xlist',xlist)
        // console.log('data:::',img_data)
        for(var i = 0;i<xlist.length;i++){
            img_data2[img_data2.length]= parseInt(xlist[i])
            // console.log('datalen',data.length)
            // console.log(img_data)
            // console.log(xlist)
        }
    }
    if(text=='start2'){
        console.log('start2')
        change2 = true
        img_data2 = []
    }
    if(text=='endsum'){
        console.log('endsum');
        console.log('data_sum',img_sum);
        change_sum = false;
        var sum = document.getElementById('sum');
        sum.innerHTML = '一共'+img_sum+'人'
    };
    if(change_sum){
        img_sum = parseInt(text);
        
    }
    if(text=='startsum'){
        console.log('startsum')
        change_sum = true
        img_sum = 0
    }

}

// document.getElementById('send').onclick = function(e){
//     client.sendData(document.getElementById('content').value);
// }
let ele = document.getElementById('input')
ele.onchange = function (e) {
    select0.disabled = false
    let files = e.target.files // 获取上传的文件集合
    let file = files[0] // 获取第一个文件
    let render = new FileReader()
    
    // 异步事件
    render.onload = function (et) {
        console.log('et: ', et)
        var mycanvas = document.getElementById('canvas')
        var ctx = mycanvas.getContext('2d')
        var img = new Image();
        let result = et.target.result
        img.src = result
        img.onload = function(){
            console.log('result: ', result)
            ctx.drawImage(img, 0,0,400,400);
        }
    }
    render.readAsDataURL(file)
    selectInput.disabled = false
    select0.disabled = false
}
async function sendfile() {
    var canvas = document.getElementById("canvas");
    var contexta=canvas.getContext('2d');
    var img = contexta.getImageData(0, 0, 400, 400);
    var list_binary = []
    var binary = [];
    for(var j = 0; j < 40000; j++){
        binary = [];
        for (var i = 0; i < 16; i++) {
            // client.sendData(img.data[j*10+i]);
            // binary[i] = img.data[j*8000+i];
            binary[i] = img.data[j*16+i]
        }
        list_binary[j] = binary
        if(j==0){
            client.sendData('start')
            btnSendfile.disabled = true
        }
        client.sendData(binary)
        if(j>=39999){
            client.sendData('end')
        }
        // document.getElementById('content').value = binary
        // await sleep(50); 
        // console.log(img.data.length)
        // client.sendData(document.getElementById('content').value);
    }
    console.log(list_binary)
}
let select = document.querySelector('#con')
select.onchange = function(e){
    if (e.target.name == 'select'){
        selectInput.disabled = false
    }
}
alert('如果出现不安全情况，点击url旁边小锁，网站设置，不安全内容改允许')
