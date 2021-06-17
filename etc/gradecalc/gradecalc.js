"use strict";

var nSubject = 0;
var arSubjectIds = [];

$(document).ready(function() {
  addSubject();
  $("button#add-subject").click(addSubject);
  $("button#calc").click(calc);
  $("[data-toggle='tooltip']").tooltip();
});

function calc() {
  var tr;

  var nRanking;
  var nSameRanking;
  var nStudents;
  var nCompletionUnit;

  var nGrade;
  var objobjPercentage = {};

  var nSumCompletionUnit = 0;
  var nSumWeighted = 0;

  var bSuccess = true;
  var nExcluded = 0;

  $("thead#thead-percentage").html("");
  $("tbody#tbody-percentage").html("");
  $("div#average-grade").html("");

  for (var i in arSubjectIds) {
    tr = "tr#" + arSubjectIds[i];

    if ($(tr).find("input#exclude").prop("checked")) {
      nExcluded++;
      continue;
    }

    nRanking = $(tr).find("input#ranking").val();
    nSameRanking = $(tr).find("input#same-ranking").val();
    nStudents = $(tr).find("input#students").val();
    nCompletionUnit = $(tr).find("input#completion-unit").val();
    if(!validateInput(nRanking, nSameRanking, nStudents, nCompletionUnit)) {
      bSuccess = false;
      break;
    }

    nRanking = Number(nRanking);
    nSameRanking = Number(nSameRanking);
    nStudents = Number(nStudents);
    nCompletionUnit = Number(nCompletionUnit);

    nGrade = getGrade(nRanking, nSameRanking, nStudents);
    objobjPercentage["percentage" + i] = {
      SubjectId: arSubjectIds[i],
      nPercentage:
        ((nRanking + (nSameRanking - 1) / 2) / nStudents * 100).toFixed(2)
    };

    nSumWeighted += nGrade * nCompletionUnit;
    nSumCompletionUnit += nCompletionUnit;

    $(tr).find("input#grade").val(nGrade);
    if (i == 0)
      $("thead#thead-percentage").html("<th>백분율</th>");
    $("tbody#tbody-percentage").append("<tr><td "
      + "id='percentage" + i + "'></td></tr>");
    $("td#percentage" + i).load("progress.html", function() {
      var objPercentage = objobjPercentage[$(this).attr("id")];

      $(this).find("div.progress-bar").
        addClass("progress-bar-info").
        attr("aria-valuenow", objPercentage.nPercentage).
        css("width", objPercentage.nPercentage + "%").
        text($("tr#" + objPercentage.SubjectId).find("input#name").
          val() + " " + objPercentage.nPercentage + "%");
    });
  }
  if (bSuccess) {
    if (arSubjectIds.length - nExcluded)
      $("div#average-grade").html("<strong>평균 등급:</strong> "
        + (nSumWeighted / nSumCompletionUnit).toFixed(2));
    else
      alert("성적을 입력해주세요.");
  }
}

function addSubject() {
  var id = "subject" + nSubject;

  arSubjectIds.push(id);
  $("tbody#tbody-subjects").append("<tr id='" + id + "'></tr>");
  $("tr#" + id).load("subject.html", function() {
    $("a#remove-subject").click(function() {
      for (var i in arSubjectIds)
        if (arSubjectIds[i] == $(this).parent().parent().attr("id")) {
          arSubjectIds.splice(i, 1);
          break;
        }
      $(this).parent().parent().remove();
    });
  });
  nSubject++;
}

function validateInput(nRanking, nSameRanking, nStudents, nCompletionUnit) {
  if (!nRanking || isNaN(nRanking) || (nRanking < 1)) {
    alert("모든 항목의 석차를 올바르게 입력해주세요.");
    return false;
  }
  if (!nSameRanking || isNaN(nSameRanking) || (nSameRanking < 1)) {
    if (nSameRanking == 0)
      alert("동석차수가 없으면 1을 입력해주세요.");
    else
      alert("모든 항목의 동석차수를 올바르게 입력해주세요.");
    return false;
  }
  if (!nStudents || isNaN(nStudents) || (nStudents < 1)) {
    alert("모든 항목의 이수자수를 올바르게 입력해주세요.");
    return false;
  }
  if (Number(nRanking) + Number(nSameRanking) - 1 > nStudents) {
    alert("모든 항목이 (석차) + (동석차수) - 1 ≤ (이수자수) "
      + "조건을 만족하게 해주세요.");
    return false;
  }
  if (!nCompletionUnit || isNaN(nCompletionUnit) || (nCompletionUnit < 1)) {
    alert("모든 항목의 이수단위를 올바르게 입력해주세요.");
    return false;
  }
  return true;
}

function getGrade(nRanking, nSameRanking, nStudents) {
  var nTempRanking = nRanking + nSameRanking - 1;

  if (nTempRanking <= Math.round(4 / 100 * nStudents))
    return 1;
  else if (nTempRanking <= Math.round(11 / 100 * nStudents))
    return 2;
  else if (nTempRanking <= Math.round(23 / 100 * nStudents))
    return 3;
  else if (nTempRanking <= Math.round(40 / 100 * nStudents))
    return 4;
  else if (nTempRanking <= Math.round(60 / 100 * nStudents))
    return 5;
  else if (nTempRanking <= Math.round(77 / 100 * nStudents))
    return 6;
  else if (nTempRanking <= Math.round(89 / 100 * nStudents))
    return 7;
  else if (nTempRanking <= Math.round(96 / 100 * nStudents))
    return 8;
  else
    return 9;
}
