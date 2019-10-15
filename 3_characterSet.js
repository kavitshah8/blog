var regEx = /gr[ea]y/;

function regexEval(regex, testData) {
    testData.forEach(data => {
        console.log(`Does ${data} match the regex ${regex}? \n Answer is ${regex.test(data)}`);
    });
}

regexEval(regex, ["grey", "gray"]);
