'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    { imageId: 'comic-panel-1', text: "Meet Raju. He wonders how to increase his farm's income." },
    { imageId: 'comic-panel-2', text: 'He learns about oilseed crops like mustard and soybean, which are in high demand.' },
    { imageId: 'comic-panel-3', text: 'With government support and better market prices, oilseeds can be very profitable.' },
    { imageId: 'comic-panel-4', text: 'Now, Raju has a successful oilseed harvest and a prosperous future!' },
  ],
  hi: [
    { imageId: 'comic-panel-1', text: 'ये हैं राजू। वह सोचते हैं कि अपने खेत की आय कैसे बढ़ाएं।' },
    { imageId: 'comic-panel-2', text: 'उन्हें सरसों और सोयाबीन जैसी तिलहन फसलों के बारे में पता चलता है, जिनकी बहुत मांग है।' },
    { imageId: 'comic-panel-3', text: 'सरकारी सहायता और बेहतर बाजार कीमतों से तिलहन बहुत लाभदायक हो सकता है।' },
    { imageId: 'comic-panel-4', text: 'अब, राजू के पास तिलहन की सफल फसल और एक समृद्ध भविष्य है!' },
  ],
  mr: [
    { imageId: 'comic-panel-1', text: 'हे आहेत राजू. ते विचार करतात की त्यांच्या शेतीचे उत्पन्न कसे वाढवायचे.' },
    { imageId: 'comic-panel-2', text: 'त्यांना मोहरी आणि सोयाबीनसारख्या तेलबिया पिकांबद्दल माहिती मिळते, ज्यांना मोठी मागणी आहे.' },
    { imageId: 'comic-panel-3', text: 'सरकारी मदतीने आणि चांगल्या बाजारभावाने तेलबिया खूप फायदेशीर ठरू शकतात.' },
    { imageId: 'comic-panel-4', text: 'आता, राजू यांच्याकडे तेलबियांचे यशस्वी पीक आणि समृद्ध भविष्य आहे!' },
  ],
  te: [
    { imageId: 'comic-panel-1', text: 'ఇతను రాజు. తన పొలం ఆదాయాన్ని ఎలా పెంచుకోవాలో ఆలోచిస్తున్నాడు.' },
    { imageId: 'comic-panel-2', text: 'అతను ఆవాలు మరియు సోయాబీన్ వంటి నూనెగింజల పంటల గురించి తెలుసుకుంటాడు, వీటికి అధిక డిమాండ్ ఉంది.' },
    { imageId: 'comic-panel-3', text: 'ప్రభుత్వ మద్దతు మరియు మెరుగైన మార్కెట్ ధరలతో, నూనెగింజలు చాలా లాభదాయకంగా ఉంటాయి.' },
    { imageId: 'comic-panel-4', text: 'ఇప్పుడు, రాజు నూనెగింజల పంటలో విజయం సాధించి, ఉజ్వల భవిష్యత్తును పొందాడు!' },
  ],
  or: [
    { imageId: 'comic-panel-1', text: 'ଏ ହେଉଛନ୍ତି ରାଜୁ। ସେ ଭାବୁଛନ୍ତି କିପରି ତାଙ୍କ ଫାର୍ମର ଆୟ ବଢାଇବେ।' },
    { imageId: 'comic-panel-2', text: 'ସେ ସୋରିଷ ଏବଂ ସୋୟାବିନ୍ ପରି ତୈଳବୀଜ ଫସଲ ବିଷୟରେ ଜାଣିବାକୁ ପାଆନ୍ତି, ଯାହାର ବହୁତ ଚାହିଦା ଅଛି।' },
    { imageId: 'comic-panel-3', text: 'ସରକାରୀ ସହାୟତା ଏବଂ ଉନ୍ନତ ବଜାର ମୂଲ୍ୟ ସହିତ, ତୈଳବୀଜ ବହୁତ ଲାଭଜନକ ହୋଇପାରେ।' },
    { imageId: 'comic-panel-4', text: 'ବର୍ତ୍ତମାନ, ରାଜୁଙ୍କର ଏକ ସଫଳ ତୈଳବୀଜ ଅମଳ ଏବଂ ଏକ ସମୃଦ୍ଧ ଭବିଷ్యତ ଅଛି!' },
  ],
  pa: [
    { imageId: 'comic-panel-1', text: 'ਇਹ ਰਾਜੂ ਹੈ। ਉਹ ਸੋਚਦਾ ਹੈ ਕਿ ਆਪਣੇ ਖੇਤ ਦੀ ਆਮਦਨ ਕਿਵੇਂ ਵਧਾਈ ਜਾਵੇ।' },
    { imageId: 'comic-panel-2', text: 'ਉਸਨੂੰ ਸਰ੍ਹੋਂ ਅਤੇ ਸੋਇਆਬੀਨ ਵਰਗੀਆਂ ਤੇਲ ਬੀਜ ਫਸਲਾਂ ਬਾਰੇ ਪਤਾ ਲੱਗਦਾ ਹੈ, ਜਿਨ੍ਹਾਂ ਦੀ ਬਹੁਤ ਮੰਗ ਹੈ।' },
    { imageId: 'comic-panel-3', text: 'ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਅਤੇ ਬਿਹਤਰ ਬਜ਼ਾਰ ਕੀਮਤਾਂ ਨਾਲ, ਤੇਲ ਬੀਜ ਬਹੁਤ ਲਾਭਦਾਇਕ ਹੋ ਸਕਦੇ ਹਨ।' },
    { imageId: 'comic-panel-4', text: 'ਹੁਣ, ਰਾਜੂ ਕੋਲ ਤੇਲ ਬੀਜਾਂ ਦੀ ਸਫਲ ਫਸਲ ਅਤੇ ਇੱਕ ਖੁਸ਼ਹਾਲ ਭਵਿੱਖ ਹੈ!' },
  ],
  bn: [
    { imageId: 'comic-panel-1', text: 'ইনি রাজু। তিনি ভাবছেন কীভাবে তার খামারের আয় বাড়ানো যায়।' },
    { imageId: 'comic-panel-2', text: 'তিনি সর্ষে এবং সয়াবিনের মতো তেলবীজ ফসল সম্পর্কে জানতে পারেন, যার উচ্চ চাহিদা রয়েছে।' },
    { imageId: 'comic-panel-3', text: 'সরকারি সহায়তা এবং উন্নত বাজার মূল্যের সাথে, তেলবীজ খুব লাভজনক হতে পারে।' },
    { imageId: 'comic-panel-4', text: 'এখন, রাজুর একটি সফল তেলবীজ ফসল এবং একটি সমৃদ্ধ ভবিষ্যত রয়েছে!' },
  ]
};

