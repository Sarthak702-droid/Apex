'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { DollarSign, Landmark, Network, Leaf, Award, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

type Language = 'en' | 'hi' | 'mr' | 'te' | 'ta' | 'bn';

const benefitContent: Record<
  Language,
  { icon: React.FC<any>; title: string; description: string; imageId: string }[]
> = {
  en: [
    {
      icon: TrendingUp,
      title: 'Start Your Journey',
      description:
        'Traditional farming has risks. Discover how oilseeds can provide a stable and profitable alternative.',
      imageId: 'comic-panel-1',
    },
    {
      icon: DollarSign,
      title: 'Boost Your Income',
      description:
        "Oilseeds are in high demand. Earn significantly more per acre compared to traditional crops and secure your family's future.",
      imageId: 'comic-page-9',
    },
    {
      icon: Landmark,
      title: 'Government Support',
      description:
        'The "Tel-Samriddhi" mission provides subsidies, better seeds, and crop insurance, reducing your risks.',
      imageId: 'comic-panel-3',
    },
    {
      icon: Network,
      title: 'Direct Market Access',
      description:
        'Connect directly with buyers and FPOs through our platform. No more middlemen, ensuring you get the best price.',
      imageId: 'feature-market-linkage',
    },
    {
      icon: Leaf,
      title: 'Sustainable Future',
      description:
        'Oilseed crops improve soil health and require less water, making your farm more resilient and eco-friendly.',
      imageId: 'comic-page-6',
    },
    {
      icon: Award,
      title: 'Become a Leader',
      description:
        'Inspire your community. Your success can motivate other farmers to join the oilseed revolution.',
      imageId: 'comic-page-10',
    },
  ],
  hi: [
    {
      icon: TrendingUp,
      title: 'अपनी यात्रा शुरू करें',
      description:
        'पारंपरिक खेती में जोखिम हैं। जानें कि तिलहन कैसे एक स्थिर और लाभदायक विकल्प प्रदान कर सकता है।',
      imageId: 'comic-panel-1',
    },
    {
      icon: DollarSign,
      title: 'अपनी आय बढ़ाएँ',
      description:
        'तिलहन की बहुत मांग है। पारंपरिक फसलों की तुलना में प्रति एकड़ काफी अधिक कमाएँ और अपने परिवार का भविष्य सुरक्षित करें।',
      imageId: 'comic-page-9',
    },
    {
      icon: Landmark,
      title: 'सरकारी सहायता',
      description:
        '"तेल-समृद्धि" मिशन सब्सिडी, बेहतर बीज और फसल बीमा प्रदान करता है, जिससे आपके जोखिम कम होते हैं।',
      imageId: 'comic-panel-3',
    },
    {
      icon: Network,
      title: 'प्रत्यक्ष बाजार पहुंच',
      description:
        'हमारे प्लेटफॉर्म के माध्यम से सीधे खरीदारों और एफपीओ से जुड़ें। कोई बिचौलिया नहीं, यह सुनिश्चित करता है कि आपको सबसे अच्छी कीमत मिले।',
      imageId: 'feature-market-linkage',
    },
    {
      icon: Leaf,
      title: 'सतत भविष्य',
      description:
        'तिलहन फसलें मिट्टी के स्वास्थ्य में सुधार करती हैं और कम पानी की आवश्यकता होती है, जिससे आपका खेत अधिक लचीला और पर्यावरण के अनुकूल बनता है।',
      imageId: 'comic-page-6',
    },
    {
      icon: Award,
      title: 'एक नेता बनें',
      description:
        'अपने समुदाय को प्रेरित करें। आपकी सफलता अन्य किसानों को तिलहन क्रांति में शामिल होने के लिए प्रेरित कर सकती है।',
      imageId: 'comic-page-10',
    },
  ],
  mr: [
    {
      icon: TrendingUp,
      title: 'आपला प्रवास सुरू करा',
      description:
        'पारंपारिक शेतीत धोके आहेत. तेलबिया एक स्थिर आणि फायदेशीर पर्याय कसा देऊ शकतात ते शोधा.',
      imageId: 'comic-panel-1',
    },
    {
      icon: DollarSign,
      title: 'आपले उत्पन्न वाढवा',
      description:
        'तेलबियांना मोठी मागणी आहे. पारंपारिक पिकांच्या तुलनेत प्रति एकर लक्षणीय अधिक कमवा आणि आपल्या कुटुंबाचे भविष्य सुरक्षित करा.',
      imageId: 'comic-page-9',
    },
    {
      icon: Landmark,
      title: 'सरकारी पाठिंबा',
      description:
        '"तेल-समृद्धी" मिशन सबसिडी, उत्तम बियाणे आणि पीक विमा प्रदान करते, ज्यामुळे तुमचे धोके कमी होतात.',
      imageId: 'comic-panel-3',
    },
    {
      icon: Network,
      title: 'थेट बाजारपेठेत प्रवेश',
      description:
        'आमच्या प्लॅटफॉर्मद्वारे थेट खरेदीदार आणि एफपीओशी कनेक्ट व्हा. कोणीही मध्यस्थ नाही, ज्यामुळे तुम्हाला सर्वोत्तम किंमत मिळेल.',
      imageId: 'feature-market-linkage',
    },
    {
      icon: Leaf,
      title: 'शाश्वत भविष्य',
      description:
        'तेलबिया पिके जमिनीचे आरोग्य सुधारतात आणि कमी पाण्याची आवश्यकता असते, ज्यामुळे तुमचे शेत अधिक लवचिक आणि पर्यावरणास अनुकूल बनते.',
      imageId: 'comic-page-6',
    },
    {
      icon: Award,
      title: 'एक नेता बना',
      description:
        'आपल्या समुदायाला प्रेरणा द्या. तुमचे यश इतर शेतकऱ्यांना तेलबिया क्रांतीमध्ये सामील होण्यासाठी प्रवृत्त करू शकते.',
      imageId: 'comic-page-10',
    },
  ],
  te: [
    {
      icon: TrendingUp,
      title: 'మీ ప్రయాణాన్ని ప్రారంభించండి',
      description:
        'సాంప్రదాయ వ్యవసాయంలో నష్టాలు ఉన్నాయి. నూనెగింజలు ఎలా స్థిరమైన మరియు లాభదాయకమైన ప్రత్యామ్నాయాన్ని అందిస్తాయో కనుగొనండి.',
      imageId: 'comic-panel-1',
    },
    {
      icon: DollarSign,
      title: 'మీ ఆదాయాన్ని పెంచుకోండి',
      description:
        'నూనెగింజలకు అధిక డిమాండ్ ఉంది. సాంప్రదాయ పంటలతో పోలిస్తే ఎకరానికి గణనీయంగా ఎక్కువ సంపాదించండి మరియు మీ కుటుంబ భవిష్యత్తును భద్రపరచండి.',
      imageId: 'comic-page-9',
    },
    {
      icon: Landmark,
      title: 'ప్రభుత్వ మద్దతు',
      description:
        '"తెల్-సమృద్ధి" మిషన్ సబ్సిడీలు, మెరుగైన విత్తనాలు మరియు పంటల బీమాను అందిస్తుంది, మీ నష్టాలను తగ్గిస్తుంది.',
      imageId: 'comic-panel-3',
    },
    {
      icon: Network,
      title: 'ప్రత్యక్ష మార్కెట్ యాక్సెస్',
      description:
        'మా ప్లాట్‌ఫారమ్ ద్వారా నేరుగా కొనుగోలుదారులు మరియు FPOలతో కనెక్ట్ అవ్వండి. మధ్యవర్తులు లేరు, మీకు ఉత్తమ ధర లభిస్తుందని నిర్ధారిస్తుంది.',
      imageId: 'feature-market-linkage',
    },
    {
      icon: Leaf,
      title: 'స్థిరమైన భవిష్యత్తు',
      description:
        'నూనెగింజల పంటలు నేల ఆరోగ్యాన్ని మెరుగుపరుస్తాయి మరియు తక్కువ నీరు అవసరం, మీ పొలాన్ని మరింత స్థితిస్థాపకంగా మరియు పర్యావరణ అనుకూలంగా చేస్తుంది.',
      imageId: 'comic-page-6',
    },
    {
      icon: Award,
      title: 'నాయకుడిగా అవ్వండి',
      description:
        'మీ సమాజాన్ని ప్రేరేపించండి. మీ విజయం ఇతర రైతులను నూనెగింజల విప్లవంలో చేరడానికి ప్రేరేపించగలదు.',
      imageId: 'comic-page-10',
    },
  ],
  ta: [
    {
      icon: TrendingUp,
      title: 'உங்கள் பயணத்தைத் தொடங்குங்கள்',
      description: 'பாரம்பரிய விவசாயத்தில் அபாயங்கள் உள்ளன. எண்ணெய் வித்துக்கள் எப்படி ஒரு நிலையான மற்றும் லாபகரமான மாற்றாக வழங்க முடியும் என்பதைக் கண்டறியுங்கள்.',
      imageId: 'comic-panel-1',
    },
    {
      icon: DollarSign,
      title: 'உங்கள் வருமானத்தை அதிகரிக்கவும்',
      description: 'எண்ணெய் வித்துக்களுக்கு அதிக தேவை உள்ளது. பாரம்பரிய பயிர்களுடன் ஒப்பிடும்போது ஏக்கருக்கு கணிசமாக அதிகமாக சம்பாதித்து உங்கள் குடும்பத்தின் எதிர்காலத்தைப் பாதுகாக்கவும்.',
      imageId: 'comic-page-9',
    },
    {
      icon: Landmark,
      title: 'அரசு ஆதரவு',
      description: '"டெல்-சம்ரிதி" திட்டம் மானியங்கள், சிறந்த விதைகள் மற்றும் பயிர் காப்பீடு ஆகியவற்றை வழங்குகிறது, இது உங்கள் அபாயங்களைக் குறைக்கிறது.',
      imageId: 'comic-panel-3',
    },
    {
      icon: Network,
      title: 'நேரடி சந்தை அணுகல்',
      description: 'எங்கள் தளம் மூலம் வாங்குபவர்கள் மற்றும் FPO களுடன் நேரடியாக இணையுங்கள். இடைத்தரகர்கள் இல்லை, உங்களுக்கு சிறந்த விலை கிடைப்பதை உறுதி செய்கிறது.',
      imageId: 'feature-market-linkage',
    },
    {
      icon: Leaf,
      title: 'நிலையான எதிர்காலம்',
      description: 'எண்ணெய் வித்து பயிர்கள் மண்ணின் ஆரோக்கியத்தை மேம்படுத்துகின்றன மற்றும் குறைந்த நீர் தேவைப்படுகிறது, இது உங்கள் பண்ணையை மேலும் நெகிழ்வானதாகவும் சூழல் நட்புடையதாகவும் ஆக்குகிறது.',
      imageId: 'comic-page-6',
    },
    {
      icon: Award,
      title: 'ஒரு தலைவராகுங்கள்',
      description: 'உங்கள் சமூகத்தை ஊக்குவிக்கவும். உங்கள் வெற்றி மற்ற விவசாயிகளை எண்ணெய் வித்து புரட்சியில் சேர ஊக்குவிக்கும்.',
      imageId: 'comic-page-10',
    },
  ],
  bn: [
    {
      icon: TrendingUp,
      title: 'আপনার যাত্রা শুরু করুন',
      description: 'ঐতিহ্যবাহী চাষে ঝুঁকি আছে। তেলবীজ কীভাবে একটি স্থিতিশীল এবং লাভজনক বিকল্প সরবরাহ করতে পারে তা আবিষ্কার করুন।',
      imageId: 'comic-panel-1',
    },
    {
      icon: DollarSign,
      title: 'আপনার আয় বাড়ান',
      description: 'তেলবীজের উচ্চ চাহিদা রয়েছে। ঐতিহ্যবাহী ফসলের তুলনায় প্রতি একর থেকে উল্লেখযোগ্যভাবে বেশি উপার্জন করুন এবং আপনার পরিবারের ভবিষ্যত সুরক্ষিত করুন।',
      imageId: 'comic-page-9',
    },
    {
      icon: Landmark,
      title: 'সরকারি সহায়তা',
      description: '"তেল-সমৃদ্ধি" মিশন ভর্তুকি, উন্নত বীজ এবং ফসল বীমা প্রদান করে, যা আপনার ঝুঁকি কমায়।',
      imageId: 'comic-panel-3',
    },
    {
      icon: Network,
      title: 'সরাসরি বাজার অ্যাক্সেস',
      description: 'আমাদের প্ল্যাটফর্মের মাধ্যমে সরাসরি ক্রেতা এবং এফপিওগুলির সাথে সংযোগ স্থাপন করুন। কোনও মধ্যস্থতাকারী নেই, নিশ্চিত করে যে আপনি সেরা মূল্য পান।',
      imageId: 'feature-market-linkage',
    },
    {
      icon: Leaf,
      title: 'টেকসই ভবিষ্যত',
      description: 'তেলবীজ ফসলগুলি মাটির স্বাস্থ্যের উন্নতি করে এবং কম জলের প্রয়োজন হয়, যা আপনার খামারকে আরও স্থিতিস্থাপক এবং পরিবেশ-বান্ধব করে তোলে।',
      imageId: 'comic-page-6',
    },
    {
      icon: Award,
      title: 'একজন নেতা হন',
      description: 'আপনার সম্প্রদায়কে অনুপ্রাণিত করুন। আপনার সাফল্য অন্যান্য কৃষকদের তেলবীজ বিপ্লবে যোগ দিতে অনুপ্রাণিত করতে পারে।',
      imageId: 'comic-page-10',
    },
  ],
};
const languages = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  te: 'తెలుగు',
  ta: 'தமிழ்',
  bn: 'বাংলা',
};

