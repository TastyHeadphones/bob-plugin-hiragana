var items = [
    ["auto", "auto"],
    ["ja", "Japanese"],
    ["zh-Hans", "Chinese Simplified"],
    ["zh-Hant", "Chinese Traditional"],
    ["en", "English"]
];

function supportLanguages() {
    return items.map(function (item) {
        return item[0];
    });
}

function translate(query, completion) {
    var text = query.text;
    var api_id = $option.api_id;

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

    var lines = text.split('\n');

    var promises = lines.map(function (line) {
        if (!line.trim()) {
            return Promise.resolve({ converted: line, words: [] });
        }
        return fetchFurigana(line, api_id);
    });

    Promise.all(promises)
        .then(function (results) {
            var convertedParagraphs = results.map(function (r) { return r.converted; });

            // Flatten all words from all lines
            var allWords = [];
            results.forEach(function (r) {
                if (r.words) {
                    allWords = allWords.concat(r.words);
                }
            });

            // Filter for vocabulary (Kanji words)
            // Criteria: furigana exists AND furigana != surface
            var vocabList = allWords.filter(function (w) {
                return w.furigana && w.surface !== w.furigana;
            });

            // Construct toDict parts
            var parts = vocabList.map(function (w) {
                return {
                    part: w.surface,
                    means: [w.furigana]
                };
            });

            var resultObj = {
                from: 'ja',
                to: 'ja',
                toParagraphs: convertedParagraphs
            };

            // Only add toDict if we found vocabulary
            if (parts.length > 0) {
                resultObj.toDict = {
                    parts: parts
                };
            }

            completion({
                result: resultObj
            });
        })
        .catch(function (err) {
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

function fetchFurigana(text, api_id) {
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
    }).then(function (resp) {
        if (resp.error) {
            throw new Error(resp.error.localizedDescription || 'Network error');
        }

        var data = resp.data;

        if (data.error) {
            throw new Error('API Error: ' + data.error.message);
        }

        if (!data.result || !data.result.word) {
            return { converted: text, words: [] };
        }

        var words = data.result.word;
        var convertedText = words.map(function (word) {
            return word.furigana || word.surface;
        }).join('');

        return {
            converted: convertedText,
            words: words
        };
    });
}
