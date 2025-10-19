'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी (Hindi)' },
  { value: 'mr', label: 'मराठी (Marathi)' },
  { value: 'te', label: 'తెలుగు (Telugu)' },
  { value: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  { value: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { value: 'bn', label: 'বাংলা (Bengali)' },
];

const comicContent = {
  en: [
    { imageId: 'comic-panel-1', text: "Meet Raju. A hardworking farmer, but worried about his fluctuating income from traditional crops." },
    { imageId: 'comic-page-2', text: 'One day, at a village meeting, he learns about the "Tel-Samriddhi" mission and its focus on oilseeds.' },
    { imageId: 'comic-page-3', text: 'He uses the Tel-Samriddhi app to get AI-powered advice on which oilseed is best for his land.' },
    { imageId: 'comic-panel-2', text: 'Raju decides to plant soybeans, a high-demand oilseed crop perfect for his region.' },
    { imageId: 'comic-page-5', text: 'He follows best practices for soil preparation and sowing, guided by tips from the app.' },
    { imageId: 'comic-page-6', text: 'His soybean plants grow healthy and strong, promising a great harvest.' },
    { imageId: 'comic-panel-3', text: 'The government provides support, ensuring better market prices and direct buyer linkages.' },
    { imageId: 'comic-panel-4', text: 'Harvest time! Raju reaps a bountiful crop, his hard work paying off.' },
    { imageId: 'comic-page-9', text: 'His income has doubled! He can now provide a better future for his family.' },
    { imageId: 'comic-page-10', text: 'Raju becomes a role model, inspiring other farmers in his village to adopt oilseed farming.' },
  ],
  hi: [
    { imageId: 'comic-panel-1', text: 'ये हैं राजू। एक मेहनती किसान, लेकिन पारंपरिक फसलों से अपनी अस्थिर आय के बारे में चिंतित हैं।' },
    { imageId: 'comic-page-2', text: 'एक दिन, गांव की बैठक में, उन्हें "तेल-समृद्धि" मिशन और तिलहन पर इसके फोकस के बारे में पता चलता है।' },
    { imageId: 'comic-page-3', text: 'वह तेल-समृद्धि ऐप का उपयोग करके AI-संचालित सलाह लेते हैं कि उनकी भूमि के लिए कौन सा तिलहन सबसे अच्छा है।' },
    { imageId: 'comic-panel-2', text: 'राजू ने सोयाबीन लगाने का फैसला किया, जो उसके क्षेत्र के लिए एक उच्च मांग वाली तिलहन फसल है।' },
    { imageId: 'comic-page-5', text: 'वह ऐप से मिले सुझावों के अनुसार मिट्टी की तैयारी और बुवाई के लिए सर्वोत्तम प्रथाओं का पालन करते हैं।' },
    { imageId: 'comic-page-6', text: 'उनके सोयाबीन के पौधे स्वस्थ और मजबूत होते हैं, जो एक शानदार फसल का वादा करते हैं।' },
    { imageId: 'comic-panel-3', text: 'सरकार बेहतर बाजार मूल्य और सीधे खरीदार संपर्क सुनिश्चित करते हुए सहायता प्रदान करती है।' },
    { imageId: 'comic-panel-4', text: 'कटाई का समय! राजू को भरपूर फसल मिलती है, उसकी मेहनत रंग लाती है।' },
    { imageId: 'comic-page-9', text: 'उनकी आय दोगुनी हो गई है! अब वह अपने परिवार को बेहतर भविष्य दे सकते हैं।' },
    { imageId: 'comic-page-10', text: 'राजू एक आदर्श बन जाते हैं, जो अपने गांव के अन्य किसानों को तिलहन की खेती अपनाने के लिए प्रेरित करते हैं।' },
  ],
  mr: [
      { imageId: 'comic-panel-1', text: "हे आहेत राजू. एक कष्टकरी शेतकरी, पण पारंपरिक पिकांमुळे मिळणाऱ्या अस्थिर उत्पन्नामुळे काळजीत आहेत." },
      { imageId: 'comic-page-2', text: "एके दिवशी, गावच्या सभेत त्यांना 'तेल-समृद्धी' मिशनबद्दल आणि तेलबियांवरील त्याच्या मुख्य ध्येयाबद्दल कळते." },
      { imageId: 'comic-page-3', text: "ते तेल-समृद्धी अॅप वापरून त्यांच्या जमिनीसाठी कोणते तेलबिया सर्वोत्तम आहे याबद्दल AI-आधारित सल्ला घेतात." },
      { imageId: 'comic-panel-2', text: "राजू सोयाबीन लावण्याचा निर्णय घेतात, जे त्यांच्या प्रदेशासाठी एक उच्च-मागणी असलेले तेलबिया पीक आहे." },
      { imageId: 'comic-page-5', text: "ते अॅपमधील टिप्सनुसार जमिनीची तयारी आणि पेरणीसाठी सर्वोत्तम पद्धतींचे पालन करतात." },
      { imageId: 'comic-page-6', text: "त्यांची सोयाबीनची रोपे निरोगी आणि मजबूत वाढतात, ज्यामुळे चांगल्या कापणीची आशा आहे." },
      { imageId: 'comic-panel-3', text: "सरकार समर्थन पुरवते, ज्यामुळे चांगले बाजारभाव आणि थेट खरेदीदारांशी संपर्क सुनिश्चित होतो." },
      { imageId: 'comic-panel-4', text: "कापणीची वेळ! राजू भरपूर पीक घेतात, त्यांच्या कष्टाचे फळ मिळते." },
      { imageId: 'comic-page-9', text: "त्यांचे उत्पन्न दुप्पट झाले आहे! आता ते आपल्या कुटुंबाला एक चांगले भविष्य देऊ शकतात." },
      { imageId: 'comic-page-10', text: "राजू एक आदर्श बनतात, आणि आपल्या गावातील इतर शेतकऱ्यांना तेलबिया शेती स्वीकारण्यासाठी प्रेरित करतात." }
  ],
   te: [
      { imageId: 'comic-panel-1', text: "ఇతను రాజు. కష్టపడి పనిచేసే రైతు, కానీ సాంప్రదాయ పంటల నుండి వచ్చే అస్థిర ఆదాయం గురించి ఆందోళన చెందుతున్నాడు." },
      { imageId: 'comic-page-2', text: "ఒక రోజు, గ్రామ సమావేశంలో, అతను 'తెల్-समृद्धि' మిషన్ మరియు నూనెగింజలపై దాని దృష్టి గురించి తెలుసుకుంటాడు." },
      { imageId: 'comic-page-3', text: "అతను తన భూమికి ఏ నూనెగింజలు ఉత్తమమైనవో AI-ఆధారిత సలహా పొందడానికి తెల్-समृद्धि యాప్‌ను ఉపయోగిస్తాడు." },
      { imageId: 'comic-panel-2', text: "రాజు తన ప్రాంతానికి సరైన, అధిక డిమాండ్ ఉన్న నూనెగింజల పంట అయిన సోయాబీన్‌ను నాటాలని నిర్ణయించుకున్నాడు." },
      { imageId: 'comic-page-5', text: "అతను యాప్ నుండి వచ్చిన చిట్కాలతో నేల తయారీ మరియు విత్తడానికి ఉత్తమ పద్ధతులను అనుసరిస్తాడు." },
      { imageId: 'comic-page-6', text: "అతని సోయాబీన్ మొక్కలు ఆరోగ్యంగా మరియు బలంగా పెరుగుతాయి, గొప్ప పంటను వాగ్దానం చేస్తాయి." },
      { imageId: 'comic-panel-3', text: "ప్రభుత్వం మద్దతు అందిస్తుంది, మెరుగైన మార్కెట్ ధరలు మరియు ప్రత్యక్ష కొనుగోలుదారుల అనుసంధానాలను ಖಚಿತపరుస్తుంది." },
      { imageId: 'comic-panel-4', text: "పంట కోత సమయం! రాజు తన కష్టానికి ప్రతిఫలంగా సమృద్ధిగా పంటను పొందుతాడు." },
      { imageId: 'comic-page-9', text: "అతని ఆదాయం రెట్టింపు అయింది! ఇప్పుడు అతను తన కుటుంబానికి మెరుగైన భవిష్యత్తును అందించగలడు." },
      { imageId: 'comic-page-10', text: "రాజు తన గ్రామంలోని ఇతర రైతులకు నూనెగింజల సేద్యం చేపట్టడానికి ప్రేరణగా నిలుస్తాడు." }
  ],
  or: [
      { imageId: 'comic-panel-1', text: "ଏ ହେଉଛନ୍ତି ରାଜୁ। ଜଣେ କଠିନ ପରିଶ୍ରମୀ କୃଷକ, କିନ୍ତୁ ପାରମ୍ପରିକ ଫସଲରୁ ମିଳୁଥିବା ଅସ୍ଥିର ଆୟ ପାଇଁ ଚିନ୍ତିତ।" },
      { imageId: 'comic-page-2', text: "ଦିନେ, ଏକ ଗ୍ରାମସଭାରେ ସେ 'ତେଲ-ସମୃଦ୍ଧି' ମିଶନ ଏବଂ ତୈଳବୀଜ ଉପରେ ଏହାର ଧ୍ୟାନ ବିଷୟରେ ଜାଣିବାକୁ ਪਾଆନ୍ତି।" },
      { imageId: 'comic-page-3', text: "ସେ ତେଲ-ସମୃଦ୍ଧି ଆପ୍ ବ୍ୟବହାର କରି ତାଙ୍କ ଜମି ପାଇଁ କେଉଁ ତୈଳବୀଜ ସର୍ବୋత్తମ, ସେଥିପାଇଁ AI-ଆధାରିତ ପରାମର୍ଶ ପାଆନ୍ତି।" },
      { imageId: 'comic-panel-2', text: "ରାଜୁ ସୋୟାବିନ୍ ଚାଷ କରିବାକୁ ନିଷ୍ପत्ति ନିଅନ୍ତି, ଯାହା ତାଙ୍କ ଅଞ୍ଚଳ ପାଇଁ ଏକ ઉચ્ચ-मागणी ଥିବା ତୈଳବୀଜ ଫସଲ।" },
      { imageId: 'comic-page-5', text: "ସେ ଆପ୍‌ରୁ ମିଳିଥିବା ପରାମର୍ଶ ଅନੁଯାୟୀ ମାଟି ପ୍ରସ୍ତୁତି ଏବଂ ବୁଣିବା ପାଇଁ ସର୍ବୋత్తମ ପ୍ରଣାଳୀ ଅନੁସରଣ କରନ୍ତି।" },
      { imageId: 'comic-page-6', text: "ତାଙ୍କର ସୋୟାବିନ୍ ଗଛଗୁଡ଼ିକ ସୁସ୍ଥ ଓ ශକ୍ତିଶାଳୀ ହୋଇ ବଢ଼ନ୍ତି, ଯାହା ଏକ ଭଲ ଅମଳର ପ୍ରତିଶୃତି ଦିଏ।" },
      { imageId: 'comic-panel-3', text: "ସରକାର ସਹਾયତା ପ୍ରଦାନ କରନ୍ତି, ଯାହା ଉନ୍ନତ ବଜାର ମୂଲ୍ୟ ଏବଂ ସିଧା କ्रेତାଙ୍କ ସହ ଯୋଗାଯୋଗ ସୁନିଶ୍ਚିତ କରେ।" },
      { imageId: 'comic-panel-4', text: "ଅମଳ ସମୟ! ରାଜୁଙ୍କୁ ଭਰପੂର ଫସଲ ମିଳେ, ତାଙ୍କ କଠିନ ପରିଶ୍ରਮର ଫଳ ମିଳେ।" },
      { imageId: 'comic-page-9', text: "ତାଙ୍କର ଆୟ ଦୁଇଗୁଣ ହୋଇଯାଇଛି! ସେ ଏବେ ନିଜ ପରିବାରକୁ ଏକ ଭଲ ଭବିष्यତ ଦେଇପାରିବେ।" },
      { imageId: 'comic-page-10', text: "ରାଜୁ ଏକ ଆଦର୍ଶ ପାଲଟିଛନ୍ତି, ନିଜ ଗାଁର ଅନ୍ୟ କୃଷକମାନଙ୍କୁ ତୈଳବୀଜ ଚାଷ ପାଇଁ ਪ੍ਰੇਰિત କରୁଛନ୍ତି।" }
  ],
   pa: [
      { imageId: 'comic-panel-1', text: "ਇਹ ਰਾਜੂ ਹੈ। ਇੱਕ ਮਿਹਨਤੀ ਕਿਸਾਨ, ਪਰ ਰਵਾਇਤੀ ਫਸਲਾਂ ਤੋਂ ਆਪਣੀ ਬਦਲਦੀ ਆਮਦਨ ਬਾਰੇ ਚਿੰਤਤ ਹੈ।" },
      { imageId: 'comic-page-2', text: "ਇੱਕ ਦਿਨ, ਪਿੰਡ ਦੀ ਮੀਟਿੰਗ ਵਿੱਚ, ਉਹ 'ਤੇਲ-ਸਮ੍ਰਿਧੀ' ਮਿਸ਼ਨ ਅਤੇ ਤੇਲ ਬੀਜਾਂ 'ਤੇ ਇਸ ਦੇ ਧਿਆਨ ਬਾਰੇ ਸਿੱਖਦਾ ਹੈ।" },
      { imageId: 'comic-page-3', text: "ਉਹ ਤੇਲ-ਸਮ੍ਰਿਧੀ ਐਪ ਦੀ ਵਰਤੋਂ ਕਰਕੇ AI-ਸੰਚਾਲਿਤ ਸਲਾਹ ਲੈਂਦਾ ਹੈ ਕਿ ਉਸਦੀ ਜ਼ਮੀਨ ਲਈ ਕਿਹੜਾ ਤੇਲ ਬੀਜ ਸਭ ਤੋਂ ਵਧੀਆ ਹੈ।" },
      { imageId: 'comic-panel-2', text: "ਰਾਜੂ ਸੋਇਆਬੀਨ ਬੀਜਣ ਦਾ ਫੈਸਲਾ ਕਰਦਾ ਹੈ, ਜੋ ਉਸਦੇ ਖੇਤਰ ਲਈ ਇੱਕ ਉੱਚ-ਮੰਗ ਵਾਲੀ ਤੇਲ ਬੀਜ ਫਸਲ ਹੈ।" },
      { imageId: 'comic-page-5', text: "ਉਹ ਐਪ ਤੋਂ ਮਿਲੇ ਸੁਝਾਵਾਂ ਅਨੁਸਾਰ ਮਿੱਟੀ ਦੀ ਤਿਆਰੀ ਅਤੇ ਬਿਜਾਈ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਤਰੀਕਿਆਂ ਦੀ ਪਾਲਣਾ ਕਰਦਾ ਹੈ।" },
      { imageId: 'comic-page-6', text: "ਉਸਦੇ ਸੋਇਆਬੀਨ ਦੇ ਪੌਦੇ ਸਿਹਤਮੰਦ ਅਤੇ ਮਜ਼ਬੂਤ ਹੁੰਦੇ ਹਨ, ਜੋ ਇੱਕ ਸ਼ਾਨदार ਫਸਲ ਦਾ ਵਾਅਦਾ ਕਰਦੇ ਹਨ।" },
      { imageId: 'comic-panel-3', text: "ਸਰਕਾਰ ਸਹਾਇਤਾ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਬਿਹतर ਬਜ਼ਾਰ ਮੁੱਲ ਅਤੇ ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸੰਪਰਕ ਯਕੀਨੀ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ।" },
      { imageId: 'comic-panel-4', text: "ਵਾਢੀ ਦਾ ਸਮਾਂ! ਰਾਜੂ ਨੂੰ ਭਰਪੂਰ ਫਸਲ ਮਿਲਦੀ ਹੈ, ਉਸਦੀ ਮਿਹਨਤ रंग ਲਿਆਉਂਦੀ ਹੈ।" },
      { imageId: 'comic-page-9', text: "ਉਸਦੀ ਆਮਦਨ ਦੁੱਗਣੀ ਹੋ गई ਹੈ! ਹੁਣ ਉਹ ਆਪਣੇ ਪਰਿਵਾਰ ਨੂੰ ਇੱਕ ਬਿਹतर ਭਵਿੱਖ ਦੇ ਸਕਦਾ ਹੈ।" },
      { imageId: 'comic-page-10', text: "ਰਾਜੂ ਇੱਕ ਰੋਲ ਮਾਡਲ ਬਣ ਜਾਂਦਾ ਹੈ, ਜੋ ਆਪਣੇ ਪਿੰਡ ਦੇ ਦੂਜੇ ਕਿਸਾਨਾਂ ਨੂੰ ਤੇਲ ਬੀਜਾਂ ਦੀ ਖੇਤੀ ਅਪਣਾਉਣ ਲਈ ਪ੍ਰੇਰਿਤ ਕਰਦਾ ਹੈ।" }
  ],
  bn: [
      { imageId: 'comic-panel-1', text: "ইনি রাজু। একজন পরিশ্রমী কৃষক, কিন্তু প্রথাগত ফসল থেকে তার अस्थिर আয় নিয়ে চিন্তিত।" },
      { imageId: 'comic-page-2', text: "একদিন, গ্রামের এক সভায়, তিনি 'তেল-সমৃদ্ধি' মিশন এবং তেলবীজের উপর এর গুরুત્ବ সম্পর্কে জানতে পারেন।" },
      { imageId: 'comic-page-3', text: "তিনি তেল-সমৃদ্ধি অ্যাপ ব্যবহার করে তার জমির জন্য কোন তেলবীজ সবচেয়ে ভালো হবে সে সম্পর্কে AI-চালিত পরামর্শ নেন।" },
      { imageId: 'comic-panel-2', text: "রাজু সয়াবিন চাষ করার সিদ্ধান্ত নেন, যা তার অঞ্চলের জন্য একটি উচ্চ-চাহিদা সম্পন্ন তেলবীজ ফসল।" },
      { imageId: 'comic-page-5', text: "তিনি অ্যাপ থেকে পাওয়া টিপস অনুযায়ী মাটি প্রস্তুতি এবং বপনের জন্য সেরা পদ্ধতি অনুসরণ করেন।" },
      { imageId: 'comic-page-6', text: "তার সয়ابিন গাছগুলি स्वस्थ এবং শক্তিশালী হয়ে ওঠে, যা একটি চমৎকার ফসলের প্রতিশ্রুতি দেয়।" },
      { imageId: 'comic-panel-3', text: "সরকার সমর্থন প্রদান করে, যা উন্নত বাজার মূল্য এবং সরাসরি ক্রেতাদের সাথে সংযোগ নিশ্চিত করে।" },
      { imageId: 'comic-panel-4', text: "ফসল তোলার সময়! রাজু भरपूर ফসল அறுவடை করেন, তার কঠিন পরিশ্রমের ফল পান।" },
      { imageId: 'comic-page-9', text: "তার আয় দ্বিগুণ হয়ে গেছে! এখন তিনি তার পরিবারকে একটি উন্নত भविष्य দিতে পারেন।" },
      { imageId: 'comic-page-10', text: "রাজু एक आदर्श হয়ে ওঠেন, তিনি তার গ্রামের অন্যান্য কৃষকদের তেলবীজ চাষে प्रेरित করেন।" }
  ]
};

export function OilSeedComics() {
  const [selectedLang, setSelectedLang] = useState<keyof typeof comicContent>('en');
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const panels = comicContent[selectedLang] || comicContent.en;

  const handleLangChange = (value: keyof typeof comicContent) => {
    setSelectedLang(value);
    api?.scrollTo(0);
  };
  
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div>
      <div className="flex justify-end mb-4 pr-4">
        <Select onValueChange={handleLangChange} defaultValue={selectedLang}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map(lang => (
              <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {panels.map((panel, index) => {
            const image = PlaceHolderImages.find(p => p.id === panel.imageId);
            return (
              <CarouselItem key={`${selectedLang}-${index}`}>
                <div className="p-1">
                  <Card className="overflow-hidden aspect-video md:aspect-[2/1] lg:aspect-[2.4/1]">
                    <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover brightness-75"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-base md:text-xl lg:text-2xl font-bold text-center drop-shadow-md">
                          {panel.text}
                        </p>
                      </div>
                       <div className="absolute top-4 right-4 bg-black/50 text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Page {current + 1} of {panels.length}
      </div>
    </div>
  );
}
