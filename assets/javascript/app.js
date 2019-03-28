var questions = ["Which potion is known as \"Liquid Luck\"?", "Who was Harry Potter's first crush?", "What was the name of Harry Potter's oldest son?", "Which of these was not a horcrux of Lord Voldemort?", "What is Neville Longbottom's greatest fear?", "Who was the original bearer of the cloak of invisibility?", "What was the name of the Weasleys' owl?", "What material is inside of Harry Potter's wand?", "What was James Potter's nickname?", "What is the purpose of Finite Incantatem?", "Who was the first to be petrified by the Basilisk?", "What was Dumbledore's sister's name?"];

var answers = [["Felix Felicis", "Polyjuice Potion", "Essence of Dittany", "Bottled Fame"], ["Ginny Weasley", "Hermione Granger", "Romilda Vane", "Cho Chang"], ["Albus Severus Potter", "Ronald Fred Potter", "James Sirius Potter", "Lily Luna Potter"], ["Nagini", "The Sword of Gryffindor", "The Diadem of Ravenclaw", "Tom Riddle's Diary"], ["The Cruciatus Curse", "Severus Snape", "Lord Voldemort", "Snakes"], ["Harry Potter", "James Potter", "Albus Dumbledore", "Ignotus Peverell"], ["Errol", "Hedwig", "Buckbeak", "Horus"], ["Phoenix Tailfeathers", "Dragon Heartstrings", "Shards of Unicorn Horn", "Centaur Tears"], ["Mooney", "Prongs", "Padfoot", "Wormtail"], ["To explode an object", "To remove any magical spells", "To stop time", "To make someone's teeth grow"], ["Hermione", "Nearly Headless Nick", "Dean Thomas", "Mrs. Norris"], ["Rita", "Minerva", "Ariana", "Abella"]];

var correctAnswers = [0, 3, 2, 1, 1, 3, 0, 0, 1, 1, 3, 2];

// this blank array allows me to add more questions in my questions array
var indexes = [];

// this array stores the qaIndex used
var qaCheck = [];

// this variable stores the # of correct answers
var winCount = 0;

// this variable stores the # of unanswered questions
var noAnswer = 0;

// this loops through my questions array to create indexes array
for (i = 0; i < questions.length; i++) {
    indexes.push(i);
};

// this is where the timer starts at
    var startTime = 31;
    var intervalId;

// this function writes question rows to my HTML - LEAVE AS IS
    function makeQuestionRow() {
        // this variable picks a random index from indexes array
        var chosenIndex = Math.floor(Math.random() * Math.floor(indexes.length));
        // this variable gives you the randomly chosen index inside either questions or answers arrays
        var qaIndex = indexes[chosenIndex];
        // these variables write each random question/answer to my HTML
        var questionRow = $("<h3>").html(questions[qaIndex]);
        var answerRow = $('<div>');
        // this loops through each index of the answer array chosen (given by chosenIndex) that matches the questions array 
        for (var i = 0; i < 4; i++) {
            var answerText = answers[qaIndex][i];
            answerRow.append($('<label><input class="radio-space" type="radio" name="optradio' + qaIndex + '"value=' + i + '>' + answerText + '</label>'));
        };
        // this removes the random (chosenIndex) from indexes array, so we don't get any repeats
        indexes.splice(chosenIndex, 1);
        // this writes the question/answer lines in the html class container
        $(".qa-container").append(questionRow, answerRow);
        // this pushes the randomly chosen index into a new array
        qaCheck.push(qaIndex);
    };

    // defining a function that resets the game when solemnly swear button is clicked
    function resetGame() {
        winCount = 0;
        noAnswer = 0;
    
        $('.status-container').hide();
        $('.status-container').empty();
        $('.qa-container').empty();
        $('.qa-container').show();
        qaCheck = [];


        $('#timer').show();
        startTime = 31;
        run();
        decrement();
        indexes = [];
        for (i = 0; i < questions.length; i++) {
            indexes.push(i);
        }
        for (var i = 0; i < 8; i++) {
            makeQuestionRow();
        }

        var doneEarly = $('<button type="button" class="btn btn-warning">Mischief Managed</button>');
        //$(".qa-container").append(doneEarly);

        $(".qa-container").append(doneEarly);
        doneEarly.on("click", function () {
            $('#timer').hide();
            $('.qa-container').hide();
            addToStatusCont();
            stop();
        });
    }

    function run() {
        // this is set to run every second - does not run decrement here (no parenthases)
        clearInterval(intervalId);
        // this makes something happen every second
        intervalId = setInterval(decrement, 1000);
    };

    function decrement() {
        // this reduces the startTime by one, every second ^
        startTime--;
        // adds the current number to the DOM (visible)
        $("#timer").html("<h4> Time Remaining: " + startTime + "</h4>");
        if (startTime === 0) {
            stop();
            addToStatusCont();
        };
    };

    // defining function called stop
    function stop() {
        clearInterval(intervalId);
    }

     // this function gives me the index value of the answer array that the user checked
     function getCheckValue() {
        for (var i = 0; i < qaCheck.length; i++) {
            var checkedAns = $('[name=optradio' + qaCheck[i] + ']:checked').val();
            if (parseInt(checkedAns) === correctAnswers[qaCheck[i]]) {
                winCount++;
            } else if (checkedAns === undefined) {
                noAnswer++;
            }
        };
    };

    function addToStatusCont() {
        getCheckValue();
        $('.qa-container').hide();
        $('.status-container').append('<div>Correct Answers: ' + winCount + '</div>').show();
        $('.status-container').append('<div>Incorrect Answers: ' + (8 - winCount - noAnswer) + '</div>');
        $('.status-container').append('<div>Unanswered: ' + noAnswer + '</div><br>');
        var resetButton = $('<button type="button" class="btn btn-info">I solemnly swear that I am up to no good.</button>');
        $('.status-container').append(resetButton);

        resetButton.on("click", function () {
            resetGame();
        });
    };

$(document).ready(function () {

    // when the Begin button is clicked:
    $(".btn").on("click", function () {

        // this shows the timer when the player is ready to play the game (and clicks the button)
        $('#timer').show();

        // this for loop makes 8 questions and answers so I don't have to type out each question/answer in the HTML
        for (var i = 0; i < 8; i++) {
            makeQuestionRow();
        };

        // calls the run function, defined above
        run();

        $('.qa-container').append($('<br>'));

        // this stores the Mischief Managed button (doneEarly with the quiz)
        var doneEarly = $('<button type="button" class="btn btn-warning">Mischief Managed</button>');

        // this adds the finished button
        $(".qa-container").append(doneEarly);

        // when the timer hits zero, or the user clicks finished button, the status screen appears
        doneEarly.on("click", function () {
            $('#timer').hide();
            $('.qa-container').hide();
            addToStatusCont();
            stop();
        });

        // this hides the start quiz button after click
        $(".btn-dark").hide();
    });

    // hide timer before Begin button is clicked
    $('#timer').hide();


});