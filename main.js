var items = [
    ["auto", "auto"],
    ["ja", "Japanese"],
    ["zh-Hans", "Chinese Simplified"],
    ["zh-Hant", "Chinese Traditional"],
    ["en", "English"]
];

function supportLanguages() {
    return items.map(function(item) {
        return item[0];
    });
}

function translate(query, completion) {
    var text = query.text;
    var api_id = $option.api_id;
    var mode = $option.mode;

    if (!api_id) {
        completion({
            error: {
                type: 'secretKey',
                message: 'Please set your Yahoo Client ID in plugin options',
                addtion: 'Get it from https://e.developer.yahoo.co.jp/dashboard/'
            }
        });
        return;
    }

    // Split text by lines to preserve formatting
    var lines = text.split('\n');
    
    // Create promises for each line
    var promises = lines.map(function(line) {
        if (!line.trim()) {
            return Promise.resolve(line);
        }
        return fetchFurigana(line, api_id, mode);
    });

    Promise.all(promises)
        .then(function(results) {
            var finalResult = results.join('\n');
            completion({
                result: {
                    from: 'ja',
                    to: 'ja',
                    toParagraphs: results
                }
            });
        })
        .catch(function(err) {
            $log.error('Translation failed: ' + JSON.stringify(err));
            completion({
                error: {
                    type: 'api',
                    message: err.message || 'Unknown error',
                    addtion: JSON.stringify(err)
                }
            });
        });
}

function fetchFurigana(text, api_id, mode) {
    return $http.request({
        method: 'POST',
        url: 'https://jlp.yahooapis.jp/FuriganaService/V2/furigana',
        header: {
            'Content-Type': 'application/json',
            'User-Agent': 'Yahoo AppID: ' + api_id
        },
        body: {
            "id": "12345",
            "jsonrpc": "2.0",
            "method": "jlp.furiganaservice.furigana",
            "params": {
                "q": text,
                "grade": 1
            }
        }
    }).then(function(resp) {
        if (resp.error) {
            throw new Error(resp.error.localizedDescription || 'Network error');
        }
        
        var data = resp.data;
        
        // Handle API errors (JSON-RPC error response)
        if (data.error) {
            throw new Error('API Error: ' + data.error.message);
        }
        
        if (!data.result || !data.result.word) {
            // Fallback if structure is unexpected but no error
            return text;
        }

        var words = data.result.word;
        var convertedText = words.map(function(word) {
            var surface = word.surface;
            var furigana = word.furigana;

            if (mode === 'kana') {
                return furigana || surface;
            } else { // annotated
                if (furigana && furigana !== surface) {
                    return surface + '(' + furigana + ')';
                } else {
                    return surface;
                }
            }
        }).join('');

        return convertedText;
    });
}