function BenefitCard({ benefit, index }: { benefit: (typeof benefitContent.en)[0]; index: number }) {
  const image = PlaceHolderImages.find(p => p.id === benefit.imageId);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`md:order-${isEven ? 1 : 2}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <benefit.icon className="w-6 h-6" />
          </div>
          <h3 className="font-headline text-2xl font-bold">{benefit.title}</h3>
        </div>
        <p className="text-muted-foreground text-lg">{benefit.description}</p>
      </div>
      <div
        className={`relative aspect-video rounded-lg overflow-hidden shadow-xl md:order-${isEven ? 2 : 1}`}
      >
        {image && (
          <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            data-ai-hint={image.imageHint}
          />
        )}
      </div>
    </motion.div>
  );
}

function Milestone({ scrollYProgress, index, total }: { scrollYProgress: any, index: number, total: number }) {
    const scale = useTransform(
        scrollYProgress,
        [index / total, (index + 0.5) / total],
        [1, 1.5]
      );

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="w-6 h-6 rounded-full bg-background border-2 border-primary"
        style={{ scale }}
      />
    </div>
  );
}

export function OilseedMotivation() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const [language, setLanguage] = useState<Language>('en');
  const benefits = benefitContent[language];

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Card className='p-4 md:p-6'>
      <div className="flex justify-end mb-6">
        <Select onValueChange={(value: Language) => setLanguage(value)} defaultValue={language}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(languages).map(([key, value]) => (
              <SelectItem key={key} value={key as Language}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div ref={scrollRef} className="relative mt-8">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2">
          <motion.div className="w-full h-full bg-primary origin-top" style={{ scaleY }} />
        </div>

        <div className="relative z-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="relative py-4">
              <Milestone scrollYProgress={scrollYProgress} index={index} total={benefits.length} />
              <BenefitCard benefit={benefit} index={index} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
