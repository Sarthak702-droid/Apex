'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';

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
    { imageId: 'comic-panel-1', text: 'Meet Raju. He wonders how to increase his farm\'s income.' },
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
  // Add other languages here...
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
    { imageId: 'comic-panel-4', text: 'ବର୍ତ୍ତମାନ, ରାଜୁଙ୍କର ଏକ ସଫଳ ତୈଳବୀଜ ଅମଳ ଏବଂ ଏକ ସମୃଦ୍ଧ ଭବିଷ୍ୟତ ଅଛି!' },
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

export function OilSeedComics() {
  const [selectedLang, setSelectedLang] = useState<keyof typeof comicContent>('en');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const panels = comicContent[selectedLang] || comicContent.en;

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Select onValueChange={(value: keyof typeof comicContent) => setSelectedLang(value)} defaultValue={selectedLang}>
          <SelectTrigger className="w-[180px]">
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
              <CarouselItem key={index}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="flex flex-col md:flex-row items-center justify-center p-6 gap-6 aspect-video">
                        <div className="md:w-1/2 relative w-full h-48 md:h-full overflow-hidden rounded-lg">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={image.description}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                        </div>
                        <div className="md:w-1/2 text-center md:text-left">
                          <p className="text-lg font-medium text-foreground">{panel.text}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0">
                      <div className="flex flex-col md:flex-row items-stretch">
                        <div className="md:w-1/2 relative w-full aspect-square">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={image.description}
                              fill
                              className="object-cover"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                        </div>
                        <div className="md:w-1/2 flex flex-col justify-center p-8">
                           <p className="text-xl text-center font-medium text-foreground">{panel.text}</p>
                        </div>
                      </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Panel {current} of {count}
      </div>
    </div>
  );
}
