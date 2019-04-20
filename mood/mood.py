from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer, PatternAnalyzer
from textblob.en.taggers import NLTKTagger, PatternTagger
from textblob_fr import PatternAnalyzer as PatternAnalyzerFr
from textblob import exceptions
import numpy as np
from threading import Thread

def tradFeelingNaiv(text, analyzer=NaiveBayesAnalyzer()):
    b = TextBlob(text)
    translatedText = text
    try:
        translatedText = b.translate(to="en")
    except exceptions.NotTranslated:
        pass
    b = TextBlob(str(translatedText), analyzer=analyzer)
    return {"polarity": b.sentiment.p_pos - b.sentiment.p_neg, "language": "en"}

def tradFeelingPattern(text, analyzer=PatternAnalyzer()):
    b = TextBlob(text)
    translatedText = text
    try:
        translatedText = b.translate(to="en")
    except exceptions.NotTranslated:
        pass
    b = TextBlob(str(translatedText), analyzer=analyzer)
    return {"polarity": b.polarity, "language": "en"}

def frFeeling(text, analyzer=PatternAnalyzerFr()):
    b = TextBlob(text, analyzer=analyzer)
    return {"polarity": b.sentiment[0], "language": "fr"}

def getLanguage(text):
    b = TextBlob(text)
    return b.detect_language()

def resToTab(tab, fct, *args, **kwargs):
    res = fct(*args, **kwargs)
    tab.append(res)

def fetchInfos(text, fast):
    results = []
    threads = []
    if not fast:
        threads.append(Thread(target=resToTab, args=(results, tradFeelingNaiv, (text))))
    threads.append(Thread(target=resToTab, args=(results, tradFeelingPattern, (text))))
    threads.append(Thread(target=resToTab, args=(results, frFeeling, (text))))
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    return results

def getFeeling(text, fast = False):
    results = fetchInfos(text, fast)
    language = getLanguage(text)
    weights = []
    for analyse in results:
        p = analyse["polarity"]
        if language == analyse["language"]:
            weights.append(2)
        else:
            weights.append(1)
    popArray = [analyse["polarity"] for analyse in results]
    result = np.average(popArray, weights=weights)
    return result

def spellCheck(text):
    language = getLanguage(text)
    b = TextBlob(text, pos_tagger=PatternTagger())
    for word in b.words:
        print(word)
        print(word.spellcheck())

def polarityToMood(polarity):
    tab = {
        "happy": 0.5,
        "neutral": 0,
        "sad": -0.5,
    }
    selected = None
    for key in tab:
        if (not selected):
            selected = key
        elif (abs(tab[key] - polarity) < abs(tab[selected] - polarity)):
            selected = key
    return selected

if __name__=="__main__":
    text = '''
    Je suis content
    '''
    p = getFeeling(text, True)
    print(polarityToMood(p))
