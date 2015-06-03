(function(){

  var config = {
    watson: {
      url: '/watson'
    },
    caffe: {
      url: '/caffe'
    }
  }

  var $body,
      $imageurl,
      $checkWatson,
      $checkWatson,
      $resultImg,
      $watsonResult,
      $caffeResult;

  function onSubmit(ev) {
    ev.preventDefault();

    $body.removeClass('loaded')
      .addClass('loading');
    var imageurl = $imageurl.val();
    showImage(imageurl);

    var promises = [];
    var isWatson = $checkWatson.is(':checked');
    if (isWatson) {
      promises.push(loadWatson(imageurl));
    }
    $watsonResult.toggle(isWatson);

    var isCaffe = $checkCaffe.is(':checked');
    if (isCaffe) {
      promises.push(loadCaffe(imageurl));
    }
    $caffeResult.toggle(isCaffe);

    $.when.apply(null, promises)
      .fail(function(error) {
        alert(error);
        $body.removeClass('loading loaded')
      })
      .then(function(){
        $body.removeClass('loading')
          .addClass('loaded');
      });
  }


  function loadWatson(imageurl) {
    var d = new $.Deferred();
    $.ajax({
      url: config.watson.url,
      data: {imageurl: imageurl}
    }).success(function(data, status, xhr) {
      // console.log(data);
      showResult($watsonResult, data);
      d.resolve(data);
    }).error(function(xhr, status, error) {
      console.error(error);
      d.reject(error);
    });
    return d.promise();
  }

  function loadCaffe(imageurl) {
    var d = new $.Deferred();
    $.ajax({
      url: config.caffe.url,
      data: {imageurl: imageurl}
    }).success(function(data, status, xhr) {
      // console.log(data);
      showResult($caffeResult, data);
      d.resolve(data);
    }).error(function(xhr, status, error) {
      console.error(error);
      d.reject(error);
    });
    return d.promise();
  }

  function showResult($target, data) {
    var $table = $target.find('table');
    var $tbody = $('<tbody>');
    data.forEach(function(d){
      var $tr = $('<tr>');
      $tr.append($('<td>').addClass('label').text(d.label));
      $tr.append($('<td>').addClass('score').text(d.score));
      $tbody.append($tr);
    });
    $table.find('tbody').remove();
    $table.append($tbody);
  }

  function showImage(imageurl) {
    $resultImg
        .attr('src', imageurl).show();
  }

  function onReady() {
    $body = $('body');
    $imageurl = $('#imageurl');
    $checkWatson = $('#check-watson');
    $checkCaffe = $('#check-caffe');
    $resultImg = $('#results .image img');
    $watsonResult = $('#results #watson')
    $caffeResult = $('#results #caffe')
    $('#form').on('submit', onSubmit);

    if ($('#input-result').attr('value') === 'true') {
      $('#form').trigger('submit');
    }
  }

  $(onReady);

})();
