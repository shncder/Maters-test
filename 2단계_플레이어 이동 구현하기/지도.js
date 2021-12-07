var text
var map1
var map2
var str1
var str2

async function loadFile(file)   // 텍스트파일 불러오기
{
    text = await file.text();
}

var cal = function ()                                                              //스테이지 구분 및 2차원 배열저장
{
    map1 = text.slice(0, text.indexOf("S", (text.indexOf("S") + 1)));                 // 시작 S를 제외한 다음 S까지
    map2 = text.slice(text.indexOf("S", (text.indexOf("S") + 1)), text.length);       // 시작 S를 제외한 다음 S부터

    str1 = map1.split("\r\n");
    str2 = map2.split("\r\n");

    str1.shift()
    str2.shift()
}

var len1 = function (target)                //가로길이
{
    var maplen = target.split("\r\n")
    var maplen2 = [];

    var i = 1;
    var j = 0;
    while (maplen[i] !== undefined) {
        maplen2[j] = maplen[i].length
        i++;
        j++;
    }
    return (Math.max.apply(null, maplen2));
}


var len2 = function (target)                     //세로길이
{
    var maplen = target.split("\r\n")
    if (maplen[maplen.length - 1] === '') {
        maplen.pop()
    }
    if (maplen[maplen.length - 1][0] === '=') {
        maplen.pop()
    }
    return (maplen.length - 1)
}



var qnt = function (target, string) {
    var count = 0;
    var halen = target

    while (halen.indexOf(string) !== -1) {
        halen = halen.replace(string, "X")
        count++;
    }
    return count;
}

var plc = function (target)                     //플레이어 위치
{
    var locate = target.split("\r\n")

    if (locate[locate.length - 1] === '') {
        locate.pop()
    }
    if (locate[0][0] === 'S') {
        locate.shift()
    }
    for (var i = 0; i < locate.length; i++) {
        for (var j = 0; j < locate[i].length; j++) {
            if (locate[i][j] === "P") {
                return (i + "," + j)
            }
        }
    }
}

var stage1 = function ()                              //출력함수
{
    var result = function (target)                   //== 구분기호 제거               
    {
        if (target.indexOf("=") !== -1)
            target = target.slice(0, target.indexOf("="))
        return target;
    }

    document.getElementById('output1').textContent = result(map1) +
        "\n\n가로크기: " + len1(map1) +
        "\n세로크기: " + len2(map1) +
        "\n구멍의 수: " + qnt(map1, "O") +
        "\n공의 수: " + qnt(map1, "o") +
        "\n플레이어 위치: " + plc(map1);
    document.getElementById('output2') = test2;
}

var stage2 = function ()                              //출력함수
{
    var result = function (target)                   //== 구분기호 제거               
    {
        if (target.indexOf("=") !== -1)
            target = target.slice(0, target.indexOf("="))
        return target;
    }

    document.getElementById('output1').textContent = result(map2) +
        "\n\n가로크기: " + len1(map2) +
        "\n세로크기: " + len2(map2) +
        "\n구멍의 수: " + qnt(map2, "O") +
        "\n공의 수: " + qnt(map2, "o") +
        "\n플레이어 위치: " + plc(map2)
}


var main = function ()                                 //메인함수
{
    cal()
    stage2()
}