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

    // Process each line: Fetch both Translation (Furigana) and Analysis (MA)
    var linePromises = lines.map(function (line) {
        if (!line.trim()) {
            return Promise.resolve({
                converted: line,
                tokens: []
            });
        }

        // Execute both requests in parallel for this line
        return Promise.all([
            fetchFurigana(line, api_id),
            fetchMAService(line, api_id)
        ]).then(function (results) {
            return {
                converted: results[0], // Full Hiragana string
                tokens: results[1]     // MA Tokens array
            };
        });
    });

    Promise.all(linePromises)
        .then(function (lineResults) {
            var convertedParagraphs = lineResults.map(function (r) { return r.converted; });

            // Flatten all tokens from all lines
            var allTokens = [];
            lineResults.forEach(function (r) {
                if (r.tokens) {
                    allTokens = allTokens.concat(r.tokens);
                }
            });

            // Filter for Vocabulary (Nouns/Verbs/Adjectives that contain Kanji)
            var targetPOS = ['名詞', '動詞', '形容詞'];
            // Kanji Regex: [\u4e00-\u9faf]
            var kanjiRegex = /[\u4e00-\u9faf]/;

            var vocabList = allTokens.filter(function (t) {
                var surface = t[0];
                var reading = t[1];
                var pos = t[3];

                // 1. Must be target POS
                if (targetPOS.indexOf(pos) === -1) return false;
                // 2. Must contain Kanji (to filter out pure kana words like "する", "いる")
                if (!kanjiRegex.test(surface)) return false;
                // 3. Surface must not equal Reading
                if (surface === reading) return false;

                return true;
            });

            // Use an object to deduplicate by word surface
            var uniqueVocab = {};
            vocabList.forEach(function (t) {
                var surface = t[0];
                var reading = t[1];
                var pos = t[3];

                if (!uniqueVocab[surface]) {
                    uniqueVocab[surface] = {
                        part: surface, // Use the Kanji word as the "Part of Speech" label for visibility
                        means: [reading] // The reading becomes the definition
                    };
                }
            });

            // Convert to Bob parts array
            var parts = Object.keys(uniqueVocab).map(function (key) {
                var item = uniqueVocab[key];
                return {
                    part: item.part,
                    part_name: item.part, // Helper for display
                    means: item.means
                };
            });

            var resultObj = {
                from: 'ja',
                to: 'ja',
                toParagraphs: convertedParagraphs
            };

            // Construct toDict
            resultObj.toDict = {
                word: text,
                parts: parts.length > 0 ? parts : []
            };

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
        var data = resp.data;
        if (data.error) throw new Error('Furigana API Error: ' + data.error.message);
        if (!data.result || !data.result.word) return text;

        return data.result.word.map(function (word) {
            return word.furigana || word.surface;
        }).join('');
    });
}

function fetchMAService(text, api_id) {
    return $http.request({
        method: 'POST',
        url: 'https://jlp.yahooapis.jp/MAService/V2/parse',
        header: {
            'Content-Type': 'application/json',
            'User-Agent': 'Yahoo AppID: ' + api_id
        },
        body: {
            "id": "12345",
            "jsonrpc": "2.0",
            "method": "jlp.maservice.parse",
            "params": {
                "q": text
            }
        }
    }).then(function (resp) {
        var data = resp.data;
        if (data.error) throw new Error('MA API Error: ' + data.error.message);
        // MA V2 returns result.tokens
        if (!data.result || !data.result.tokens) return [];

        return data.result.tokens;
    });
}
