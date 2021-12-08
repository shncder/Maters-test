var text
var map = []
var str = []

async function loadFile(file)   // 텍스트파일 불러오기
{
    text = await file.text();
}

var cal = function ()                                                              //스테이지 구분 및 2차원 배열저장
{
    var k = 0                                                                            //text 파일의 탐색중인 위치

    for (var i = 0; i < text.match(/Stage/g).length; i++)                                //스테이지 개수만큼 반복
    {
        map[i] = text.slice(k, text.indexOf("S", (text.indexOf("S") + 1)));                 // 시작 S를 제외한 다음 S까지

        if (k === text.lastIndexOf("S")) 
        {
            map[i] = text.slice(text.indexOf("S", (text.indexOf("S") + 1)), text.length);   // 마지막S부터 마지막까지
        }
        k = text.indexOf("S", (text.indexOf("S") + 1))

        str[i] = map[i].split("\r\n"); 
        str[i].shift()                                                                     // 지도만 추출
        for (var j = 0; j < str[i].length; j++) 
        {
            str[i][j] = str[i][j].split("")
            if (str[i][j].length === 0)                                          //빈배열 제거
            {
                str[i].pop()
            }
        }
    }
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
    var locate = target.split("&")

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

    document.getElementById('output1').textContent = result(map[0]) +
        "\n\n가로크기: " + len1(map[0]) +
        "\n세로크기: " + len2(map[0]) +
        "\n구멍의 수: " + qnt((map[0]), "O") +
        "\n공의 수: " + qnt((map[0]), "o") +
        "\n플레이어 위치: " + plc(map[0]);
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

    document.getElementById('output1').textContent = result(map[1]) +
        "\n\n가로크기: " + len1(map[1]) +
        "\n세로크기: " + len2(map[1]) +
        "\n구멍의 수: " + qnt(map[1], "O") +
        "\n공의 수: " + qnt(map[1], "o") +
        "\n플레이어 위치: " + plc(str[1].join("&").replace(/,/g, ""))
}


var main = function ()                                 //메인함수
{
    cal()
    stage2()
}