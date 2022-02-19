const GRP_SAKURA_CLASS = "grp_sakura";
const GRP_HINATA_CLASS = "grp_hinata";

/**
 * ページ読み込み時
 */
$(document).ready(function() {
    // var d = new $.Deferred();
    // async(function() {
    //     LoadMemberNameListJson();
    //     LoadPointJson();
    //     d.resolve();
    // });
    // GetCheckedGrp();
    btnTestClick();
});

function async(f) {
    setTimeout(f, 500);
}

$(function() {
    $('[name="rdo_select_grp"]').on('change', function() {
        LoadPointJson();
    });
    $('#select_event_name').on('change', function() {
        LoadPointJson();
    });
    $('#select_member_name').on('change', function() {
        LoadPointJsonByMember();
    });
});

function LoadMemberNameListJson() {
    $('#select_member_name').children().remove();

    $('#select_member_name').append($('<option>').text("").val(""));
    $.getJSON('./data/member_name_list.json' , function(data) {
        if (data) {
            data.forEach(function(element){
                $('#select_member_name').append($('<option>').text(element).val(element));
            });
        }
    });
}

function LoadPointJson() {
    var eventName = $('#select_event_name').val();

    $('#point_list_table').empty();
    $.getJSON('./data/' + eventName + '.json' , function(data) {
        if (data) {
            var headInfo = '';
            headInfo += '<thead style="text-align: center;">';
            headInfo += '<tr>';
            data.header.forEach(function(element){
                if (element.length > 8) element = element.replace('～', '～<br>')
                headInfo += '<th>' + element + '</th>';
              });
            headInfo += '</tr>';
            headInfo += '</thead>';

            $('#point_list_table').append(headInfo);
            $('#point_list_table').append('<tbody id="point_list_tbody">');
            data.data.forEach(function(element){
                var rowInfo = '';
                var grpClass = GRP_SAKURA_CLASS;
                if (element.grp == "日向坂46") grpClass = GRP_HINATA_CLASS;
                if (GetCheckedGrp() != "all" && GetCheckedGrp() != grpClass.replace('grp_', '')) return;

                rowInfo += '<tr>';
                rowInfo += '<td class="grp '+ grpClass +'">' + element.grp + '</td>';
                rowInfo += '<td class="name">' + element.name + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.rankIn7) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.rankIn6) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.rankIn5) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.rankIn4) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.rankIn3) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.rankIn2) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.rankIn1) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.top6to10) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.top5) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.top4) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.top3) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.top2) + '</td>';
                rowInfo += '<td class="pt_row">' + addFigure(element.top1) + '</td>';
                rowInfo += '</tr>';
                $('#point_list_table').append(rowInfo);
            });
            $('#point_list_table').append('</tbody>');
        }
    });
}

function LoadPointJsonByMember() {
    var memberName = $('#select_member_name').val();

    if (memberName == "") return;

    alert('申し訳ありません。準備中です。');
    var isDev = true;
    if (isDev) return;

    var eventNameList = $('#select_event_name option');

    if (!memberName) return;

    $('#point_list_table').empty();
    eventNameList.each(function() {
        $.getJSON('./data/' + this.value + '.json' , function(data) {
            if (data) {
                var isExistsSelectMember = false;
                var rowInfo = '';
                data.data.forEach(function(element){
                    if (memberName != element.name) return;
                    isExistsSelectMember = true;

                    var grpClass = GRP_SAKURA_CLASS;
                    if (element.grp == "日向坂46") grpClass = GRP_HINATA_CLASS;

                    rowInfo += '<tr>';
                    rowInfo += '<td class="grp '+ grpClass +'">' + element.grp + '</td>';
                    rowInfo += '<td class="name">' + element.name + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.rankIn7) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.rankIn6) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.rankIn5) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.rankIn4) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.rankIn3) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.rankIn2) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.rankIn1) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.top6to10) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.top5) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.top4) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.top3) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.top2) + '</td>';
                    rowInfo += '<td class="pt_row">' + addFigure(element.top1) + '</td>';
                    rowInfo += '</tr>';
                });

                var headInfo = '';
                headInfo += '<thead style="text-align: center;">';
                headInfo += '<tr>';
                data.header.forEach(function(element){
                    if (element.length > 8) element = element.replace('～', '～<br>')
                    headInfo += '<th>' + element + '</th>';
                  });
                headInfo += '</tr>';
                headInfo += '</thead>';

                $('#point_list_table').append(headInfo);
                $('#point_list_table').append('<tbody id="point_list_tbody">');

                $('#point_list_table').append(rowInfo);
                $('#point_list_table').append('</tbody>');
            }
        });
    });
}

function GetCheckedGrp() {
    var rdoSelectGrp = $('input[name="rdo_select_grp"]');

    for (var i = 0; i < rdoSelectGrp.length; i++) {
        if (rdoSelectGrp[i].checked) {
            return (rdoSelectGrp[i].value);
        }
    }
}

/**
 * 数値の3桁カンマ区切り
 * 入力値をカンマ区切りにして返却
 * [引数]   numVal: 入力数値
 * [返却値] String(): カンマ区切りされた文字列
 */
function addFigure(numVal) {
    // 空の場合そのまま返却
    if (!numVal){
      return numVal;
    }
    numVal = numVal.toString();
    // 全角から半角へ変換し、既にカンマが入力されていたら事前に削除
    numVal = toHalfWidth(numVal).replace(/,/g, "").trim();
    // 数値でなければそのまま返却
    if ( !/^[+|-]?(\d*)(\.\d+)?$/.test(numVal) ){
        return numVal;
    }
    // 整数部分と小数部分に分割
    var numData = numVal.toString().split('.');
    // 整数部分を3桁カンマ区切りへ
    numData[0] = Number(numData[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // 小数部分と結合して返却
    return numData.join('.');
}

/**
 * カンマ外し
 * 入力値のカンマを取り除いて返却
 */
function delFigure(strVal){
    if (!strVal) {
        return strVal;
    }
    return strVal.replace( /,/g , "" );
}

/**
 * 全角から半角への変革関数
 * 入力値の英数記号を半角変換して返却
 */
function toHalfWidth(strVal){
    // 半角変換
    var halfVal = strVal.replace(/[！-～]/g,
        function( tmpStr ) {
            // 文字コードをシフト
            return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
        }
    );
    return halfVal;
}

function btnTestClick() {
    //HTML内に画像を表示
    // html2canvas(document.getElementById("target"),{
    //     onrendered: function(canvas){
    //         //imgタグのsrcの中に、html2canvasがレンダリングした画像を指定する。
    //         var imgData = canvas.toDataURL();
    //         document.getElementById("result").src = imgData;
    //     }
    // });

    //ボタンを押下した際にダウンロードする画像を作る
    html2canvas(document.getElementById("target"),{
        onrendered: function(canvas){
            //aタグのhrefにキャプチャ画像のURLを設定
            var imgData = canvas.toDataURL();
            document.getElementById("ss").href = imgData;
        }
    });
}
