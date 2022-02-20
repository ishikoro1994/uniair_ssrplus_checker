const GRP_SAKURA_CLASS = "grp_sakura";
const GRP_HINATA_CLASS = "grp_hinata";
const GRP_NAME_SAKURA = "櫻坂46";
const GRP_NAME_HINATA = "日向坂46";
var sakuraMusicNameArray = ["サイレントマジョリティー","ガラスを割れ！","二人セゾン","Nobody","アンビバレント","風に吹かれても"];
var hinataMusicNameArray = ["キュン","JOYFUL LOVE","期待していない自分","君に話しておきたいこと","ハッピーオーラ","キツネ"];

/**
 * ページ読み込み時
 */
$(document).ready(function() {
    callLoadCsv();
});

function async(f) {
    setTimeout(f, 500);
}

// 楽曲csv読み込み
function callLoadCsv() {
    // 櫻坂csv読み込み
    LoadCsv(GRP_NAME_SAKURA, sakuraMusicNameArray);
    // 日向坂csv読み込み
    LoadCsv(GRP_NAME_HINATA, hinataMusicNameArray);
}

async function LoadCsv(grpName, array) {
    var pathBase = "./data/" + grpName + "/";
    for (var i = 0; i < array.length; i ++) {
        var musicName = array[i];
        var filePath = pathBase + musicName + ".csv";

        var readCsvBindedFunc = function(musicName, grpName) {
            return function(data) {
                makeArrayList(musicName, grpName, data);
            }
        }

        await $.get(filePath, readCsvBindedFunc(musicName, grpName), 'text');
    }
    createCanvas();
}

function makeArrayList(musicName, grpName, data) {
    // 文字列→行単位に変換
    var list = data.split("\n");
    var grpClass = GRP_SAKURA_CLASS;
    var tableId = "#sakura_list";
    if (grpName == GRP_NAME_HINATA) {
        grpClass = GRP_HINATA_CLASS;
        tableId = "#hinata_list";
    }

    var listStr = '';
    listStr += '<p name="scene_list">';
    listStr += '  <table name="scene_table" border="1">';
    listStr += '    <thead>';
    listStr += '      <tr class="'+ grpClass + '">';
    listStr += '        <th colspan="5">' + musicName + '</th>';
    listStr += '      </tr>';
    listStr += '      <tr class="'+ grpClass + '">';
    listStr += '        <th class="head_scene_color">色</th>';
    listStr += '        <th class="head_member">メンバー</th>';
    listStr += '        <th class="head_ssr">SSR</th>';
    listStr += '        <th class="head_ssr_plus">SSR+</th>';
    listStr += '        <th class="head_has_checkbox">✅</th>';
    listStr += '      </tr>';
    listStr += '    </thead>';

    listStr += '    <tbody>';
    // １行を配列に変換
    for(var i = 0; i < list.length; i++){
        var row = list[i].split("\t");
        var rowStr = '';
        rowStr += '<tr>';
        rowStr += '  <td style="background-color: ' + row[0].replace('\r', '') + ';"></td>';
        rowStr += '  <td class="member_name">' + row[1].replace('\r', '') + '</td>';
        rowStr += '  <td class="ssr">' + row[2].replace('\r', '') + '</td>';
        rowStr += '  <td class="ssr_plus">' + row[3].replace('\r', '') + '</td>';
        rowStr += '  <td>';
        rowStr += '    <input name="has_scene_check" type="checkbox" style="transform: scale(1.3);" onclick="createCanvas()">';
        rowStr += '  </td>';
        rowStr += '</tr>';
        listStr += rowStr;
    }
    listStr += '    </tbody>';

    listStr += '  </table>';
    listStr += '</p>';
    $(tableId).append(listStr);

    return true;
}

function createCanvas() {
    //ボタンを押下した際にダウンロードする画像を作る
    html2canvas(document.querySelector("#target")).then(canvas => {
        var imgData = canvas.toDataURL();
        document.getElementById("ss").href = imgData;
    });

    return false;
}

function setFileName() {
    var fileName = "ssrplus_checker_";
    var now = new Date();
    fileName += now.getFullYear();
    fileName += ("0" + (now.getMonth()+1)).slice(-2);
    fileName += ("0" + now.getDate()).slice(-2);
    fileName += ("0" + now.getHours()).slice(-2);
    fileName += ("0" + now.getMinutes()).slice(-2);
    fileName += ("0" + now.getSeconds()).slice(-2);

    document.getElementById("ss").download = fileName + ".png";
}