const ComicPanel = ({ panel, index }: { panel: { imageId: string; text: string }, index: number }) => {
  const image = PlaceHolderImages.find(p => p.id === panel.imageId);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const filter = useTransform(scrollYProgress, [0, 0.5, 1], ['grayscale(100%)', 'grayscale(0%)', 'grayscale(100%)']);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="h-screen flex items-center justify-center snap-center"
    >
      <div className="relative w-[90vw] md:w-[70vw] lg:w-[50vw] aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border-4 border-card">
        {image && (
          <motion.div className="absolute inset-0" style={{ scale, filter }}>
             <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
              priority
              style={{ y }}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex flex-col items-center justify-center text-center">
          <motion.p
            className="text-white text-lg md:text-2xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {panel.text}
          </motion.p>
        </div>
        <div className="absolute top-4 right-4 bg-black/50 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
          {index + 1}
        </div>
      </div>
    </motion.div>
  );
};


export function OilSeedComics() {
  const [selectedLang, setSelectedLang] = useState<keyof typeof comicContent>('en');
  const panels = comicContent[selectedLang] || comicContent.en;

  return (
    <div>
      <div className="sticky top-4 z-10 flex justify-end mb-4 pr-4">
        <Select onValueChange={(value: keyof typeof comicContent) => setSelectedLang(value)} defaultValue={selectedLang}>
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

      <div className="relative h-[400vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden">
          {panels.map((panel, index) => (
            <ComicPanel key={`${selectedLang}-${index}`} panel={panel} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

    