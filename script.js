$(document).ready(function() {
  var questionStats = {
    q1: {
      count: 0,
      total: 0
    },
    q2: {
      count: 0,
      total: 0
    },
    q3: {
      count: 0,
      total: 0
    }
  };

  // Event handler for submitting a response
  $('#survey-form').on('submit', function(e) {
    e.preventDefault();

    // Get selected values
    var q1Rating = parseInt($('#question1').val());
    var q2Rating = parseInt($('#question2').val());
    var q3Rating = parseInt($('#question3').val());

    // Update question statistics
    questionStats.q1.count++;
    questionStats.q1.total += q1Rating;

    questionStats.q2.count++;
    questionStats.q2.total += q2Rating;

    questionStats.q3.count++;
    questionStats.q3.total += q3Rating;

    // Calculate average ratings
    var q1Average = questionStats.q1.total / questionStats.q1.count;
    var q2Average = questionStats.q2.total / questionStats.q2.count;
    var q3Average = questionStats.q3.total / questionStats.q3.count;

    // Update statistics display
    $('#question1-statistics .statistics-bar').css('width', q1Average * 20 + '%');
    $('#question2-statistics .statistics-bar').css('width', q2Average * 20 + '%');
    $('#question3-statistics .statistics-bar').css('width', q3Average * 20 + '%');

    // Update color based on average ratings
    if (q1Average >= 1 && q1Average < 2.5) {
      $('#question1-statistics .statistics-bar').addClass('red');
    } else if (q1Average >= 2.5 && q1Average < 3.5) {
      $('#question1-statistics .statistics-bar').addClass('yellow');
    } else if (q1Average >= 3.5) {
      $('#question1-statistics .statistics-bar').addClass('green');
    }

    if (q2Average >= 1 && q2Average < 2.5) {
      $('#question2-statistics .statistics-bar').addClass('red');
    } else if (q2Average >= 2.5 && q2Average < 3.5) {
      $('#question2-statistics .statistics-bar').addClass('yellow');
    } else if (q2Average >= 3.5) {
      $('#question2-statistics .statistics-bar').addClass('green')}

      if (q3Average >= 1 && q3Average < 2.5) {
  $('#question3-statistics .statistics-bar').addClass('red');
} else if (q3Average >= 2.5 && q3Average < 3.5) {
  $('#question3-statistics .statistics-bar').addClass('yellow');
} else if (q3Average >= 3.5) {
  $('#question3-statistics .statistics-bar').addClass('green');
}
});
});