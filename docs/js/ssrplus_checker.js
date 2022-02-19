const GRP_SAKURA_CLASS = "grp_sakura";
const GRP_HINATA_CLASS = "grp_hinata";
const GRP_NAME_SAKURA = "櫻坂46";
const GRP_NAME_HINATA = "日向坂46";
var sakuraMusicNameArray = ["サイレントマジョリティー", "ガラスを割れ！"];

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
    btnTestClick();
}

function makeArrayList(musicName, grpName, data) {
    // 文字列→行単位に変換
    var list = data.split("\n");
    var grpClass = GRP_SAKURA_CLASS;
    if (grpName == GRP_NAME_HINATA) grpClass = GRP_HINATA_CLASS;

    var listStr = '';
    listStr += '<p name="scene_list">';
    listStr += '  <table border="1">';
    listStr += '    <thead>';
    listStr += '      <tr class="'+ grpClass + '">';
    listStr += '        <th colspan="5">' + musicName + '</th>';
    listStr += '      </tr>';
    listStr += '      <tr class="'+ grpClass + '">';
    listStr += '        <th class="scene_color">色</th>';
    listStr += '        <th class="member_name">メンバー</th>';
    listStr += '        <th class="ssr">SSR</th>';
    listStr += '        <th class="ssr_plus">SSR+</th>';
    listStr += '        <th class="has_checkbox">✅</th>';
    listStr += '      </tr>';
    listStr += '    </thead>';

    listStr += '    <tbody>';
    // １行を配列に変換
    for(var i = 0; i < list.length; i++){
        var row = list[i].split("\t");
        var rowStr = '';
        rowStr += '<tr>';
        rowStr += '  <td style="background-color: ' + row[0].replace('\r', '') + ';"></td>';
        rowStr += '  <td>' + row[1].replace('\r', '') + '</td>';
        rowStr += '  <td>' + row[2].replace('\r', '') + '</td>';
        rowStr += '  <td>' + row[3].replace('\r', '') + '</td>';
        rowStr += '  <td>';
        rowStr += '    <input type="checkbox" style="transform: scale(1.3);">';
        rowStr += '  </td>';
        rowStr += '</tr>';
        listStr += rowStr;
    }
    listStr += '    </tbody>';

    listStr += '  </table>';
    listStr += '</p>';
    $('#sakura_list').append(listStr);

    return true;
}

function btnTestClick() {
    //ボタンを押下した際にダウンロードする画像を作る
    html2canvas(document.getElementById("target"),{
        onrendered: function(canvas){
            //aタグのhrefにキャプチャ画像のURLを設定
            var imgData = canvas.toDataURL();
            document.getElementById("ss").href = imgData;
        }
    });
}
