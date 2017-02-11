function codeUrl(word){
    // console.log('word:', word);
    var coded = '';
    for(var i = 0; i < word.length; i++){
        switch (word[i]) {
            case 'א':
                coded += '%E0';
                break;
            case 'ב':
                coded += '%E1';
                break;
            case 'ג':
                coded += '%E2';
                break;
            case 'ד':
                coded += '%E3';
                break;
            case 'ה':
                coded += '%E4';
                break;
            case 'ו':
                coded += '%E5';
                break;
            case 'ז':
                coded += '%E6';
                break;
            case 'ח':
                coded += '%E7';
                break;
            case 'ט':
                coded += '%E8';
                break;
            case 'י':
                coded += '%E9';
                break;
            case 'כ':
                coded += '%EB';
                break;
            case 'ל':
                coded += '%EC';
                break;
            case 'מ':
                coded += '%EE';
                break;
            case 'נ':
                coded += '%F0';
                break;
            case 'ס':
                coded += '%F1';
                break;
            case 'ע':
                coded += '%F2';
                break;
            case 'פ':
                coded += '%F4';
                break;
            case 'צ':
                coded += '%F6';
                break;
            case 'ק':
                coded += '%F7';
                break;
            case 'ר':
                coded += '%F8';
                break;
            case 'ש':
                coded += '%F9';
                break;
            case 'ת':
                coded += '%FA';
                break;
            case 'ך':
                coded += '%EA';
                break;
            case 'ם':
                coded += '%ED';
                break;
            case 'ן':
                coded += '%EF';
                break;
            case 'ף':
                coded += '%F3';
                break;
            case 'ץ':
                coded += '%F5';
                break;
            case ' ':
                coded += '+'
                break;
            default:
                coded += word[i];
                break;
        }
    }

    return coded;
}

module.exports.codeUrl = codeUrl;
