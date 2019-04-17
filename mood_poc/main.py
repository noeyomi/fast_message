from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer, PatternAnalyzer
from textblob_fr import PatternAnalyzer as PatternAnalyzerFr
from textblob import exceptions
import numpy as np

def tradFeelingNaiv(text, analyzer=NaiveBayesAnalyzer()):
    b = TextBlob(text)
    translatedText = text
    try:
        translatedText = b.translate(to="en")
    except exceptions.NotTranslated:
        pass
    b = TextBlob(str(translatedText), analyzer=analyzer)
    return {"polarity": b.sentiment.p_pos - b.sentiment.p_neg}

def tradFeelingPattern(text, analyzer=PatternAnalyzer()):
    b = TextBlob(text)
    translatedText = text
    try:
        translatedText = b.translate(to="en")
    except exceptions.NotTranslated:
        pass
    b = TextBlob(str(translatedText), analyzer=analyzer)
    return {"polarity": b.polarity}

def frFeeling(text, analyzer=PatternAnalyzerFr()):
    b = TextBlob(text, analyzer=analyzer)
    return {"polarity": b.sentiment[0]}

def getLanguage(text):
    b = TextBlob(text)
    return b.detect_language()

def fetchInfos(text):
    results = []
    results.append({"language": "en", **tradFeelingNaiv(text)})
    results.append({"language": "en", **tradFeelingPattern(text)})
    results.append({"language": "fr", **frFeeling(text)})
    return results

def getFeeling(text):
    results = fetchInfos(text)
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

if __name__=="__main__":
    text = '''
    Salut les amis
    '''
    print(getFeeling(text))